import { CgClose } from "react-icons/cg";

function ServiceIndividualTabSystem(props) {

    return (

        <button className={`bg-white text-[${props.sizeText}] text-primary font-bold px-6 py-1.5 rounded-lg flex flex-row items-center gap-4 shadow-sm`} onClick={props.click}>
            <CgClose className="size-4" />{props.title} 
        </button> 

    )

}

export default ServiceIndividualTabSystem;