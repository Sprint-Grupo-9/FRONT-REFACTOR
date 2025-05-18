export function CardAppointment(props) {
    return (
        <div>
            <div className="bg-primary text-white text-center py-2 rounded-t-xl font-bold text-sm">
                <p>{props.horarioInicio} - {props.horarioFim}</p>
            </div>
            <div className="p-5 text-[90%] text-left  h-[16vh] font-normal text-gray-700 space-y-2">
                <p><strong>Cliente:</strong> {props.cliente} <strong>Pet:</strong> {props.pet}</p> 
                <p><strong>Procedimento:</strong> {props.procedimento}</p>
                <p><strong>Valor:</strong> {props.valor}</p>
            </div>
        </div>


    )
}
