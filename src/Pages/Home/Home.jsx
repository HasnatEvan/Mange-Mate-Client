import About from "./About";
import Banner from "./Banner";
import Packages from "./Packages";
import Section from "./Section";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <About></About>
            <Section></Section>
            <Packages></Packages>
        </div>
    );
};

export default Home;