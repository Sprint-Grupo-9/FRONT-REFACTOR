import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
    getAllServices, 
    getEmployeesByServices,
    getAllPetsByOwnerId,
    getAvailableTimes,
    createAppointment
} from "../../services/api";

// Componentes do sistema
import ButtonSystem from "../system/ButtonSystem";
import { IoChevronBackOutline, IoIosSave } from "react-icons/io5";
import ServiceTabSystem from "../system/ServiceTabSystem";
import SelectSystem from "../system/SelectSystem";
import TextBoxSystem from "../system/TextBoxSystem";
import ConfirmationModalSystem from "../system/ConfirmationModalSystem";
import ErrorBox from "../system/ErrorBox";
import LoadingSpinner from "../system/LoadingSpinner";

function AppointmentContent() {
    const navigate = useNavigate();
    const ownerId = localStorage.getItem("id");

    // Estados
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedPet, setSelectedPet] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [services, setServices] = useState([]);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [pets, setPets] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [allServices, setAllServices] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    // Carregar todos os serviços
    useEffect(() => {
        const fetchServices = async () => {
            try {
                setIsLoading(true);
                const response = await getAllServices();
                if (response?.data) {
                    setAllServices(response.data);
                }
            } catch (err) {
                console.error('Erro ao buscar serviços:', err);
                setErrorMessage("Erro ao carregar os serviços");
            } finally {
                setIsLoading(false);
            }
        };

        fetchServices();
    }, []);

    // Carregar pets do usuário
    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await getAllPetsByOwnerId(ownerId);
                if (response?.data) {
                    setPets(response.data);
                }
            } catch (err) {
                console.error('Erro ao buscar pets:', err);
                setErrorMessage("Erro ao carregar os pets");
            }
        };

        fetchPets();
    }, [ownerId]);

    // Carregar funcionários quando os serviços mudam
    useEffect(() => {
        const fetchEmployees = async () => {
            if (services.length === 0) return;

            try {
                const serviceIds = services.map(s => s.id);
                const response = await getEmployeesByServices(serviceIds);
                if (response?.data) {
                    setEmployees(response.data);
                }
            } catch (err) {
                console.error('Erro ao buscar funcionários:', err);
                setErrorMessage("Erro ao carregar os funcionários");
            }
        };

        fetchEmployees();
    }, [services]);

    // Carregar horários disponíveis
    useEffect(() => {
        const fetchAvailableTimes = async () => {
            if (!selectedDate || !selectedPet || services.length === 0) return;

            try {
                setIsLoading(true);
                const response = await getAvailableTimes(
                    selectedDate.toISOString().split('T')[0],
                    selectedPet.id,
                    services.map(s => s.id)
                );
                if (response?.data) {
                    setAvailableTimes(response.data);
                }
            } catch (err) {
                console.error('Erro ao buscar horários disponíveis:', err);
                setErrorMessage("Erro ao carregar horários disponíveis");
            } finally {
                setIsLoading(false);
            }
        };

        fetchAvailableTimes();
    }, [selectedDate, selectedPet, services]);

    const handleCreateAppointment = async () => {
        if (!selectedPet || !selectedTime || !selectedEmployee || services.length === 0) {
            setErrorMessage("Por favor, preencha todos os campos");
            return;
        }

        try {
            setIsLoading(true);
            const appointmentData = {
                petId: selectedPet.id,
                employee_id: selectedEmployee.id,
                servicesNames: services.map(s => s.name).join(', '),
                totalPrice: services.reduce((total, service) => total + (service.price || 0), 0),
                startDateTime: `${selectedDate.toISOString().split('T')[0]}T${selectedTime.value}`,
                durationMinutes: services.reduce((total, service) => total + (service.duration || 0), 0)
            };

            await createAppointment(appointmentData);
            navigate('/system-appointments/new');
        } catch (error) {
            setErrorMessage("Erro ao criar agendamento");
        } finally {
            setIsLoading(false);
        }
    };

    // Limpar mensagens de erro
    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => setErrorMessage(""), 3000);
            return () => clearTimeout(timer);
        }
    }, [errorMessage]);

    return (
        <div className="min-h-screen bg-slate-100">
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <ButtonSystem
                        variant="redTransp"
                        text="Voltar ao Perfil"
                        click={() => setShowConfirmModal(true)}
                        logo={<IoChevronBackOutline />}
                        disabled={isLoading}
                    />
                    <h1 className="text-xl font-semibold text-slate-800">
                        Novo Agendamento
                    </h1>
                </div>
            </div>

            {/* Conteúdo Principal */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {errorMessage && <ErrorBox text={errorMessage} />}
                
                {showConfirmModal && (
                    <ConfirmationModalSystem
                        text="Deseja sair e perder os serviços selecionados?"
                        onCancel={() => setShowConfirmModal(false)}
                        onConfirm={() => navigate("/system-profile")}
                    />
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Coluna da Esquerda - Seleção de Serviços */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-lg font-semibold mb-4">Selecione os Serviços</h2>
                        <ServiceTabSystem 
                            services={services} 
                            setServices={setServices}
                            allServices={allServices}
                            disabled={isLoading}
                        />
                    </div>

                    {/* Coluna da Direita - Detalhes do Agendamento */}
                    <div className="space-y-6">
                        {/* Seleção de Pet */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-lg font-semibold mb-4">Selecione seu Pet</h2>
                            <SelectSystem
                                title="Pet"
                                options={pets.map(pet => ({ value: pet.id, label: pet.name }))}
                                onChange={(option) => setSelectedPet(option)}
                                disabled={isLoading || pets.length === 0}
                                placeholder="Selecione um pet"
                            />
                        </div>

                        {/* Seleção de Funcionário */}
                        {services.length > 0 && (
                            <div className="bg-white rounded-lg shadow-lg p-6">
                                <h2 className="text-lg font-semibold mb-4">Selecione o Funcionário</h2>
                                <SelectSystem
                                    title="Funcionário"
                                    options={employees.map(emp => ({ value: emp.id, label: emp.name }))}
                                    onChange={(option) => setSelectedEmployee(option)}
                                    disabled={isLoading || employees.length === 0}
                                    placeholder="Selecione um funcionário"
                                />
                            </div>
                        )}

                        {/* Seleção de Data e Horário */}
                        {selectedEmployee && (
                            <div className="bg-white rounded-lg shadow-lg p-6">
                                <h2 className="text-lg font-semibold mb-4">Selecione Data e Horário</h2>
                                <div className="space-y-4">
                                    <TextBoxSystem
                                        hint="Data selecionada"
                                        width="w-full"
                                        title="Data"
                                        disabled={true}
                                        value={selectedDate.toLocaleDateString('pt-BR')}
                                    />
                                    <SelectSystem
                                        title="Horário"
                                        options={availableTimes.map(time => ({ value: time, label: time }))}
                                        onChange={(option) => setSelectedTime(option)}
                                        disabled={isLoading || availableTimes.length === 0}
                                        placeholder="Selecione um horário"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Botão Salvar */}
                        <div className="flex justify-end">
                            <ButtonSystem
                                variant="blue"
                                text="Salvar Agendamento"
                                click={handleCreateAppointment}
                                logo={<IoIosSave />}
                                disabled={isLoading || !selectedPet || !selectedTime || !selectedEmployee || services.length === 0}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AppointmentContent; 