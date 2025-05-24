import { AboutUs } from "../components/site/AboutUs";
import Banner from "../components/site/Banner";
import { Squad } from "../components/site/Squad";
import { Footer } from "../components/site/Footer";
import Header from "../components/site/Header";
import Servicos from "../components/site/Servicos";

function Site() {
  return (
    <div id="home">
      <Header />
      <div className="pt-[84.4px]">
        <Banner />
      </div>
      <div id="services">
        <Servicos />
      </div>
      <div id="about">
        <AboutUs />
      </div>
      <div id="squad">
        <Squad />
      </div>
      <div id="footer">
        <Footer />
      </div>
    </div>
  );
}

export default Site;