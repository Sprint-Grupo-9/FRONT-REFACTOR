import HeaderSystem from "../components/system/HeaderSystem";
import SidebarSystem from "../components/system/SidebarSystem";

function SystemAppointments() {
    return (
        <div className="min-h-screen bg-slate-100">
            <HeaderSystem text="Agendamentos"/>
            <SidebarSystem appointments/>
        </div>

    )
}

export default SystemAppointments;