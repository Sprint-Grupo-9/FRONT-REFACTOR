
import ServiceIndividualTabSystem from "./ServiceIndividualTabSystem";


function ServiceTabSystem({ services, setServices }) {

    const toggleService = (serviceId) => {
        setServices(prev =>
            prev.map(service =>
                service.id === serviceId ? {
                    ...service, active: !service.active
                } : service
            )
        )
    }

    const toggleSubService = (serviceId, subServiceId) => {
        setServices(prev =>
            prev.map(service =>
                service.id === serviceId ? {
                    ...service,
                    subServices: service.subServices.map(sub =>
                        sub.id === subServiceId ? {
                            ...sub, active: !sub.active
                        } : sub
                    )
                } : service
            )
        )
    }

    const toggleAll = (serviceId) => {
        setServices(prev =>
            prev.map(service => {
                if (service.id !== serviceId) return service

                return {
                    ...service,
                    subServices: service.subServices
                        .map(sub =>
                        ({
                            ...sub,
                            active: false
                        }))
                }
            }
            )
        )
    }

    const toggleServiceWithSub = (serviceId) => {
        toggleAll(serviceId);
        toggleService(serviceId);
    };

    return (
        <>
            <div className="w-full h-2 text-[12px] text-slate-500">
                Serviços selecionados:
            </div>
            <div className="flex flex-row gap-2">
                {services
                    .filter(service => service.active || service.subServices?.some(sub => sub.active))
                    .map(service => (
                        <div key={service.id}>
                            <ServiceIndividualTabSystem
                                click={() => toggleServiceWithSub(service.id)}
                                title={service.title}
                            />

                            {service.subServices?.some(sub => sub.active) && (
                                <div className="flex flex-row flex-wrap gap-2 pt-2 pl-4">
                                    {service.subServices
                                        .filter(sub => sub.active)
                                        .map(sub => (
                                            <div key={sub.id}>
                                                <ServiceIndividualTabSystem
                                                    click={() => toggleSubService(service.id, sub.id)}
                                                    title={sub.title}
                                                />
                                            </div>
                                        ))}
                                </div>
                            )}
                        </div>
                    ))}
            </div>


        </>
    )

}

export default ServiceTabSystem;