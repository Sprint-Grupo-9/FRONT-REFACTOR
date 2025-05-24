import { IMaskInput } from 'react-imask';
import { ImBlocked } from "react-icons/im";

function TextBoxSystem(props) {
    const widthClass = props.width || "w-96"
    const hasLogo = props.logo ? <ImBlocked/> : ""
    const hasBlock = props.block ? "text-slate-300" : "text-navy-blue"
    const { mask, ...rest } = props;

    return (
        <>
            <div className="flex flex-col">
                <span className="text-slate-400 pb-1 pl-2 text-[1rem]">{props.title}</span>
                {mask ? (
                    <IMaskInput
                        {...rest}
                        mask={mask}
                        placeholder={props.hint}
                        defaultValue={props.value}
                        className={`text-[18px] ${widthClass} h-10 bg-white rounded-lg pl-2 shadow-sm ${hasBlock}`}
                        
                    />
                ) : (<input
                    {...rest}
                    placeholder={props.hint}
                    defaultValue={props.value}
                    className={`text-[18px] ${widthClass} h-10 bg-white rounded-lg pl-2 shadow-sm ${hasBlock}`}/>)
                }
                <span className="text-slate-300 absolute mt-10 ml-[22rem] flex">{hasLogo}</span>
                
            </div>
            
        </>
    )
}

export default TextBoxSystem
