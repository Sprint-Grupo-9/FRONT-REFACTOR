import HeaderSystem from "../components/system/HeaderSystem";
import SidebarSystem from "../components/system/SidebarSystem";
import ServicesContent from "../components/contents/ServicesContent";
import servicesDataDefault from "../utils/servicesDataDefault";


function SystemServices() {
    return (
        <>
        <HeaderSystem text="Serviços" />
        <div className="w-full h-screen flex flex-row">
            <SidebarSystem services />
            <ServicesContent servicesData={servicesDataDefault}/>
        </div>
        </>
        

    )
}

export default SystemServices;