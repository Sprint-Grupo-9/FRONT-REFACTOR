import { useLocation, useNavigate } from "react-router-dom";
import AppointmentCardSystem from "../system/AppointmentCardSystem"
import ButtonSystem from "../system/ButtonSystem"
import { CgClose } from "react-icons/cg";
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { getOwnerInformation } from "../../services/api";


function AppointmentsContent() {

    const location = useLocation();
    const navigate = useNavigate();
    const newAppointment = location.state ?? null;
    const [petId, setPetId] = useState(null);
    const [userData, setUserData] = useState({});

    const addNewAppointment = () => {
        navigate("/system-services");
    }

    useEffect(() => {
        const id = localStorage.getItem("id");
        if (id) {
            getOwnerInformation(id)
                .then(res => {
                    setUserData({
                        nome: res.data.name || '',
                        cpf: res.data.cpf || '',
                        email: res.data.email || '',
                        telefone: res.data.phoneNumber || '',
                        cep: res.data.cep || '',
                        numero: res.data.number || '',
                        complemento: res.data.complement || '',
                        logradouro: res.data.street || '',
                        bairro: res.data.neighborhood || ''
                    });
                })
                .catch(err => {
                    console.error('Erro ao buscar dados do usuário:', err);
                });
        }
    }, []);


    return (

        <div className="flex-1 h-full bg-slate-100 flex justify-center items-center">
            <div className="flex justify-start w-11/12 h-4/5 mt-20 gap-6 flex-col relative">
                <AppointmentCardSystem
                    key={""}
                    title={"Banho + Tosa"}
                    subtitle={"Pet não definido"}
                    variant="redTransp"
                    logo={<CgClose />}
                    date={new Date().toLocaleDateString('pt-BR')}
                    time={"Horário não definido"}
                    employee={"Funcionário não definido"}
                    price="R$ 0.00"
                    clickButton={""}
                />

                <ButtonSystem
                    logo={<FaPlus />}
                    variant="blue"
                    text="Adicionar Agendamento"
                    click={addNewAppointment}
                />
            </div>
        </div>
    )
}

export default AppointmentsContent