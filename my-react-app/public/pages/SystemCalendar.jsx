import HeaderSystem from "../components/system/HeaderSystem";
import SlidebarSystem from "../components/system/SlidebarSystem";
import CalendarContent from "../components/contents/CalendarContent";

function SystemCalendar() {
    return (
        <>
        <HeaderSystem text="Calendário" />
        <div className="w-full h-screen flex flex-row">
            <SlidebarSystem />
            <CalendarContent />
        </div>
        </>
    )
}

export default SystemCalendar;