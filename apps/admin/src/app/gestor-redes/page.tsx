'use client';

import { useState } from 'react';
import {
  Button,
  Text,
  Card,
  Layout,
  Modal,
  Badge,
  Input,
  Progress,
} from '@prototipo/design-system';
import styles from './gestor-redes.module.css';

// Tipos
interface Interacao {
  tipo: string;
  emoji: string;
  total: number;
}

interface Escola {
  id: string;
  nome: string;
  cidade: string;
  alunos: number;
  jornadas: number;
  progresso: number;
  status: 'ativa' | 'inativa' | 'pendente';
  interacoes: Interacao[];
}

// Mock Data
const tiposInteracao: Interacao[] = [
  { tipo: 'Jogos Completados', emoji: '🎮', total: 0 },
  { tipo: 'Quizzes Respondidos', emoji: '📝', total: 0 },
  { tipo: 'Vídeos Assistidos', emoji: '🎬', total: 0 },
  { tipo: 'Leituras Concluídas', emoji: '📖', total: 0 },
  { tipo: 'Desafios Vencidos', emoji: '🏆', total: 0 },
  { tipo: 'Colaborações', emoji: '🤝', total: 0 },
];

const escolas: Escola[] = [
  {
    id: '1',
    nome: 'Escola Municipal João Paulo II',
    cidade: 'São Paulo',
    alunos: 450,
    jornadas: 12,
    progresso: 78,
    status: 'ativa',
    interacoes: tiposInteracao.map((t) => ({ ...t, total: Math.floor(Math.random() * 500) + 100 })),
  },
  {
    id: '2',
    nome: 'Colégio Estadual Monteiro Lobato',
    cidade: 'Campinas',
    alunos: 320,
    jornadas: 8,
    progresso: 65,
    status: 'ativa',
    interacoes: tiposInteracao.map((t) => ({ ...t, total: Math.floor(Math.random() * 400) + 80 })),
  },
  {
    id: '3',
    nome: 'Instituto Educacional Novo Horizonte',
    cidade: 'Santos',
    alunos: 280,
    jornadas: 10,
    progresso: 82,
    status: 'ativa',
    interacoes: tiposInteracao.map((t) => ({ ...t, total: Math.floor(Math.random() * 350) + 70 })),
  },
  {
    id: '4',
    nome: 'Escola Técnica Profª Maria Clara',
    cidade: 'Sorocaba',
    alunos: 150,
    jornadas: 5,
    progresso: 45,
    status: 'pendente',
    interacoes: tiposInteracao.map((t) => ({ ...t, total: Math.floor(Math.random() * 200) + 30 })),
  },
  {
    id: '5',
    nome: 'Centro de Ensino Integrado',
    cidade: 'Ribeirão Preto',
    alunos: 520,
    jornadas: 15,
    progresso: 91,
    status: 'ativa',
    interacoes: tiposInteracao.map((t) => ({ ...t, total: Math.floor(Math.random() * 600) + 150 })),
  },
  {
    id: '6',
    nome: 'Escola Comunitária Vila Nova',
    cidade: 'São Paulo',
    alunos: 180,
    jornadas: 6,
    progresso: 55,
    status: 'ativa',
    interacoes: tiposInteracao.map((t) => ({ ...t, total: Math.floor(Math.random() * 250) + 50 })),
  },
  {
    id: '7',
    nome: 'Colégio Particular Santa Luzia',
    cidade: 'Campinas',
    alunos: 400,
    jornadas: 14,
    progresso: 88,
    status: 'ativa',
    interacoes: tiposInteracao.map((t) => ({ ...t, total: Math.floor(Math.random() * 500) + 120 })),
  },
  {
    id: '8',
    nome: 'Escola Rural Sítio Esperança',
    cidade: 'Piracicaba',
    alunos: 85,
    jornadas: 3,
    progresso: 30,
    status: 'inativa',
    interacoes: tiposInteracao.map((t) => ({ ...t, total: Math.floor(Math.random() * 100) + 10 })),
  },
  {
    id: '9',
    nome: 'Instituto Federal de Educação',
    cidade: 'São José dos Campos',
    alunos: 680,
    jornadas: 18,
    progresso: 72,
    status: 'ativa',
    interacoes: tiposInteracao.map((t) => ({ ...t, total: Math.floor(Math.random() * 700) + 200 })),
  },
  {
    id: '10',
    nome: 'Escola Bilíngue Internacional',
    cidade: 'São Paulo',
    alunos: 220,
    jornadas: 9,
    progresso: 95,
    status: 'ativa',
    interacoes: tiposInteracao.map((t) => ({ ...t, total: Math.floor(Math.random() * 300) + 80 })),
  },
];

