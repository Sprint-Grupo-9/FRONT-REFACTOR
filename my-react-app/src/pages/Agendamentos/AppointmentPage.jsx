import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoChevronBackOutline } from "react-icons/io5";
import { MdPets, MdPerson, MdAccessTime, MdCalendarMonth, MdCheckCircle, MdExpandMore, MdExpandLess } from "react-icons/md";
import ButtonSystem from '../../components/system/ButtonSystem';
import SelectSystem from '../../components/system/SelectSystem';
import ErrorBox from '../../components/system/ErrorBox';
import { 
    getAllServices, 
    getAllPetsByOwnerId,
    getAvailableTimes,
    createAppointment
} from '../../services/api';
import { toast } from 'react-hot-toast';
import { useLoading } from '../../context/LoadingContext';

function AppointmentPage() {
    const navigate = useNavigate();
    const { setIsLoading } = useLoading();
    const [errorMessage, setErrorMessage] = useState("");
    const [services, setServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [pets, setPets] = useState([]);
    const [selectedPet, setSelectedPet] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);
    const [availableEmployees, setAvailableEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isLoading, setIsLoadingLocal] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('error'); // 'error' ou 'success'
    const [expandedService, setExpandedService] = useState(null);

    const steps = [
        { id: 1, title: 'Pet e Serviços', description: 'Selecione seu pet e os serviços desejados' },
        { id: 2, title: 'Data e Horário', description: 'Escolha a data e horário disponíveis' },
        { id: 3, title: 'Confirmação', description: 'Revise e confirme seu agendamento' }
    ];

    const subServices = {
        'Banho': [
            { id: 8, name: 'Hidratação', description: 'Hidratação profunda para o pelo do seu pet' },
            { id: 7, name: 'Escovação Dentária', description: 'Limpeza e escovação dos dentes' },
            { id: 6, name: 'Desembolo', description: 'Remoção de nós e embaraços' },
            { id: 5, name: 'Botinha', description: 'Corte das unhas das patas' },
            { id: 4, name: 'Tosa Bebê', description: 'Tosa especial para filhotes' },
            { id: 3, name: 'Tosa na Máquina', description: 'Tosa realizada com máquina' },
            { id: 2, name: 'Tosa Higiênica', description: 'Tosa focada na higiene' }
        ]
    };

    useEffect(() => {
        setIsLoading(false);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const ownerId = localStorage.getItem('id');
                if (!ownerId) {
                    setErrorMessage("Usuário não autenticado");
                    return;
                }

                const [servicesResponse, petsResponse] = await Promise.all([
                    getAllServices(),
                    getAllPetsByOwnerId(ownerId)
                ]);

                if (servicesResponse?.data) {
                    console.log('Serviços recebidos:', servicesResponse.data);
                    const mainServices = servicesResponse.data.filter(service => 
                        !subServices['Banho'].some(sub => Number(sub.id) === Number(service.id))
                    );
                    setServices(mainServices);
                }
                if (petsResponse?.data) {
                    console.log('Pets recebidos:', petsResponse.data);
                    const petsOptions = petsResponse.data.map(pet => ({
                        value: pet.id,
                        label: pet.name
                    }));
                    console.log('Opções de pets formatadas:', petsOptions);
                    setPets(petsOptions);
                }
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
                setErrorMessage("Erro ao carregar dados iniciais");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchAvailableTimes = async () => {
            if (selectedDate && selectedPet && selectedServices.length > 0) {
                try {
                    setIsLoading(true);
                    const requestData = {
                        date: selectedDate,
                        services: selectedServices.map(service => ({
                            id: service.id,
                            name: service.name,
                            description: service.description
                        }))
                    };
                    const response = await getAvailableTimes(selectedPet.value, requestData);
                    if (response?.data) {
                        console.log('Horários disponíveis:', response.data);
                        setAvailableEmployees(response.data);
                        setSelectedEmployee(null);
                        setSelectedTime('');
                        
                        // Atualiza os totais com os valores da API
                        if (response.data.length > 0) {
                            const firstEmployee = response.data[0];
                            setTotalPrice(firstEmployee.servicePrice);
                            setTotalDuration(firstEmployee.durationTime);
                        }
                    }
                } catch (error) {
                    console.error('Erro ao carregar horários:', error);
                    setErrorMessage("Erro ao carregar horários disponíveis");
                } finally {
                    setIsLoading(false);
                }
            } else {
                setAvailableEmployees([]);
                setSelectedEmployee(null);
                setSelectedTime('');
            }
        };
        fetchAvailableTimes();
    }, [selectedDate, selectedPet, selectedServices]);

    const handleServiceToggle = (service) => {
        console.log('Serviço selecionado:', service);
        setSelectedServices(prev => {
            const isSelected = prev.some(s => s.id === service.id);
            if (isSelected) {
                // Se estiver removendo o banho, remove também todos os subserviços
                if (service.name === 'Banho') {
                    return prev.filter(s => s.id !== service.id && !subServices['Banho'].some(sub => sub.id === s.id));
                }
                return prev.filter(s => s.id !== service.id);
            } else {
                return [...prev, service];
            }
        });
    };

    const handleSubServiceToggle = (subService) => {
        const banhoService = selectedServices.find(s => s.name === 'Banho');
        if (!banhoService) {
            showAlertMessage('É necessário selecionar o serviço de banho primeiro');
            return;
        }

        setSelectedServices(prev => {
            const isSelected = prev.some(s => s.id === subService.id);
            if (isSelected) {
                return prev.filter(s => s.id !== subService.id);
            } else {
                return [...prev, { ...subService, parentService: 'Banho' }];
            }
        });
    };

    const showAlertMessage = (message, type = 'error') => {
        setAlertMessage(message);
        setAlertType(type);
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
            setAlertMessage('');
        }, 3000);
    };

    const handleNextStep = () => {
        if (currentStep === 1) {
            console.log('Pet selecionado:', selectedPet);
            console.log('Serviços selecionados:', selectedServices);
            
            if (!selectedPet) {
                showAlertMessage("Por favor, selecione um pet");
                return;
            }
            if (selectedServices.length === 0) {
                showAlertMessage("Por favor, selecione pelo menos um serviço");
                return;
            }
        } else if (currentStep === 2) {
            if (!selectedDate) {
                showAlertMessage("Por favor, selecione uma data");
                return;
            }
            if (!selectedEmployee) {
                showAlertMessage("Por favor, selecione um funcionário");
                return;
            }
            if (!selectedTime) {
                showAlertMessage("Por favor, selecione um horário");
                return;
            }
        }
        setCurrentStep(prev => prev + 1);
    };

    const handlePrevStep = () => {
        setCurrentStep(prev => prev - 1);
    };

    const handleSubmit = async () => {
        if (!selectedPet) {
            showAlertMessage('Por favor, selecione um pet');
            return;
        }
        if (!selectedServices.length) {
            showAlertMessage('Por favor, selecione pelo menos um serviço');
            return;
        }
        if (!selectedEmployee) {
            showAlertMessage('Por favor, selecione um funcionário');
            return;
        }
        if (!selectedDate) {
            showAlertMessage('Por favor, selecione uma data');
            return;
        }
        if (!selectedTime) {
            showAlertMessage('Por favor, selecione um horário');
            return;
        }

        try {
            setIsLoading(true);
            const [year, month, day] = selectedDate.split('-');
            const [hours, minutes] = selectedTime.split(':');
            const appointmentDate = new Date(year, month - 1, day, hours, minutes);

            // Formata os serviços para incluir os subserviços do banho
            const formattedServices = selectedServices.map(service => {
                if (service.parentService === 'Banho') {
                    return `${service.name} (Banho)`;
                }
                return service.name;
            });

            const appointmentData = {
                petId: Number(selectedPet.value),
                employee_id: Number(selectedEmployee.value),
                servicesNames: formattedServices.join(', '),
                startDateTime: appointmentDate.toISOString().slice(0, 16),
                totalPrice: Number(totalPrice),
                durationMinutes: Number(totalDuration)
            };

            console.log('Dados do agendamento:', appointmentData);
            await createAppointment(appointmentData);
            showAlertMessage('Agendamento criado com sucesso!', 'success');
            navigate('/system-appointments');
        } catch (error) {
            console.error('Erro ao criar agendamento:', error);
            showAlertMessage(error.response?.data?.message || 'Erro ao criar agendamento');
        } finally {
            setIsLoading(false);
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Selecione seu Pet</h2>
                            <SelectSystem
                                id="pet"
                                title="Pet"
                                options={pets}
                                onChange={(option) => {
                                    console.log('Pet selecionado no SelectSystem:', option);
                                    setSelectedPet(option);
                                }}
                                value={selectedPet?.value}
                                disabled={isLoading}
                                placeholder="Selecione um pet"
                            />
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Selecione os Serviços</h2>
                            <div className="space-y-4">
                                {services
                                    .filter(service => 
                                        // Mostra apenas o corte de unha fora do banho
                                        Number(service.id) === 9
                                    )
                                    .map(service => (
                                    <div key={service.id}>
                                        <div
                                            className={`p-4 rounded-lg border cursor-pointer transition-all ${
                                                selectedServices.some(s => Number(s.id) === Number(service.id))
                                                    ? 'border-blue-500 bg-blue-50'
                                                    : 'border-gray-200 hover:border-blue-300'
                                            }`}
                                            onClick={() => handleServiceToggle(service)}
                                        >
                                            <div>
                                                <h3 className="font-medium text-gray-800">{service.name}</h3>
                                                <p className="text-sm text-gray-600">{service.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Serviço de Banho com subserviços */}
                                {services
                                    .filter(service => Number(service.id) === 1)
                                    .map(service => (
                                    <div key={service.id}>
                                        <div
                                            className={`p-4 rounded-lg border cursor-pointer transition-all ${
                                                selectedServices.some(s => Number(s.id) === Number(service.id))
                                                    ? 'border-blue-500 bg-blue-50'
                                                    : 'border-gray-200 hover:border-blue-300'
                                            }`}
                                            onClick={() => {
                                                handleServiceToggle(service);
                                                setExpandedService(expandedService === service.id ? null : service.id);
                                            }}
                                        >
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h3 className="font-medium text-gray-800">{service.name}</h3>
                                                    <p className="text-sm text-gray-600">{service.description}</p>
                                                </div>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setExpandedService(expandedService === service.id ? null : service.id);
                                                    }}
                                                    className="text-gray-500 hover:text-gray-700"
                                                >
                                                    {expandedService === service.id ? <MdExpandLess size={24} /> : <MdExpandMore size={24} />}
                                                </button>
                                            </div>
                                        </div>
                                        
                                        {expandedService === service.id && (
                                            <div className="ml-8 mt-2 space-y-2">
                                                {subServices['Banho'].map(subService => (
                                                    <div
                                                        key={subService.id}
                                                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                                                            selectedServices.some(s => Number(s.id) === Number(subService.id))
                                                                ? 'border-blue-500 bg-blue-50'
                                                                : 'border-gray-200 hover:border-blue-300'
                                                        }`}
                                                        onClick={() => handleSubServiceToggle(subService)}
                                                    >
                                                        <h4 className="font-medium text-gray-800">{subService.name}</h4>
                                                        <p className="text-sm text-gray-600">{subService.description}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Selecione a Data</h2>
                            <input
                                type="date"
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                                value={selectedDate}
                                onChange={(e) => {
                                    console.log('Data selecionada:', e.target.value);
                                    setSelectedDate(e.target.value);
                                }}
                                min={new Date().toISOString().split('T')[0]}
                                disabled={isLoading}
                            />
                        </div>

                        {selectedDate && availableEmployees.length > 0 && (
                            <>
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Selecione o Funcionário</h2>
                                    <SelectSystem
                                        id="employee"
                                        title="Funcionário"
                                        options={availableEmployees.map(emp => ({ 
                                            value: emp.employee.id, 
                                            label: emp.employee.name 
                                        }))}
                                        onChange={(option) => {
                                            setSelectedEmployee(option);
                                            setSelectedTime('');
                                        }}
                                        value={selectedEmployee?.value}
                                        icon={<MdPerson />}
                                        disabled={isLoading}
                                    />
                                </div>

                                {selectedEmployee && (
                                    <div className="bg-white rounded-lg shadow-md p-6">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Selecione o Horário</h2>
                                        <div className="relative">
                                            <select
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                value={selectedTime}
                                                onChange={(e) => setSelectedTime(e.target.value)}
                                                disabled={isLoading}
                                            >
                                                <option value="">Selecione um horário</option>
                                                {availableEmployees
                                                    .find(emp => emp.employee.id === selectedEmployee.value)
                                                    ?.times.map(time => (
                                                        <option key={time} value={time}>
                                                            {time}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                            <MdAccessTime className="absolute right-3 top-2.5 text-gray-400" />
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Resumo do Agendamento</h2>
                            <div className="space-y-4">
                                <div className="border-b pb-4">
                                    <h3 className="font-medium text-gray-800 mb-2">Pet</h3>
                                    <p className="text-gray-600">{selectedPet?.label}</p>
                                </div>

                                <div className="border-b pb-4">
                                    <h3 className="font-medium text-gray-800 mb-2">Serviços</h3>
                                    <div className="space-y-2">
                                        {selectedServices.map(service => (
                                            <div key={service.id} className="flex justify-between">
                                                <span className="text-gray-600">{service.name}</span>
                                                <span className="text-gray-800">
                                                    R$ {totalPrice.toFixed(2)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="border-b pb-4">
                                    <h3 className="font-medium text-gray-800 mb-2">Data e Horário</h3>
                                    <p className="text-gray-600">
                                        {new Date(selectedDate).toLocaleDateString('pt-BR')} às {selectedTime}
                                    </p>
                                </div>

                                <div className="border-b pb-4">
                                    <h3 className="font-medium text-gray-800 mb-2">Funcionário</h3>
                                    <p className="text-gray-600">{selectedEmployee?.label}</p>
                                </div>

                                <div className="pt-4">
                                    <div className="flex justify-between text-lg font-semibold text-blue-600">
                                        <span>Total:</span>
                                        <span>R$ {totalPrice.toFixed(2)}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Duração estimada: {totalDuration} minutos
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-slate-100">
            {showAlert && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
                    <div className={`px-4 py-3 rounded relative ${
                        alertType === 'error' 
                            ? 'bg-red-100 border-red-400 text-red-700' 
                            : 'bg-green-100 border-green-400 text-green-700'
                    } border`} role="alert">
                        <span className="block sm:inline">{alertMessage}</span>
                    </div>
                </div>
            )}

            <form onSubmit={(e) => e.preventDefault()}>
                {/* Header */}
                <div className="bg-primary shadow-md">
                    <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                        <ButtonSystem
                            variant="white"
                            text="Voltar"
                            click={() => navigate('/system-appointments')}
                            logo={<IoChevronBackOutline />}
                            className="text-primary"
                        />
                        <div className="flex items-center gap-2">
                            <MdPets className="text-white text-2xl" />
                            <h1 className="text-2xl font-semibold text-white">Agendamento</h1>
                        </div>
                        <div className="w-24"></div>
                    </div>
                </div>

                {/* Stepper */}
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="mb-8">
                        <div className="flex items-center justify-between">
                            {steps.map((step, index) => (
                                <div key={step.id} className="flex items-center">
                                    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                                        currentStep >= step.id
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-200 text-gray-500'
                                    }`}>
                                        {currentStep > step.id ? (
                                            <MdCheckCircle className="w-6 h-6" />
                                        ) : (
                                            <span>{step.id}</span>
                                        )}
                                    </div>
                                    <div className="ml-4">
                                        <h3 className={`text-sm font-medium ${
                                            currentStep >= step.id
                                                ? 'text-blue-500'
                                                : 'text-gray-500'
                                        }`}>
                                            {step.title}
                                        </h3>
                                        <p className="text-xs text-gray-500">{step.description}</p>
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className={`w-full h-1 mx-4 ${
                                            currentStep > step.id
                                                ? 'bg-blue-500'
                                                : 'bg-gray-200'
                                        }`} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {errorMessage && <ErrorBox text={errorMessage} />}

                    {/* Step Content */}
                    {renderStepContent()}

                    {/* Navigation Buttons */}
                    <div className="mt-8 flex justify-between">
                        {currentStep > 1 && (
                            <ButtonSystem
                                variant="redTransp"
                                text="Voltar"
                                click={handlePrevStep}
                                disabled={isLoading}
                            />
                        )}
                        {currentStep < steps.length ? (
                            <ButtonSystem
                                variant="blue"
                                text="Próximo"
                                click={handleNextStep}
                                disabled={isLoading}
                                className="ml-auto"
                            />
                        ) : (
                            <ButtonSystem
                                variant="blue"
                                text={isLoading ? "Agendando..." : "Confirmar Agendamento"}
                                click={handleSubmit}
                                disabled={isLoading}
                                className="ml-auto"
                            />
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AppointmentPage; 