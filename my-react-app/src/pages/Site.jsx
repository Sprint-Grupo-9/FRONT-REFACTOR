import { AboutUs } from "../components/site/AboutUs";
import Banner from "../components/site/Banner";
import { Squad } from "../components/site/Squad";
import { Footer } from "../components/site/Footer";
import Header from "../components/site/Header";
import Servicos from "../components/site/Servicos";
import { useNavigate } from 'react-router-dom';

function Site() {
  const navigate = useNavigate();

  const handleAgendamentoClick = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/system-appointments/new');
    } else {
      navigate('/cadastro');
    }
  };

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