import Logo from "../shared/Logo"


export const Footer = () => {
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      };
    return(
        <div className="w-full h-[200px] bg-[#0F0A2A] flex justify-center items-center">
            <div className="w-10/12 h-full flex place-content-between items-center">
                <div className="flex items-center w-[135px] h-full">
                    <Logo/>
                </div>
                <div className="list-none h-full flex items-center text-[18px] text-white  font-figtree">
                    <ul className="list-none h-full flex items-center gap-20 text-white font-light  font-figtree">
                        <li className="cursor-pointer hover:translate-y-[-2px] transition-all duration-900" onClick={() => scrollToSection('services')}>Serviços</li>
                        <li className="cursor-pointer hover:translate-y-[-2px] transition-all duration-900" onClick={() => scrollToSection('about')}>Sobre Nós</li>
                        <li className="cursor-pointer hover:translate-y-[-2px] transition-all duration-900" onClick={() => scrollToSection('squad')}>Equipe</li>
                        <li className="cursor-pointer hover:translate-y-[-2px] transition-all duration-900" onClick={() => scrollToSection('footer')}>Contato</li>
                    </ul>
                </div>
            </div>

        </div>
    )
}