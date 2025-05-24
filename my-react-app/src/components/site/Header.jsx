import Logo from "../shared/Logo";
import React, { useState } from "react";
import LoginModal from "../../Auth/LoginModal";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import api from "../../services/api";

function Header() {
  const navigate = useNavigate();
  const [loginOpen, setLoginOpen] = useState(false);
  const { user, logout } = useAuth();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="fixed w-full h-[85px]  bg-primary flex justify-center z-50">
        <div className=" w-10/12 h-full flex place-content-between items-center">
          <div onClick={() => scrollToSection('home')} className="flex items-center w-[135px] h-full cursor-pointer hover:translate-y-[-2px] transition-all duration-900 ">
            <Logo />
          </div>
          <div className="list-none h-full flex items-center text-[18px] text-white  font-figtree">
            <ul className="list-none h-full flex items-center gap-20 text-white font-light  font-figtree">
              <li className="cursor-pointer hover:translate-y-[-2px] transition-all duration-900" onClick={() => scrollToSection('services')}>Serviços</li>
              <li className="cursor-pointer hover:translate-y-[-2px] transition-all duration-900" onClick={() => scrollToSection('about')}>Sobre Nós</li>
              <li className="cursor-pointer hover:translate-y-[-2px] transition-all duration-900" onClick={() => scrollToSection('squad')}>Equipe</li>
              <li className="cursor-pointer hover:translate-y-[-2px] transition-all duration-900" onClick={() => scrollToSection('footer')}>Contato</li>
            </ul>
          </div>
          <div className="flex items-center h-full gap-6">
            {!user ? (
              <>
                <button onClick={() => navigate('/cadastro')} className="bg-secondary text-white font-bold font-figtree py-2 px-6 rounded-lg transition-all duration-900 hover:bg-white hover:text-primary">
                  Cadastre-se
                </button>
                <button
                  className="border-2 border-white text-white font-bold font-figtree py-1.5 px-6 rounded-lg transition-all duration-900 hover:bg-white hover:text-primary"
                  onClick={() => setLoginOpen((prev) => !prev)}
                >
                  Login
                </button>
              </>
            ) : (
              <>
                <FaUserCircle className="text-3xl text-white" />
                <span className="text-white font-bold">{user.name}</span>
                <button onClick={logout} className="text-white hover:text-secondary">
                  <FaSignOutAlt className="text-2xl" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  )
}

export default Header;