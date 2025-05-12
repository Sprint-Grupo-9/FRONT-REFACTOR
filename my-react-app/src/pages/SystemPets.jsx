import HeaderSystem from "../components/system/HeaderSystem";
import SidebarSystem from "../components/system/SidebarSystem";

function SystemPets() {
    return (
        <div className="min-h-screen bg-slate-100">
            <HeaderSystem text="Pets"/>
            <SidebarSystem pets/>
        </div>
    )
}

export default SystemPets;