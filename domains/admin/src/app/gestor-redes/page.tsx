'use client';

import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Tabs,
  FilterGroup,
  DataTable,
  Progress,
  Badge,
  Button,
  Text,
  Input,
  StatsCard,
  Pagination,
} from '@prototipo/design-system';
import styles from './gestor-redes.module.css';

// Tipos
interface EscolaData {
  id: string;
  nome: string;
  grupo: string;
  cadastrados: number;
  totalCadastrados: number;
  percentualCadastrados: number;
  acessaram: number;
  totalAcessaram: number;
  percentualAcessaram: number;
  jogaram: number;
  totalJogaram: number;
  percentualJogaram: number;
}

export default function GestorRedesPage() {
  const [tabAtiva, setTabAtiva] = useState('engajamento');
  const [filtros, setFiltros] = useState<Record<string, string | number | boolean | null | undefined>>({
    grupo: '',
    ano: '',
    periodo: '',
  });
  const [buscaEscola, setBuscaEscola] = useState('');
  const [paginaAtual, setPaginaAtual] = useState(1);

  // Mock data - KPIs baseados no screenshot
  const kpiAlunos = {
    cadastrados: 359,
    totalCadastrados: 1220,
    percentualCadastrados: 29.42,
    acessaram: 34,
    totalAcessaram: 359,
    percentualAcessaram: 9.47,
    jogaram: 19,
    totalJogaram: 34,
    percentualJogaram: 55.88,
  };

  const kpiProfessores = { acessaram: 19, total: 114, percentual: 16.66 };
  const kpiDiretores = { acessaram: 7, total: 9, percentual: 77.77 };
  const kpiCoordenadores = { acessaram: 9, total: 18, percentual: 50 };
  const kpiAdministradores = { acessaram: 10, total: 16, percentual: 62.50 };

  // Mock data - Escolas
  const escolas: EscolaData[] = [
    {
      id: '1',
      nome: 'Colégio Nova Jornada',
      grupo: 'Escolas Produto',
      cadastrados: 23,
      totalCadastrados: 220,
      percentualCadastrados: 10.45,
      acessaram: 23,
      totalAcessaram: 193,
      percentualAcessaram: 11.91,
      jogaram: 16,
      totalJogaram: 23,
      percentualJogaram: 69.56,
    },
    {
      id: '2',
      nome: 'Pequenos Exploradores',
      grupo: 'Escolas Produto',
      cadastrados: 11,
      totalCadastrados: 1000,
      percentualCadastrados: 1.10,
      acessaram: 11,
      totalAcessaram: 166,
      percentualAcessaram: 6.62,
      jogaram: 3,
      totalJogaram: 11,
      percentualJogaram: 27.27,
    },
  ];

  // Função para determinar a cor do progresso
  const getProgressColor = (pct: number): 'success' | 'warning' | 'error' => {
    if (pct >= 80) return 'success';
    if (pct >= 50) return 'warning';
    return 'error';
  };

  // Configuração dos filtros
  const filtrosConfig = [
    {
      id: 'grupo',
      type: 'select' as const,
      label: 'Grupo de Escolas',
      placeholder: 'Todas as opções selecionadas',
      options: [
        { value: 'produto', label: 'Escolas Produto' },
      ],
    },
    {
      id: 'ano',
      type: 'select' as const,
      label: 'Ano Escolar',
      placeholder: 'Todos os anos',
      options: [
        { value: '2025', label: '2025' },
        { value: '2024', label: '2024' },
      ],
    },
    {
      id: 'periodo',
      type: 'select' as const,
      label: 'Período',
      placeholder: 'Todo o período',
      options: [
        { value: 'mes', label: 'Último mês' },
        { value: 'semana', label: 'Última semana' },
      ],
    },
  ];

  // Configuração das colunas da tabela
  const colunas = [
    { key: 'nome', label: 'Escola', sortable: true },
    { key: 'grupo', label: 'Grupo de Escolas', sortable: true },
    {
      key: 'cadastrados',
      label: 'Alunos Cadastrados',
      sortable: true,
      render: (_: unknown, row: Record<string, unknown>) => (
        <div className={styles.celulaDados}>
          <Progress 
            value={row.percentualCadastrados as number} 
            size="sm" 
            color={getProgressColor(row.percentualCadastrados as number)}
            showLabel
          />
          <Text size="xs" color="muted">
            {row.cadastrados as number} de {row.totalCadastrados as number}
          </Text>
        </div>
      ),
    },
    {
      key: 'acessaram',
      label: 'Alunos que Acessaram',
      sortable: true,
      render: (_: unknown, row: Record<string, unknown>) => (
        <div className={styles.celulaDados}>
          <Progress 
            value={row.percentualAcessaram as number} 
            size="sm" 
            color={getProgressColor(row.percentualAcessaram as number)}
            showLabel
          />
          <Text size="xs" color="muted">
            {row.acessaram as number} de {row.totalAcessaram as number}
          </Text>
        </div>
      ),
    },
    {
      key: 'jogaram',
      label: 'Alunos que Jogaram',
      sortable: true,
      render: (_: unknown, row: Record<string, unknown>) => (
        <div className={styles.celulaDados}>
          <Progress 
            value={row.percentualJogaram as number} 
            size="sm" 
            color={getProgressColor(row.percentualJogaram as number)}
            showLabel
          />
          <Text size="xs" color="muted">
            {row.jogaram as number} de {row.totalJogaram as number}
          </Text>
        </div>
      ),
    },
    {
      key: 'acoes',
      label: 'Ações',
      render: () => (
        <div className={styles.acoesBotoes}>
          <Button variant="outline" size="sm">👁</Button>
          <Button variant="outline" size="sm">⊕</Button>
        </div>
      ),
    },
  ];

  // Tabs config
  const tabsConfig = [
    { id: 'engajamento', label: 'Engajamento' },
    { id: 'desempenho', label: 'Desempenho' },
  ];

  return (
    <div className={styles.pageWrapper}>
      {/* Header */}
      <header className={styles.topHeader}>
        <div className={styles.headerLeft}>
          <Button variant="ghost" size="sm">☰</Button>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>∞</span>
            <Text as="span" weight="semibold" size="lg">educacross</Text>
          </div>
        </div>
        <div className={styles.headerRight}>
          <Text as="span" weight="medium">Fabio Alves</Text>
          <Badge variant="primary" size="sm">Gestor de Redes</Badge>
          <div className={styles.avatar}>
            <span>👤</span>
            <Badge variant="error" size="sm" className={styles.notificationBadge}>2</Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Tabs e Rede Badge */}
        <div className={styles.tabsRow}>
          <Tabs
            tabs={tabsConfig}
            value={tabAtiva}
            onChange={setTabAtiva}
            variant="enclosed"
          />
          <Badge variant="primary" styleType="soft" icon={<span>🏢</span>}>
            REDE PRODUTO
          </Badge>
        </div>

        {/* Filtros */}
        <FilterGroup
          filters={filtrosConfig}
          values={filtros}
          onChange={(id, value) => setFiltros(prev => ({ ...prev, [id]: value }))}
          layout="grid"
        />

        {/* KPI Section */}
        <div className={styles.kpiSection}>
          {/* Card principal - Alunos */}
          <Card variant="bordered">
            <CardHeader>
              <CardTitle>Alunos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={styles.kpiAlunosContent}>
                <div className={styles.kpiAlunosMetricas}>
                  <div className={styles.kpiMetrica}>
                    <div className={styles.metricaRow}>
                      <Text weight="medium" size="sm">Cadastrados</Text>
                      <Text size="sm" color="muted">
                        <strong>{kpiAlunos.cadastrados}</strong> de {kpiAlunos.totalCadastrados}
                      </Text>
                    </div>
                    <Progress 
                      value={kpiAlunos.percentualCadastrados} 
                      size="sm" 
                      color={getProgressColor(kpiAlunos.percentualCadastrados)}
                    />
                    <Text 
                      size="xs" 
                      weight="semibold" 
                      color={kpiAlunos.percentualCadastrados >= 50 ? 'success' : 'error'}
                    >
                      {kpiAlunos.percentualCadastrados}%
                    </Text>
                  </div>

                  <div className={styles.kpiMetrica}>
                    <div className={styles.metricaRow}>
                      <Text weight="medium" size="sm">Acessaram</Text>
                      <Text size="sm" color="muted">
                        <strong>{kpiAlunos.acessaram}</strong> de {kpiAlunos.totalAcessaram}
                      </Text>
                    </div>
                    <Progress 
                      value={kpiAlunos.percentualAcessaram} 
                      size="sm" 
                      color={getProgressColor(kpiAlunos.percentualAcessaram)}
                    />
                    <Text 
                      size="xs" 
                      weight="semibold" 
                      color={kpiAlunos.percentualAcessaram >= 50 ? 'success' : 'error'}
                    >
                      {kpiAlunos.percentualAcessaram}%
                    </Text>
                  </div>

                  <div className={styles.kpiMetrica}>
                    <div className={styles.metricaRow}>
                      <Text weight="medium" size="sm">Jogaram</Text>
                      <Text size="sm" color="muted">
                        <strong>{kpiAlunos.jogaram}</strong> de {kpiAlunos.totalJogaram}
                      </Text>
                    </div>
                    <Progress 
                      value={kpiAlunos.percentualJogaram} 
                      size="sm" 
                      color={getProgressColor(kpiAlunos.percentualJogaram)}
                    />
                    <Text 
                      size="xs" 
                      weight="semibold" 
                      color={kpiAlunos.percentualJogaram >= 50 ? 'success' : 'error'}
                    >
                      {kpiAlunos.percentualJogaram}%
                    </Text>
                  </div>
                </div>
                <div className={styles.kpiEmoji}>😊</div>
              </div>
            </CardContent>
          </Card>

          {/* Cards secundários */}
          <div className={styles.kpiCardsGrid}>
            <StatsCard
              title="Professores"
              value={`${kpiProfessores.acessaram} de ${kpiProfessores.total}`}
              subtitle="acessaram"
              trend={{
                value: `${kpiProfessores.percentual}%`,
                direction: kpiProfessores.percentual >= 50 ? 'up' : 'down',
              }}
              icon={<span>👤</span>}
            />
            <StatsCard
              title="Diretores"
              value={`${kpiDiretores.acessaram} de ${kpiDiretores.total}`}
              subtitle="acessaram"
              trend={{
                value: `${kpiDiretores.percentual}%`,
                direction: kpiDiretores.percentual >= 50 ? 'up' : 'down',
              }}
              icon={<span>🏫</span>}
            />
            <StatsCard
              title="Coordenadores"
              value={`${kpiCoordenadores.acessaram} de ${kpiCoordenadores.total}`}
              subtitle="acessaram"
              trend={{
                value: `${kpiCoordenadores.percentual}%`,
                direction: kpiCoordenadores.percentual >= 50 ? 'up' : 'down',
              }}
              icon={<span>👥</span>}
            />
            <StatsCard
              title="Administradores"
              value={`${kpiAdministradores.acessaram} de ${kpiAdministradores.total}`}
              subtitle="acessaram"
              trend={{
                value: `${kpiAdministradores.percentual}%`,
                direction: kpiAdministradores.percentual >= 50 ? 'up' : 'down',
              }}
              icon={<span>⚙️</span>}
            />
          </div>
        </div>

        {/* Toolbar da tabela */}
        <div className={styles.tableToolbar}>
          <div className={styles.toolbarLeft}>
            <Text size="sm" color="muted">Mostrar</Text>
            <select className={styles.selectPequeno}>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </div>
          <div className={styles.toolbarRight}>
            <Input
              type="text"
              placeholder="Pesquisar por escola"
              value={buscaEscola}
              onChange={(e) => setBuscaEscola(e.target.value)}
            />
            <Button variant="outline">
              📥 Exportar em Excel
            </Button>
          </div>
        </div>

        {/* Tabela de dados */}
        <DataTable
          columns={colunas}
          data={escolas}
          sortable
          striped
          hoverable
        />

        {/* Paginação */}
        <Pagination
          currentPage={paginaAtual}
          totalPages={1}
          totalItems={escolas.length}
          itemsPerPage={10}
          onPageChange={setPaginaAtual}
        />

        {/* Botão de Ajuda */}
        <Button className={styles.ajudaButton} variant="primary">
          💬 Precisando de ajuda? ▲
        </Button>

        {/* Legenda */}
        <div className={styles.legenda}>
          <div className={styles.legendaItem}>
            <Badge variant="success" dot>Finalizado = 100%</Badge>
          </div>
          <div className={styles.legendaItem}>
            <Badge variant="success" styleType="soft" dot>Satisfatório ≥ 80%</Badge>
          </div>
          <div className={styles.legendaItem}>
            <Badge variant="warning" styleType="soft" dot>Moderado ≥ 50%</Badge>
          </div>
          <div className={styles.legendaItem}>
            <Badge variant="error" styleType="soft" dot>Crítico &lt; 50%</Badge>
          </div>
        </div>

        {/* Footer */}
        <footer className={styles.footer}>
          <Text size="sm" color="muted">
            2025 © <a href="#">Educacross</a>, Todos os direitos reservados
          </Text>
          <div className={styles.socialLinks}>
            <a href="#">📘</a>
            <a href="#">▶️</a>
            <a href="#">📷</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
