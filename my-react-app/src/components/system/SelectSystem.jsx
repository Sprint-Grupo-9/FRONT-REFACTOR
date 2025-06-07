function SelectSystem(props) {
    const handleChange = (event) => {
        const selectedValue = event.target.value;
        console.log('Valor selecionado:', selectedValue);
        console.log('Opções disponíveis:', props.options);
        
        if (selectedValue === "") {
            props.onChange && props.onChange(null);
            return;
        }

        const selectedOption = props.options.find(option => String(option.value) === String(selectedValue));
        console.log('Opção encontrada:', selectedOption);
        
        if (selectedOption) {
            props.onChange && props.onChange(selectedOption);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
                {props.icon && <span className="text-primary">{props.icon}</span>}
                <span className="text-slate-600 font-medium">{props.title}</span>
            </div>
            <select 
                className="bg-white px-4 py-2 rounded-lg border border-slate-200 focus:border-primary focus:outline-none transition-colors"
                onChange={handleChange}
                value={props.value || ""}
                disabled={props.disabled}
            >
                <option value="">Selecione...</option>
                {props.options?.map((option, index) => (
                    <option key={index} value={String(option.value)}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default SelectSystem;