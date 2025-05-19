
import ServiceIndividualTabSystem from "./ServiceIndividualTabSystem";


function ServiceTabSystem({ services, setServices }) {

    const toggleServiceActive = (serviceId) => {
        setServices(prev =>
            prev.map(service =>
                service.id === serviceId ? {
                    ...service, 
                    active: !service.active,
                    hasChevron: service.subServices.length > 0 ? !service.hasChevron : false
                } : service
            )
        )
    }

    const toggleSubServiceActive = (serviceId, subServiceId) => {
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

    const toggleServiceActiveWithSub = (serviceId) => {
        toggleAll(serviceId);
        toggleServiceActive(serviceId);
    };

    return (
        <>
            <div className="w-auto h-auto text-[12px] text-slate-400">
                Serviços selecionados:
            </div>
            <div className="flex flex-row gap-1 bg-slate-200 p-1 border-2 rounded-lg">
                {services
                    .filter(service => service.active || service.subServices?.some(sub => sub.active))
                    .map(service => (
                        <div key={service.id}>
                            <ServiceIndividualTabSystem
                                click={() => toggleServiceActiveWithSub(service.id)}
                                title={service.title}
                                sizeText={"1rem"}
                            />

                            {service.subServices?.some(sub => sub.active) && (
                                <div className="flex flex-row flex-wrap gap-1 pt-2 pl-4">
                                    {service.subServices
                                        .filter(sub => sub.active)
                                        .map(sub => (
                                            <div key={sub.id}>
                                                <ServiceIndividualTabSystem
                                                    click={() => toggleSubServiceActive(service.id, sub.id)}
                                                    title={sub.title}
                                                    sizeText={"0.8rem"}
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