// KPIs calculados
const kpis = [
  { label: 'Escolas Ativas', valor: escolas.filter((e) => e.status === 'ativa').length, cor: '#3b82f6' },
  { label: 'Total de Alunos', valor: escolas.reduce((acc, e) => acc + e.alunos, 0).toLocaleString('pt-BR'), cor: '#10b981' },
  { label: 'Jornadas Completadas', valor: escolas.reduce((acc, e) => acc + e.jornadas, 0), cor: '#8b5cf6' },
  { label: 'Média de Progresso', valor: `${Math.round(escolas.reduce((acc, e) => acc + e.progresso, 0) / escolas.length)}%`, cor: '#f59e0b' },
];

export default function GestorRedesPage() {
  const [modalAberto, setModalAberto] = useState(false);
  const [escolaSelecionada, setEscolaSelecionada] = useState<Escola | null>(null);
  const [filtroStatus, setFiltroStatus] = useState<string>('todos');
  const [filtroCidade, setFiltroCidade] = useState<string>('todas');
  const [busca, setBusca] = useState('');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 5;

  // Cidades únicas
  const cidades = ['todas', ...new Set(escolas.map((e) => e.cidade))];

  // Filtrar escolas
  const escolasFiltradas = escolas.filter((escola) => {
    const matchStatus = filtroStatus === 'todos' || escola.status === filtroStatus;
    const matchCidade = filtroCidade === 'todas' || escola.cidade === filtroCidade;
    const matchBusca = escola.nome.toLowerCase().includes(busca.toLowerCase());
    return matchStatus && matchCidade && matchBusca;
  });

  // Paginação
  const totalPaginas = Math.ceil(escolasFiltradas.length / itensPorPagina);
  const escolasPaginadas = escolasFiltradas.slice(
    (paginaAtual - 1) * itensPorPagina,
    paginaAtual * itensPorPagina
  );

  const abrirDetalhes = (escola: Escola) => {
    setEscolaSelecionada(escola);
    setModalAberto(true);
  };

  const getStatusVariant = (status: string): 'success' | 'warning' | 'error' => {
    switch (status) {
      case 'ativa':
        return 'success';
      case 'pendente':
        return 'warning';
      default:
        return 'error';
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.titulo}>Gestor de Redes</h1>
            <p className={styles.subtitulo}>
              Visão geral das escolas e suas interações na plataforma
            </p>
          </div>
          <Button variant="primary">+ Nova Escola</Button>
        </div>

        {/* KPIs */}
        <div className={styles.kpiGrid}>
          {kpis.map((kpi, index) => (
            <Card key={index} className={styles.kpiCard}>
              <Text className={styles.kpiLabel}>{kpi.label}</Text>
              <Text className={styles.kpiValor} style={{ color: kpi.cor }}>
                {kpi.valor}
              </Text>
            </Card>
          ))}
        </div>

        {/* Filtros */}
        <Card className={styles.filtrosCard}>
          <div className={styles.filtrosRow}>
            <div>
              <Text as="label" size="sm">Cidade</Text>
              <select
                value={filtroCidade}
                onChange={(e) => {
                  setFiltroCidade(e.target.value);
                  setPaginaAtual(1);
                }}
                className={styles.select}
              >
                {cidades.map((cidade) => (
                  <option key={cidade} value={cidade}>
                    {cidade === 'todas' ? 'Todas as cidades' : cidade}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Text as="label" size="sm">Status</Text>
              <select
                value={filtroStatus}
                onChange={(e) => {
                  setFiltroStatus(e.target.value);
                  setPaginaAtual(1);
                }}
                className={styles.select}
              >
                <option value="todos">Todos</option>
                <option value="ativa">Ativas</option>
                <option value="pendente">Pendentes</option>
                <option value="inativa">Inativas</option>
              </select>
            </div>

            <div style={{ flex: 2 }}>
              <Text as="label" size="sm">Buscar escola</Text>
              <Input
                placeholder="Digite o nome da escola..."
                value={busca}
                onChange={(e) => {
                  setBusca(e.target.value);
                  setPaginaAtual(1);
                }}
              />
            </div>
          </div>
        </Card>

        {/* Tabela */}
        <Card className={styles.tabelaCard}>
          <Text className={styles.tabelaTitulo}>
            Escolas ({escolasFiltradas.length})
          </Text>

          <div className={styles.tabela}>
            <div className={styles.tabelaHeader}>
              <span>Escola</span>
              <span>Cidade</span>
              <span>Alunos</span>
              <span>Jornadas</span>
              <span>Progresso</span>
              <span>Status</span>
            </div>

            {escolasPaginadas.map((escola) => (
              <div
                key={escola.id}
                className={styles.tabelaRow}
                onClick={() => abrirDetalhes(escola)}
                style={{ cursor: 'pointer' }}
              >
                <span className={styles.escolaNome}>{escola.nome}</span>
                <span>{escola.cidade}</span>
                <span>{escola.alunos}</span>
                <span>{escola.jornadas}</span>
                <span className={styles.progressoCell}>
                  <Progress value={escola.progresso} />
                  <span>{escola.progresso}%</span>
                </span>
                <span>
                  <Badge variant={getStatusVariant(escola.status)}>
                    {escola.status}
                  </Badge>
                </span>
              </div>
            ))}
          </div>

          {/* Paginação */}
          {totalPaginas > 1 && (
            <div className={styles.paginacao}>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setPaginaAtual((p) => Math.max(1, p - 1))}
                disabled={paginaAtual === 1}
              >
                Anterior
              </Button>
              <Text>
                Página {paginaAtual} de {totalPaginas}
              </Text>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setPaginaAtual((p) => Math.min(totalPaginas, p + 1))}
                disabled={paginaAtual === totalPaginas}
              >
                Próxima
              </Button>
            </div>
          )}
        </Card>

        {/* Modal de Detalhes */}
        <Modal
          open={modalAberto}
          onClose={() => setModalAberto(false)}
          title={escolaSelecionada?.nome || 'Detalhes da Escola'}
        >
          {escolaSelecionada && (
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <Badge variant={getStatusVariant(escolaSelecionada.status)}>
                  {escolaSelecionada.status}
                </Badge>
                <Text size="sm" color="muted">
                  {escolaSelecionada.cidade}
                </Text>
              </div>

              <div className={styles.modalStats}>
                <div className={styles.modalStat}>
                  <Text size="sm" color="muted">Alunos</Text>
                  <Text size="lg" weight="bold">{escolaSelecionada.alunos}</Text>
                </div>
                <div className={styles.modalStat}>
                  <Text size="sm" color="muted">Jornadas</Text>
                  <Text size="lg" weight="bold">{escolaSelecionada.jornadas}</Text>
                </div>
                <div className={styles.modalStat}>
                  <Text size="sm" color="muted">Progresso</Text>
                  <Text size="lg" weight="bold">{escolaSelecionada.progresso}%</Text>
                </div>
              </div>

              <Text className={styles.modalSubtitulo}>Interações por Tipo</Text>
              <div className={styles.interacoesList}>
                {escolaSelecionada.interacoes.map((interacao, idx) => (
                  <div key={idx} className={styles.interacaoItem}>
                    <div className={styles.interacaoHeader}>
                      <span className={styles.interacaoEmoji}>{interacao.emoji}</span>
                      <span className={styles.interacaoTipo}>{interacao.tipo}</span>
                      <Badge variant="info">{interacao.total}</Badge>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.modalAviso}>
                <Text size="sm" color="muted">
                  💡 Clique em uma interação para ver detalhes por turma
                </Text>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </Layout>
  );
}
