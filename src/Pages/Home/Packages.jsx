import { useEffect, useState, useRef } from "react";
import { FaStar, FaMedal, FaCheckCircle } from "react-icons/fa";

const Packages = () => {
  const sectionRef = useRef(null);

  // State for animated numbers
  const [starterPrice, setStarterPrice] = useState(0);
  const [growthPrice, setGrowthPrice] = useState(0);
  const [enterprisePrice, setEnterprisePrice] = useState(0);

  const animateNumbers = () => {
    const duration = 1000; // total animation time in ms
    const stepsStarter = 5; 
    const stepsGrowth = 8;
    const stepsEnterprise = 15;

    let currentStarter = 0;
    let currentGrowth = 0;
    let currentEnterprise = 0;

    const starterInterval = setInterval(() => {
      currentStarter += 1;
      if (currentStarter > stepsStarter) clearInterval(starterInterval);
      else setStarterPrice(currentStarter);
    }, duration / stepsStarter);

    const growthInterval = setInterval(() => {
      currentGrowth += 1;
      if (currentGrowth > stepsGrowth) clearInterval(growthInterval);
      else setGrowthPrice(currentGrowth);
    }, duration / stepsGrowth);

    const enterpriseInterval = setInterval(() => {
      currentEnterprise += 1;
      if (currentEnterprise > stepsEnterprise) clearInterval(enterpriseInterval);
      else setEnterprisePrice(currentEnterprise);
    }, duration / stepsEnterprise);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateNumbers();
          }
        });
      },
      { threshold: 0.5 } // trigger when 50% of the section is visible
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className="max-w-6xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Starter Plan */}
        <div className="border rounded-2xl overflow-hidden shadow-sm transform transition duration-500 hover:scale-105 hover:shadow-xl">
          <div className="bg-teal-700 text-white text-center p-6 rounded-b-[2rem]">
            <FaStar className="mx-auto text-3xl mb-2 transition-transform duration-500 hover:rotate-12 hover:scale-110" />
            <h3 className="text-lg font-semibold bg-teal-800 inline-block px-4 py-1 rounded-full">
              Starter Plan
            </h3>
            <h2 className="text-4xl sm:text-5xl font-bold mt-4">
              ${starterPrice} <span className="text-lg font-medium">/Month</span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed">
              For small teams managing up to 5 employees.
            </p>
          </div>
          <div className="text-center text-gray-600 py-6 space-y-3">
            <p>Up to 5 employees</p>
            <hr className="w-3/4 mx-auto border-gray-300" />
            <p>Basic analytics</p>
            <hr className="w-3/4 mx-auto border-gray-300" />
            <p>Email support</p>
            <button className="mt-6 bg-teal-700 text-white px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-teal-800 transition-all duration-300 transform hover:scale-105">
              Get Started
            </button>
          </div>
        </div>

        {/* Growth Plan */}
        <div className="border rounded-2xl overflow-hidden shadow-sm transform transition duration-500 hover:scale-105 hover:shadow-xl">
          <div className="bg-blue-500 text-white text-center p-6 rounded-b-[2rem]">
            <FaMedal className="mx-auto text-3xl mb-2 transition-transform duration-500 hover:rotate-12 hover:scale-110" />
            <h3 className="text-lg font-semibold bg-blue-800 inline-block px-4 py-1 rounded-full">
              Growth Plan
            </h3>
            <h2 className="text-4xl sm:text-5xl font-bold mt-4">
              ${growthPrice} <span className="text-lg font-medium">/Month</span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed">
              For growing teams managing up to 10 employees.
            </p>
          </div>
          <div className="text-center text-gray-600 py-6 space-y-3">
            <p>Up to 10 employees</p>
            <hr className="w-3/4 mx-auto border-gray-300" />
            <p>Advanced analytics</p>
            <hr className="w-3/4 mx-auto border-gray-300" />
            <p>Priority support</p>
            <button className="mt-6 bg-blue-500 text-white px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-blue-800 transition-all duration-300 transform hover:scale-105">
              Get Started
            </button>
          </div>
        </div>

        {/* Enterprise Plan */}
        <div className="border rounded-2xl overflow-hidden shadow-sm transform transition duration-500 hover:scale-105 hover:shadow-xl">
          <div className="bg-[#223666] text-white text-center p-6 rounded-b-[2rem]">
            <FaCheckCircle className="mx-auto text-3xl mb-2 transition-transform duration-500 hover:rotate-12 hover:scale-110" />
            <h3 className="text-lg font-semibold bg-purple-800 inline-block px-4 py-1 rounded-full">
              Enterprise Plan
            </h3>
            <h2 className="text-4xl sm:text-5xl font-bold mt-4">
              ${enterprisePrice} <span className="text-lg font-medium">/Month</span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed">
              For larger teams managing up to 20 employees.
            </p>
          </div>
          <div className="text-center text-gray-600 py-6 space-y-3">
            <p>Up to 20 employees</p>
            <hr className="w-3/4 mx-auto border-gray-300" />
            <p>Comprehensive analytics</p>
            <hr className="w-3/4 mx-auto border-gray-300" />
            <p>Dedicated support</p>
            <button className="mt-6 bg-[#223666] text-white px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-[#223666] transition-all duration-300 transform hover:scale-105">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Packages;
