
import Pataservice from '../shared/Pataservice.jsx'
import Cardsite3 from './Cardssite3.jsx';
import Cardsite from './Cardssite.jsx';
import Cardsite2 from './Cardssite2.jsx';
function Servicos() {
  return (
    <div className="z-50 w-full h-[500px] bg-white p-14">

      <div className=" flex flex-col w-12/12 h-[400px]">
      <span className="w-full  flex flex-col justify-center items-center">
        <Pataservice/>
      <h1 className="font-figtree text-navy-blue text-[48px] font-bold">Serviços</h1>
      </span>
      <div className='w-full h-full flex justify-between items-center'>
      <Cardsite/>
      <Cardsite2/>
      <Cardsite3/>

      </div>
      </div>


      </div>
      
   
  );
}

export default Servicos;