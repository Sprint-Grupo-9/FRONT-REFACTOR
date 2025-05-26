import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { CardKpi } from './CardKpi';
import { CardAppointment } from './CardAppointment';
import Calendar from 'react-calendar';
import './CalendarDash.css'
import TextBoxSystem from "../system/TextBoxSystem";
import axios from 'axios';




export default function KpiSection() {
    // Estado para armazenar os detalhes do agendamento
    const [detalhes, setDetalhes] = useState(null);

    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzb2xhcml1bS50ZXN0ZUBlbWFpbC5jb20iLCJpYXQiOjE3NDgwNTUxNzEsImV4cCI6MTgzNDQ1NTE3MX0.lG9GhIkZJ_Wj4qXS2pt8BUwOrS25c2QFByCk5Q8a-pBr_LYTsaUk8Ru9fuU3xywKb3zS8KoINHBhaDzDMDM7BQ';  // Aqui você pode colocar o token fixo ou pegar do localStorage

    const [weeklyData, setWeeklyData] = useState([]);

    useEffect(() => {

        axios.get('http://localhost:8080/dashboards/procedures/amount-last-seven-days', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                const data = response.data;

                const formattedData = Object.entries(data).map(([date, count]) => {
                    const [year, month, day] = date.split('-');
                    return { day: `${day}/${month}`, clientes: count };
                });
                setWeeklyData(formattedData);
            })
            .catch(error => {
                console.error('Erro ao buscar dados:', error);
            });
    }, []);

    // KPI para o procedimento mais realizado
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/dashboards/procedures/most-performed-last-thirty-days", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

            .then((res) => res.json())
            .then((json) => setData(json))
            .catch((err) => console.error("Erro ao buscar dados:", err));
    }, []);


    // KPI para o procedimento menos realizado
    const [dataKPI2, setDataKPI2] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/dashboards/procedures/least-performed-last-thirty-days", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

            .then((res) => res.json())
            .then((json) => setDataKPI2(json))
            .catch((err) => console.error("Erro ao buscar dados:", err));
    }, []);


 const [dataKPI3, setDataKPI3] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/dashboards/procedures/most-procedures-timing-last-thirty-days", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

            .then((res) => res.json())
            .then((json) => setDataKPI3(json))
            .catch((err) => console.error("Erro ao buscar dados:", err));
    }, []);

    const [dataKPI4, setDataKPI4] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/dashboards/procedures/least-procedures-timing-last-thirty-days", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

            .then((res) => res.json())
            .then((json) => setDataKPI4(json))
            .catch((err) => console.error("Erro ao buscar dados:", err));
    }, []);


    const [agendamentosDoDia, setAgendamentosDoDia] = useState([]);
    const [dataSelecionada, setdataSelecionada] = useState(new Date());// pode vir de um state depois


    const handleDateChange = (date) => {
        setdataSelecionada(date);
        console.log("Data selecionada:", date);
    };

    const formattedDate = dataSelecionada.toLocaleDateString('pt-BR');


    useEffect(() => {
        const dataFormatada = dataSelecionada.toISOString().split('T')[0]; // YYYY-MM-DD

        axios
            .get("http://localhost:8080/dashboards/appointments/date", {
                params: { date: dataFormatada },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                if (res.status === 204) {
                    setAgendamentosDoDia([]); // limpa os dados anteriores
                    return;
                }

                const { infoResponses } = res.data;

                const agendamentos = infoResponses.map((info) => {
                    return {
                        id: info.id,
                        cliente: info.pet.owner.name,
                        cpf: info.pet.owner.cpf,
                        email: info.pet.owner.email,
                        telefone: info.pet.owner.phoneNumber,
                        endereco: `${info.pet.owner.street}, ${info.pet.owner.number} - ${info.pet.owner.neighborhood}`,
                        pet: `${info.pet.name} - ${info.pet.breed}`,
                        petNome: info.pet.name,
                        petRaca: info.pet.breed,
                        petIdade: info.pet.age,
                        petSexo: info.pet.sex,
                        petEspecie: info.pet.species,
                        petPorte: info.pet.size,
                        petPelagem: info.pet.coat,
                        funcionario: info.employee.name,
                        procedimento: info.services,
                        valor: `${info.totalPrice}R$`,
                        horarioInicio: info.startDateTime.split('T')[1].slice(0, 5),
                        horarioFim: info.endDateTime.split('T')[1].slice(0, 5),
                    };
                });

                setAgendamentosDoDia(agendamentos);
            })
            .catch((err) => {
                console.error('Erro ao buscar agendamentos:', err);
                setAgendamentosDoDia([]); // trata erro limpando também
            });
    }, [dataSelecionada]);

    console.log(dataSelecionada)

    const [calendarOpen, setCalendarOpen] = useState(false);


    return (
        <div className="flex-1 bg-slate-100 flex justify-center items-center flex-col mt-[85px]">

            {/* KPIs */}
            <div className="w-[95%] h-[25%]  flex flex-row gap-[2%] justify-center pt-[2%]">
                <>
                    {data && (
                        <CardKpi
                            title={
                                <>
                                    Procedimento mais Realizado -<br />
                                    ({data.start}) - ({data.end})
                                </>
                            }
                            description={`${data.serviceName} / ${data.count}`}
                        />
                    )}
                </>
                <>
                    {dataKPI2 && (
                        <CardKpi
                            title={
                                <>
                                    Procedimento menos Realizado -<br />
                                    ({dataKPI2.start}) - ({dataKPI2.end})
                                </>
                            }
                            description={`${dataKPI2.serviceName} / ${dataKPI2.count}`}
                        />
                    )}
                </>
                {/* <CardKpi title="Procedimento com Menor Demanda " description="Tosa / 1" /> */}
    <>
                    {dataKPI3 && (
                        <CardKpi
                            title={
                                <>
                                    Horário de Maior Movimento -<br />
                                    ({dataKPI3.start}) - ({dataKPI3.end})
                                </>
                            }
                            description={`${dataKPI3.hour} / ${dataKPI3.count}`}
                        />
                    )}
                </>
                {/* <CardKpi title="Horário de Maior Movimento" description="10:00 - 12:00 / 1" /> */}
                    <>
                    {dataKPI4 && (
                        <CardKpi
                            title={
                                <>
                                    Horário de Maior Movimento -<br />
                                    ({dataKPI4.start}) - ({dataKPI4.end})
                                </>
                            }
                            description={`${dataKPI4.hour} / ${dataKPI4.count}`}
                        />
                    )}
                </>
                {/* <CardKpi title="Horário de Menor Movimento" description="10:00 - 12:00 / 1" /> */}
            </div>

            {/* Gráfico + Lista */}
            <div className="w-full p-4 rounded-2xl h-[75%]">

                <div className="w-[80%] mx-auto h-[98%] flex gap-[2%]">

                    {/* Gráfico */}
                    <div className="w-[50%] h-[100%] flex justify-center items-center flex-col bg-white rounded-xl gap-8 shadow">
                        <h3 className="text-lg font-semibold mb-4 text-gray-700">Fluxo de Atendimentos – Últimos 7 Dias</h3>
                        <ResponsiveContainer width="90%" height="80%">
                            <BarChart data={weeklyData}>
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="clientes" fill="#e52472" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Lista de Agendamentos */}
                    <div className="w-[50%] h-full overflow-x-auto p-4 bg-white rounded-xl shadow">
                        <div className="relative flex justify-center mb-4">
                            <div className="w-64 border rounded px-2 py-1  text-center">
                                <div className="text-xs">Agendamento do Dia</div>
                                <div
                                    className="text-sm text-black cursor-pointer"
                                    onClick={() => setCalendarOpen(!calendarOpen)}
                                >
                                    {formattedDate}
                                </div>
                            </div>

                            {calendarOpen && (
                                <div className="absolute top-full mt-2 z-50">
                                    <Calendar
                                        className="rounded-lg shadow-lg p-1 bg-white text-black"
                                        value={dataSelecionada}
                                        minDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
                                        onChange={(date) => {
                                            handleDateChange(date);
                                            setCalendarOpen(false);
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="flex gap-4 overflow-x-auto pb-4 w-full">
                            {agendamentosDoDia.length === 0 ? (
                                <div className="w-full text-center text-red-600 font-semibold mt-4">
                                    Nenhum agendamento encontrado para esta data.
                                </div>
                            ) : (
                                agendamentosDoDia.map((item, index) => (
                                    <div
                                        key={item.id ?? index}
                                        className="bg-white rounded-xl shadow-md border border-gray-200 cursor-pointer hover:shadow-lg transition"
                                        onClick={() => setDetalhes(item)}
                                    >
                                        <CardAppointment
                                            cliente={item.cliente}
                                            pet={item.pet}
                                            procedimento={item.procedimento}
                                            valor={item.valor}
                                            horarioInicio={item.horarioInicio}
                                            horarioFim={item.horarioFim}
                                            detalhesExtras={{
                                                cpf: item.cpf,
                                                email: item.email,
                                                telefone: item.telefone,
                                                endereco: item.endereco,
                                                funcionario: item.funcionario,
                                                idade: item.petIdade,
                                                especie: item.petEspecie,
                                                pelagem: item.petPelagem,
                                                porte: item.petPorte,
                                            }}
                                        />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/** Modal de Ficha */}
            <AnimatePresence>
                {detalhes && (
                    <motion.div
                        key="modal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            transition={{ duration: 0.4, ease: 'easeOut' }}
                            className="bg-white p-6 rounded-xl w-[500px] max-h-[90vh] overflow-y-auto shadow-lg border border-primary relative"
                        >
                            <button
                                className="absolute top-2 right-2 text-red-500 font-bold text-lg"
                                onClick={() => setDetalhes(null)}
                            >
                                ×
                            </button>
                            <h2 className="text-xl font-bold text-primary text-center mb-4">Ficha de Atendimento</h2>
                            <div className="text-left text-gray-800 space-y-4">
                                {/* DONO */}
                                {/* DONO */}
                                <div>
                                    <h3 className="font-semibold text-lg text-primary mb-1">Dono</h3>
                                    <p><strong>Nome:</strong> {detalhes.cliente}</p>
                                    <p><strong>CPF:</strong> {detalhes.cpf}</p>
                                    <p><strong>Telefone:</strong> ({detalhes.telefone.slice(0, 2)}) {detalhes.telefone.slice(2, 7)}-{detalhes.telefone.slice(7)}</p>
                                    <p><strong>Email:</strong> {detalhes.email}</p>
                                    <p><strong>Endereço:</strong> {detalhes.endereco}</p>
                                </div>

                                {/* PET */}
                                <div>
                                    <h3 className="font-semibold text-lg text-primary mt-4 mb-1">Pet</h3>
                                    <p><strong>Nome:</strong> {detalhes.petNome}</p>
                                    <p><strong>Espécie:</strong> {detalhes.petEspecie}</p>
                                    <p><strong>Raça:</strong> {detalhes.petRaca}</p>
                                    <p><strong>Idade:</strong> {detalhes.petIdade} ano(s)</p>
                                    <p><strong>Sexo:</strong> {detalhes.petSexo}</p>
                                    <p><strong>Pelagem:</strong> {detalhes.petPelagem}</p>
                                </div>

                                {/* SERVIÇO */}
                                <div>
                                    <h3 className="font-semibold text-lg text-primary mt-4 mb-1">Serviço</h3>
                                    <p><strong>Nome:</strong> {detalhes.procedimento}</p>
                                    <p><strong>Preço:</strong> {detalhes.valor}</p>
                                </div>

                                {/* ÚLTIMOS AGENDAMENTOS DO DONO */}
                                <div>
                                    <h3 className="font-semibold text-lg text-primary mt-4 mb-1">Últimos Agendamentos desse Dono</h3>
                                    <ul className="list-disc list-inside text-sm">
                                        <li>01/05/2025 14:00 - 15:00 – Tosa – R$30</li>
                                        <li>03/05/2025 09:00 - 10:00 – Banho – R$10</li>
                                        <li>03/05/2025 09:00 - 10:00 – Banho – R$10</li>
                                    </ul>
                                </div>

                                {/* ÚLTIMOS AGENDAMENTOS DO PET */}
                                <div>
                                    <h3 className="font-semibold text-lg text-primary mt-4 mb-1">Últimos Agendamentos desse Pet</h3>
                                    <ul className="list-disc list-inside text-sm">
                                        <li>01/04/2025 13:00 - 14:00 – Tosa – R$30</li>
                                        <li>15/04/2025 11:00 - 12:00 – Banho – R$10</li>
                                        <li>15/04/2025 11:00 - 13:00 – Banho – R$10</li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div >
    );
}