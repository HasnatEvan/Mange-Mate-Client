import { FaCheckCircle, FaTools, FaCogs } from "react-icons/fa";
import image from '../../assets/Banner/image5.jpg';
import image2 from '../../assets/Banner/image6.jpg';

const Section = () => {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="bg-cover bg-center text-white py-24 md:py-32"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${image})`,
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Welcome to ManageMate
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-12 max-w-3xl mx-auto">
            ManageMate helps modern businesses track, manage, and optimize their assets with ease. Start managing your assets today!
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0149B1] mb-10 leading-tight">
            Our Amazing Features
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-10 sm:mb-16 max-w-3xl mx-auto">
            ManageMate offers a set of powerful features to help businesses track and manage their assets effortlessly.
            From real-time tracking to enhanced reporting, we make asset management easier and more efficient.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <FaCheckCircle className="text-5xl text-[#0149B1] mb-6 mx-auto" />
              <h3 className="text-2xl font-semibold text-[#0149B1] mb-4">Real-Time Tracking</h3>
              <p className="text-gray-700 text-base">
                Easily track all your assets and manage them in real-time with our intuitive dashboard.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <FaTools className="text-5xl text-[#0149B1] mb-6 mx-auto" />
              <h3 className="text-2xl font-semibold text-[#0149B1] mb-4">Powerful Tools</h3>
              <p className="text-gray-700 text-base">
                Get insights into your asset usage and optimize your inventory for maximum efficiency.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <FaCogs className="text-5xl text-[#0149B1] mb-6 mx-auto" />
              <h3 className="text-2xl font-semibold text-[#0149B1] mb-4">Easy Integration</h3>
              <p className="text-gray-700 text-base">
                Seamlessly integrate with your existing workflows and automate key asset management tasks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section
        className="bg-cover bg-center text-white py-24 md:py-32"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${image2})`,
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Ready to get started?
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-12 max-w-3xl mx-auto">
            Take control of your assets with ManageMate and make asset management more efficient than ever before.
          </p>
          <a
            href="#"
            className="inline-block bg-[#FD8E29] text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-[#e6a500] transition duration-300"
          >
            Get Started Today
          </a>
        </div>
      </section>
    </div>
  );
};

export default Section;
