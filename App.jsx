// App.jsx
import React, { useMemo, useState } from "react";
import {
  ArrowDown,
  BarChart,
  CheckCircle,
  Database,
  FileText,
  Info,
  Layout,
  RefreshCw,
  Server,
  ShoppingCart,
  Target,
  Truck,
  Users,
  X,
  Zap,
  TrendingUp,
  Layers,
  Box,
  Globe,
  ShieldCheck,
  Package,
} from "lucide-react";

/**
 * PROJETO ENVIOS PESADO
 * - Aba 1: Fluxograma técnico interativo (SVG)
 * - Aba 2: Apresentação comercial ao Seller
 */

const flowCSS = `
@keyframes flow { to { stroke-dashoffset: -20; } }
.animate-flow { animation: flow 1s linear infinite; }
.scrollbar-hide::-webkit-scrollbar{display:none;}
.scrollbar-hide{-ms-overflow-style:none; scrollbar-width:none;}
`;

const NODE_STYLES = {
  transfer: {
    wrap: "bg-blue-50 border-blue-600 text-blue-900 shadow-blue-100",
    badge: "bg-blue-600",
    iconBg: "bg-blue-100",
    iconText: "text-blue-700",
  },
  sale: {
    wrap: "bg-emerald-50 border-emerald-600 text-emerald-900 shadow-emerald-100",
    badge: "bg-emerald-600",
    iconBg: "bg-emerald-100",
    iconText: "text-emerald-700",
  },
  control: {
    wrap: "bg-purple-50 border-purple-600 text-purple-900 shadow-purple-100",
    badge: "bg-purple-600",
    iconBg: "bg-purple-100",
    iconText: "text-purple-700",
  },
  system: {
    wrap: "bg-slate-50 border-slate-600 text-slate-900 shadow-slate-200",
    badge: "bg-slate-700",
    iconBg: "bg-slate-100",
    iconText: "text-slate-700",
  },
  warning: {
    wrap: "bg-amber-50 border-amber-500 text-amber-900 shadow-amber-100 border-dashed",
    badge: "bg-amber-600",
    iconBg: "bg-amber-100",
    iconText: "text-amber-700",
  },
};

function Node({ data, isSelected, onSelect }) {
  const Icon = data.icon;
  const s = NODE_STYLES[data.type] || NODE_STYLES.system;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onSelect(data);
      }}
      className={[
        "absolute -translate-x-1/2 -translate-y-1/2 w-52 p-4 rounded-xl border-l-4 shadow-lg cursor-pointer transition-all duration-300 z-10",
        "hover:shadow-2xl hover:scale-105 bg-white",
        s.wrap,
        isSelected ? "ring-2 ring-offset-2 ring-indigo-500 scale-105" : "",
      ].join(" ")}
      style={{ left: data.x, top: data.y }}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className={["p-2 rounded-lg", s.iconBg].join(" ")}>
          <Icon size={20} className={s.iconText} />
        </div>
        <span className="font-bold text-xs uppercase tracking-wider text-slate-700">
          {data.label}
        </span>
      </div>
      <p className="text-xs text-slate-500 leading-snug">{data.shortDesc}</p>

      {data.system && (
        <div className="absolute -top-3 -right-2 shadow-sm bg-slate-800 text-white text-[10px] font-mono px-2 py-1 rounded-md border border-slate-600">
          {data.system}
        </div>
      )}
    </div>
  );
}

