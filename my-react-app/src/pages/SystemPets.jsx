import HeaderSystem from "../components/system/HeaderSystem";
import SidebarSystem from "../components/system/SidebarSystem";
import PetsContent from "../components/contents/PetsContent";
import { use, useEffect, useState } from "react";

function SystemPets() {

    const [pets, setPets] = useState([]);
    const ownerId = localStorage.getItem("userId");

    useEffect(() => {
        if (!ownerId) return;
        fetch (`http://localhost:8080/pets/all/${ownerId}`)
            .then((res => res.json()))
            .then(data => setPets(data))
            .catch(err => console.error('Erro ao buscar dados do usuário:', err));
    }, [ownerId]);

    return (
        <>
        <HeaderSystem text="Pets" />
        <div className="w-full h-screen flex flex-row">
            <SidebarSystem pets />
            <PetsContent pets={pets} />
        </div>
        </>
    )
}

export default SystemPets;