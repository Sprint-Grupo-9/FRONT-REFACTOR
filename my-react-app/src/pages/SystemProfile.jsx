import HeaderSystem from "../components/system/HeaderSystem";
import SidebarSystem from "../components/system/SidebarSystem";
import ProfileContent from "../components/contents/ProfileContent";

function SystemProfile() {
    return (
        <>
        <HeaderSystem text="Perfil" />
        <div className="w-full h-screen  flex flex-row">
            <SidebarSystem profile />
            <ProfileContent />
        </div>
        </>
    )
}

export default SystemProfile;