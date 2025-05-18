import { CgClose } from "react-icons/cg";

function ServiceIndividualTabSystem(props) {

    return (

        <button className="bg-white text-primary font-bold px-6 py-1.5 rounded-lg flex flex-row items-center gap-4" onClick={props.click}>
            <CgClose className="size-4" />{props.title} 
        </button> 

    )

}

export default ServiceIndividualTabSystem;