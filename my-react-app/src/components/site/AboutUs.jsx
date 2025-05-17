import PataSobre from "../shared/PataSobre";
import MapsReact from "./MapsReact";

export function AboutUs() {
  return (
    <div className="w-full h-[500px] bg-white ">
    <div className="w-full h-[500px] bg-[#BB1055]  flex flex-start items-center justify-between p-24 rounded-br-[150px] rounded-tr-[150px]">
      <div className="w-2/4 h-full  p-4">
       <div>
        <span className="w-full pl-28  flex">
            <PataSobre/>
        </span>
        <h1 className="font-figtree text-white text-[48px] font-bold">Sobre Nós</h1>
       </div>
        <div className="w-full ">
            <p className="text-white font-figtree font-extralight">O Petshop Columbia nasceu do amor pelos animais. <br/> Oferecemos produtos, cuidados e carinho para o bem-estar do seu pet. <br />
             Aqui, seu melhor amigo é tratado como parte da família.</p>
        </div>


      </div>

      <div className="w-2/4 h-full flex flex-col justify-center items-center">
      <MapsReact/>
      <span className="text-end pt-8 pl-56">
      <p className="text-white font-figtree font-extralight"><b>Endereço:</b><br></br> Rua Columbia 123, Vila Boa São Paulo, SP</p>
        </span>
      </div>
    </div>
    </div>
  );
}