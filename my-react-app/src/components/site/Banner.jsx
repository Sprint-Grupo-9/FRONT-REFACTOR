
function Banner (){
    return(
        <div className="w-full h-[725px] bg-banner-pattern bg-[center_14%]">
            <div className="p-36  w-full h-full flex justify-start">
                <div className=" p-10 w-[400px] h-full">
                <span className="flex flex-col" >  
                <h3 className="font-figtree text-navy-blue text-[65px] font-normal ">Tudo para</h3>
                <h2 className="font-figtree text-primary text-[65px] font-extrabold ">Seu pet</h2>
                <p className=" text-[20px] text-navy-blue">Proporcione um cuidado especial para seu melhor amigo.</p>
                <button className="mt-16 bg-secondary text-white font-bold font-figtree py-2 px-4 rounded-lg transition-all duration-900 hover:bg-white hover:text-primary"> Agendar Serviços</button>
                </span> 

                </div>

            </div>
        </div>
    );
}

export default Banner;