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
                <span className="text-slate-400 pb-2 pl-2 text-[14px]">{props.title}</span>

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



{/* <IMaskInput
  mask="(00) 00000-0000"
  placeholder="(11) 91234-5678"
  className="text-[18px] w-80 h-10 bg-white rounded-lg pl-2 border-2 border-slate-200 text-navy-blue"
/> */}