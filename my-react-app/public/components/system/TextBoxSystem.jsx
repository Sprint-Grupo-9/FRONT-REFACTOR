import { IMaskInput } from 'react-imask';

function TextBoxSystem(props) {
    const widthClass = props.width || "w-96";
    const { mask, icon, error, loading, ...rest } = props;
    const inputTextClass = props.disabled ? 'text-slate-400' : 'text-navy-blue';

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
                {props.icon && <span className="text-primary">{props.icon}</span>}
                <span className="text-slate-600 font-medium">{props.title}</span>
            </div>
            <div className="relative w-full">
                {props.mask ? (
                    <IMaskInput
                        mask={props.mask}
                        unmask={true}
                        onAccept={(value) => props.onChange({ target: { id: props.id, value } })}
                        className={`bg-white px-4 py-2 rounded-lg border border-slate-200 focus:border-primary focus:outline-none transition-colors ${widthClass} ${props.disabled ? 'bg-slate-100' : ''} ${inputTextClass}`}
                        placeholder={props.hint}
                        disabled={props.disabled}
                        value={props.value}
                    />
                ) : (
                    <input
                        id={props.id}
                        type={props.type || "text"}
                        className={`bg-white px-4 py-2 rounded-lg border border-slate-200 focus:border-primary focus:outline-none transition-colors ${widthClass} ${props.disabled ? 'bg-slate-100' : ''} ${inputTextClass}`}
                        placeholder={props.hint}
                        onChange={props.onChange}
                        disabled={props.disabled}
                        value={props.value}
                    />
                )}
            </div>
            {loading && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 animate-spin">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                </span>
            )}
            {error && <span className="text-xs text-red-500 mt-1 ml-2">{error}</span>}
        </div>
    );
}

export default TextBoxSystem;



{/* <IMaskInput
  mask="(00) 00000-0000"
  placeholder="(11) 91234-5678"
  className="text-[18px] w-80 h-10 bg-white rounded-lg pl-2 border-2 border-slate-200 text-navy-blue"
/> */}