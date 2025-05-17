import { IMaskInput } from 'react-imask';

function TextBox(props) {
    const widthClass = props.width || "w-80"
    const { mask, ...rest } = props;

    return (
        <>
            <div className="flex flex-col">
                <span className="text-navy-blue pb-2 pl-2 text-[14px]">{props.title}</span>

                {mask ? (
                    <IMaskInput
                        {...rest}
                        mask={mask}
                        placeholder={props.hint}
                        defaultValue={props.value}
                        className={`text-[18px] ${widthClass} h-10 bg-white rounded-lg pl-2 border-2 border-slate-200 text-navy-blue`}
                        
                    />
                ) : (<input
                    {...rest}
                    placeholder={props.hint}
                    defaultValue={props.value}
                    className={`text-[18px] ${widthClass} h-10 bg-white rounded-lg pl-2 border-2 border-slate-200 text-navy-blue`}/>)
                }
            </div>
        </>
    )
}

export default TextBox



{/* <IMaskInput
  mask="(00) 00000-0000"
  placeholder="(11) 91234-5678"
  className="text-[18px] w-80 h-10 bg-white rounded-lg pl-2 border-2 border-slate-200 text-navy-blue"
/> */}