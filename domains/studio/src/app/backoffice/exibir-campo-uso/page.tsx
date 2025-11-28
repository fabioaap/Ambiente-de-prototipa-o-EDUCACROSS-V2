'use client';

import React, { useState } from 'react';

// Mock data baseado no Figma
const mockData = {
  questoes: [
    {
      id: "1",
      codigo: "3",
      status: "Inativa",
      habilidades: ["EF06MA05", "D6"],
      topicos: ["6º ano", "7º ano", "8º ano"],
      descricao: "Frações e porcentagens",
      tipo: "Avaliação",
      autoria: "Canoas",
      criador: "MC",
      revisor: "RF",
      data: "27/05/2025 12:00:42"
    },
    {
      id: "2",
      codigo: "5",
      status: "Ativa",
      habilidades: ["EF07LP03"],
      topicos: ["7º ano"],
      descricao: "Leitura e interpretação",
      tipo: "Diagnóstica",
      autoria: "Porto Alegre",
      criador: "AS",
      revisor: "MF",
      data: "15/06/2025 09:30:15"
    },
    {
      id: "3",
      codigo: "7",
      status: "Ativa",
      habilidades: ["EF08CI02", "D12"],
      topicos: ["8º ano", "9º ano"],
      descricao: "Sistema circulatório",
      tipo: "Formativa",
      autoria: "Gravataí",
      criador: "JK",
      revisor: "LP",
      data: "02/07/2025 14:22:33"
    }
  ]
};

