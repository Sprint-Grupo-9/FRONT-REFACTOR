import HeaderSystem from "../components/system/HeaderSystem";
import SidebarSystem from "../components/system/SidebarSystem";
import CalendarContent from "../components/contents/CalendarContent";


function SystemCalendar() {
    return (
        <>
        <HeaderSystem text="Serviços" />
        <div className="w-full h-screen flex flex-row">
            <SidebarSystem services />
            <CalendarContent/>
        </div>
        </>
        

    )
}

export default SystemCalendar;