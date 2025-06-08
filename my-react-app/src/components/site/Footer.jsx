import Logo from "../shared/Logo"
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa";

export const Footer = () => {
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <div className="w-full h-[200px] bg-[#0F0A2A] flex justify-center items-center">
            <div className="w-10/12 h-full flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center w-[135px] h-full">
                    <Logo />
                </div>
                {/* Navegação */}
                <ul className="flex items-center gap-12 text-[18px] text-white font-light font-figtree">
                    <li className="cursor-pointer hover:translate-y-[-2px] transition-all duration-900" onClick={() => scrollToSection('services')}>Serviços</li>
                    <li className="cursor-pointer hover:translate-y-[-2px] transition-all duration-900" onClick={() => scrollToSection('about')}>Sobre Nós</li>
                    <li className="cursor-pointer hover:translate-y-[-2px] transition-all duration-900" onClick={() => scrollToSection('squad')}>Equipe</li>
                </ul>
                {/* Contatos */}
                <div className="flex flex-col items-end gap-2 text-white font-light font-figtree text-[18px]">
                    <div className="flex items-center gap-2">
                        <BsFillTelephoneFill />
                        <span>(11) 4975-8092</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaWhatsapp />
                        <span>(11) 99605-6965</span>
                    </div>
                </div>
            </div>
        </div>
    )
}