import ConatctFrom from "../CaontactPage/ConatctFrom";
import About from "./About";
import Banner from "./Banner";
import ChooseUs from "./ChooseUs";
import NumberTicker from "./NumberTicker";
import Packages from "./Packages";
import Section from "./Section";
import Testimonials from "./Testimonials";

const Home = () => {
    return (
        <div className="">
            {/* <Banner></Banner>
            <About></About>
            <Section></Section> */}
            <NumberTicker></NumberTicker>
            <ChooseUs></ChooseUs>
            <Packages></Packages>
            <ConatctFrom></ConatctFrom>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;