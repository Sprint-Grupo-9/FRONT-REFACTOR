import Banner from "../components/Banner";
import Header from "../components/Header";
import Servicos from "../components/Servicos";

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