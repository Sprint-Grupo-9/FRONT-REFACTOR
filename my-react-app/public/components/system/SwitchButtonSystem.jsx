
function SwitchButtonSystem(props) {

    return (
        <>
        <div 
        onClick={props.click} 
        className={`${props.active ? "bg-secondary" : "bg-slate-200"} w-16 h-full flex flex-row rounded-full p-2 duration-200 ease-in-out `}>
            <div className={`bg-white flex rounded-full w-1/3 h-4 ${props.active ? "transform translate-x-8 duration-200 ease-in-out " : "duration-200 ease-in-out "}`}></div>
        </div>
        </>
        
    )

}

export default SwitchButtonSystem;