import { useState, useEffect, useRef } from "react";
import { FaCheckCircle, FaBullseye } from "react-icons/fa";
import image from "../../../src/assets/Home/choose-us.jpg";

const ChooseUs = () => {
    const [activeTab, setActiveTab] = useState("mission");
    const [success, setSuccess] = useState(0);
    const [growth, setGrowth] = useState(0);
    const sectionRef = useRef(null);
    const observerRef = useRef(null);

    const tabData = {
        mission: {
            title: "Our Mission",
            text: "Everyone with high and useful reward for their trading, purchase, and investment to make the Collabo.",
            list: ["Protecting your company", "We offer you solutions", "We take care of you"],
            success: 95,
            growth: 85,
        },
        vision: {
            title: "Our Vision",
            text: "We aim to become a global leader by empowering individuals and businesses with sustainable solutions.",
            list: ["Empowering businesses worldwide", "Driving innovation", "Creating lasting impact"],
            success: 85,
            growth: 75,
        },
        achievement: {
            title: "Achievement",
            text: "Everyone with high and useful reward for his/her trading, purchase investment to make the Collabo.",
            list: ["Protecting your company", "We offer you solutions", "We take care of you"],
            success: 92,
            growth: 85,
        },
    };

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    animateNumbers(tabData[activeTab].success, tabData[activeTab].growth);
                } else {
                    setSuccess(0);
                    setGrowth(0);
                }
            },
            { threshold: 0.5 }
        );

        if (sectionRef.current) observerRef.current.observe(sectionRef.current);

        return () => {
            if (sectionRef.current) observerRef.current.unobserve(sectionRef.current);
        };
    }, [activeTab]);

    const animateNumbers = (targetSuccess, targetGrowth) => {
        let start = 0;
        const duration = 1200;
        const step = 16;
        const incrementSuccess = targetSuccess / (duration / step);
        const incrementGrowth = targetGrowth / (duration / step);

        const animate = () => {
            start += 1;
            setSuccess((prev) => (prev + incrementSuccess >= targetSuccess ? targetSuccess : prev + incrementSuccess));
            setGrowth((prev) => (prev + incrementGrowth >= targetGrowth ? targetGrowth : prev + incrementGrowth));
            if (start < duration / step) requestAnimationFrame(animate);
        };
        animate();
    };

    const { title, text, list, success: successTarget, growth: growthTarget } = tabData[activeTab];

    return (
        <section
            ref={sectionRef}
            className="max-w-6xl mx-auto px-4  py-10 sm:py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center bg-white"
        >
            {/* Left Image */}
            <div className="relative w-full">
                <img src={image} alt="Business Consulting" className="w-full h-auto rounded-2xl object-cover" />

                {/* Award Badge */}
                <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-white/30 backdrop-blur-lg border border-white/50 shadow-lg p-3 sm:p-4 w-[70%] sm:w-[45%] rounded-xl text-center">
                    <div className="flex flex-col items-center">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-400 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full mb-2">
                            <FaBullseye className="text-white text-lg sm:text-2xl" />
                        </div>
                        <p className="text-gray-800 font-semibold text-xs sm:text-sm md:text-base">
                            Best Business Consulting
                        </p>
                        <p className="text-gray-600 text-[10px] sm:text-xs md:text-sm">Awards</p>
                    </div>
                </div>
            </div>

            {/* Right Content */}
            <div className="text-center lg:text-left">
                {/* Small Title */}
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
                    <span className="w-2 h-2 bg-blue-500 rotate-45 inline-block"></span>
                    <p className="text-gray-600 font-medium text-sm sm:text-base">Why Choose Us</p>
                </div>

                {/* Heading */}
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 leading-snug mb-6">
                    You need someone with <br />
                    <span className="text-blue-500">Strategic support</span>
                </h2>

                {/* Tabs */}
                <div className="flex justify-between lg:justify-between bg-gray-100 rounded-full p-2 mb-8 gap-2 flex-wrap">
                    {["mission", "vision", "achievement"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm md:text-base font-medium transition ${activeTab === tab
                                ? "bg-blue-500 text-white"
                                : "text-gray-700 hover:bg-white"
                                }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Text */}
                <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-3 text-left text-gray-900">{title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed text-sm sm:text-base text-left">{text}</p>

                {/* List & Progress */}
                <div className="flex flex-col sm:flex-row sm:justify-between gap-6 items-start">
                    <ul className="space-y-3 w-full sm:w-1/2">
                        {list.map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
                                <FaCheckCircle className="text-blue-500 text-lg" /> {item}
                            </li>
                        ))}
                    </ul>

                    <div className="flex flex-wrap gap-6 justify-center sm:justify-start w-full sm:w-1/2">
                        <ProgressCircle label="Success Rate" value={success} />
                        <ProgressCircle label="Business Growth" value={growth} />
                    </div>

                </div>
            </div>
        </section>
    );
};

// ✅ Circular Progress Component
const ProgressCircle = ({ value, label, size = 80 }) => {
    const radius = size / 2 - 8; // 8 is strokeWidth
    const circumference = 2 * Math.PI * radius;

    return (
        <div className="flex flex-col items-center">
            <div className={`relative`} style={{ width: size, height: size }}>
                <svg className="w-full h-full">
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke="#e5e7eb"
                        strokeWidth="8"
                        fill="none"
                    />
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke="#3b82f6" // Tailwind blue-500
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference - (circumference * value) / 100}
                        strokeLinecap="round"
                        style={{ transition: "stroke-dashoffset 0.4s ease-in-out" }}
                    />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-sm sm:text-lg font-semibold text-gray-800">
                    {Math.round(value)}%
                </span>
            </div>
            <p className="text-gray-800 font-medium mt-2 text-xs sm:text-base text-center">{label}</p>
        </div>
    );
};



export default ChooseUs;
