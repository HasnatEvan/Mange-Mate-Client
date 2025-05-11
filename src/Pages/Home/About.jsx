import image1 from '../../assets/Banner/image3.jpg';
import image2 from '../../assets/Banner/image4.jpg';

const About = () => {
  return (
    <section className="bg-white py-16 sm:py-20">
      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in { animation: fadeIn 1s ease-in-out; }
        `}
      </style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16">

        {/* Text Section */}
        <div className="w-full lg:w-1/2 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0149B1] mb-6">
            About <span className="text-gray-800">ManageMate</span>
          </h2>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
            <strong>ManageMate</strong> is a powerful asset management platform designed for modern teams and businesses.
            From startups to enterprises, we help you manage, track, and optimize your assets easily.
          </p>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed mt-4">
            With real-time data and smart tools, you can streamline operations, improve transparency,
            and grow your organization with confidence and clarity.
          </p>
        </div>

        {/* Images Section */}
        <div className="w-full lg:w-1/2 relative flex justify-center items-center min-h-[300px] sm:min-h-[350px] lg:min-h-[400px]">
          <div className="relative w-full max-w-sm sm:max-w-md">
            <img
              src={image1}
              alt="Team working"
              className="rounded-2xl shadow-2xl w-full object-cover border-4 border-white transform hover:scale-105 transition-transform duration-500"
            />
            <img
              src={image2}
              alt="Office meeting"
              className="rounded-2xl shadow-xl w-2/3 object-cover border-4 border-white absolute -bottom-6 sm:-bottom-8 right-4 sm:right-8 transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
