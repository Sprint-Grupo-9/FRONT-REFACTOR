import { useLocation, useNavigate } from "react-router-dom";
import AppointmentCardSystem from "../system/AppointmentCardSystem"
import ButtonSystem from "../system/ButtonSystem"
import { CgClose } from "react-icons/cg";
import { useEffect, useState } from "react";
import { getOwnerInformation, getAppointmentsByOwner, deleteAppointment } from "../../services/api";
import ErrorBox from "../system/ErrorBox";
import ConfirmationModalSystem from "../system/ConfirmationModalSystem";

function AppointmentsContent() {
    const location = useLocation();
    const navigate = useNavigate();
    const newAppointment = location.state ?? null;
    const [appointments, setAppointments] = useState([]);
    const [userData, setUserData] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [appointmentToDelete, setAppointmentToDelete] = useState(null);

    const handleDeleteAppointment = async (appointmentId) => {
        try {
            await deleteAppointment(appointmentId);
            setAppointments(appointments.filter(app => app.id !== appointmentId));
            setErrorMessage("");
        } catch (err) {
            console.error('Erro ao remover agendamento:', err);
            setErrorMessage("Erro ao remover agendamento");
        }
    };

    useEffect(() => {
        const id = localStorage.getItem("id");
        if (id) {
            // Buscar dados do usuário
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

            // Buscar agendamentos do usuário
            getAppointmentsByOwner(id)
                .then(res => {
                    if (res.data) {
                        setAppointments(res.data);
                    }
                })
                .catch(err => {
                    console.error('Erro ao buscar agendamentos:', err);
                });
        }
    }, []);

    // Limpar mensagens de erro
    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => setErrorMessage(""), 3000);
            return () => clearTimeout(timer);
        }
    }, [errorMessage]);

    return (
        <div className="flex-1 bg-slate-100 p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">Meus Agendamentos</h1>
                <ButtonSystem
                    variant="blue"
                    text="Novo Agendamento"
                    click={() => navigate('/system-appointments/new')}
                />
            </div>
            <div className="flex justify-start w-11/12 h-4/5 mt-20 gap-6 flex-col relative">
                {errorMessage && <ErrorBox text={errorMessage} />}

                {appointments.length === 0 ? (
                    <div className="text-center text-gray-600 text-lg">
                        Nenhum agendamento encontrado
                    </div>
                ) : (
                    appointments.map((appointment) => (
                        <AppointmentCardSystem
                            key={appointment.id}
                            title={appointment.servicesNames}
                            subtitle={appointment.pet?.name || "Pet não definido"}
                            variant="redTransp"
                            logo={<CgClose />}
                            date={new Date(appointment.startDateTime).toLocaleDateString('pt-BR')}
                            time={appointment.startDateTime.split('T')[1].slice(0, 5)}
                            employee={appointment.employee?.name || "Funcionário não definido"}
                            price={`R$ ${appointment.totalPrice.toFixed(2)}`}
                            clickButton={() => {
                                setAppointmentToDelete(appointment);
                                setShowConfirmModal(true);
                            }}
                            taxiService={appointment.taxiService}
                            observations={appointment.observations}
                        />
                    ))
                )}

                {showConfirmModal && (
                    <ConfirmationModalSystem
                        text="Deseja realmente remover este agendamento?"
                        onCancel={() => {
                            setShowConfirmModal(false);
                            setAppointmentToDelete(null);
                        }}
                        onConfirm={() => {
                            handleDeleteAppointment(appointmentToDelete.id);
                            setShowConfirmModal(false);
                            setAppointmentToDelete(null);
                        }}
                    />
                )}
            </div>
        </div>
    )
}

export default AppointmentsContent