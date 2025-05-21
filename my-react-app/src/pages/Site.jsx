import { AboutUs } from "../components/site/AboutUs";
import Banner from "../components/site/Banner";
import { Squad } from "../components/site/Squad";
import { Footer } from "../components/site/Footer";
import Header from "../components/site/Header";
import Servicos from "../components/site/Servicos";

function Site (){
    return (
        <div>
          <Header/>
          <div className="pt-[84.4px]">
          <Banner/>
          </div>
          <div>
          <Servicos/>
          <AboutUs/>
          </div>
          <Squad/>
          <Footer/>
        </div>
    );
}

export default Site;