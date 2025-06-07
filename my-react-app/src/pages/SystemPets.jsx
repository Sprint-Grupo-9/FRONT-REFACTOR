import HeaderSystem from "../components/system/HeaderSystem";
import SlidebarSystem from "../components/system/SlidebarSystem";
import PetsContent from "../components/contents/PetsContent";
import { useEffect, useState } from "react";
import { getAllPetsByOwnerId } from "../services/api";
import ErrorBox from "../components/system/ErrorBox";


function SystemPets() {
    const [pets, setPets] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const ownerId = localStorage.getItem("id");

    useEffect(() => {
        if (!ownerId || ownerId === "undefined" || ownerId === "null") {
            setErrorMessage("ID do proprietário não encontrado");
            return;
        }
        
        const fetchPets = async () => {
            try {
                const response = await getAllPetsByOwnerId(ownerId);
                if (response && response.data) {
                    setPets(response.data);
                }
            } catch (err) {
                console.error('Erro ao buscar pets:', err);
                setErrorMessage("Erro ao carregar os pets");
            }
        };

        fetchPets();
    }, [ownerId]);

    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage("");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errorMessage]);

    return (
        <>
            <HeaderSystem text="Pets" />
            <div className="w-full h-screen flex flex-row">
                <SlidebarSystem />
                {errorMessage && <ErrorBox text={errorMessage} />}
                <PetsContent pets={pets} setPets={setPets} />
            </div>
        </>
    );
}

export default SystemPets;