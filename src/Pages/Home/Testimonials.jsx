import { useState, useEffect } from "react";
import img1 from "../../assets/Testimonials/client-01.avif";
import img2 from "../../assets/Testimonials/client-02.avif";
import img3 from "../../assets/Testimonials/client-01.avif";
import img4 from "../../assets/Testimonials/client-02.avif";
import img5 from "../../assets/Testimonials/client-01.avif";
import img6 from "../../assets/Testimonials/client-02.avif";
import img7 from "../../assets/Testimonials/client-01.avif";
import img8 from "../../assets/Testimonials/client-02.avif";
import img9 from "../../assets/Testimonials/client-01.avif";

const Testimonials = () => {
    const testimonials = [
        { img: img1, name: "Eleanor Pena", role: "Head Of Design", rating: 5, review: "Everyone receives valuable and rewarding returns on their trading. The team was highly professional and supportive throughout the process. I felt guided at every step and truly appreciated the level of detail and care they put into their work. Great experience!" },
        { img: img2, name: "Alison Hedge", role: "CEO & Founder", rating: 5, review: "Amazing service and very professional team. They took the time to understand my goals, provided insightful recommendations, and delivered exceptional results. Communication was seamless, and I highly recommend their services to anyone looking for a reliable partner." },
        { img: img3, name: "Guy Hawkins", role: "Marketing Manager", rating: 4, review: "Great results, friendly support, and a clear process from start to finish. The team was flexible and responsive to feedback, making it easy to achieve the desired outcome. I would happily work with them again for future projects." },
        { img: img4, name: "Jenny Wilson", role: "Project Manager", rating: 5, review: "Exceptional quality and timely delivery. Every milestone was completed on schedule, and the end result exceeded my expectations. Their commitment to excellence and attention to detail is impressive. I love working with them!" },
        { img: img5, name: "Kristin Watson", role: "Software Engineer", rating: 5, review: "Professional team with amazing skills. They provided innovative solutions, handled challenges efficiently, and consistently kept me updated. I was really impressed with the output and the overall experience of collaborating with them." },
        { img: img6, name: "Robert Fox", role: "Entrepreneur", rating: 4, review: "Very satisfied with their work. The process was smooth and clear, and the team was approachable and helpful at every step. They made sure that the final deliverable matched my vision perfectly." },
        { img: img7, name: "Savannah Nguyen", role: "Content Creator", rating: 5, review: "Creative and reliable. They listened carefully to my requirements and delivered exactly what I needed, adding value with their expertise. The experience was seamless, and the results were beyond expectations." },
        { img: img8, name: "Cameron Williamson", role: "Designer", rating: 5, review: "Top-notch service and communication. They consistently went above and beyond, providing valuable insights and ensuring everything was perfect. I am highly satisfied and would definitely collaborate again." },
        { img: img9, name: "Darlene Robertson", role: "Business Analyst", rating: 4, review: "Solid work and attentive team. They understood the objectives clearly, executed with precision, and were always responsive to questions. I would gladly work with them on future projects." },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const testimonialsPerPage = 3;

    const indexOfLast = currentPage * testimonialsPerPage;
    const indexOfFirst = indexOfLast - testimonialsPerPage;
    const currentTestimonials = testimonials.slice(indexOfFirst, indexOfLast);

    const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

    // Auto-slide effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPage(prev => (prev === totalPages ? 1 : prev + 1));
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval);
    }, [totalPages]);

    return (
        <section className="relative w-full bg-white py-10 px-4 md:px-0 max-w-6xl mx-auto">

            {/* Top heading */}
            <div className="text-center relative z-10 mb-16">
                <div className="flex items-center justify-center gap-2 text-orange-500 font-semibold mb-4">
                    <span className="w-3 h-3 bg-orange-500 rotate-45 inline-block"></span>
                    Testimonials
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-[#073B3A] leading-snug">
                    What our top Customers <br /> Say About Us
                </h1>
            </div>

            {/* Testimonial cards */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-2 relative z-10">

                {currentTestimonials.map((testimonial, idx) => (
                    <div key={idx} className="relative border border-gray-200 rounded-3xl p-8 bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[85%] bg-blue-500 rounded-3xl p-4 flex items-center gap-4 shadow-lg">
                            <img src={testimonial.img} alt={testimonial.name} className="w-16 h-16 rounded-full object-cover border-2 border-white" />
                            <div>
                                <h3 className="text-white font-semibold text-xl">{testimonial.name}</h3>
                                <p className="text-gray-300 text-sm">{testimonial.role}</p>
                            </div>
                        </div>

                        <div className="pt-10 text-center">
                            <p className="text-yellow-400 text-xl mb-4 text-left">{'★'.repeat(testimonial.rating)}</p>
                            <p className="text-gray-700 text-lg leading-relaxed text-left">{testimonial.review}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination as dots */}
            <div className="flex justify-center mt-12 gap-3">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-3 h-3 rounded-full transition-colors duration-300 ${currentPage === i + 1 ? 'bg-blue-500' : 'bg-gray-300'
                            }`}
                    ></button>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
