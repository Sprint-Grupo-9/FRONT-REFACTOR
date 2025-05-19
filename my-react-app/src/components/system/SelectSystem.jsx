
function SelectSystem(props) {

    return (
        <div className="flex gap-4">
        <span className="text-slate-400">{props.title}</span>
        <select className="bg-white px-4 py-2 rounded-lg">
            <option value="1">Valor 1</option>
        </select>
        </div>
    )

}

export default SelectSystem;