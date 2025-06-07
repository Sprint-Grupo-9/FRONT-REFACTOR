import SubServiceSystem from "./SubServiceSystem";
import PrimaryServiceSystem from "./PrimaryServiceSystem";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { CgClose } from "react-icons/cg";

function ServiceBoxSystem({ services, setServices }) {

    const [serviceOpen, setServiceOpen] = useState(true)
    const [rotate, setRotate] = useState(false)

    const toggleOpenServices = () => {
        setServiceOpen(prev => !prev)
        setRotate(prev => !prev)
    }

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

    return (
        <div className="w-full h-full flex flex-col gap-4">

            {services.map(service => (
                <div key={service.id}>
                    <PrimaryServiceSystem
                        hasChevron={service.hasChevron}
                        clickChevron={service.hasChevron ? toggleOpenServices : undefined}
                        rotate={rotate}
                        title={service.title}
                        active={service.active}
                        clickButton={() => toggleServiceActive(service.id) && toggleSubServiceActive(service.id, sub.id)}
                        label={service.active ? "Remover Serviço" : "Adicionar Serviço"}
                        logo={service.active ? <CgClose /> : <FaPlus />}
                        variant={service.active ? "redTransp" : "blue"}
                    />

                    {service.hasChevron && serviceOpen && (
                        <div className="flex flex-wrap gap-2 w-full mt-2">
                            {service.subServices.map(sub => (
                                <SubServiceSystem
                                    key={sub.id}
                                    title={sub.title}
                                    active={sub.active}
                                    click={() => toggleSubServiceActive(service.id, sub.id)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            ))}

        </div>
    )

}

export default ServiceBoxSystem;

// {service.active ? () => toggleAll(service.id) : () => toggleServiceActive(service.id)} 