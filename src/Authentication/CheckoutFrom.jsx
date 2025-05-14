import { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { MdSync } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import axios from 'axios';
import Swal from 'sweetalert2'; // Swal ব্যবহার করা হচ্ছে

const CheckoutForm = ({ hrUserInfo }) => {
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const getPaymentIntent = async () => {
      try {
        const { data } = await axiosSecure.post('/create-payment-intent', {
          packagePrice: hrUserInfo?.packagePrice,
        });
        setClientSecret(data.clientSecret);
        console.log("Payment Intent created successfully:", data.clientSecret); // console for debugging
      } catch (err) {
        console.error('Error creating payment intent:', err);
      }
    };

    if (hrUserInfo?.packagePrice) {
      getPaymentIntent();
    }
  }, [hrUserInfo, axiosSecure]);

  const handlePaymentSuccess = async () => {
    try {
      const res = await axios.post(`http://https://asset-management-system-server-kappa.vercel.app/users/${hrUserInfo.email}`, hrUserInfo);
      console.log('✅ User saved to database:', res.data);

      Swal.fire({
        icon: 'success',
        title: 'Signup & Payment successful!',
        text: 'You have successfully signed up as an HR manager.',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Go to Home',
      }).then(() => {
        navigate('/'); // Navigate to home page on success
      });
    } catch (error) {
      console.error('Error saving user after payment:', error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error saving user!',
        text: 'Something went wrong while saving the user. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      console.log('Stripe, Elements, or ClientSecret missing.');
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      console.log('CardElement not found.');
      return;
    }

    setLoading(true);

    try {
      const { error: paymentMethodError } = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });

      if (paymentMethodError) {
        console.error('[❌ PaymentMethod Error]', paymentMethodError);
        setLoading(false);
        return;
      }

      console.log('✅ Payment Method Created Successfully.');

      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: hrUserInfo?.name || 'Anonymous',
            email: hrUserInfo?.email || 'noemail@example.com',
          },
        },
      });

      if (confirmError) {
        console.error('[❌ Confirm Error]', confirmError);
        setLoading(false);
        return;
      }

      console.log('✅ Payment Intent Confirmation Response:', paymentIntent);

      if (paymentIntent.status === 'succeeded') {
        console.log('💰 Payment successful!');
        console.log(`✅ Payment ID: ${paymentIntent.id}`);
        console.log(`✅ Paid Amount: $${paymentIntent.amount / 100}`);
        console.log(`✅ Payment Status: ${paymentIntent.status}`);
        
        await handlePaymentSuccess(); // Database save & navigate
      } else {
        console.warn('⚠️ Payment not successful:', paymentIntent.status);
        Swal.fire({
          icon: 'error',
          title: 'Payment Failed',
          text: 'Your payment could not be processed. Please try again.',
        });
        setLoading(false);
      }
    } catch (error) {
      console.error('Error during payment process:', error);
      Swal.fire({
        icon: 'error',
        title: 'Payment Error',
        text: 'An error occurred during payment. Please try again.',
      });
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': { color: '#aab7c4' },
            },
            invalid: { color: '#9e2146' },
          },
        }}
      />

      <div className="flex justify-around">
        <button
          type="submit"
          disabled={loading || !stripe}
          className={`w-full bg-blue-600 text-white py-2 mt-2 rounded hover:bg-blue-700 transition ${
            loading ? 'bg-gray-400 cursor-not-allowed' : ''
          }`}
        >
          {loading ? (
            <>
              <MdSync className="animate-spin inline-block mr-2 text-white" />
              Processing...
            </>
          ) : (
            `Sign Up & Pay $${hrUserInfo?.packagePrice || 0}`
          )}
        </button>

        <button
          type="button"
          onClick={() => navigate('/')}
          className="ml-4 text-red-500 hover:underline"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
