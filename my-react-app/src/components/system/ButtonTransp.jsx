
function ButtonTransp(props) {
    return (
        <button onClick={props.click} className="border-2 border-white text-white font-bold font-figtree py-1.5 px-6 rounded-lg transition-all duration-900 hover:bg-white hover:text-primary flex items-center gap-2">
            {props.logo} {props.text}
        </button>
    )

}

export default ButtonTransp;