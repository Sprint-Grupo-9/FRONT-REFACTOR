
function SelectSystem(props) {

    return (
        <div className="flex gap-4">
        <span className="text-slate-400">{props.title}</span>
        <select className="bg-white px-4 py-2 rounded-lg">
            {props.options?.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
        </div>
    )

}

export default SelectSystem;