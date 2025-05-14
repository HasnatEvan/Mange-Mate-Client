import About from "./About";
import Banner from "./Banner";
import NumberTicker from "./NumberTicker";
import Packages from "./Packages";
import Section from "./Section";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <About></About>
            <Section></Section>
            <NumberTicker></NumberTicker>
            <Packages></Packages>
        </div>
    );
};

export default Home;