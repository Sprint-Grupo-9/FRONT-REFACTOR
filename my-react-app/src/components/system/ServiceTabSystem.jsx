import { useState } from 'react';
import { IoSearchOutline } from "react-icons/io5";

function ServiceTabSystem({ services = [], setServices, allServices = [], disabled }) {
    const [searchTerm, setSearchTerm] = useState('');

    // Filtrar serviços baseado na busca
    const filteredServices = searchTerm
        ? allServices.filter(service =>
            service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.description?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : allServices;

    const handleServiceChange = (service) => {
        setServices(prev => {
            const isSelected = prev.some(s => s.id === service.id);
            if (isSelected) {
                return prev.filter(s => s.id !== service.id);
            } else {
                return [...prev, { ...service, active: true }];
            }
        });
    };

    const isServiceSelected = (serviceId) => {
        return services.some(s => s.id === serviceId);
    };

    const calculateTotal = () => {
        return services.reduce((total, service) => total + (service.price || 0), 0);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-200px)]">
            {/* Barra de Busca */}
            <div className="flex-none mb-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Buscar serviços..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                        disabled={disabled}
                    />
                    <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                </div>
            </div>

            {/* Lista de Serviços */}
            <div className="flex-1 overflow-y-auto">
                <div className="space-y-2">
                    {filteredServices.map(service => (
                        <label
                            key={service.id}
                            className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                                isServiceSelected(service.id)
                                    ? 'bg-blue-50 hover:bg-blue-100'
                                    : 'bg-white hover:bg-slate-50'
                            }`}
                        >
                            <input
                                type="checkbox"
                                checked={isServiceSelected(service.id)}
                                onChange={() => handleServiceChange(service)}
                                disabled={disabled}
                                className="h-4 w-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                            />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-slate-700 truncate">
                                        {service.name}
                                    </span>
                                    {service.price && (
                                        <span className="text-sm font-medium text-blue-600 ml-2 flex-shrink-0">
                                            R$ {service.price.toFixed(2)}
                                        </span>
                                    )}
                                </div>
                                {service.description && (
                                    <p className="text-xs text-slate-500 mt-0.5 truncate">
                                        {service.description}
                                    </p>
                                )}
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            {/* Resumo dos Serviços Selecionados */}
            {services.length > 0 && (
                <div className="flex-none mt-4 bg-blue-50 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-sm font-medium text-blue-700">
                                {services.length} serviço(s) selecionado(s)
                            </h3>
                            <p className="text-sm text-blue-600 mt-1">
                                Total: R$ {calculateTotal().toFixed(2)}
                            </p>
                        </div>
                        <button
                            onClick={() => setServices([])}
                            className="text-sm text-blue-600 hover:text-blue-700"
                            disabled={disabled}
                        >
                            Limpar seleção
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ServiceTabSystem;