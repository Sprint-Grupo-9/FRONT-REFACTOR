import HeaderSystem from "../components/system/HeaderSystem";
import SidebarSystem from "../components/system/SidebarSystem";
import ServicesContent from "../components/contents/ServicesContent";

function SystemServices() {
    return (
        <>
        <HeaderSystem text="Serviços" />
        <div className="w-full h-screen flex flex-row">
            <SidebarSystem services />
            <ServicesContent/>
        </div>
        </>
        

    )
}

export default SystemServices;