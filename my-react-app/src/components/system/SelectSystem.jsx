
function SelectSystem(props) {

    const handleChange = (event) => {
        const selectedValue = event.target.value;
        const selectedOption = options.find(option => option.value === selectedValue);
        onChange && onChange(selectedOption)
    };

    return (
        <div className="flex gap-4">
        <span className="text-slate-400">{props.title}</span>
        <select className="bg-white px-4 py-2 rounded-lg" onChange={handleChange}>
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