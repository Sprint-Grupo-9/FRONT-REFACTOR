import { IMaskInput } from 'react-imask';
import { ImBlocked } from "react-icons/im";

function TextBoxSystem(props) {
    const widthClass = props.width || "w-96"
    const hasLogo = props.logo ? <ImBlocked /> : ""
    const hasBlock = props.block ? "text-slate-300" : "text-navy-blue"
    const { mask, icon, error, loading, ...rest } = props;

    return (
        <>
            <div className="flex flex-col">
                <span className="text-slate-400 pb-2 pl-2 text-[14px]">{props.title}</span>
                <div className="relative">
                    {icon && (
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary text-xl">
                            {icon}
                        </span>
                    )}
                    {mask ? (
                        <IMaskInput
                            {...rest}
                            mask={mask}
                            placeholder={props.hint}
                            defaultValue={props.value}
                            className={`text-[18px] ${widthClass} h-10 bg-white rounded-lg ${icon ? 'pl-10' : 'pl-2'} pr-2 shadow-sm ${hasBlock} ${error ? 'border border-red-500' : 'border border-gray-300'} focus:outline-none focus:border-primary`}
                        />
                    ) : (
                        <input
                            {...rest}
                            placeholder={props.hint}
                            defaultValue={props.value}
                            className={`text-[18px] ${widthClass} h-10 bg-white rounded-lg ${icon ? 'pl-10' : 'pl-2'} pr-2 shadow-sm ${hasBlock} ${error ? 'border border-red-500' : 'border border-gray-300'} focus:outline-none focus:border-primary`}
                        />
                    )}
                    {loading && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 animate-spin">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                        </span>
                    )}
                </div>
                {error && <span className="text-xs text-red-500 mt-1 ml-2">{error}</span>}
                <span className="text-slate-300 absolute mt-10 ml-[22rem] flex">{hasLogo}</span>
            </div>
        </>
    )
}

export default TextBoxSystem



{/* <IMaskInput
  mask="(00) 00000-0000"
  placeholder="(11) 91234-5678"
  className="text-[18px] w-80 h-10 bg-white rounded-lg pl-2 border-2 border-slate-200 text-navy-blue"
/> */}