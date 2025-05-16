import Logo from "../shared/Logo";
import ButtonTransp from "./ButtonTransp";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';


function HeaderSystem(props) {

  const navigate = useNavigate();

  const goToSite = () => navigate("/");

  return (
    <div className="fixed w-full h-20 top-0 left-0 bg-primary flex justify-center">
      <div className="w-screen h-full flex justify-between px-12">
        <div className="flex items-center h-full gap-6">
        <ButtonTransp click={goToSite} text="Voltar ao Site" logo={<IoChevronBackOutline />}/>
        </div>
        <div className="h-full flex items-center text-[18px] text-white font-bold font-figtree">
          {props.text}
        </div>
        <div className="flex items-center h-full">
          <Logo />
        </div>
      </div>
    </div>
  )
}

export default HeaderSystem;