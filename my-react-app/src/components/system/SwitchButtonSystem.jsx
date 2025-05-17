import { useState } from "react";

function SwitchButtonSystem(props) {

    return (
        <>
        <div onClick={props.click} className={`${props.active ? "bg-secondary" : "bg-slate-200"} w-16 h-full flex flex-row ${props.active ? "justify-end" : ""} rounded-full p-2`}>
            <div className="bg-white flex rounded-full w-1/3 h-4"></div>
        </div>
        </>
        
    )

}

export default SwitchButtonSystem;