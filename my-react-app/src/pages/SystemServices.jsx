import HeaderSystem from "../components/system/HeaderSystem";
import SidebarSystem from "../components/system/SidebarSystem";

function SystemServices() {
    return (
        <div className="min-h-screen bg-slate-100">
            <HeaderSystem text="Serviços"/>
            <SidebarSystem services/>
        </div>


    )
}

export default SystemServices;