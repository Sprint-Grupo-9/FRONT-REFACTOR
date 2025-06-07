import SwitchButtonSystem from "./SwitchButtonSystem";

function SubServiceSystem(props) {

    return (
        <div className="bg-white py-3 px-3 flex flex-row items-center gap-4 text-[0.8rem] rounded-lg w-30 shadow-sm">
            {props.title}
            <div className="flex-1 flex justify-end">
                <SwitchButtonSystem active={props.active} click={props.click} />
            </div>
        </div>
    )

}

export default SubServiceSystem;