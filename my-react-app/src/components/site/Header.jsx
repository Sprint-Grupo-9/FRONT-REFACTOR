import Logo from "../shared/Logo";

function Header(){
    return (
      <div className="fixed w-full h-[85px]  bg-primary flex justify-center z-50">
        
        <div className=" w-10/12 h-full flex place-content-between items-center">
         
         <div className="flex items-center w-[135px] h-full">
          <Logo/>
         </div>

         <div className="list-none h-full flex items-center text-[18px] text-white  font-figtree">
          <ul className="list-none h-full flex items-center gap-20 text-white font-light  font-figtree">
          <li className="cursor-pointer hover:translate-y-[-2px] transition-all duration-900">Serviços</li>
          <li className="cursor-pointer hover:translate-y-[-2px] transition-all duration-900">Sobre Nós</li>
          <li className="cursor-pointer hover:translate-y-[-2px] transition-all duration-900">Equipe</li>
          <li className="cursor-pointer hover:translate-y-[-2px] transition-all duration-900">Contato</li>
          </ul>
         </div>

          <div className="flex items-center h-full gap-6">
            <button className="bg-secondary text-white font-bold font-figtree py-2 px-6 rounded-lg transition-all duration-900 hover:bg-white hover:text-primary">
              Cadastre-se
            </button>
            <button className="border-2 border-white text-white font-bold font-figtree py-1.5 px-6 rounded-lg transition-all duration-900 hover:bg-white hover:text-primary">
             Login
            </button>

            
          </div>

        </div>

      </div>
    )
}

export default Header;