import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { CardKpi } from './CardKpi';
import { CardAppointment } from './CardAppointment';

const weeklyData = [
    { day: 'Seg', clientes: 20 },
    { day: 'Ter', clientes: 35 },
    { day: 'Qua', clientes: 30 },
    { day: 'Qui', clientes: 45 },
    { day: 'Sex', clientes: 50 },
    { day: 'Sáb', clientes: 60 },
    { day: 'Dom', clientes: 15 },
];

const agendamentosDoDia = [
    {
        cliente: 'Nicollas',
        pet: 'Valesca - Pug',
        procedimento: 'Banho',
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
    const [detalhes, setDetalhes] = useState(null);

    return (
        <div className="flex-1 h-full bg-slate-100 flex justify-center items-center flex-col gap-8 pt-32">
            {/* KPIs */}
            <div className="w-full h-10 flex flex-row gap-[30px] justify-center mt-[15px]">
                <CardKpi title="Procedimento Mais Realizado" description="Banho - 1" />
                <CardKpi title="Procedimento com Menor Demanda " description="Tosa - 1" />
                <CardKpi title="Horário de Maior Movimento" description="10:00 12 - 1" />
                <CardKpi title="Horário de Menor Movimento" description="10 ás 12 - 1" />
            </div>

            {/* Gráfico + Lista */}
            <div className="w-full mt-8 p-4 rounded-2xl h-full">
                <div className="max-w-[1124px] mx-auto h-[90%] flex gap-6">
                    {/* Gráfico */}
                    <div className="w-[50%] h-[450px] flex justify-center items-center flex-col border border-primary bg-white rounded-xl gap-8">
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
                    <div className="w-[50%] h-full overflow-x-auto p-4 bg-white rounded-xl border border-primary">
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