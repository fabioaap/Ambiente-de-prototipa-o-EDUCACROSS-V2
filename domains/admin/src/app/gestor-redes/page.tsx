'use client';

import React, { useState } from 'react';
import { Button, Card, Badge, Progress, Text, DataTable, Avatar } from '@prototipo/design-system';
import styles from './gestor-redes.module.css';
import DrawerDetalhesAcesso from './drawer-detalhes-acesso';

interface KPIData {
  label: string;
  cadastrados: number;
  acessaram: number;
  percentualAcesso: number;
  jogaram?: number;
  percentualJogaram?: number;
}

interface EscolaData {
  id: string;
  nome: string;
  grupo: string;
  cadastrados: number;
  acessaram: number;
  jogaram: number;
  percentualAcesso: number;
  percentualJogaram: number;
}

export default function GestorRedesPage() {
  const [drawerAberto, setDrawerAberto] = useState(false);
  const [grupoSelecionado, setGrupoSelecionado] = useState('todas');
  const [anoSelecionado, setAnoSelecionado] = useState('todos');
  const [periodoSelecionado, setPeriodoSelecionado] = useState('todo');
  const [buscaEscola, setBuscaEscola] = useState('');

  // Mock data - KPIs
  const kpis: KPIData[] = [
    {
      label: 'Alunos',
      cadastrados: 39269,
      acessaram: 38805,
      percentualAcesso: 98.81,
      jogaram: 38485,
      percentualJogaram: 99.17,
    },
    {
      label: 'Professores',
      cadastrados: 1325,
      acessaram: 1138,
      percentualAcesso: 85.88,
    },
    {
      label: 'Diretores',
      cadastrados: 104,
      acessaram: 49,
      percentualAcesso: 47.11,
    },
    {
      label: 'Coordenadores',
      cadastrados: 141,
      acessaram: 120,
      percentualAcesso: 85.10,
    },
  ];

  // Mock data - Escolas
  const escolas: EscolaData[] = [
    {
      id: '1',
      nome: 'CEMEIEF MARIA TARCILLA FORNASARO MELLI',
      grupo: 'Osasco',
      cadastrados: 776,
      acessaram: 768,
      jogaram: 761,
      percentualAcesso: 98.96,
      percentualJogaram: 99.08,
    },
    {
      id: '2',
      nome: 'EMEIEF JOSÉ CARLOS SANTOS',
      grupo: 'Osasco',
      cadastrados: 892,
      acessaram: 865,
      jogaram: 850,
      percentualAcesso: 96.97,
      percentualJogaram: 98.27,
    },
    {
      id: '3',
      nome: 'EMEI PAULO FREIRE',
      grupo: 'Osasco',
      cadastrados: 654,
      acessaram: 640,
      jogaram: 625,
      percentualAcesso: 97.86,
      percentualJogaram: 97.66,
    },
  ];

  const getColorByPercentage = (pct: number): 'success' | 'warning' | 'error' => {
    if (pct >= 90) return 'success';
    if (pct >= 70) return 'warning';
    return 'error';
  };

  const columns = [
    { key: 'nome', label: 'ESCOLA' },
    { key: 'grupo', label: 'GRUPO DE ESCOLAS' },
    { key: 'cadastrados', label: 'ALUNOS CADASTRADOS' },
    { key: 'acessaram', label: 'ALUNOS QUE ACESSARAM' },
    { key: 'jogaram', label: 'ALUNOS QUE JOGARAM' },
    { key: 'acoes', label: 'AÇÕES' },
  ];

  const formatTableData = escolas.map((escola) => ({
    ...escola,
    acessaram: (
      <div className={styles.cellWithProgress}>
        <Text size="sm" weight="medium">{escola.percentualAcesso.toFixed(2)}%</Text>
        <Progress
          value={escola.percentualAcesso}
          variant="linear"
          size="sm"
          color={getColorByPercentage(escola.percentualAcesso)}
          showLabel={false}
        />
        <Text size="xs" color="secondary">{escola.acessaram} de {escola.cadastrados}</Text>
      </div>
    ),
    jogaram: (
      <div className={styles.cellWithProgress}>
        <Text size="sm" weight="medium">{escola.percentualJogaram.toFixed(2)}%</Text>
        <Progress
          value={escola.percentualJogaram}
          variant="linear"
          size="sm"
          color={getColorByPercentage(escola.percentualJogaram)}
          showLabel={false}
        />
        <Text size="xs" color="secondary">{escola.jogaram} de {escola.acessaram}</Text>
      </div>
    ),
    acoes: (
      <Button variant="ghost" size="sm">Ver detalhes</Button>
    ),
  }));

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>Painel Inicial</h1>
          <p>Gestor de Redes</p>
        </div>
        <div className={styles.headerRight}>
          <p>Maxwell Cortez</p>
          <p>Gestor de Redes</p>
        </div>
      </header>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button className={`${styles.tab} ${styles.tabActive}`}>Engajamento</button>
        <button className={styles.tab}>Desempenho</button>
      </div>

      {/* Filtros */}
      <div className={styles.filters}>
        <select
          value={grupoSelecionado}
          onChange={(e) => setGrupoSelecionado(e.target.value)}
        >
          <option value="todas">Todas as opções selecionadas</option>
          <option value="osasco">Osasco</option>
          <option value="barueri">Barueri</option>
        </select>

        <select
          value={anoSelecionado}
          onChange={(e) => setAnoSelecionado(e.target.value)}
        >
          <option value="todos">Todos os anos</option>
          <option value="1">1º ano</option>
          <option value="2">2º ano</option>
          <option value="3">3º ano</option>
        </select>

        <select
          value={periodoSelecionado}
          onChange={(e) => setPeriodoSelecionado(e.target.value)}
        >
          <option value="todo">Todo o período</option>
          <option value="mes">Último mês</option>
          <option value="semana">Última semana</option>
        </select>
      </div>

      {/* Teste simples */}
      <div style={{ padding: '20px', background: 'white', margin: '20px 0' }}>
        <h2>✅ Se você vê isso, o problema está nos KPIs abaixo</h2>
      </div>

      {/* KPIs Grid */}
      <div className={styles.kpisGrid}>
        {kpis.map((kpi, index) => (
          <Card
            key={kpi.label}
            className={`${styles.kpiCard} ${index === 0 ? styles.kpiCardDestaque : ''} ${index === 0 ? styles.kpiCardClickable : ''}`}
            onClick={index === 0 ? () => setDrawerAberto(true) : undefined}
          >
            <div className={styles.kpiHeader}>
              <div className={styles.kpiHeaderLeft}>
                {index === 0 && (
                  <Avatar
                    initials="AL"
                    size="sm"
                    className={styles.kpiAvatar}
                  />
                )}
                <Text size="sm" weight="medium" color="secondary">{kpi.label}</Text>
              </div>
              {index === 0 && <span className={styles.kpiIcon}>👁</span>}
            </div>

            <div className={styles.kpiMetric}>
              <Text size="xs" color="secondary">Cadastrados</Text>
              <Text size="lg" weight="bold">{kpi.cadastrados.toLocaleString('pt-BR')}</Text>
              <Text size="xs" color="secondary">de {kpi.cadastrados.toLocaleString('pt-BR')}</Text>
            </div>

            <Progress
              value={100}
              variant="linear"
              size="sm"
              color="success"
              showLabel={false}
              className={styles.kpiProgress}
            />
            <Badge variant="solid" color="success" className={styles.kpiBadge}>
              98,65%
            </Badge>

            <div className={styles.kpiMetric}>
              <Text size="xs" color="secondary">Acessaram</Text>
              <Text size="lg" weight="bold">{kpi.acessaram.toLocaleString('pt-BR')}</Text>
              <Text size="xs" color="secondary">de {kpi.cadastrados.toLocaleString('pt-BR')}</Text>
            </div>

            <Progress
              value={kpi.percentualAcesso}
              variant="linear"
              size="sm"
              color={getColorByPercentage(kpi.percentualAcesso)}
              showLabel={false}
              className={styles.kpiProgress}
            />
            <Badge
              variant="solid"
              color={getColorByPercentage(kpi.percentualAcesso)}
              className={styles.kpiBadge}
            >
              {kpi.percentualAcesso.toFixed(2)}%
            </Badge>

            {kpi.jogaram !== undefined && (
              <>
                <div className={styles.kpiMetric}>
                  <Text size="xs" color="secondary">Jogaram</Text>
                  <Text size="lg" weight="bold">{kpi.jogaram.toLocaleString('pt-BR')}</Text>
                  <Text size="xs" color="secondary">de {kpi.acessaram.toLocaleString('pt-BR')}</Text>
                </div>

                <Progress
                  value={kpi.percentualJogaram!}
                  variant="linear"
                  size="sm"
                  color={getColorByPercentage(kpi.percentualJogaram!)}
                  showLabel={false}
                  className={styles.kpiProgress}
                />
                <Badge
                  variant="solid"
                  color={getColorByPercentage(kpi.percentualJogaram!)}
                  className={styles.kpiBadge}
                >
                  {kpi.percentualJogaram!.toFixed(2)}%
                </Badge>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDrawerAberto(true)}
                  className={styles.kpiButton}
                >
                  Ver detalhes
                </Button>
              </>
            )}
          </Card>
        ))}
      </div>

      {/* Tabela de Escolas */}
      <div className={styles.tableSection}>
        <div className={styles.tableHeader}>
          <div className={styles.tableControls}>
            <span style={{ fontSize: '14px' }}>Mostrar</span>
            <select defaultValue="10" style={{ marginLeft: '8px', padding: '4px 8px' }}>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </div>

          <div className={styles.tableSearch}>
            <input
              type="search"
              placeholder="Pesquisar por escola"
              value={buscaEscola}
              onChange={(e) => setBuscaEscola(e.target.value)}
              style={{ padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>

          <Button variant="outline" size="sm">
            📤 Exportar em Excel
          </Button>
        </div>

        <DataTable
          columns={columns}
          data={formatTableData}
          className={styles.table}
        />

        <div className={styles.tablePagination}>
          <Text size="sm" color="secondary">Selecionados: 0</Text>
        </div>
      </div>

      {/* Drawer de Detalhes */}
      <DrawerDetalhesAcesso
        aberto={drawerAberto}
        onFechar={() => setDrawerAberto(false)}
        titulo="Detalhes de Acesso - Alunos"
        totalAcessos={38805}
      />
    </div>
  );
}
