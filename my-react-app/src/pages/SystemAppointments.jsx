import HeaderSystem from "../components/system/HeaderSystem";
import SidebarSystem from "../components/system/SidebarSystem";
import AppointmentsContent from "../components/contents/AppointmentsContent";

function SystemAppointments() {
    return (
        <>
        <HeaderSystem text="Agendamentos" />
        <div className="w-full h-screen flex flex-row">
            <SidebarSystem appointments/>
            <AppointmentsContent />
        </div>
        </>

    )
}

export default SystemAppointments;