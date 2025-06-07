import HeaderSystem from "../components/system/HeaderSystem";
import SlidebarSystem from "../components/system/SlidebarSystem";
import ProfileContent from "../components/contents/ProfileContent";

function SystemProfile() {
    return (
        <>
        <HeaderSystem text="Meu Perfil" />
        <div className="w-full h-screen  flex flex-row">
            <SlidebarSystem />
            <ProfileContent />
        </div>
        </>
    )
}

export default SystemProfile;