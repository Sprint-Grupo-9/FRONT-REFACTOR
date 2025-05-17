import HeaderSystem from "../components/system/HeaderSystem";
import SidebarSystem from "../components/system/SidebarSystem";
import PetsContent from "../components/contents/PetsContent";

function SystemPets() {
    return (
        <>
        <HeaderSystem text="Pets" />
        <div className="w-full h-screen flex flex-row">
            <SidebarSystem pets />
            <PetsContent />
        </div>
        </>
    )
}

export default SystemPets;