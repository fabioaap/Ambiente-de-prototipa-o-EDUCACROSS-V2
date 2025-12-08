'use client';

import React, { useState } from 'react';
import { Button, Card, Badge, Progress, Text, Select, Input, DataTable, Layout } from '@prototipo/design-system';
import styles from './gestor-redes.module.css';
import ModalDetalhesAcesso from './modal-detalhes-acesso';

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
  const [modalAberto, setModalAberto] = useState(false);
  const [grupoSelecionado, setGrupoSelecionado] = useState('todas');
  const [anoSelecionado, setAnoSelecionado] = useState('2025');
  const [periodoSelecionado, setPeriodoSelecionado] = useState('mes');
  const [buscaEscola, setBuscaEscola] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

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

  // Mock data - Escolas (completo)
  const todasEscolas: EscolaData[] = [
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
      cadastrados: 654,
      acessaram: 640,
      jogaram: 625,
      percentualAcesso: 97.86,
      percentualJogaram: 97.66,
    },
    {
      id: '3',
      nome: 'EMEI PAULO FREIRE',
      grupo: 'Osasco',
      cadastrados: 892,
      acessaram: 865,
      jogaram: 850,
      percentualAcesso: 96.97,
      percentualJogaram: 98.27,
    },
    {
      id: '4',
      nome: 'ESCOLA MUNICIPAL MONSENHOR JOSE CORREIA',
      grupo: 'Piracicaba',
      cadastrados: 1245,
      acessaram: 1190,
      jogaram: 1150,
      percentualAcesso: 95.59,
      percentualJogaram: 96.64,
    },
    {
      id: '5',
      nome: 'EMEF ALMIRANTE TAMANDARÉ',
      grupo: 'Piracicaba',
      cadastrados: 1089,
      acessaram: 950,
      jogaram: 900,
      percentualAcesso: 87.23,
      percentualJogaram: 94.74,
    },
    {
      id: '6',
      nome: 'ESCOLA ESTADUAL GETÚLIO VARGAS',
      grupo: 'Rio de Janeiro',
      cadastrados: 1567,
      acessaram: 1400,
      jogaram: 1320,
      percentualAcesso: 89.35,
      percentualJogaram: 94.29,
    },
    {
      id: '7',
      nome: 'COLÉGIO ESTADUAL BRASIL',
      grupo: 'Rio de Janeiro',
      cadastrados: 1432,
      acessaram: 1200,
      jogaram: 1100,
      percentualAcesso: 83.81,
      percentualJogaram: 91.67,
    },
    {
      id: '8',
      nome: 'EMEB MONTEIRO LOBATO',
      grupo: 'São Paulo',
      cadastrados: 945,
      acessaram: 920,
      jogaram: 890,
      percentualAcesso: 97.36,
      percentualJogaram: 96.74,
    },
    {
      id: '9',
      nome: 'ESCOLA MUNICIPAL CECÍLIA MEIRELES',
      grupo: 'São Paulo',
      cadastrados: 1121,
      acessaram: 1080,
      jogaram: 1050,
      percentualAcesso: 96.34,
      percentualJogaram: 97.22,
    },
    {
      id: '10',
      nome: 'CEFAM PROFESSOR JOÃO BATISTA CONTI',
      grupo: 'Sorocaba',
      cadastrados: 876,
      acessaram: 840,
      jogaram: 810,
      percentualAcesso: 95.86,
      percentualJogaram: 96.43,
    },
  ];

  // Filtrar escolas
  const escolasFiltradas = todasEscolas.filter((escola) => {
    const matchGrupo = grupoSelecionado === 'todas' || escola.grupo === grupoSelecionado;
    const matchBusca = escola.nome.toLowerCase().includes(buscaEscola.toLowerCase());
    return matchGrupo && matchBusca;
  });

  // Paginação
  const itemsPorPagina = 10;
  const totalPaginas = Math.ceil(escolasFiltradas.length / itemsPorPagina);
  const escolasPaginadas = escolasFiltradas.slice(
    (currentPage - 1) * itemsPorPagina,
    currentPage * itemsPorPagina
  );

  const getColorByPercentage = (pct: number): 'success' | 'warning' | 'error' => {
    if (pct >= 90) return 'success';
    if (pct >= 70) return 'warning';
    return 'error';
  };

  const columns = [
    { key: 'nome', label: 'Escola', sortable: true },
    { key: 'grupo', label: 'Grupo', sortable: true },
    { key: 'cadastrados', label: 'Cadastrados', sortable: true },
    { key: 'acessaram', label: 'Acessaram', sortable: true },
    { key: 'jogaram', label: 'Jogaram', sortable: true },
  ];

  return (
    <Layout maxWidth="2xl" centered={false} paddingX="lg" paddingY="lg">
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <Text as="h1" size="3xl" weight="bold">
              Gestor de Redes
            </Text>
            <Text size="lg" color="secondary">
              Dashboard de engajamento EDUCACROSS
            </Text>
          </div>
          <div className={styles.headerRight}>
            <Text size="sm" weight="medium">
              Rede: Osasco
            </Text>
            <Text size="xs" color="secondary">
              Atualizado: {new Date().toLocaleDateString('pt-BR')}
            </Text>
          </div>
        </div>

        {/* Filtros */}
        <Card className={styles.filterCard}>
          <div className={styles.filterRow}>
            <Select
              label="Grupo de Escolas"
              options={[
                { value: 'todas', label: 'Todas as escolas' },
                { value: 'Osasco', label: 'Osasco' },
                { value: 'Piracicaba', label: 'Piracicaba' },
                { value: 'Rio de Janeiro', label: 'Rio de Janeiro' },
                { value: 'São Paulo', label: 'São Paulo' },
                { value: 'Sorocaba', label: 'Sorocaba' },
              ]}
              value={grupoSelecionado}
              onChange={(value) => {
                setGrupoSelecionado(value);
                setCurrentPage(1);
              }}
              placeholder="Selecione um grupo"
            />
            <Select
              label="Ano Escolar"
              options={[
                { value: '2023', label: '2023' },
                { value: '2024', label: '2024' },
                { value: '2025', label: '2025' },
              ]}
              value={anoSelecionado}
              onChange={setAnoSelecionado}
              placeholder="Selecione um ano"
            />
            <Select
              label="Período"
              options={[
                { value: 'semana', label: 'Última semana' },
                { value: 'mes', label: 'Último mês' },
                { value: 'trimestre', label: 'Último trimestre' },
                { value: 'ano', label: 'Último ano' },
              ]}
              value={periodoSelecionado}
              onChange={setPeriodoSelecionado}
              placeholder="Selecione um período"
            />
          </div>
        </Card>

        {/* KPIs */}
        <div className={styles.kpiGrid}>
          {kpis.map((kpi) => (
            <Card key={kpi.label} className={styles.kpiCard}>
              <Text size="lg" weight="bold">
                {kpi.label}
              </Text>
              <div className={styles.kpiContent}>
                <div className={styles.kpiRow}>
                  <Text size="sm" color="secondary">
                    Cadastrados
                  </Text>
                  <Text size="lg" weight="bold">
                    {kpi.cadastrados.toLocaleString('pt-BR')}
                  </Text>
                </div>
                <div className={styles.kpiRow}>
                  <div>
                    <Text size="sm" color="secondary">
                      Acessaram
                    </Text>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Text size="lg" weight="bold">
                      {kpi.acessaram.toLocaleString('pt-BR')}
                    </Text>
                    <Badge variant="solid" color={getColorByPercentage(kpi.percentualAcesso)}>
                      {kpi.percentualAcesso.toFixed(2)}%
                    </Badge>
                  </div>
                </div>
                {kpi.jogaram && (
                  <>
                    <Progress
                      value={kpi.percentualAcesso}
                      variant="linear"
                      size="sm"
                      color={getColorByPercentage(kpi.percentualAcesso)}
                      showLabel={false}
                    />
                    <div className={styles.kpiRow}>
                      <Text size="xs" color="secondary">
                        Jogaram: {kpi.jogaram?.toLocaleString('pt-BR')} ({kpi.percentualJogaram?.toFixed(2)}%)
                      </Text>
                    </div>
                  </>
                )}
                {kpi.label === 'Alunos' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setModalAberto(true)}
                    style={{ marginTop: '8px', width: '100%' }}
                  >
                    Ver detalhes →
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Busca e Exportação */}
        <div className={styles.tableToolbar}>
          <Input
            type="text"
            placeholder="🔍 Pesquisar por escola..."
            value={buscaEscola}
            onChange={(e) => {
              setBuscaEscola(e.target.value);
              setCurrentPage(1);
            }}
            style={{ flex: 1 }}
          />
          <Button variant="outline" size="md">
            📊 Exportar em Excel
          </Button>
        </div>

        {/* Tabela de Escolas */}
        <Card>
          <div style={{ overflowX: 'auto' }}>
            <table className={styles.tabela}>
              <thead>
                <tr>
                  <th>Escola</th>
                  <th>Grupo</th>
                  <th>Cadastrados</th>
                  <th>Acessaram</th>
                  <th>Percentual</th>
                  <th>Jogaram</th>
                </tr>
              </thead>
              <tbody>
                {escolasPaginadas.map((escola) => (
                  <tr key={escola.id} className={styles.tabelaRow}>
                    <td className={styles.tabelaNome}>{escola.nome}</td>
                    <td className={styles.tabelaGrupo}>
                      <Badge variant="outline" size="sm">
                        {escola.grupo}
                      </Badge>
                    </td>
                    <td className={styles.tabelaNumero}>{escola.cadastrados.toLocaleString('pt-BR')}</td>
                    <td className={styles.tabelaNumero}>{escola.acessaram.toLocaleString('pt-BR')}</td>
                    <td className={styles.tabelaPercentual}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Progress
                          value={escola.percentualAcesso}
                          variant="linear"
                          size="sm"
                          color={getColorByPercentage(escola.percentualAcesso)}
                          showLabel={false}
                          style={{ flex: 1, minWidth: '60px' }}
                        />
                        <Badge
                          variant="solid"
                          color={getColorByPercentage(escola.percentualAcesso)}
                          size="sm"
                        >
                          {escola.percentualAcesso.toFixed(1)}%
                        </Badge>
                      </div>
                    </td>
                    <td className={styles.tabelaNumero}>{escola.jogaram.toLocaleString('pt-BR')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginação */}
          <div className={styles.paginacao}>
            <Text size="sm" color="secondary">
              Página {currentPage} de {totalPaginas} • {escolasFiltradas.length} escolas
            </Text>
            <div className={styles.paginacaoBotoes}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                ← Anterior
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPaginas, currentPage + 1))}
                disabled={currentPage === totalPaginas}
              >
                Próxima →
              </Button>
            </div>
          </div>
        </Card>

        {/* Modal de Detalhes */}
        {modalAberto && (
          <ModalDetalhesAcesso
            baseAcessaram={38805}
            onClose={() => setModalAberto(false)}
          />
        )}
      </div>
    </Layout>
  );
}
