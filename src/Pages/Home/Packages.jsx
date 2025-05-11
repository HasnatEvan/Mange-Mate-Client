
import { FaCheckCircle } from "react-icons/fa"; // এখানে React Icons থেকে Check Icon ইমপোর্ট করছি

const Packages = () => {
  const packages = [
    {
      title: "Starter Plan",
      description: "For small teams managing up to 5 employees.",
      price: "$5/month",
      features: ["Up to 5 employees", "Basic analytics", "Email support"],
    },
    {
      title: "Growth Plan",
      description: "For growing teams managing up to 10 employees.",
      price: "$8/month",
      features: ["Up to 10 employees", "Advanced analytics", "Priority support"],
    },
    {
      title: "Enterprise Plan",
      description: "For larger teams managing up to 20 employees.",
      price: "$15/month",
      features: [
        "Up to 20 employees",
        "Comprehensive analytics",
        "Dedicated support",
      ],
    },
  ];

  return (
    <section className="bg-white py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
          𝑶𝒖𝒓 𝑷𝒂𝒄𝒌𝒂𝒈𝒆𝒔
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 p-8 flex flex-col items-center text-center"
            >
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-500 font-serif">
                {pkg.title}
              </h3>
              <p className="mt-2 text-gray-600 text-sm sm:text-base">{pkg.description}</p>
              <p className="mt-4 text-2xl font-bold text-gray-400">{pkg.price}</p>
              <ul className="mt-6 space-y-3 text-gray-700 text-sm sm:text-base w-full">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" /> {feature}
                  </li>
                ))}
              </ul>
              <button className="mt-8 px-6 py-3 bg-[#FD8E29] text-white font-semibold rounded-lg hover:bg-[#FD8E29] focus:outline-none focus:ring-2 focus:ring-white transition">
                𝑮𝒆𝑡 𝑺𝒕𝒂𝒓𝒕𝒆𝒅
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Packages;
