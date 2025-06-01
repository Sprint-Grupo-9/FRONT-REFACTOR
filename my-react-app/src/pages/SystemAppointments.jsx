import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdPets, MdAdd, MdDelete, MdWarning } from "react-icons/md";
import ButtonSystem from '../components/system/ButtonSystem';
import SlidebarSystem from '../components/system/SlidebarSystem';
import { getAppointmentsByOwner, deleteAppointment } from '../services/api';
import { toast } from 'react-hot-toast';
import LoadingSystem from '../components/system/LoadingSystem';

function SystemAppointments() {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [appointmentToDelete, setAppointmentToDelete] = useState(null);

    const fetchAppointments = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await getAppointmentsByOwner();
            console.log('Agendamentos recebidos:', response);
            setAppointments(response);
        } catch (error) {
            console.error('Erro ao buscar agendamentos:', error);
            toast.error('Erro ao carregar agendamentos');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAppointments();
    }, [fetchAppointments]);

    const handleDeleteClick = (appointment) => {
        setAppointmentToDelete(appointment);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await deleteAppointment(appointmentToDelete.id);
            toast.success('Agendamento excluído com sucesso!');
            fetchAppointments();
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
        <div className="min-h-screen bg-slate-100">
            {/* Header */}
            <div className="bg-primary shadow-md">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-center">
                    <div className="flex items-center gap-2">
                        <MdPets className="text-white text-2xl" />
                        <h1 className="text-2xl font-semibold text-white">Agendamentos</h1>
                    </div>
                </div>
            </div>

            <div className="flex">
                <SlidebarSystem />
                {/* Content */}
                <div className="flex-1 max-w-7xl mx-auto px-4 py-8">
                    <div className="flex justify-end mb-6">
                        <ButtonSystem
                            variant="primary"
                            text="Novo Agendamento"
                            click={() => navigate('/system-appointments/new')}
                            logo={<MdAdd />}
                        />
                    </div>

                    {appointments.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-600">Nenhum agendamento encontrado</p>
                        </div>
                    ) : (
                        <div className="grid gap-6">
                            {appointments.map((appointment) => (
                                <div key={appointment.id} className="bg-white rounded-lg shadow-md p-6">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-800">
                                                {appointment.pet.name}
                                            </h3>
                                            <p className="text-gray-600">
                                                {appointment.startDateTime ? formatDateTime(appointment.startDateTime) : 'Data não definida'}
                                            </p>
                                            <div className="mt-2">
                                                <p className="text-gray-600 font-medium">Serviços:</p>
                                                <ul className="list-disc list-inside text-gray-600">
                                                    {appointment.services ? 
                                                        appointment.services.split(',').map((service, index) => (
                                                            <li key={index} className="ml-2">{service.trim()}</li>
                                                        ))
                                                        : <li className="ml-2">Nenhum serviço definido</li>
                                                    }
                                                </ul>
                                            </div>
                                            <p className="text-gray-600 mt-2">
                                                Funcionário: {appointment.employee.name}
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <button
                                                onClick={() => handleDeleteClick(appointment)}
                                                className="p-2 text-red-500 hover:text-red-700 transition-colors"
                                                title="Excluir agendamento"
                                            >
                                                <MdDelete className="text-2xl" />
                                            </button>
                                            <p className="text-lg font-semibold text-primary">
                                                R$ {appointment.totalPrice.toFixed(2)}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Duração: {calculateDuration(appointment.startDateTime, appointment.endDateTime)} minutos
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
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
                            Tem certeza que deseja excluir o agendamento do pet {appointmentToDelete.pet.name} para o dia {formatDateTime(appointmentToDelete.startDateTime)}?
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
                                className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SystemAppointments;