export default function ExibirCampoUsoPage() {
  const [activeTab, setActiveTab] = useState('questoes');
  const [filters, setFilters] = useState({
    area: '',
    ano: '',
    bimestre: '',
    status: ''
  });

  // Estilos base
  const styles = {
    pageWrapper: {
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#EFEFEF',
      fontFamily: 'Montserrat, -apple-system, sans-serif'
    },
    sidebar: {
      width: '265px',
      backgroundColor: '#FFFFFF',
      borderRight: '1px solid #EBE9F1',
      padding: '20px 0',
      position: 'fixed' as const,
      height: '100vh',
      overflowY: 'auto' as const
    },
    sidebarHeader: {
      padding: '0 24px 20px',
      borderBottom: '1px solid #EBE9F1',
      marginBottom: '20px'
    },
    sidebarSection: {
      marginBottom: '24px'
    },
    sectionTitle: {
      fontSize: '12px',
      fontWeight: 700,
      color: '#B9B9C3',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px',
      padding: '0 24px',
      marginBottom: '12px'
    },
    menuItem: {
      padding: '12px 24px',
      fontSize: '14px',
      color: '#6E6B7B',
      cursor: 'pointer',
      transition: 'all 0.2s',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    menuItemActive: {
      backgroundColor: '#F8F8F8',
      color: '#7367F0',
      fontWeight: 600,
      borderLeft: '3px solid #7367F0'
    },
    mainContent: {
      marginLeft: '265px',
      flex: 1,
      padding: '24px'
    },
    breadcrumb: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px',
      color: '#6E6B7B',
      marginBottom: '24px'
    },
    breadcrumbLink: {
      color: '#7367F0',
      cursor: 'pointer',
      textDecoration: 'none'
    },
    container: {
      backgroundColor: '#FFFFFF',
      borderRadius: '6px',
      border: '1px solid #EBE9F1',
      overflow: 'hidden'
    },
    header: {
      padding: '20px 24px',
      borderBottom: '1px solid #EBE9F1'
    },
    headerTitle: {
      fontSize: '20px',
      fontWeight: 600,
      color: '#5A5863',
      margin: 0
    },
    tabs: {
      display: 'flex',
      borderBottom: '1px solid #EBE9F1',
      padding: '0 24px'
    },
    tab: {
      padding: '12px 16px',
      fontSize: '14px',
      fontWeight: 500,
      color: '#6E6B7B',
      cursor: 'pointer',
      borderBottom: '2px solid transparent',
      transition: 'all 0.2s'
    },
    tabActive: {
      color: '#7367F0',
      borderBottom: '2px solid #7367F0',
      fontWeight: 600
    },
    content: {
      padding: '24px'
    },
    statsContainer: {
      display: 'flex',
      gap: '16px',
      marginBottom: '24px'
    },
    statCard: {
      flex: 1,
      padding: '16px',
      backgroundColor: '#F8F8F8',
      borderRadius: '6px',
      border: '1px solid #EBE9F1'
    },
    statLabel: {
      fontSize: '12px',
      color: '#6E6B7B',
      marginBottom: '4px'
    },
    statValue: {
      fontSize: '24px',
      fontWeight: 700,
      color: '#5A5863'
    },
    filtersSection: {
      backgroundColor: '#FAFAFA',
      padding: '24px',
      borderRadius: '6px',
      border: '1px solid #EBE9F1',
      marginBottom: '24px'
    },
    filterRow: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '16px',
      marginBottom: '16px'
    },
    filterGroup: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '8px'
    },
    filterLabel: {
      fontSize: '14px',
      fontWeight: 600,
      color: '#5A5863'
    },
    filterInput: {
      padding: '10px 12px',
      fontSize: '14px',
      border: '1px solid #D8D6DE',
      borderRadius: '6px',
      backgroundColor: '#FFFFFF',
      color: '#6E6B7B',
      fontFamily: 'Montserrat, sans-serif'
    },
    filterButtons: {
      display: 'flex',
      gap: '12px',
      justifyContent: 'flex-end',
      marginTop: '16px'
    },
    button: {
      padding: '10px 20px',
      fontSize: '14px',
      fontWeight: 500,
      borderRadius: '6px',
      cursor: 'pointer',
      border: 'none',
      fontFamily: 'Montserrat, sans-serif',
      transition: 'all 0.2s'
    },
    buttonPrimary: {
      backgroundColor: '#7367F0',
      color: '#FFFFFF'
    },
    buttonSecondary: {
      backgroundColor: '#FFFFFF',
      color: '#7367F0',
      border: '1px solid #7367F0'
    },
    tableWrapper: {
      border: '1px solid #EBE9F1',
      borderRadius: '6px',
      overflow: 'hidden'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse' as const
    },
    th: {
      padding: '12px 16px',
      textAlign: 'left' as const,
      fontSize: '12px',
      fontWeight: 700,
      color: '#6E6B7B',
      backgroundColor: '#FAFAFA',
      borderBottom: '1px solid #EBE9F1',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px'
    },
    thCheckbox: {
      width: '40px',
      padding: '12px 16px'
    },
    td: {
      padding: '16px',
      fontSize: '14px',
      color: '#6E6B7B',
      borderBottom: '1px solid #EBE9F1'
    },
    badge: {
      display: 'inline-block',
      padding: '4px 8px',
      fontSize: '12px',
      fontWeight: 500,
      borderRadius: '4px',
      marginRight: '4px',
      marginBottom: '4px'
    },
    badgeSuccess: {
      backgroundColor: '#28C76F',
      color: '#FFFFFF'
    },
    badgeWarning: {
      backgroundColor: '#FF9F43',
      color: '#FFFFFF'
    },
    badgeInfo: {
      backgroundColor: '#00CFE8',
      color: '#FFFFFF'
    },
    badgeGray: {
      backgroundColor: '#B9B9C3',
      color: '#FFFFFF'
    },
    tableFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 24px',
      borderTop: '1px solid #EBE9F1',
      fontSize: '14px',
      color: '#6E6B7B'
    },
    pagination: {
      display: 'flex',
      gap: '8px',
      alignItems: 'center'
    },
    pageButton: {
      padding: '6px 12px',
      fontSize: '14px',
      border: '1px solid #EBE9F1',
      borderRadius: '4px',
      backgroundColor: '#FFFFFF',
      color: '#6E6B7B',
      cursor: 'pointer',
      fontFamily: 'Montserrat, sans-serif'
    },
    pageButtonActive: {
      backgroundColor: '#7367F0',
      color: '#FFFFFF',
      borderColor: '#7367F0'
    },
    actionButton: {
      padding: '6px 12px',
      fontSize: '12px',
      border: 'none',
      backgroundColor: 'transparent',
      color: '#7367F0',
      cursor: 'pointer',
      fontFamily: 'Montserrat, sans-serif'
    }
  };

  return (
    <div style={styles.pageWrapper}>
      {/* Sidebar - Menu BackOffice */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <div style={{ fontSize: '18px', fontWeight: 700, color: '#7367F0' }}>EDUCACROSS</div>
        </div>

        <div style={styles.sidebarSection}>
          <div style={styles.sectionTitle}>Gestão escolar</div>
          <div style={styles.menuItem}>📚 Escolas</div>
          <div style={{ ...styles.menuItem, ...styles.menuItemActive }}>📝 Banco de Questões</div>
          <div style={styles.menuItem}>📖 Livros</div>
          <div style={styles.menuItem}>📚 Biblioteca</div>
        </div>

        <div style={styles.sidebarSection}>
          <div style={styles.sectionTitle}>Gestão administrativa</div>
          <div style={styles.menuItem}>👥 Usuários</div>
          <div style={styles.menuItem}>⚙️ Configurações</div>
          <div style={styles.menuItem}>📊 Relatórios</div>
          <div style={styles.menuItem}>🔔 Notificações</div>
          <div style={styles.menuItem}>📅 Eventos</div>
        </div>
      </aside>

      {/* Main Content */}
      <main style={styles.mainContent}>
        {/* Breadcrumb */}
        <nav style={styles.breadcrumb}>
          <a href="#" style={styles.breadcrumbLink}>Home</a>
          <span>›</span>
          <a href="#" style={styles.breadcrumbLink}>Banco de Questões</a>
          <span>›</span>
          <span style={{ color: '#5A5863', fontWeight: 500 }}>Todas as questões</span>
        </nav>

        {/* Container Principal */}
        <div style={styles.container}>
          {/* Header */}
          <div style={styles.header}>
            <h1 style={styles.headerTitle}>Todas as questões</h1>
          </div>

          {/* Tabs */}
          <div style={styles.tabs}>
            <div
              style={activeTab === 'questoes' ? { ...styles.tab, ...styles.tabActive } : styles.tab}
              onClick={() => setActiveTab('questoes')}
            >
              Questões
            </div>
            <div
              style={activeTab === 'questoes2' ? { ...styles.tab, ...styles.tabActive } : styles.tab}
              onClick={() => setActiveTab('questoes2')}
            >
              Questões (2)
            </div>
            <div
              style={activeTab === 'analise' ? { ...styles.tab, ...styles.tabActive } : styles.tab}
              onClick={() => setActiveTab('analise')}
            >
              Análise TRI
            </div>
          </div>

          {/* Content */}
          <div style={styles.content}>
            {/* Stats */}
            <div style={styles.statsContainer}>
              <div style={styles.statCard}>
                <div style={styles.statLabel}>Total de Questões</div>
                <div style={styles.statValue}>{mockData.questoes.length}</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statLabel}>Questões Ativas</div>
                <div style={styles.statValue}>2</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statLabel}>Questões Inativas</div>
                <div style={styles.statValue}>1</div>
              </div>
            </div>

            {/* Filters */}
            <div style={styles.filtersSection}>
              <div style={styles.filterRow}>
                <div style={styles.filterGroup}>
                  <label style={styles.filterLabel}>Área de Conhecimento</label>
                  <select style={styles.filterInput}>
                    <option>Todas as áreas do conhecimento</option>
                    <option>Matemática</option>
                    <option>Português</option>
                    <option>Ciências</option>
                  </select>
                </div>
                <div style={styles.filterGroup}>
                  <label style={styles.filterLabel}>Ano</label>
                  <select style={styles.filterInput}>
                    <option>Todos os anos</option>
                    <option>1º ano</option>
                    <option>2º ano</option>
                    <option>6º ano</option>
                    <option>7º ano</option>
                    <option>8º ano</option>
                    <option>9º ano</option>
                  </select>
                </div>
                <div style={styles.filterGroup}>
                  <label style={styles.filterLabel}>Bimestre</label>
                  <select style={styles.filterInput}>
                    <option>Todos os bimestres</option>
                    <option>1º Bimestre</option>
                    <option>2º Bimestre</option>
                    <option>3º Bimestre</option>
                    <option>4º Bimestre</option>
                  </select>
                </div>
                <div style={styles.filterGroup}>
                  <label style={styles.filterLabel}>Status</label>
                  <select style={styles.filterInput}>
                    <option>Todos os status</option>
                    <option>Ativa</option>
                    <option>Inativa</option>
                  </select>
                </div>
              </div>

              <div style={styles.filterButtons}>
                <button style={{ ...styles.button, ...styles.buttonSecondary }}>Limpar Filtros</button>
                <button style={{ ...styles.button, ...styles.buttonPrimary }}>Aplicar Filtros</button>
              </div>
            </div>

            {/* Table */}
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={{ ...styles.th, ...styles.thCheckbox }}>
                      <input type="checkbox" />
                    </th>
                    <th style={styles.th}>CÓDIGO</th>
                    <th style={styles.th}>HABILIDADES</th>
                    <th style={styles.th}>TÓPICO DE CONHECIMENTO</th>
                    <th style={styles.th}>TIPO DE QUESTÃO</th>
                    <th style={styles.th}>AUTORIA</th>
                    <th style={styles.th}>CRIADOR</th>
                    <th style={styles.th}>REVISOR</th>
                    <th style={styles.th}>DATA DA CRIAÇÃO</th>
                    <th style={styles.th}>AÇÕES</th>
                  </tr>
                </thead>
                <tbody>
                  {mockData.questoes.map((q) => (
                    <tr key={q.id}>
                      <td style={styles.td}>
                        <input type="checkbox" />
                      </td>
                      <td style={styles.td}>
                        <div style={{ fontWeight: 700, color: '#5A5863', marginBottom: '4px' }}>{q.codigo}</div>
                        <span style={{ ...styles.badge, ...styles.badgeGray }}>{q.status}</span>
                      </td>
                      <td style={styles.td}>
                        {q.habilidades.map((h, i) => (
                          <span key={i} style={{ ...styles.badge, ...styles.badgeInfo }}>{h}</span>
                        ))}
                      </td>
                      <td style={styles.td}>
                        {q.topicos.map((t, i) => (
                          <span key={i} style={{ ...styles.badge, ...styles.badgeWarning }}>{t}</span>
                        ))}
                      </td>
                      <td style={styles.td}>{q.tipo}</td>
                      <td style={styles.td}>{q.autoria}</td>
                      <td style={styles.td}>{q.criador}</td>
                      <td style={styles.td}>{q.revisor}</td>
                      <td style={styles.td}>{q.data}</td>
                      <td style={styles.td}>
                        <button style={styles.actionButton}>👁️</button>
                        <button style={styles.actionButton}>✏️</button>
                        <button style={styles.actionButton}>🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer - Pagination */}
            <div style={styles.tableFooter}>
              <div>Showing 1 to {mockData.questoes.length} of {mockData.questoes.length}</div>
              <div style={styles.pagination}>
                <button style={styles.pageButton}>←</button>
                <button style={{ ...styles.pageButton, ...styles.pageButtonActive }}>1</button>
                <button style={styles.pageButton}>2</button>
                <button style={styles.pageButton}>3</button>
                <button style={styles.pageButton}>→</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
