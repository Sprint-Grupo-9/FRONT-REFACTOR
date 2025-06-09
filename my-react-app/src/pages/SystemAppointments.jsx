import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdPets, MdAdd, MdDelete, MdWarning } from "react-icons/md";
import ButtonSystem from '../components/system/ButtonSystem';
import SlidebarSystem from '../components/system/SlidebarSystem';
import { getAppointmentsByOwner, deleteAppointment } from '../services/api';
import { toast } from 'react-hot-toast';
import LoadingSystem from '../components/system/LoadingSystem';
import HeaderSystem from "../components/system/HeaderSystem";
import ErrorBox from "../components/system/ErrorBox";
import AppointmentCardSystem from "../components/system/AppointmentCardSystem";
import { FaTrash } from "react-icons/fa";

function SystemAppointments() {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [appointmentToDelete, setAppointmentToDelete] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const ownerId = localStorage.getItem("id");

    const fetchAppointments = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await getAppointmentsByOwner();
            console.log('Resposta da API:', response);
            if (response) {
                setAppointments(response);
            }
        } catch (error) {
            console.error('Erro ao buscar agendamentos:', error);
            setErrorMessage("Erro ao carregar os agendamentos");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!ownerId || ownerId === "undefined" || ownerId === "null") {
            setErrorMessage("ID do proprietário não encontrado");
            return;
        }
        fetchAppointments();
    }, [ownerId, fetchAppointments]);

    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage("");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errorMessage]);

    const handleDeleteClick = (appointment) => {
        setAppointmentToDelete(appointment);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await deleteAppointment(appointmentToDelete.id);
            toast.success('Agendamento excluído com sucesso!');
            setAppointments(prevAppointments => 
                prevAppointments.filter(appointment => appointment.id !== appointmentToDelete.id)
            );
        } catch (error) {
            console.error('Erro ao excluir agendamento:', error);
            toast.error('Erro ao excluir agendamento');
        } finally {
            setShowDeleteModal(false);
            setAppointmentToDelete(null);
        }
    };

    const handleDeleteCancel = () => {
        setShowDeleteModal(false);
        setAppointmentToDelete(null);
    };

    const formatDateTime = (dateTimeStr) => {
        if (!dateTimeStr) return 'Data não definida';
        
        try {
            const date = new Date(dateTimeStr);
            if (isNaN(date.getTime())) return 'Data inválida';
            
            return date.toLocaleString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            console.error('Erro ao formatar data:', error);
            return 'Data inválida';
        }
    };

    const calculateDuration = (startDateTime, endDateTime) => {
        if (!startDateTime || !endDateTime) return 0;
        
        try {
            const start = new Date(startDateTime);
            const end = new Date(endDateTime);
            if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;
            
            const diffInMinutes = Math.round((end - start) / (1000 * 60));
            return diffInMinutes;
        } catch (error) {
            console.error('Erro ao calcular duração:', error);
            return 0;
        }
    };

    if (isLoading) {
        return <LoadingSystem />;
    }

    return (
        <>
            <HeaderSystem text="Agendamentos" />
            <div className="w-full h-screen flex flex-row">
                <SlidebarSystem />
                <div className="flex-1 h-full bg-slate-100 flex justify-center items-center">
                    {errorMessage && <ErrorBox text={errorMessage} />}
                    
                    <div className="flex justify-start w-11/12 h-4/5 mt-20 gap-6 flex-col relative">
                        {appointments && appointments.length > 0 ? (
                            <>
                                {appointments.map(appointment => (
                                    <AppointmentCardSystem
                                        key={appointment.id}
                                        title={appointment.services}
                                        subtitle={`Pet: ${appointment.pet.name}`}
                                        price={`R$ ${appointment.totalPrice.toFixed(2)}`}
                                        date={new Date(appointment.startDateTime).toLocaleDateString('pt-BR')}
                                        time={new Date(appointment.startDateTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                        employee={appointment.employee.name}
                                        variant="redTransp"
                                        logo={<FaTrash className="text-red-500" />}
                                        clickButton={() => handleDeleteClick(appointment)}
                                        taxiService={appointment.taxiService}
                                        observations={appointment.observations}
                                    />
                                ))}
                                <ButtonSystem
                                    variant="blue"
                                    text="Novo Agendamento"
                                    click={() => navigate('/system-appointments/new')}
                                    logo={<MdAdd />}
                                />
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center gap-6 text-center">
                                <h2 className="text-2xl font-semibold text-slate-800">
                                    Nenhum agendamento encontrado
                                </h2>
                                <p className="text-slate-600 max-w-md">
                                    Você ainda não possui nenhum agendamento. Clique no botão abaixo para agendar um serviço para seu pet.
                                </p>
                                <ButtonSystem
                                    variant="blue"
                                    text="Novo Agendamento"
                                    click={() => navigate('/system-appointments/new')}
                                    logo={<MdAdd />}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal de Confirmação */}
            {showDeleteModal && appointmentToDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <div className="flex items-center gap-3 mb-4">
                            <MdWarning className="text-yellow-500 text-3xl" />
                            <h3 className="text-xl font-semibold text-gray-800">Confirmar Exclusão</h3>
                        </div>
                        <p className="text-gray-600 mb-6">
                            Tem certeza que deseja excluir o agendamento do pet {appointmentToDelete.pet.name} para o dia {new Date(appointmentToDelete.startDateTime).toLocaleDateString('pt-BR')} às {new Date(appointmentToDelete.startDateTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}?
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={handleDeleteCancel}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleDeleteConfirm}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors flex items-center gap-2"
                            >
                                <FaTrash />
                                Excluir
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default SystemAppointments;