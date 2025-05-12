
function ButtonRed(props) {
    return (
        <button className="bg-primary text-white font-bold font-figtree py-1.5 px-6 rounded-lg transition-all duration-900 flex items-center gap-2">
            {props.logo} {props.text}
        </button>
    )

}

export default ButtonRed;