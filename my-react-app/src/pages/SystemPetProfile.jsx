import HeaderSystem from "../components/system/HeaderSystem";
import SidebarSystem from "../components/system/SidebarSystem";
import ProfileContent from "../components/contents/ProfileContent";
import PetProfileContent from "../components/contents/PetProfileContent";

function SystemPetProfile() {
    return (
        <>
        <HeaderSystem text="Perfil do Pet" />
        <div className="w-full h-screen  flex flex-row">
            <SidebarSystem pets />
            <PetProfileContent />
        </div>
        </>
    )
}

export default SystemPetProfile;