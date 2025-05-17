import SwitchButtonSystem from "./SwitchButtonSystem";

function SubServiceSystem(props) {

    return (
        <div className="bg-white py-4 px-4 flex flex-row items-center gap-6 text-[16px] rounded-lg w-30">
            {props.title}
            <div className="flex-1 flex justify-end">
                <SwitchButtonSystem active={props.active} />
            </div>
        </div>
    )

}

export default SubServiceSystem;