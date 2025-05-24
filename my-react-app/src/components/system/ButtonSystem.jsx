
function ButtonSystem(props) {

    const baseStyles = `font-bold text-[1rem] py-1.5 px-6 rounded-lg transition-all duration-900 flex items-center gap-2 hover:bg-slate-300 hover:text-white shadow-sm`;

    const variants = {
        white: "bg-white text-navy-blue",
        blue: "bg-secondary text-white",
        red: "bg-primary text-white",
        transp: "border-2 border-white text-white hover:border-slate-300",
        orange: "bg-orange-400 text-white",
        redTransp: "border-2 border-primary text-primary hover:border-slate-300",
        test: "bg-purple-400 text-white"
    };

    const variantClass = variants[props.variant || "white"];

    const alignClass = props.align ? "" : "justify-center";

    return (
        <button onClick={props.click} className={`${baseStyles} ${variantClass} ${alignClass}`}>
            {props.logo} {props.text}
        </button>
    )

}

export default ButtonSystem;