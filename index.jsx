<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Projeto Envios - Operação Pesado</title>
    
    <!-- Carregando Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Carregando React e ReactDOM -->
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    
    <!-- Carregando Babel para processar JSX -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <!-- Estilos Globais -->
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #f1f5f9; }
        
        @keyframes flow {
            to { stroke-dashoffset: -20; }
        }
        .animate-flow {
            animation: flow 1s linear infinite;
        }
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        /* Fade In Animation */
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fadeIn 0.3s ease-out forwards;
        }
    </style>
</head>
<body>
    <div id="root"></div>

    <script type="text/babel">
        const { useState, useEffect } = React;

        // --- ÍCONES SVG (Substituindo Lucide-React) ---
        // Criamos componentes SVG simples para não depender de build systems
        const IconBase = ({ children, size = 24, className = "", ...props }) => (
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width={size} 
                height={size} 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className={className} 
                {...props}
            >
                {children}
            </svg>
        );

        const Truck = (props) => <IconBase {...props}><path d="M10 17h4V5H2v12h3"/><path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h1"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></IconBase>;
        const Package = (props) => <IconBase {...props}><path d="M16.5 9.4 7.55 4.24"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/></IconBase>;
        const ShoppingCart = (props) => <IconBase {...props}><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></IconBase>;
        const Server = (props) => <IconBase {...props}><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></IconBase>;
        const ArrowDown = (props) => <IconBase {...props}><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></IconBase>;
        const AlertTriangle = (props) => <IconBase {...props}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></IconBase>;
        const CheckCircle = (props) => <IconBase {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></IconBase>;
        const Database = (props) => <IconBase {...props}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></IconBase>;
        const ArrowRight = (props) => <IconBase {...props}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></IconBase>;
        const RefreshCw = (props) => <IconBase {...props}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></IconBase>;
        const FileText = (props) => <IconBase {...props}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></IconBase>;
        const MapPin = (props) => <IconBase {...props}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></IconBase>;
        const TrendingUp = (props) => <IconBase {...props}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 20.72 11.43 22 7 17.57 2.43 16 7"/></IconBase>;
        const ShieldCheck = (props) => <IconBase {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></IconBase>;
        const Zap = (props) => <IconBase {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></IconBase>;
        const Layout = (props) => <IconBase {...props}><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></IconBase>;
        const Users = (props) => <IconBase {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></IconBase>;
        const Globe = (props) => <IconBase {...props}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></IconBase>;
        const BarChart = (props) => <IconBase {...props}><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></IconBase>;
        const Play = (props) => <IconBase {...props}><polygon points="5 3 19 12 5 21 5 3"/></IconBase>;
        const Target = (props) => <IconBase {...props}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></IconBase>;
        const Layers = (props) => <IconBase {...props}><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></IconBase>;
        const Box = (props) => <IconBase {...props}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></IconBase>;
        const Anchor = (props) => <IconBase {...props}><circle cx="12" cy="5" r="3"/><line x1="12" y1="22" x2="12" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/></IconBase>;
        const Info = (props) => <IconBase {...props}><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></IconBase>;
        const X = (props) => <IconBase {...props}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></IconBase>;

        // Cores e Estilos Base dos Nós do Fluxograma
        const COLORS = {
            transfer: "bg-blue-50 border-blue-600 text-blue-900 shadow-blue-100",
            sale: "bg-emerald-50 border-emerald-600 text-emerald-900 shadow-emerald-100",
            system: "bg-slate-50 border-slate-600 text-slate-900 shadow-slate-200",
            warning: "bg-amber-50 border-amber-500 text-amber-900 dashed-border shadow-amber-100",
            control: "bg-purple-50 border-purple-600 text-purple-900 shadow-purple-100"
        };

        const Node = ({ data, onClick, isSelected }) => {
            const Icon = data.icon;
            let styleClass = COLORS.system;
            if (data.type === 'transfer') styleClass = COLORS.transfer;
            if (data.type === 'sale') styleClass = COLORS.sale;
            if (data.type === 'warning') styleClass = COLORS.warning;
            if (data.type === 'control') styleClass = COLORS.control;

            return (
                <div 
                    onClick={(e) => {
                        e.stopPropagation(); 
                        onClick(data);
                    }}
                    className={`
                        absolute transform -translate-x-1/2 -translate-y-1/2 
                        w-52 p-4 rounded-xl border-l-4 shadow-lg cursor-pointer transition-all duration-300
                        hover:shadow-2xl hover:-translate-y-1/2 hover:scale-105 z-10 bg-white
                        ${styleClass.replace('bg-', 'border-l-')} 
                        ${isSelected ? 'ring-2 ring-offset-2 ring-indigo-500 scale-105' : ''}
                    `}
                    style={{ left: data.x, top: data.y }}
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 rounded-lg bg-opacity-10 ${styleClass.split(' ')[0].replace('bg-', 'bg-')}`}>
                            <Icon size={20} className={styleClass.split(' ')[2]} />
                        </div>
                        <span className="font-bold text-xs uppercase tracking-wider text-slate-700">{data.label}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-snug">{data.shortDesc}</p>
                    
                    {data.system && (
                        <div className="absolute -top-3 -right-2 shadow-sm bg-slate-800 text-white text-[10px] font-mono px-2 py-1 rounded-md border border-slate-600">
                            {data.system}
                        </div>
                    )}
                </div>
            );
        };

        const Connection = ({ start, end, label, type }) => {
            const startY = start.y + 50;
            const endY = end.y - 50;
            const midY = (startY + endY) / 2;
            const path = `M ${start.x} ${startY} C ${start.x} ${midY}, ${end.x} ${midY}, ${end.x} ${endY}`;
            
            const strokeColor = type === 'secondary' ? '#cbd5e1' : '#64748b';
            const isSecondary = type === 'secondary';

            return (
                <g>
                    <path d={path} fill="none" stroke={strokeColor} strokeWidth={isSecondary ? "2" : "3"} />
                    
                    {!isSecondary && (
                        <path 
                            d={path} 
                            fill="none" 
                            stroke={type === 'sale' ? '#10b981' : '#3b82f6'} 
                            strokeWidth="2" 
                            strokeDasharray="5,5" 
                            className="animate-flow opacity-60"
                        />
                    )}

                    <path 
                        d={`M ${end.x} ${endY} L ${end.x - 5} ${endY - 10} L ${end.x + 5} ${endY - 10} Z`} 
                        fill={strokeColor} 
                    />

                    {label && (
                        <g>
                            <rect x={(start.x + end.x) / 2 - 45} y={midY - 12} width="90" height="24" rx="12" fill="white" stroke="#e2e8f0" className="shadow-sm"/>
                            <text x={(start.x + end.x) / 2} y={midY + 5} textAnchor="middle" className="text-[10px] fill-slate-600 font-bold uppercase tracking-tight">
                                {label}
                            </text>
                        </g>
                    )}
                </g>
            );
        };

        const SellerPresentation = () => {
            return (
                <div className="max-w-6xl mx-auto h-full overflow-y-auto bg-slate-50 font-sans scrollbar-hide">
                    <div className="bg-white shadow-xl min-h-screen pb-20">
                        <div className="bg-slate-900 text-white pt-20 pb-24 px-12 relative overflow-hidden">
                            <div className="relative z-10 max-w-4xl mt-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="bg-amber-500 text-slate-900 px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-sm">Logística Estratégica</span>
                                </div>
                                <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
                                    ENVIOS <span className="text-amber-500">PESADO</span>
                                </h1>
                                <p className="text-xl text-slate-300 font-light max-w-2xl leading-relaxed border-l-4 border-amber-500 pl-4">
                                    Modelo Operacional com Estoque Transitório. <br/>
                                    <span className="text-base text-slate-400 mt-2 block">
                                        Uma evolução natural para sellers que buscam prazos competitivos e escala operacional, sem os custos de uma estrutura física própria em SP.
                                    </span>
                                </p>
                            </div>
                            <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-slate-800 to-transparent opacity-50"></div>
                            <div className="absolute -right-10 bottom-10 text-slate-800 opacity-20 transform -rotate-12">
                                <Truck size={400} />
                            </div>
                        </div>

                        <div className="px-12 -mt-10 relative z-20 mb-20">
                            <div className="bg-white rounded-xl shadow-xl p-8 border border-slate-100">
                                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                    <Target className="text-amber-500" /> O Desafio & A Solução
                                </h2>
                                <p className="text-slate-600 mb-8 max-w-4xl">
                                    O modelo foi desenhado para resolver três dores principais: <strong>redução do prazo de entrega</strong>, <strong>melhoria de performance (Buybox)</strong> e <strong>escalabilidade</strong>. Não é apenas transporte, nem armazenagem tradicional — é um modelo híbrido estratégico.
                                </p>
                                <div className="grid md:grid-cols-3 gap-8">
                                    <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-blue-500 hover:shadow-md transition-all">
                                        <div className="flex items-center gap-3 mb-3">
                                            <Zap className="text-blue-600" size={24} />
                                            <h3 className="font-bold text-slate-800">Velocidade</h3>
                                        </div>
                                        <p className="text-sm text-slate-600">Produto posicionado em SP reduz drasticamente o tempo de trânsito até o cliente final.</p>
                                    </div>
                                    <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-emerald-500 hover:shadow-md transition-all">
                                        <div className="flex items-center gap-3 mb-3">
                                            <TrendingUp className="text-emerald-600" size={24} />
                                            <h3 className="font-bold text-slate-800">Performance</h3>
                                        </div>
                                        <p className="text-sm text-slate-600">Melhor prazo significa melhor posicionamento no marketplace e maior conversão.</p>
                                    </div>
                                    <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-purple-500 hover:shadow-md transition-all">
                                        <div className="flex items-center gap-3 mb-3">
                                            <Layers className="text-purple-600" size={24} />
                                            <h3 className="font-bold text-slate-800">Escala</h3>
                                        </div>
                                        <p className="text-sm text-slate-600">Fluxo monitorado que permite crescer o volume de vendas com segurança operacional.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="px-12 mb-20">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-slate-900">Estrutura Geral da Operação</h2>
                                <p className="text-slate-500 mt-2">O modelo opera em duas macrofrentes independentes, porém integradas</p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-12">
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-blue-100 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform"></div>
                                    <div className="relative bg-white border border-blue-200 p-8 rounded-2xl shadow-sm h-full hover:shadow-lg transition-all">
                                        <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-xl mb-6 shadow-lg shadow-blue-200">1</div>
                                        <h3 className="text-xl font-bold text-blue-900 mb-4">Formação de Estoque (Barueri/SP)</h3>
                                        <p className="text-slate-600 mb-6 text-sm">Abastecimento da base logística da UX via nota de remessa.</p>
                                        <ul className="space-y-3">
                                            {['Emissão de nota de remessa pelo Seller', 'Coleta e transporte até a base UX', 'Conferência física e documental', 'Disponibilização como estoque transitório'].map((item, i) => (
                                                <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                                                    <CheckCircle size={16} className="mt-0.5 text-blue-500 shrink-0" /> {item}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="mt-6 pt-6 border-t border-blue-100">
                                            <span className="text-xs font-bold text-blue-800 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">DIFERENCIAL</span>
                                            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                                                Não é armazenagem tradicional. É um estoque operacional dinâmico com finalidade exclusiva de acelerar a expedição.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative group">
                                    <div className="absolute inset-0 bg-emerald-100 rounded-2xl transform -rotate-1 group-hover:-rotate-2 transition-transform"></div>
                                    <div className="relative bg-white border border-emerald-200 p-8 rounded-2xl shadow-sm h-full hover:shadow-lg transition-all">
                                        <div className="w-12 h-12 bg-emerald-600 text-white rounded-xl flex items-center justify-center font-bold text-xl mb-6 shadow-lg shadow-emerald-200">2</div>
                                        <h3 className="text-xl font-bold text-emerald-900 mb-4">Venda & Execução Logística</h3>
                                        <p className="text-slate-600 mb-6 text-sm">Orquestração automática do pedido à entrega.</p>
                                        <ul className="space-y-3">
                                            {['Pedido integrado ao Fusion (Regra Pesado)', 'Acionamento simultâneo: Separação + Transporte', 'Emissão automática de CTE e Coleta', 'Entrega ao cliente final'].map((item, i) => (
                                                <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                                                    <CheckCircle size={16} className="mt-0.5 text-emerald-500 shrink-0" /> {item}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="mt-6 pt-6 border-t border-emerald-100">
                                            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">VISIBILIDADE</span>
                                            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                                                O seller acompanha todo o fluxo de ponta a ponta, com atualização de status em tempo real.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-50 py-20 px-12 border-t border-slate-200">
                            <div className="max-w-5xl mx-auto">
                                <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Integração & Governança</h2>
                                <div className="grid md:grid-cols-2 gap-16 items-start">
                                    <div>
                                        <h3 className="font-bold text-xl text-slate-800 mb-4 flex items-center gap-2">
                                            <Server className="text-indigo-600"/> Flexibilidade Sistêmica
                                        </h3>
                                        <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                                            O modelo mantém o sistema central (Fusion) como orquestrador, garantindo estabilidade.
                                        </p>
                                        <div className="space-y-4">
                                            <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200">
                                                <h4 className="font-bold text-sm text-slate-700 mb-2">Opções para o Seller</h4>
                                                <div className="flex gap-2 mb-2">
                                                    {['API', 'Webhook', 'FTP'].map(t => (
                                                        <span key={t} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs rounded font-mono border font-bold">{t}</span>
                                                    ))}
                                                </div>
                                                <p className="text-xs text-slate-400">Escolha a melhor forma de trocar dados de estoque e pedidos.</p>
                                            </div>
                                            <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200">
                                                <h4 className="font-bold text-sm text-slate-700 mb-2">Transporte (Obrigatório)</h4>
                                                <div className="flex gap-2 items-center">
                                                    <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs rounded font-mono border border-indigo-100 font-bold">API Integrada</span>
                                                </div>
                                                <p className="text-xs text-slate-400 mt-2">Garante emissão automática de CTE e redução de erro manual.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl text-slate-800 mb-4 flex items-center gap-2">
                                            <ShieldCheck className="text-indigo-600"/> Segurança Operacional
                                        </h3>
                                        <div className="bg-white rounded-lg shadow-sm border border-slate-200 divide-y">
                                            {[
                                                { title: "Gestão de Estoque", desc: "Saldo atualizado a cada venda. Alertas automáticos de estoque mínimo para evitar ruptura." },
                                                { title: "Segurança Fiscal", desc: "Validação rigorosa da nota de remessa e conformidade tributária do estoque transitório." },
                                                { title: "Monitoramento de SLA", desc: "Acompanhamento contínuo dos tempos de separação e coleta para garantir a promessa de entrega." }
                                            ].map((item, i) => (
                                                <div key={i} className="p-4 flex gap-4">
                                                    <div className="mt-1 bg-indigo-100 p-1.5 rounded-full h-fit text-indigo-600"><CheckCircle size={14}/></div>
                                                    <div>
                                                        <h4 className="font-bold text-sm text-slate-800">{item.title}</h4>
                                                        <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="px-12 py-20">
                            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Benefícios Estratégicos</h2>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                {[
                                    { icon: Zap, label: "Redução de Prazo", desc: "Menor tempo de trânsito." },
                                    { icon: TrendingUp, label: "Posicionamento", desc: "Mais conversão no marketplace." },
                                    { icon: Box, label: "Profissionalização", desc: "Operação estruturada em SP." },
                                    { icon: BarChart, label: "Controle Total", desc: "Gestão preditiva de estoque." },
                                ].map((stat, i) => (
                                    <div key={i} className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-amber-500 hover:transform hover:-translate-y-1 transition-all">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="p-3 bg-slate-50 rounded-full text-slate-900">
                                                <stat.icon size={24} />
                                            </div>
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900 mb-2">{stat.label}</h3>
                                        <p className="text-sm text-slate-500 leading-relaxed">{stat.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-slate-900 text-white px-12 py-16 text-center">
                            <Globe className="w-12 h-12 mx-auto mb-6 text-amber-500" />
                            <h2 className="text-2xl font-bold mb-4">Conclusão Executiva</h2>
                            <p className="text-slate-300 max-w-3xl mx-auto text-lg leading-relaxed mb-8">
                                O ENVIOS PESADO combina estoque próximo do cliente, integração sistêmica e capacidade real de escala. É a evolução natural para sellers que desejam crescer com controle, previsibilidade e estrutura profissional.
                            </p>
                        </div>
                    </div>
                </div>
            );
        };

        function App() {
            const [activeTab, setActiveTab] = useState('flowchart'); 
            const [selectedNode, setSelectedNode] = useState(null);
            
            const nodes = [
                // BLOCO 1: TRANSFERÊNCIA
                { 
                    id: 'n1', type: 'transfer', x: 250, y: 150, 
                    label: 'Origem (Seller)', icon: Package, system: 'ERP Seller', 
                    shortDesc: 'Emissão de Nota de Remessa', 
                    details: 'O Seller inicia o processo emitindo uma Nota Fiscal de Remessa para Depósito Fechado ou Armazém Geral (conforme validação fiscal). Esta ação sinaliza o início do abastecimento da base UX em Barueri, transferindo a custódia logística.' 
                },
                { 
                    id: 'n2', type: 'transfer', x: 250, y: 300, 
                    label: 'Integrações', icon: Server, system: 'API Trucks / WMX', 
                    shortDesc: 'Solicitação de Coleta & Dados', 
                    details: 'O sistema realiza duas comunicações críticas: 1) Envia dados da carga para o Trucks (TMS) gerar a ordem de coleta; 2) Envia o ASN (Advanced Shipping Notice) para o WMX (WMS) preparar o recebimento, garantindo que o CD saiba exatamente o que está chegando.' 
                },
                { 
                    id: 'n3', type: 'transfer', x: 250, y: 450, 
                    label: 'Transporte Inbound', icon: Truck, system: 'Logística', 
                    shortDesc: 'Coleta e Viagem', 
                    details: 'Transportadora parceira, acionada pelo Trucks, coleta a mercadoria no CD do Seller e realiza o transporte (Linehaul) até o Centro de Distribuição da UX em Barueri/SP. O rastreamento é monitorado até a chegada na doca.' 
                },
                { 
                    id: 'n4', type: 'transfer', x: 250, y: 600, 
                    label: 'Recebimento', icon: Database, system: 'WMX', 
                    shortDesc: 'Conferência Física', 
                    details: 'No CD UX, a carga passa por conferência cega (blind check) para validar quantidades e integridade física contra o XML da nota. Após validação, o WMX realiza a entrada fiscal e endereçamento do produto.' 
                },
                { 
                    id: 'n5', type: 'transfer', x: 250, y: 750, 
                    label: 'Estoque Disponível', icon: CheckCircle, system: 'Site / MktPlace', 
                    shortDesc: 'Saldo Transitório', 
                    details: 'O produto é classificado como "Estoque Transitório". O saldo é integrado ao Marketplace, ativando a oferta com o SLA de entrega reduzido (Ex: D+1 para SP), melhorando instantaneamente o Buybox e a conversão.' 
                },

                // BLOCO 2: VENDA
                { 
                    id: 'n6', type: 'sale', x: 800, y: 150, 
                    label: 'Pedido (MktPlace)', icon: ShoppingCart, system: 'Mirakl / VTEX', 
                    shortDesc: 'Compra confirmada', 
                    details: 'O cliente final realiza a compra no site. O pedido é capturado pela plataforma (Mirakl) e desce para o sistema de gestão de pedidos (OMS) para processamento financeiro e fraude.' 
                },
                { 
                    id: 'n7', type: 'sale', x: 800, y: 300, 
                    label: 'Orquestrador', icon: Server, system: 'Fusion', 
                    shortDesc: 'Roteamento Pesado', 
                    details: 'O Fusion (OMS) analisa o pedido. Ao identificar SKUs marcados como "Envios Pesado", ele divide o pedido se necessário e roteia a ordem de serviço especificamente para o fluxo de expedição da base Barueri.' 
                },
                { 
                    id: 'n8', type: 'sale', x: 650, y: 450, 
                    label: 'Separação', icon: Package, system: 'WMX', 
                    shortDesc: 'Pick & Pack', 
                    details: 'O WMX recebe a ordem de venda, gera a onda de separação (wave picking), orienta os operadores para a coleta dos itens no armazém e finaliza a embalagem (packing) na doca de expedição.' 
                },
                { 
                    id: 'n9', type: 'sale', x: 950, y: 450, 
                    label: 'Gestão Frete', icon: FileText, system: 'Trucks', 
                    shortDesc: 'Emissão CTE', 
                    details: 'Paralelamente à separação, o Trucks recebe os dados da venda, seleciona a melhor transportadora (roteirização), emite o CTe e a etiqueta de transporte, e agenda a coleta na doca da UX.' 
                },
                { 
                    id: 'n10', type: 'sale', x: 800, y: 600, 
                    label: 'Coleta & Last Mile', icon: Truck, system: 'Transportadora', 
                    shortDesc: 'Expedição', 
                    details: 'A transportadora de Last Mile coleta os pedidos já separados e etiquetados na doca da UX e inicia o roteiro de entrega urbana para o endereço do cliente final.' 
                },
                { 
                    id: 'n11', type: 'sale', x: 800, y: 750, 
                    label: 'Entrega Final', icon: CheckCircle, system: 'OndeTah', 
                    shortDesc: 'Baixa no App', 
                    details: 'O motorista realiza a entrega e confirma via aplicativo móvel (POD - Proof of Delivery). O sistema OndeTah atualiza o status para "Entregue" no Marketplace e notifica o Seller da conclusão.' 
                },

                // CONTROLE
                { 
                    id: 'n12', type: 'control', x: 525, y: 850, 
                    label: 'Monitoramento', icon: RefreshCw, system: 'Automático', 
                    shortDesc: 'Gatilho Reposição', 
                    details: 'Um algoritmo monitora a velocidade de vendas (giro) versus o saldo atual. Quando o estoque atinge o nível mínimo de segurança, um alerta é disparado sugerindo ao Seller uma nova remessa de abastecimento.' 
                },
            ];

            const connections = [
                { from: 'n1', to: 'n2' },
                { from: 'n2', to: 'n3' },
                { from: 'n3', to: 'n4' },
                { from: 'n4', to: 'n5' },
                { from: 'n6', to: 'n7', type: 'sale' },
                { from: 'n7', to: 'n8', label: 'Separação', type: 'sale' },
                { from: 'n7', to: 'n9', label: 'Frete', type: 'sale' },
                { from: 'n8', to: 'n10', type: 'sale' },
                { from: 'n9', to: 'n10', type: 'sale' },
                { from: 'n10', to: 'n11', type: 'sale' },
                { from: 'n5', to: 'n12', type: 'secondary' },
                { from: 'n11', to: 'n12', type: 'secondary' },
            ];

            return (
                <div className="flex flex-col h-screen font-sans text-slate-800 overflow-hidden">
                    
                    {/* Header da Aplicação */}
                    <header className="bg-white border-b border-slate-200 px-6 py-3 shadow-sm flex justify-between items-center z-30">
                        <div className="flex items-center gap-6">
                            {/* Logos Branding (Visíveis na Navbar) */}
                            <div className="flex items-center gap-4 border-r border-slate-200 pr-6 h-12">
                                <img 
                                    src="image_6bf0f0.png" 
                                    alt="Carrefour" 
                                    className="h-full w-auto object-contain"
                                    onError={(e) => { e.target.style.display = 'none'; }} 
                                />
                                <span className="hidden font-bold text-blue-800" id="fallback-carrefour">Carrefour</span>
                                
                                <div className="h-6 w-px bg-slate-200 mx-2"></div>
                                
                                <img 
                                    src="image_6bf0d7.png" 
                                    alt="UX" 
                                    className="h-3/4 w-auto object-contain opacity-90"
                                    onError={(e) => { e.target.style.display = 'none'; }} 
                                />
                                <span className="hidden font-bold text-black" id="fallback-ux">UX</span>
                            </div>

                            <div>
                                <h1 className="text-lg font-bold text-slate-900 leading-none">Projeto Envios</h1>
                                <p className="text-xs text-slate-500 font-medium">Operação Pesado SP</p>
                            </div>
                        </div>
                        
                        <div className="bg-slate-100 p-1 rounded-lg flex text-sm font-semibold shadow-inner">
                            <button 
                                onClick={() => setActiveTab('flowchart')}
                                className={`px-4 py-2 rounded-md transition-all flex items-center gap-2 ${activeTab === 'flowchart' ? 'bg-white text-blue-600 shadow-sm ring-1 ring-black/5' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                <Layout size={16} /> Visão Técnica
                            </button>
                            <button 
                                onClick={() => setActiveTab('presentation')}
                                className={`px-4 py-2 rounded-md transition-all flex items-center gap-2 ${activeTab === 'presentation' ? 'bg-white text-amber-600 shadow-sm ring-1 ring-black/5' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                <Users size={16} /> Visão Comercial
                            </button>
                        </div>
                    </header>

                    <div className="flex flex-1 overflow-hidden relative">
                        {activeTab === 'presentation' ? (
                            <SellerPresentation />
                        ) : (
                            <>
                                {/* Sidebar Detalhes */}
                                <div className="w-96 bg-white border-r border-slate-200 shadow-xl z-20 flex flex-col overflow-hidden transition-all">
                                    <div className="p-6 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                                        <div>
                                            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Painel de Detalhes</h2>
                                            <p className="text-xs text-slate-500">Selecione um nó para inspecionar</p>
                                        </div>
                                        {selectedNode && (
                                            <button onClick={() => setSelectedNode(null)} className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600">
                                                <X size={18} />
                                            </button>
                                        )}
                                    </div>
                                    
                                    <div className="flex-1 overflow-y-auto p-6">
                                        {selectedNode ? (
                                            <div className="animate-fade-in relative">
                                                <div className="flex items-start gap-4 mb-6">
                                                    <div className={`p-3 rounded-xl shadow-sm ${
                                                        selectedNode.type === 'transfer' ? 'bg-blue-100 text-blue-700' : 
                                                        selectedNode.type === 'sale' ? 'bg-emerald-100 text-emerald-700' : 
                                                        selectedNode.type === 'control' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100'
                                                    }`}>
                                                        <selectedNode.icon size={32} />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-xl text-slate-900">{selectedNode.label}</h3>
                                                        <span className="text-xs font-mono bg-slate-800 text-white px-2 py-0.5 rounded mt-1 inline-block">
                                                            {selectedNode.system}
                                                        </span>
                                                    </div>
                                                </div>
                                                
                                                <div className="space-y-6">
                                                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                                                        <h4 className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-1"><FileText size={12}/> Descrição Funcional</h4>
                                                        <p className="text-slate-700 text-sm leading-relaxed">{selectedNode.details}</p>
                                                    </div>

                                                    {selectedNode.type === 'transfer' && (
                                                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 text-blue-800 text-sm">
                                                            <strong>Objetivo:</strong> Abastecimento da base UX.
                                                        </div>
                                                    )}
                                                    {selectedNode.type === 'sale' && (
                                                        <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100 text-emerald-800 text-sm">
                                                            <strong>Objetivo:</strong> Entrega rápida ao cliente (SLA D+1).
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="animate-fade-in space-y-6">
                                                <div className="flex items-center gap-4 mb-2">
                                                    <div className="p-3 rounded-xl shadow-sm bg-indigo-100 text-indigo-700">
                                                        <Info size={32} />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-xl text-slate-900">Visão Geral</h3>
                                                        <span className="text-xs font-mono bg-slate-800 text-white px-2 py-0.5 rounded mt-1 inline-block">
                                                            Fluxo Macro
                                                        </span>
                                                    </div>
                                                </div>
                                                
                                                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                                                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-1">
                                                        <FileText size={12}/> Resumo do Processo
                                                    </h4>
                                                    <p className="text-slate-700 text-sm leading-relaxed">
                                                        Este fluxograma detalha a operação <strong>Envios Pesado</strong>, conectando o Seller à infraestrutura logística da UX em SP.
                                                        <br/><br/>
                                                        Clique nos blocos ao lado para visualizar as regras de negócio, integrações (API/FTP) e SLAs de cada etapa.
                                                    </p>
                                                </div>
                                                
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div className="p-3 bg-blue-50 border border-blue-100 rounded text-center">
                                                        <div className="text-blue-600 font-bold text-lg">Inbound</div>
                                                        <div className="text-xs text-blue-400">Transferência</div>
                                                    </div>
                                                    <div className="p-3 bg-emerald-50 border border-emerald-100 rounded text-center">
                                                        <div className="text-emerald-600 font-bold text-lg">Outbound</div>
                                                        <div className="text-xs text-emerald-400">Venda</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Canvas Fluxograma */}
                                <div 
                                    className="flex-1 overflow-auto relative bg-slate-100 cursor-grab active:cursor-grabbing"
                                    onClick={() => setSelectedNode(null)} 
                                >
                                    <div className="relative min-w-[1200px] min-h-[1000px] mx-auto py-10">
                                        
                                        {/* Título do Fluxograma */}
                                        <div className="absolute top-0 left-0 w-full text-center mt-4 pointer-events-none z-10">
                                            <h2 className="text-2xl font-bold text-slate-300 uppercase tracking-[0.2em]">Fluxo Operacional - Envios Pesado</h2>
                                        </div>
                                        
                                        <div className="absolute inset-0 flex pointer-events-none mx-10 my-10 bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                                            <div className="w-1/2 border-r border-slate-100 bg-gradient-to-b from-blue-50/50 to-white relative">
                                                <div className="absolute top-6 left-6 flex items-center gap-2 text-blue-300 font-bold text-6xl opacity-20 select-none">
                                                    INBOUND <ArrowDown size={60}/>
                                                </div>
                                            </div>
                                            <div className="w-1/2 bg-gradient-to-b from-emerald-50/50 to-white relative">
                                                <div className="absolute top-6 right-6 flex items-center gap-2 text-emerald-300 font-bold text-6xl opacity-20 select-none">
                                                    <ArrowDown size={60}/> OUTBOUND
                                                </div>
                                            </div>
                                        </div>

                                        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                                            {connections.map((conn, index) => {
                                                const startNode = nodes.find(n => n.id === conn.from);
                                                const endNode = nodes.find(n => n.id === conn.to);
                                                if (!startNode || !endNode) return null;
                                                return (
                                                    <Connection 
                                                        key={index} 
                                                        start={startNode} 
                                                        end={endNode} 
                                                        label={conn.label}
                                                        type={conn.type}
                                                    />
                                                );
                                            })}
                                            
                                            <path 
                                                d="M 525 850 C 100 850, 100 150, 250 150" 
                                                fill="none" 
                                                stroke="#a855f7" 
                                                strokeWidth="2" 
                                                strokeDasharray="8,8"
                                                className="opacity-30"
                                            />
                                            <text x="130" y="500" className="text-[10px] fill-purple-400 font-bold -rotate-90 tracking-widest">GATILHO DE REPOSIÇÃO</text>
                                        </svg>

                                        {nodes.map(node => (
                                            <Node 
                                                key={node.id} 
                                                data={node} 
                                                onClick={setSelectedNode}
                                                isSelected={selectedNode?.id === node.id}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            );
        }

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
    </script>
</body>
</html>
