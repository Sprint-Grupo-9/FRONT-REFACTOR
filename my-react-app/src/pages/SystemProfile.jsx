import HeaderSystem from "../components/system/HeaderSystem";
import SidebarSystem from "../components/system/SidebarSystem";

function SystemProfile() {
    return (
        <div className="min-h-screen bg-slate-100">
            <HeaderSystem text="Perfil"/>
            <SidebarSystem profile/>
        </div>


    )
}

export default SystemProfile;