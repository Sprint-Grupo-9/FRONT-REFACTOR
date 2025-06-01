import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../contents/Calendar.css';
import { 
    createAppointment, 
    getAvailableTimes, 
    getAllPetsByOwnerId,
    getAllServices,
    getEmployeesByServices
} from "../../services/api";

// Componentes do sistema
import ButtonSystem from "../system/ButtonSystem";
import { IoIosSave } from "react-icons/io";
import { IoChevronBackOutline } from "react-icons/io5";
import ServiceTabSystem from "../system/ServiceTabSystem";
import SelectSystem from "../system/SelectSystem";
import TextBoxSystem from "../system/TextBoxSystem";
import ConfirmationModalSystem from "../system/ConfirmationModalSystem";
import ErrorBox from "../system/ErrorBox";
import LoadingSpinner from "../system/LoadingSpinner";

function CalendarContent() {
    const navigate = useNavigate();
    const location = useLocation();
    const ownerId = localStorage.getItem("id");

    // Estados
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedPet, setSelectedPet] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [services, setServices] = useState(location.state?.selectedServices || []);
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

    // Handlers
    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSelectedTime(null);
    };

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
            navigate("/system-appointments");
        } catch (err) {
            console.error('Erro ao criar agendamento:', err);
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
        <div className="flex-1 h-[calc(100vh-64px)] bg-slate-100 flex">
            {/* Sidebar Fixa */}
            <div className="w-80 flex-none bg-white border-r border-slate-200 p-4">
                <div className="space-y-4">
                    {/* Calendário */}
                    <div className="bg-white rounded-lg">
                        <Calendar
                            className="rounded-lg shadow-lg p-4 bg-white text-black"
                            value={selectedDate}
                            minDate={new Date()}
                            onChange={handleDateChange}
                            disabled={isLoading}
                        />
                    </div>

                    {/* Data Selecionada */}
                    <div className="bg-white rounded-lg">
                        <TextBoxSystem
                            hint="Data selecionada"
                            width="w-full"
                            title="Data"
                            disabled={true}
                            value={selectedDate.toLocaleDateString('pt-BR')}
                        />
                    </div>

                    {/* Seleção de Pet, Horário e Funcionário */}
                    <div className="space-y-4">
                        <SelectSystem
                            title="Pet"
                            options={pets.map(pet => ({ value: pet.id, label: pet.name }))}
                            onChange={(option) => setSelectedPet(option)}
                            disabled={isLoading || pets.length === 0}
                            placeholder="Selecione um pet"
                        />

                        <SelectSystem
                            title="Horário"
                            options={availableTimes.map(time => ({ value: time, label: time }))}
                            onChange={(option) => setSelectedTime(option)}
                            disabled={isLoading || availableTimes.length === 0}
                            placeholder="Selecione um horário"
                        />

                        <SelectSystem
                            title="Funcionário"
                            options={employees.map(emp => ({ value: emp.id, label: emp.name }))}
                            onChange={(option) => setSelectedEmployee(option)}
                            disabled={isLoading || employees.length === 0}
                            placeholder="Selecione um funcionário"
                        />
                    </div>
                </div>
            </div>

            {/* Área Principal com Rolagem */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header e Modal de Confirmação */}
                <div className="flex-none relative z-10">
                    {showConfirmModal && <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-40"></div>}
                    {errorMessage && <ErrorBox text={errorMessage} />}
                    
                    <div className="absolute top-4 left-4">
                        <ButtonSystem
                            variant="redTransp"
                            text="Voltar"
                            click={() => setShowConfirmModal(true)}
                            logo={<IoChevronBackOutline />}
                            disabled={isLoading}
                        />
                    </div>

                    {showConfirmModal && (
                        <ConfirmationModalSystem
                            text="Deseja sair e perder os serviços selecionados?"
                            onCancel={() => setShowConfirmModal(false)}
                            onConfirm={() => navigate("/system-appointments")}
                        />
                    )}
                </div>

                {/* Área de Serviços com Rolagem */}
                <div className="flex-1 overflow-y-auto p-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-lg shadow-lg p-4">
                            <h2 className="text-lg font-semibold mb-4">Serviços Disponíveis</h2>
                            <ServiceTabSystem 
                                services={services} 
                                setServices={setServices}
                                allServices={allServices}
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                </div>

                {/* Botão Salvar */}
                <div className="flex-none bg-slate-100 border-t border-slate-200 p-4">
                    <div className="max-w-4xl mx-auto flex justify-end">
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
    );
}

export default CalendarContent;