function ButtonBlue(props) {

    return (
        <button onClick={props.click} className="bg-secondary text-white font-bold py-2 px-6 rounded-lg transition-all duration-900 hover:bg-slate-300 hover:text-white flex items-center gap-2">
            {props.logo} {props.text}
        </button>
    )

}

export default ButtonBlue;