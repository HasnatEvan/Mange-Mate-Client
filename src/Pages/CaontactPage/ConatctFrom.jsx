import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaVimeoV,
  FaPinterestP,
  FaInstagram
} from "react-icons/fa";

const ContactFrom = () => {
  return (
    <section className="max-w-6xl mx-auto py-10 px-4  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
      {/* LEFT SECTION */}
      <div className="space-y-10 lg:col-span-1">
        {/* Hotel Info */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 uppercase mb-4">
            Hotel Information
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Curabitur blandit tempus porttitor. Nulla vitae elit libero, a pharetra augue.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 uppercase mb-4">
            Contact
          </h2>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <FaMapMarkerAlt className="text-blue-500 mt-1" />
              756 Livingston Street, Brooklyn, NY 11201, United States
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-blue-500" /> +61 3 8376 6284
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-blue-500" /> masum.clippingdealer@gmail.com
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 uppercase mb-4">
            Social Media
          </h2>
          <div className="flex items-center gap-4 flex-wrap">
            {[FaFacebookF, FaTwitter, FaVimeoV, FaPinterestP, FaInstagram].map((Icon, idx) => (
              <div
                key={idx}
                className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white hover:bg-blue-700 transition"
              >
                <Icon size={14} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="lg:col-span-2 space-y-8">
        {/* Google Map */}
        <div className="w-full h-60 sm:h-72 md:h-80">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3900.740270323161!2d-77.03056422515255!3d-12.140526288095905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8c385f87797%3A0x7cb77a2690c38a4!2sLima%2C%20Peru!5e0!3m2!1sen!2sbd!4v1731249313536!5m2!1sen!2sbd"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        {/* Contact Form */}
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full border border-gray-300 rounded-md p-3 outline-none focus:border-blue-600 placeholder-gray-400 placeholder:text-sm"
          />
          <input
            type="text"
            placeholder="Enter your subject"
            className="w-full border border-gray-300 rounded-md p-3 outline-none focus:border-blue-600 placeholder-gray-400 placeholder:text-sm"
          />
          <input
            type="email"
            placeholder="Enter your e-mail"
            className="w-full border border-gray-300 rounded-md p-3 outline-none focus:border-blue-600 placeholder-gray-400 placeholder:text-sm"
          />
          <textarea
            rows="6"
            placeholder="Write what do you want..."
            className="w-full border border-gray-300 rounded-md p-3 outline-none focus:border-blue-600 placeholder-gray-400 placeholder:text-sm"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 text-white px-8 py-3 uppercase rounded-sm hover:bg-blue-700 transition float-right"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactFrom;
