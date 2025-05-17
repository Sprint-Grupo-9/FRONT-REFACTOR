import { IoPerson } from "react-icons/io5";
import { BsCalendar2WeekFill } from "react-icons/bs";
import { MdMiscellaneousServices } from "react-icons/md";
import { MdOutlinePets } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import ButtonSystem from "./ButtonSystem";
import userImage from "../../assets/user-image.svg"

function SidebarSystem({
    profile = false,
    services = false,
    appointments = false,
    pets = false,
    username = "Matheus"
}) {

    const navigate = useNavigate();

    const goToProfile = () => navigate("/system-profile");

    const goToServices = () => navigate("/system-services");

    const goToAppoints = () => navigate("/system-appointments");

    const goToPets = () => navigate("/system-pets");

    const colorProfile = profile ? "red" : "white";
    const colorServices = services ? "red" : "white";
    const colorAppoints = appointments ? "red" : "white";
    const colorPets = pets ? "red" : "white";

    return (
        <div className="h-[100%] bg-slate-200 flex items-center p-12">
            <div className="h-full flex flex-col justify-center gap-10 text-[18px] text-white">
                <div className="flex flex-row items-center gap-6 pb-12">
                    <img src={userImage} alt="Logo Pet Columbia" width={50} />
                    <span className="font-bold text-navy-blue text-[20px]">{username}</span>
                </div>
                <ButtonSystem variant={colorProfile} text="Perfil" logo={<IoPerson />} click={goToProfile} />
                <ButtonSystem variant={colorServices} text="Serviços" logo={<MdMiscellaneousServices />} click={goToServices} />
                <ButtonSystem variant={colorAppoints} text="Agendamentos" logo={<BsCalendar2WeekFill />} click={goToAppoints} />
                <ButtonSystem variant={colorPets} text="Pets" logo={<MdOutlinePets />} click={goToPets} />
            </div>
        </div>
    )
}

export default SidebarSystem;