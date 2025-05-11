import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bannerImage1 from '../../assets/Banner/image1.jpg';
import bannerImage2 from '../../assets/Banner/image2.jpg';
import { Link } from "react-router-dom";

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  const slides = [
    {
      id: 1,
      image: bannerImage1,
      buttonText: "Join as HR",
      buttonLink: "/join-hr",
      description: "Become part of our HR team and shape the future of the company!",
    },
    {
      id: 2,
      image: bannerImage2,
      buttonText: "Join as Employee",
      buttonLink: "/join-employee",
      description: "Join our team and start your career with amazing opportunities.",
    },
  ];

  return (
    <div className="w-full overflow-hidden max-w-7xl mx-auto rounded-lg">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="relative h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] xl:h-[600px]">
            
            {/* Banner Image */}
            <img
              src={slide.image}
              alt={`Slide ${slide.id}`}
              className="w-full h-full object-cover rounded-lg"
            />

            {/* Semi-transparent Overlay */}
            <div className="absolute inset-0 bg-black/40 rounded-lg"></div>

            {/* Centered Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
              <h2 className="text-white text-xl sm:text-2xl lg:text-4xl font-bold mb-4 leading-tight drop-shadow-lg">
                {slide.description}
              </h2>
              <Link
                to={slide.buttonLink}
                className="mt-4 bg-gradient-to-r from-[#FD8E29] to-[#FD8E29] text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
              >
                {slide.buttonText}
              </Link>
            </div>

          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
