export function CardKpi(props) {

    return (
         <div className="flex flex-col items-center justify-center w-[19%] h-full bg-white rounded-xl shadow" id="kpi1">
            <p className=" text-[65%] text-gray-500 flex-1">{props.title}</p>
            <span className="text-[2vw] font-bold text-primary leading-none mt-1 flex-1 ">{props.description}</span>
            <span className="text-[65%] font-bold text-primary flex-1 ">Procedimento / Total de agendamentos do mês</span>
        </div>

    )

}

export default CardKpi;