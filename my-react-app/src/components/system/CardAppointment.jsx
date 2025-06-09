import { MdOutlineExpand } from "react-icons/md";

export function CardAppointment(props) {
    return (
        <div className="flex h[100%] w-[40vh] bg-white rounded-xl shadow-lg flex-col">	
            <div className="bg-primary text-white text-center py-2 rounded-t-xl font-bold text-sm ">
                <p>{props.horarioInicio} - {props.horarioFim}</p>
            </div>
            <div className="p-5 text-[90%] text-left   font-normal text-gray-700 space-y-2">
                <p><strong>Cliente:</strong> {props.cliente} <strong>Pet:</strong> {props.pet}</p> 
                <p><strong>Procedimento:</strong> {props.procedimento}</p>
                <p><strong>Valor:</strong> {props.valor}</p>
                <p><strong>Taxi Dog:</strong> {props.taxiService}</p>
            </div>
             <div className="flex items-center justify-end px-4 pb-2 mt-auto text-gray-500 text-xs gap-1">
                <span>Clique para expandir</span>
                <MdOutlineExpand className="text-lg" />
            </div>
        </div>


    );
}


export default CardAppointment;