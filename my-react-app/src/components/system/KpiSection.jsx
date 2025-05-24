import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { CardKpi } from './CardKpi';
import { CardAppointment } from './CardAppointment';
import axios from 'axios';

const agendamentosDoDia = [
    {
        cliente: 'Nicollas',
        pet: 'Valesca - Pug',
        procedimento: 'Banho/tosa/desembolo',
        valor: '10R$',
        horarioInicio: '09:00',
        horarioFim: '10:00',
    },
    {
        cliente: 'Andressa',
        pet: 'Peppa - Shitzu',
        procedimento: 'Tosa',
        valor: '30R$',
        horarioInicio: '10:00',
        horarioFim: '10:30',
    },
    {
        cliente: 'Matheus',
        pet: 'Thor - Pastor Alemão',
        procedimento: 'Banho',
        valor: '30R$',
        horarioInicio: '11:00',
        horarioFim: '12:00',
    },
];

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
        fetch("http://localhost:8080/dashboards/procedures/most-performed-month", {
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
        fetch(" http://localhost:8080/dashboards/procedures/least-performed-month", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

            .then((res) => res.json())
            .then((json) => setDataKPI2(json))
            .catch((err) => console.error("Erro ao buscar dados:", err));
    }, []);

   

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
                <CardKpi title="Horário de Maior Movimento" description="10:00 - 12:00 / 1" />
                <CardKpi title="Horário de Menor Movimento" description="10:00 - 12:00 / 1" />
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
                        <h4 className="text-lg font-semibold text-center mb-4 text-gray-700">Agendamentos do Dia (20/20/2020)</h4>
                        <div className="flex gap-4 overflow-x-auto pb-4 w-full">
                            {Array.from({ length: Math.ceil(agendamentosDoDia.length / 2) }, (_, colIndex) => (
                                <div key={colIndex} className="flex flex-col gap-4 min-w-[260px] flex-shrink-0">
                                    {[0, 1].map((offset) => {
                                        const item = agendamentosDoDia[colIndex * 2 + offset];
                                        if (!item) return null;
                                        return (
                                            <div
                                                key={offset}
                                                className="bg-white rounded-xl shadow-md border border-gray-200 cursor-pointer hover:shadow-lg transition"
                                                onClick={() => setDetalhes(item)}
                                            >
                                                <CardAppointment
                                                    horarioInicio={item.horarioInicio}
                                                    horarioFim={item.horarioFim}
                                                    cliente={item.cliente}
                                                    pet={item.pet}
                                                    procedimento={item.procedimento}
                                                    valor={item.valor}

                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de Ficha */}
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
                                <div>
                                    <h3 className="font-semibold text-lg text-primary mb-1">Dono</h3>
                                    <p><strong>Nome:</strong> {detalhes.cliente}</p>
                                    <p><strong>CPF:</strong> 123.456.789-00</p>
                                    <p><strong>Telefone:</strong> (11) 98765-4321</p>
                                    <p><strong>Email:</strong> nicollas@email.com</p>
                                    <p><strong>Endereço:</strong> Rua das Flores, 123, Apto 45, São Paulo - 01234-567</p>
                                </div>

                                {/* PET */}
                                <div>
                                    <h3 className="font-semibold text-lg text-primary mt-4 mb-1">Pet</h3>
                                    <p><strong>Nome:</strong> {detalhes.pet.split(' - ')[0]}</p>
                                    <p><strong>Espécie:</strong> Cachorro</p>
                                    <p><strong>Raça:</strong> {detalhes.pet.split(' - ')[1]}</p>
                                    <p><strong>Idade:</strong> 5 anos</p>
                                    <p><strong>Sexo:</strong> Fêmea</p>
                                    <p><strong>Pelagem:</strong> Curta</p>
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
                                    <ul className="list-disc list-inside">
                                        <li>01/05/2025 14:00 - 15:00 – Tosa – 30R$</li>
                                        <li>03/05/2025 09:00 - 10:00 – Banho – 10R$</li>
                                        <li>03/05/2025 09:00 - 10:00 – Banho – 10R$</li>
                                    </ul>
                                </div>

                                {/* ÚLTIMOS AGENDAMENTOS DO PET */}
                                <div>
                                    <h3 className="font-semibold text-lg text-primary mt-4 mb-1">Últimos Agendamentos desse Pet</h3>
                                    <ul className="list-disc list-inside">
                                        <li>01/04/2025 13:00 - 14:00– Tosa – 30R$</li>
                                        <li>15/04/2025 11:00 - 12:00 – Banho – 10R$</li>
                                        <li>15/04/2025 11:00 - 13:00 – Banho – 10R$</li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}