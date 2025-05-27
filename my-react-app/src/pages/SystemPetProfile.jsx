import HeaderSystem from "../components/system/HeaderSystem";
import SidebarSystem from "../components/system/SidebarSystem";
import ProfileContent from "../components/contents/ProfileContent";
import PetProfileContent from "../components/contents/PetProfileContent";
import { useParams, Navigate } from "react-router-dom";

function SystemPetProfile() {
    const { petId } = useParams();

    if (!petId) {
        return <Navigate to="/system-pets" replace />;
    }

    return (
        <>
        <HeaderSystem text="Perfil do Pet" />
        <div className="w-full h-screen  flex flex-row">
            <SidebarSystem pets />
            <PetProfileContent petId={petId} />
        </div>
        </>
    )
}

export default SystemPetProfile;