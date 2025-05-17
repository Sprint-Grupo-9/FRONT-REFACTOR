function TextBox(props) {
    const widthClass = props.width || "w-80"

    return (
        <>
        <div className="flex flex-col">
            <span className="text-navy-blue pb-2 pl-2 text-[14px]">{props.title}</span>
            <input 
            {... props}
            placeholder={props.hint} 
            className={`text-[18px] ${widthClass} h-10 bg-white rounded-lg pl-2 border-2 border-slate-200 text-navy-blue`} />
        </div>
        </>
    )
}

export default TextBox