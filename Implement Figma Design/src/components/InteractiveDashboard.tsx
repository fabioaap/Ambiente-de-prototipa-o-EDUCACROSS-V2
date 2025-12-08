import { useState } from 'react';
import GestorPainelInicialEngajamentoEscolas from '../imports/GestorPainelInicialEngajamentoEscolas-4-9281';

type Tab = 'engajamento' | 'desempenho';

export function InteractiveDashboard() {
  // Estados de interatividade
  const [activeTab, setActiveTab] = useState<Tab>('engajamento');
  const [menuOpen, setMenuOpen] = useState(true);
  const [selectedSchool, setSelectedSchool] = useState('Todos os grupos');
  const [selectedYear, setSelectedYear] = useState('Todos os anos');
  const [selectedPeriod, setSelectedPeriod] = useState('Todo o período');
  const [showSchoolDropdown, setShowSchoolDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  
  // Estados de tooltip
  const [showTooltipCadastrados, setShowTooltipCadastrados] = useState(false);
  const [showTooltipGerenciar, setShowTooltipGerenciar] = useState(false);
  const [showTooltipDetalhes, setShowTooltipDetalhes] = useState(false);
  const [showTooltipVisaoTurma, setShowTooltipVisaoTurma] = useState(false);

  // Opções dos dropdowns
  const schoolOptions = ['Todos os grupos', 'Escola A', 'Escola B', 'Escola C'];
  const yearOptions = ['Todos os anos', '2024', '2023', '2022'];
  const periodOptions = ['Todo o período', 'Último mês', 'Últimos 3 meses', 'Último ano'];

  return (
    <div className="relative w-[1366px] h-[1537px]">
      {/* Renderiza o componente do Figma */}
      <div className="absolute inset-0">
        <GestorPainelInicialEngajamentoEscolas />
      </div>

      {/* CSS para esconder tooltips por padrão e controlar menu */}
      <style>{`
        /* Esconde tooltips por padrão */
        [data-name="Tooltip Gerenciar Escola"],
        [data-name="Tooltip Detalhes"],
        [data-name="Tooltip Cadastrados"],
        [data-name="Tooltip-visão-turma"] {
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease-in-out;
        }
        
        /* Mostra tooltips quando hover */
        ${showTooltipGerenciar ? '[data-name="Tooltip Gerenciar Escola"] { opacity: 1; }' : ''}
        ${showTooltipDetalhes ? '[data-name="Tooltip Detalhes"] { opacity: 1; }' : ''}
        ${showTooltipCadastrados ? '[data-name="Tooltip Cadastrados"] { opacity: 1; }' : ''}
        ${showTooltipVisaoTurma ? '[data-name="Tooltip-visão-turma"] { opacity: 1; }' : ''}
        
        /* Esconde menu quando fechado */
        ${!menuOpen ? '[data-name="Menu admin"] { transform: translateX(-100%); transition: transform 0.3s ease-in-out; }' : '[data-name="Menu admin"] { transition: transform 0.3s ease-in-out; }'}
        
        /* Destaque na linha da tabela no hover */
        .table-row-hover {
          background-color: rgba(115, 103, 240, 0.05);
        }
      `}</style>

      {/* ============ HEADER ============ */}
      
      {/* Menu hamburguer - Toggle sidebar */}
      <button
        className="absolute left-[20px] top-[15px] w-[157px] h-[32px] cursor-pointer z-20 bg-transparent hover:opacity-80 transition-opacity"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      />

      {/* ============ TABS ============ */}
      
      {/* Tab Engajamento */}
      <button
        className="absolute left-[calc(18.75%+23.88px+2px)] top-[82px] w-[132px] h-[45px] cursor-pointer z-10 bg-transparent"
        onClick={() => setActiveTab('engajamento')}
        aria-label="Tab Engajamento"
      />
      
      {/* Tab Desempenho */}
      <button
        className="absolute left-[calc(18.75%+23.88px+124px)] top-[82px] w-[132px] h-[45px] cursor-pointer z-10 bg-transparent"
        onClick={() => setActiveTab('desempenho')}
        aria-label="Tab Desempenho"
      />

      {/* ============ FILTROS ============ */}
      
      {/* Filtro: Grupo de Escolas */}
      <div className="absolute left-[calc(18.75%+23.88px+20px)] top-[155px] w-[calc(33.33%-13.33px)] z-20">
        <button
          className="w-full h-[45px] cursor-pointer bg-transparent hover:opacity-80 transition-opacity"
          onClick={() => {
            setShowSchoolDropdown(!showSchoolDropdown);
            setShowYearDropdown(false);
            setShowPeriodDropdown(false);
          }}
          aria-label="Selecionar escola"
        />
        
        {showSchoolDropdown && (
          <div className="absolute top-[50px] left-0 w-full bg-white rounded-[5px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.12)] border border-[#d8d6de] z-30 overflow-hidden">
            {schoolOptions.map((option, index) => (
              <button
                key={index}
                className="w-full px-[16px] py-[12px] text-left text-[14px] text-[#6e6b7b] hover:bg-[#f8f8f8] transition-colors cursor-pointer bg-transparent border-0"
                onClick={() => {
                  setSelectedSchool(option);
                  setShowSchoolDropdown(false);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Filtro: Ano Escolar */}
      <div className="absolute left-[calc(18.75%+23.88px+20px+33.33%)] top-[155px] w-[calc(33.33%-13.33px)] z-20">
        <button
          className="w-full h-[45px] cursor-pointer bg-transparent hover:opacity-80 transition-opacity"
          onClick={() => {
            setShowYearDropdown(!showYearDropdown);
            setShowSchoolDropdown(false);
            setShowPeriodDropdown(false);
          }}
          aria-label="Selecionar ano"
        />
        
        {showYearDropdown && (
          <div className="absolute top-[50px] left-0 w-full bg-white rounded-[5px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.12)] border border-[#d8d6de] z-30 overflow-hidden">
            {yearOptions.map((option, index) => (
              <button
                key={index}
                className="w-full px-[16px] py-[12px] text-left text-[14px] text-[#6e6b7b] hover:bg-[#f8f8f8] transition-colors cursor-pointer bg-transparent border-0"
                onClick={() => {
                  setSelectedYear(option);
                  setShowYearDropdown(false);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Filtro: Período */}
      <div className="absolute left-[calc(18.75%+23.88px+20px+66.66%)] top-[155px] w-[calc(33.33%-13.33px)] z-20">
        <button
          className="w-full h-[45px] cursor-pointer bg-transparent hover:opacity-80 transition-opacity"
          onClick={() => {
            setShowPeriodDropdown(!showPeriodDropdown);
            setShowSchoolDropdown(false);
            setShowYearDropdown(false);
          }}
          aria-label="Selecionar período"
        />
        
        {showPeriodDropdown && (
          <div className="absolute top-[50px] left-0 w-full bg-white rounded-[5px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.12)] border border-[#d8d6de] z-30 overflow-hidden">
            {periodOptions.map((option, index) => (
              <button
                key={index}
                className="w-full px-[16px] py-[12px] text-left text-[14px] text-[#6e6b7b] hover:bg-[#f8f8f8] transition-colors cursor-pointer bg-transparent border-0"
                onClick={() => {
                  setSelectedPeriod(option);
                  setShowPeriodDropdown(false);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ============ TABELA - LINHAS INTERATIVAS ============ */}
      
      {/* Linha 1 da tabela - Escola Caminho do Saber */}
      <div
        className={`absolute left-[calc(18.75%+23.88px)] top-[679px] w-[1066px] h-[60px] cursor-pointer z-10 ${hoveredRow === 1 ? 'table-row-hover' : ''}`}
        onMouseEnter={() => setHoveredRow(1)}
        onMouseLeave={() => setHoveredRow(null)}
        onClick={() => console.log('Escola Caminho do Saber clicked')}
      />

      {/* Linha 2 da tabela - Escola Arco-Íris */}
      <div
        className={`absolute left-[calc(18.75%+23.88px)] top-[739px] w-[1066px] h-[60px] cursor-pointer z-10 ${hoveredRow === 2 ? 'table-row-hover' : ''}`}
        onMouseEnter={() => setHoveredRow(2)}
        onMouseLeave={() => setHoveredRow(null)}
        onClick={() => console.log('Escola Arco-Íris clicked')}
      />

      {/* Linha 3 da tabela - Escola Estrela do Norte */}
      <div
        className={`absolute left-[calc(18.75%+23.88px)] top-[799px] w-[1066px] h-[60px] cursor-pointer z-10 ${hoveredRow === 3 ? 'table-row-hover' : ''}`}
        onMouseEnter={() => setHoveredRow(3)}
        onMouseLeave={() => setHoveredRow(null)}
        onClick={() => console.log('Escola Estrela do Norte clicked')}
      />

      {/* ============ BOTÕES DE AÇÃO NA TABELA ============ */}
      
      {/* Tooltip "Licenças atribuídas" - hover no ícone de info */}
      <div
        className="absolute left-[calc(56.25%+6.63px)] top-[585px] w-[30px] h-[30px] cursor-pointer z-20"
        onMouseEnter={() => setShowTooltipCadastrados(true)}
        onMouseLeave={() => setShowTooltipCadastrados(false)}
        onClick={() => console.log('Info de licenças clicked')}
      />

      {/* Botão Gerenciar escola - Linha 1 */}
      <div
        className="absolute left-[calc(87.5%-1.25px)] top-[705px] w-[40px] h-[30px] cursor-pointer z-20"
        onMouseEnter={() => setShowTooltipGerenciar(true)}
        onMouseLeave={() => setShowTooltipGerenciar(false)}
        onClick={() => console.log('Gerenciar Escola Caminho do Saber')}
      />

      {/* Botão Informações da escola - Linha 2 */}
      <div
        className="absolute left-[calc(87.5%+27.75px)] top-[765px] w-[40px] h-[30px] cursor-pointer z-20"
        onMouseEnter={() => setShowTooltipDetalhes(true)}
        onMouseLeave={() => setShowTooltipDetalhes(false)}
        onClick={() => console.log('Detalhes Escola Arco-Íris')}
      />

      {/* Botão Relatório da escola - Linha 3 */}
      <div
        className="absolute left-[calc(93.75%-14.63px)] top-[836px] w-[40px] h-[30px] cursor-pointer z-20"
        onMouseEnter={() => setShowTooltipVisaoTurma(true)}
        onMouseLeave={() => setShowTooltipVisaoTurma(false)}
        onClick={() => console.log('Relatório Escola Estrela do Norte')}
      />

      {/* Overlay para fechar dropdowns quando clicar fora */}
      {(showSchoolDropdown || showYearDropdown || showPeriodDropdown) && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => {
            setShowSchoolDropdown(false);
            setShowYearDropdown(false);
            setShowPeriodDropdown(false);
          }}
        />
      )}
    </div>
  );
}
