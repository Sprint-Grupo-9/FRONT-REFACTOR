export function CardKpi(props) {

    return (
         <div className="flex flex-col p-4 text-center items-center justify-center w-[19%] h-full bg-white rounded-xl shadow  font-figtree" id="kpi1">
            <p className=" text-[90%]  font-semibold text-gray-500 pt-1 flex-1 ">{props.title}</p>
            <span className="text-[4vh] font-bold text-primary leading-none mt-1 ">{props.description}</span><br />
            <span className="text-[65%] font-bold text-gray-500  flex-1 font-figtree ">{props.date}</span>
        </div>

    )

}

export default CardKpi;