
import { GoAlertFill } from "react-icons/go";
function ErrorBox(props) {

    return (
        <>
        <div className="z-50 flex flex-row items-center gap-4 bg-orange-400 text-white text-bold px-5 py-5 rounded-md absolute text-2xl">
            <GoAlertFill size={50}/>{props.text}
        </div>
        </>
    )

}

export default ErrorBox;