export function CardKpi(props) {

    return (
        <div className="flex flex-col items-center justify-center w-64 h-20 bg-white rounded-xl shadow" id="kpi1">
            <p className="text-sm text-gray-500">{props.title} – (01/01/2025) - (31/01/2025)</p>
            <span className="text-[28px] font-bold text-primary">{props.description}</span>
        </div>

    )

}