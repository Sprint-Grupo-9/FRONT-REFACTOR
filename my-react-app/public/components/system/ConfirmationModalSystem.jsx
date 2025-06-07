import { GoAlertFill } from "react-icons/go";
import ButtonSystem from "./ButtonSystem";
function ConfirmationModalSystem(props) {

    return (
        <>
        <div className="z-50 flex flex-col min-w-[30rem] items-center gap-8 mt-32 bg-white text-primary text-bold px-5 py-5 rounded-md absolute text-2xl">
            <GoAlertFill size={50}/>{props.text}
            <div className="flex justify-center gap-4">
                <ButtonSystem click={props.onCancel} text="Cancelar" variant="redTransp"/>
                <ButtonSystem click={props.onConfirm} text="Sair" variant="blue"/>
            </div>
            
        </div>
        </>
    )

}

export default ConfirmationModalSystem;