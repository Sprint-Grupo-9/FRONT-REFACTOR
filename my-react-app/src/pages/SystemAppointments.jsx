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
import Pagination from '../components/system/Pagination';
import { FaTrash } from "react-icons/fa";

function SystemAppointments() {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [appointmentToDelete, setAppointmentToDelete] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [isFirst, setIsFirst] = useState(true);
    const [isLast, setIsLast] = useState(true);
    const [pageSize, setPageSize] = useState(10);
    const ownerId = localStorage.getItem("id");

    const fetchAppointments = useCallback(async (page = 0, size = 10) => {
        try {
            setIsLoading(true);
            setErrorMessage(""); // Limpa mensagens de erro anteriores
            const response = await getAppointmentsByOwner(page, size);
            console.log('Resposta da API:', response);

            if (response) {
                // Atualiza os dados da paginação
                setAppointments(response.content || []);
                setCurrentPage(response.pageNumber || 0);
                setTotalPages(response.totalPages || 0);
                setTotalElements(response.totalElements || 0);
                setIsFirst(response.first !== undefined ? response.first : true);
                setIsLast(response.last !== undefined ? response.last : true);
                setPageSize(response.pageSize || size);
            }
        } catch (error) {
            console.error('Erro ao buscar agendamentos:', error);
            console.error('Detalhes do erro:', error.response?.data || error.message);
            setErrorMessage("Erro ao carregar os agendamentos. Por favor, tente novamente.");
            setAppointments([]); // Limpa a lista em caso de erro
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!ownerId || ownerId === "undefined" || ownerId === "null") {
            console.error('ID do proprietário inválido:', ownerId);
            setErrorMessage("ID do proprietário não encontrado. Por favor, faça login novamente.");
            setIsLoading(false);
            return;
        }
        console.log('Buscando agendamentos para o ownerId:', ownerId, 'página:', currentPage, 'tamanho:', pageSize);
        fetchAppointments(currentPage, pageSize);
    }, [ownerId, currentPage, pageSize, fetchAppointments]);

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

            // Recarrega a página atual após a exclusão
            fetchAppointments(currentPage, pageSize);
        } catch (error) {
            console.error('Erro ao excluir agendamento:', error);
            toast.error('Erro ao excluir agendamento');
        } finally {
            setShowDeleteModal(false);
            setAppointmentToDelete(null);
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handlePageSizeChange = (event) => {
        const newSize = parseInt(event.target.value, 10);
        setPageSize(newSize);
        setCurrentPage(0); // Volta para a primeira página ao mudar o tamanho
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
            {errorMessage && (
                <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
                    <ErrorBox text={errorMessage} />
                </div>
            )}
            <div className="w-full h-screen flex flex-row">
                <SlidebarSystem />
                <div className="flex-1 h-full bg-slate-100 overflow-y-auto">
                    <div className="flex flex-col w-11/12 mx-auto pt-24 pb-8 min-h-full">
                        {appointments && appointments.length > 0 ? (
                            <>
                                <div className="flex justify-between items-center mb-6">
                                    <div className="text-sm text-gray-600">
                                        Mostrando {appointments.length} de {totalElements} agendamentos
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <label htmlFor="pageSize" className="text-sm text-gray-600">
                                            Itens por página:
                                        </label>
                                        <select
                                            id="pageSize"
                                            value={pageSize}
                                            onChange={handlePageSizeChange}
                                            className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value={5}>5</option>
                                            <option value={10}>10</option>
                                            <option value={20}>20</option>
                                            <option value={50}>50</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4 mb-6">
                                    {appointments.map(appointment => {
                                        // Validação de dados antes de renderizar
                                        if (!appointment || !appointment.pet || !appointment.employee) {
                                            console.warn('Agendamento com dados incompletos:', appointment);
                                            return null;
                                        }

                                        return (
                                            <AppointmentCardSystem
                                                key={appointment.id}
                                                title={appointment.petOfferingNames || 'Serviço não especificado'}
                                                subtitle={`Pet: ${appointment.pet.name || 'Nome não disponível'}`}
                                                price={`R$ ${(appointment.totalPrice || 0).toFixed(2)}`}
                                                date={appointment.startDateTime ? new Date(appointment.startDateTime).toLocaleDateString('pt-BR') : 'Data não disponível'}
                                                time={appointment.startDateTime ? new Date(appointment.startDateTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : '--:--'}
                                                employee={appointment.employee.name || 'Funcionário não especificado'}
                                                variant="redTransp"
                                                logo={<FaTrash className="text-red-500" />}
                                                clickButton={() => handleDeleteClick(appointment)}
                                            />
                                        );
                                    })}
                                </div>

                                {/* Componente de Paginação */}
                                <div className="mb-6">
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={handlePageChange}
                                        isFirst={isFirst}
                                        isLast={isLast}
                                    />
                                </div>

                                <div className="flex justify-center mt-4">
                                    <ButtonSystem
                                        variant="blue"
                                        text="Novo Agendamento"
                                        click={() => navigate('/system-appointments/new')}
                                        logo={<MdAdd />}
                                    />
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center gap-6 text-center min-h-[60vh]">
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
            {showDeleteModal && appointmentToDelete && appointmentToDelete.pet && appointmentToDelete.startDateTime && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <div className="flex items-center gap-3 mb-4">
                            <MdWarning className="text-yellow-500 text-3xl" />
                            <h3 className="text-xl font-semibold text-gray-800">Confirmar Exclusão</h3>
                        </div>
                        <p className="text-gray-600 mb-6">
                            Tem certeza que deseja excluir o agendamento do pet {appointmentToDelete.pet.name || 'desconhecido'} para o dia {new Date(appointmentToDelete.startDateTime).toLocaleDateString('pt-BR')} às {new Date(appointmentToDelete.startDateTime).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}?
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