import Banner from "../components/site/Banner";
import Header from "../components/site/Header";
import Servicos from "../components/site/Servicos";

function Site (){
    return (
        <div>
          <Header/>
          <div className="pt-[84.4px]">
          <Banner/>
          </div>
          <Servicos/>
        </div>
    );
}

export default Site;