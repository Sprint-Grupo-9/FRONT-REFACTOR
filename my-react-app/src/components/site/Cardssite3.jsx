
import LogoVeterinario from "../shared/LogoVeterinario";

function Cardsite(){
    return(
         
      <div className='w-80 h-40 rounded-2xl bg-card-grey flex float-start items-center p-4'>
      
      <div className='w-[104px] h-[104px] rounded-md bg-white flex items-center justify-center'>
        <div className='w-[90px] h-[90px] bg-[#40CD9C] rounded-md flex items-center justify-center'>
          <LogoVeterinario/>
        </div>
      </div>
        <div className='w-2/3 h-full flex flex-col justify-center items-start pl-4'>
            <h1 className='text-navy-blue font-poppins text-[24px] font-bold'>Veterinário</h1> 
            <button className='bg-secondary text-white font-bold font-figtree py-2 px-6 rounded-lg transition-all duration-900 hover:bg-white hover:text-primary'>Agendar</button>
       </div>
      </div>
    )
}

export default Cardsite;