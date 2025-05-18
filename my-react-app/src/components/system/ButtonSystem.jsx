
function ButtonSystem(props) {

    const baseStyles = "font-bold text-[20px] py-1.5 px-6 rounded-lg transition-all duration-900 flex items-center gap-2";

    const variants = {
        white: "bg-white text-navy-blue hover:bg-slate-300 hover:text-white",
        blue: "bg-secondary text-white hover:bg-slate-300",
        red: "bg-primary text-white",
        transp: "border-2 border-white text-white hover:bg-white hover:text-primary",
        orange: "bg-orange-400 text-white hover:bg-slate-300",
        redTransp: "border-2 border-primary text-primary hover:bg-primary hover:text-white"
    };

    const variantClass = variants[props.variant || "white"];

    return (
        <button onClick={props.click} className={`${baseStyles} ${variantClass}`}>
            {props.logo} {props.text}
        </button>
    )

}

export default ButtonSystem;