function Connection({ start, end, label, type }) {
  const startY = start.y + 50;
  const endY = end.y - 50;
  const midY = (startY + endY) / 2;
  const path = `M ${start.x} ${startY} C ${start.x} ${midY}, ${end.x} ${midY}, ${end.x} ${endY}`;

  const isSecondary = type === "secondary";
  const strokeColor = isSecondary ? "#cbd5e1" : "#64748b";
  const flowColor = type === "sale" ? "#10b981" : "#3b82f6";

  return (
    <g>
      <path d={path} fill="none" stroke={strokeColor} strokeWidth={isSecondary ? 2 : 3} />
      {!isSecondary && (
        <path
          d={path}
          fill="none"
          stroke={flowColor}
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
          <rect
            x={(start.x + end.x) / 2 - 45}
            y={midY - 12}
            width="90"
            height="24"
            rx="12"
            fill="white"
            stroke="#e2e8f0"
          />
          <text
            x={(start.x + end.x) / 2}
            y={midY + 5}
            textAnchor="middle"
            className="text-[10px] fill-slate-600 font-bold uppercase tracking-tight"
          >
            {label}
          </text>
        </g>
      )}
    </g>
  );
}

function SellerPresentation() {
  return (
    <div className="max-w-6xl mx-auto h-full overflow-y-auto bg-slate-50 font-sans scrollbar-hide">
      <div className="bg-white shadow-xl min-h-screen pb-20">
        <div className="bg-slate-900 text-white pt-20 pb-24 px-12 relative overflow-hidden">
          <div className="relative z-10 max-w-4xl mt-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-amber-500 text-slate-900 px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-sm">
                Logística Estratégica
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
              ENVIOS <span className="text-amber-500">PESADO</span>
            </h1>
            <p className="text-xl text-slate-300 font-light max-w-2xl leading-relaxed border-l-4 border-amber-500 pl-4">
              Modelo Operacional com Estoque Transitório.
              <span className="text-base text-slate-400 mt-2 block">
                Evolução para sellers que buscam prazos competitivos e escala sem estrutura própria em SP.
              </span>
            </p>
          </div>
          <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-slate-800 to-transparent opacity-50" />
          <Truck className="absolute -right-10 bottom-10 text-slate-800 w-96 h-96 opacity-20 -rotate-12" />
        </div>

        <div className="px-12 -mt-10 relative z-20 mb-20">
          <div className="bg-white rounded-xl shadow-xl p-8 border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Target className="text-amber-500" /> O Desafio & A Solução
            </h2>
            <p className="text-slate-600 mb-8 max-w-4xl">
              O modelo resolve três dores: <strong>redução do prazo</strong>, <strong>melhoria de performance (Buybox)</strong> e{" "}
              <strong>escalabilidade</strong>. Não é só transporte, nem armazenagem tradicional — é um híbrido estratégico.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Zap, title: "Velocidade", desc: "Produto em SP reduz drasticamente o tempo de trânsito." , border:"border-blue-500", iconColor:"text-blue-600"},
                { icon: TrendingUp, title: "Performance", desc: "Melhor prazo → melhor posicionamento e conversão.", border:"border-emerald-500", iconColor:"text-emerald-600"},
                { icon: Layers, title: "Escala", desc: "Fluxo monitorado para crescer com segurança operacional.", border:"border-purple-500", iconColor:"text-purple-600"},
              ].map((c, i) => (
                <div key={i} className={`bg-slate-50 p-6 rounded-lg border-l-4 ${c.border} hover:shadow-md transition-all`}>
                  <div className="flex items-center gap-3 mb-3">
                    <c.icon className={c.iconColor} size={24} />
                    <h3 className="font-bold text-slate-800">{c.title}</h3>
                  </div>
                  <p className="text-sm text-slate-600">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="px-12 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Estrutura Geral da Operação</h2>
            <p className="text-slate-500 mt-2">Duas macrofrentes independentes, porém integradas</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-100 rounded-2xl rotate-1 group-hover:rotate-2 transition-transform" />
              <div className="relative bg-white border border-blue-200 p-8 rounded-2xl shadow-sm h-full hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-xl mb-6 shadow-lg shadow-blue-200">
                  1
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-4">Formação de Estoque (Barueri/SP)</h3>
                <p className="text-slate-600 mb-6 text-sm">Abastecimento da base logística via nota de remessa.</p>
                <ul className="space-y-3">
                  {[
                    "Emissão de nota de remessa pelo Seller",
                    "Coleta e transporte até a base UX",
                    "Conferência física e documental",
                    "Disponibilização como estoque transitório",
                  ].map((t, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                      <CheckCircle size={16} className="mt-0.5 text-blue-500 shrink-0" /> {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-6 border-t border-blue-100">
                  <span className="text-xs font-bold text-blue-800 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                    DIFERENCIAL
                  </span>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    Estoque operacional dinâmico com finalidade exclusiva de acelerar expedição.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-emerald-100 rounded-2xl -rotate-1 group-hover:-rotate-2 transition-transform" />
              <div className="relative bg-white border border-emerald-200 p-8 rounded-2xl shadow-sm h-full hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-xl flex items-center justify-center font-bold text-xl mb-6 shadow-lg shadow-emerald-200">
                  2
                </div>
                <h3 className="text-xl font-bold text-emerald-900 mb-4">Venda & Execução Logística</h3>
                <p className="text-slate-600 mb-6 text-sm">Orquestração automática do pedido à entrega.</p>
                <ul className="space-y-3">
                  {[
                    "Pedido integrado ao Fusion (Regra Pesado)",
                    "Acionamento simultâneo: Separação + Transporte",
                    "Emissão automática de CTE e Coleta",
                    "Entrega ao cliente final",
                  ].map((t, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                      <CheckCircle size={16} className="mt-0.5 text-emerald-500 shrink-0" /> {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-6 border-t border-emerald-100">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    VISIBILIDADE
                  </span>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    Acompanhamento ponta a ponta com status em tempo real.
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
                  <Server className="text-indigo-600" /> Flexibilidade Sistêmica
                </h3>
                <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                  O Fusion atua como orquestrador central, garantindo estabilidade e previsibilidade.
                </p>

                <div className="space-y-4">
                  <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200">
                    <h4 className="font-bold text-sm text-slate-700 mb-2">Opções para o Seller</h4>
                    <div className="flex gap-2 mb-2">
                      {["API", "Webhook", "FTP"].map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 bg-slate-100 text-slate-600 text-xs rounded font-mono border font-bold"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-slate-400">Escolha a melhor forma de trocar dados de estoque e pedidos.</p>
                  </div>

                  <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200">
                    <h4 className="font-bold text-sm text-slate-700 mb-2">Transporte (Obrigatório)</h4>
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs rounded font-mono border border-indigo-100 font-bold">
                      API Integrada
                    </span>
                    <p className="text-xs text-slate-400 mt-2">Emissão automática de CTe e redução de erro manual.</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-xl text-slate-800 mb-4 flex items-center gap-2">
                  <ShieldCheck className="text-indigo-600" /> Segurança Operacional
                </h3>

                <div className="bg-white rounded-lg shadow-sm border border-slate-200 divide-y">
                  {[
                    {
                      title: "Gestão de Estoque",
                      desc: "Saldo atualizado a cada venda. Alertas automáticos de estoque mínimo para evitar ruptura.",
                    },
                    {
                      title: "Segurança Fiscal",
                      desc: "Validação rigorosa da nota de remessa e conformidade tributária do estoque transitório.",
                    },
                    {
                      title: "Monitoramento de SLA",
                      desc: "Acompanhamento contínuo dos tempos de separação e coleta para garantir a promessa de entrega.",
                    },
                  ].map((it, i) => (
                    <div key={i} className="p-4 flex gap-4">
                      <div className="mt-1 bg-indigo-100 p-1.5 rounded-full h-fit text-indigo-600">
                        <CheckCircle size={14} />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-800">{it.title}</h4>
                        <p className="text-xs text-slate-500 mt-1">{it.desc}</p>
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
            ].map((b, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-amber-500 hover:-translate-y-1 transition-all"
              >
                <div className="p-3 bg-slate-50 rounded-full text-slate-900 w-fit mb-4">
                  <b.icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{b.label}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 text-white px-12 py-16 text-center">
          <Globe className="w-12 h-12 mx-auto mb-6 text-amber-500" />
          <h2 className="text-2xl font-bold mb-4">Conclusão Executiva</h2>
          <p className="text-slate-300 max-w-3xl mx-auto text-lg leading-relaxed mb-8">
            ENVIOS PESADO combina estoque próximo do cliente, integração sistêmica e capacidade real de escala — para crescer
            com controle, previsibilidade e estrutura profissional.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("flowchart");
  const [selectedNode, setSelectedNode] = useState(null);

  const nodes = useMemo(
    () => [
      {
        id: "n1",
        type: "transfer",
        x: 250,
        y: 150,
        label: "Origem (Seller)",
        icon: Package,
        system: "ERP Seller",
        shortDesc: "Emissão de Nota de Remessa",
        details:
          "O Seller emite NF de Remessa (Depósito Fechado/Armazém Geral, conforme validação fiscal), iniciando o abastecimento da base UX em Barueri e transferindo a custódia logística.",
      },
      {
        id: "n2",
        type: "transfer",
        x: 250,
        y: 300,
        label: "Integrações",
        icon: Server,
        system: "API Trucks / WMX",
        shortDesc: "Solicitação de Coleta & Dados",
        details:
          "1) Envio de dados da carga ao Trucks (TMS) para gerar ordem de coleta. 2) Envio do ASN ao WMX (WMS) para preparar o recebimento, garantindo previsibilidade do inbound.",
      },
      {
        id: "n3",
        type: "transfer",
        x: 250,
        y: 450,
        label: "Transporte Inbound",
        icon: Truck,
        system: "Logística",
        shortDesc: "Coleta e Viagem",
        details:
          "Transportadora acionada pelo Trucks coleta no CD do Seller e realiza o linehaul até o CD UX em Barueri/SP. Rastreamento monitorado até a chegada na doca.",
      },
      {
        id: "n4",
        type: "transfer",
        x: 250,
        y: 600,
        label: "Recebimento",
        icon: Database,
        system: "WMX",
        shortDesc: "Conferência Física",
        details:
          "Conferência cega para validar quantidades e integridade contra o XML. Após validação, o WMX realiza entrada fiscal e endereçamento.",
      },
      {
        id: "n5",
        type: "transfer",
        x: 250,
        y: 750,
        label: "Estoque Disponível",
        icon: CheckCircle,
        system: "Site / MktPlace",
        shortDesc: "Saldo Transitório",
        details:
          'Classificação como "Estoque Transitório". Saldo integra ao Marketplace, ativando oferta com SLA reduzido (ex: D+1 SP), melhorando Buybox e conversão.',
      },

      {
        id: "n6",
        type: "sale",
        x: 800,
        y: 150,
        label: "Pedido (MktPlace)",
        icon: ShoppingCart,
        system: "Mirakl / VTEX",
        shortDesc: "Compra confirmada",
        details:
          "Cliente compra no site. O pedido é capturado pela plataforma e segue para OMS para processamento financeiro/fraude.",
      },
      {
        id: "n7",
        type: "sale",
        x: 800,
        y: 300,
        label: "Orquestrador",
        icon: Server,
        system: "Fusion",
        shortDesc: "Roteamento Pesado",
        details:
          'O Fusion identifica SKUs "Envios Pesado", divide se necessário e roteia a ordem para expedição na base Barueri.',
      },
      {
        id: "n8",
        type: "sale",
        x: 650,
        y: 450,
        label: "Separação",
        icon: Package,
        system: "WMX",
        shortDesc: "Pick & Pack",
        details:
          "WMX gera onda de separação, orienta coleta dos itens e finaliza embalagem na doca de expedição.",
      },
      {
        id: "n9",
        type: "sale",
        x: 950,
        y: 450,
        label: "Gestão Frete",
        icon: FileText,
        system: "Trucks",
        shortDesc: "Emissão CTE",
        details:
          "Em paralelo, o Trucks seleciona transportadora, emite CTe/etiqueta e agenda coleta na doca.",
      },
      {
        id: "n10",
        type: "sale",
        x: 800,
        y: 600,
        label: "Coleta & Last Mile",
        icon: Truck,
        system: "Transportadora",
        shortDesc: "Expedição",
        details:
          "Transportadora de last mile coleta pedidos separados/etiquetados e inicia roteirização de entrega urbana.",
      },
      {
        id: "n11",
        type: "sale",
        x: 800,
        y: 750,
        label: "Entrega Final",
        icon: CheckCircle,
        system: "OndeTah",
        shortDesc: "Baixa no App",
        details:
          "Motorista confirma entrega via app (POD). OndeTah atualiza status no Marketplace e notifica o Seller.",
      },

      {
        id: "n12",
        type: "control",
        x: 525,
        y: 850,
        label: "Monitoramento",
        icon: RefreshCw,
        system: "Automático",
        shortDesc: "Gatilho Reposição",
        details:
          "Algoritmo monitora giro vs saldo. Ao atingir estoque mínimo, dispara alerta sugerindo nova remessa.",
      },
    ],
    []
  );

  const connections = useMemo(
    () => [
      { from: "n1", to: "n2" },
      { from: "n2", to: "n3" },
      { from: "n3", to: "n4" },
      { from: "n4", to: "n5" },
      { from: "n6", to: "n7", type: "sale" },
      { from: "n7", to: "n8", label: "Separação", type: "sale" },
      { from: "n7", to: "n9", label: "Frete", type: "sale" },
      { from: "n8", to: "n10", type: "sale" },
      { from: "n9", to: "n10", type: "sale" },
      { from: "n10", to: "n11", type: "sale" },
      { from: "n5", to: "n12", type: "secondary" },
      { from: "n11", to: "n12", type: "secondary" },
    ],
    []
  );

  return (
    <div className="flex flex-col h-screen bg-slate-100 font-sans text-slate-800 overflow-hidden">
      <style>{flowCSS}</style>

      <header className="bg-white border-b border-slate-200 px-6 py-3 shadow-sm flex justify-between items-center z-30">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 border-r border-slate-200 pr-6 h-12">
            <img
              src="image_6bf0f0.png"
              alt="Carrefour"
              className="h-full w-auto object-contain"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <div className="h-6 w-px bg-slate-200 mx-2" />
            <img
              src="image_6bf0d7.png"
              alt="UX"
              className="h-3/4 w-auto object-contain opacity-90"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>

          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-none">Projeto Envios</h1>
            <p className="text-xs text-slate-500 font-medium">Operação Pesado SP</p>
          </div>
        </div>

        <div className="bg-slate-100 p-1 rounded-lg flex text-sm font-semibold shadow-inner">
          <button
            onClick={() => setActiveTab("flowchart")}
            className={[
              "px-4 py-2 rounded-md transition-all flex items-center gap-2",
              activeTab === "flowchart"
                ? "bg-white text-blue-600 shadow-sm ring-1 ring-black/5"
                : "text-slate-500 hover:text-slate-700",
            ].join(" ")}
          >
            <Layout size={16} /> Visão Técnica
          </button>

          <button
            onClick={() => setActiveTab("presentation")}
            className={[
              "px-4 py-2 rounded-md transition-all flex items-center gap-2",
              activeTab === "presentation"
                ? "bg-white text-amber-600 shadow-sm ring-1 ring-black/5"
                : "text-slate-500 hover:text-slate-700",
            ].join(" ")}
          >
            <Users size={16} /> Visão Comercial
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {activeTab === "presentation" ? (
          <SellerPresentation />
        ) : (
          <>
            <aside className="w-96 bg-white border-r border-slate-200 shadow-xl z-20 flex flex-col overflow-hidden">
              <div className="p-6 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                <div>
                  <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Painel de Detalhes
                  </h2>
                  <p className="text-xs text-slate-500">Selecione um nó para inspecionar</p>
                </div>
                {selectedNode && (
                  <button
                    onClick={() => setSelectedNode(null)}
                    className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600"
                    aria-label="Fechar"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {selectedNode ? (
                  <div className="relative">
                    <div className="flex items-start gap-4 mb-6">
                      <div
                        className={[
                          "p-3 rounded-xl shadow-sm",
                          (NODE_STYLES[selectedNode.type] || NODE_STYLES.system).iconBg,
                          (NODE_STYLES[selectedNode.type] || NODE_STYLES.system).iconText,
                        ].join(" ")}
                      >
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
                        <h4 className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-1">
                          <FileText size={12} /> Descrição Funcional
                        </h4>
                        <p className="text-slate-700 text-sm leading-relaxed">{selectedNode.details}</p>
                      </div>

                      {selectedNode.type === "transfer" && (
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 text-blue-800 text-sm">
                          <strong>Objetivo:</strong> Abastecimento da base UX.
                        </div>
                      )}
                      {selectedNode.type === "sale" && (
                        <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100 text-emerald-800 text-sm">
                          <strong>Objetivo:</strong> Entrega rápida ao cliente (SLA D+1).
                        </div>
                      )}
                      {selectedNode.type === "control" && (
                        <div className="p-4 bg-purple-50 rounded-lg border border-purple-100 text-purple-800 text-sm">
                          <strong>Objetivo:</strong> Reposição preventiva e estabilidade de oferta.
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
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
                        <FileText size={12} /> Resumo do Processo
                      </h4>
                      <p className="text-slate-700 text-sm leading-relaxed">
                        Fluxograma da operação <strong>Envios Pesado</strong>, conectando o Seller à base logística da UX em SP.
                        <br />
                        <br />
                        Clique nos blocos para ver regras de negócio, integrações e SLAs por etapa.
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
            </aside>

            <main
              className="flex-1 overflow-auto relative bg-slate-100 cursor-grab active:cursor-grabbing"
              onClick={() => setSelectedNode(null)}
            >
              <div className="relative min-w-[1200px] min-h-[1000px] mx-auto py-10">
                <div className="absolute top-0 left-0 w-full text-center mt-4 pointer-events-none z-10">
                  <h2 className="text-2xl font-bold text-slate-300 uppercase tracking-[0.2em]">
                    Fluxo Operacional - Envios Pesado
                  </h2>
                </div>

                <div className="absolute inset-0 flex pointer-events-none mx-10 my-10 bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="w-1/2 border-r border-slate-100 bg-gradient-to-b from-blue-50/50 to-white relative">
                    <div className="absolute top-6 left-6 flex items-center gap-2 text-blue-300 font-bold text-6xl opacity-20 select-none">
                      INBOUND <ArrowDown size={60} />
                    </div>
                  </div>
                  <div className="w-1/2 bg-gradient-to-b from-emerald-50/50 to-white relative">
                    <div className="absolute top-6 right-6 flex items-center gap-2 text-emerald-300 font-bold text-6xl opacity-20 select-none">
                      <ArrowDown size={60} /> OUTBOUND
                    </div>
                  </div>
                </div>

                <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                  {connections.map((c, idx) => {
                    const start = nodes.find((n) => n.id === c.from);
                    const end = nodes.find((n) => n.id === c.to);
                    if (!start || !end) return null;
                    return (
                      <Connection
                        key={idx}
                        start={start}
                        end={end}
                        label={c.label}
                        type={c.type}
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
                  <text x="130" y="500" className="text-[10px] fill-purple-400 font-bold -rotate-90 tracking-widest">
                    GATILHO DE REPOSIÇÃO
                  </text>
                </svg>

                {nodes.map((n) => (
                  <Node
                    key={n.id}
                    data={n}
                    onSelect={setSelectedNode}
                    isSelected={selectedNode?.id === n.id}
                  />
                ))}
              </div>
            </main>
          </>
        )}
      </div>
    </div>
  );
}
