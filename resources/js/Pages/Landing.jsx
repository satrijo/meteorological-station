import Blog from "./Home/Components/Blog";
import Featured from "./Home/Components/Featured";
import Footer from "./Home/Components/Footer";
import Header from "./Home/Components/Header";
import Sponsor from "./Home/Components/Sponsor";

const Landing = ({ url }) => {
    return (
        <>
            <Header title="Home" url={url} />
            <Featured />
            <Blog />
            <Sponsor />
            <Footer />
        </>
    );
};

export default Landing;
