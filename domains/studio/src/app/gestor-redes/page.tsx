'use client';

import { useState } from 'react';
import {
  Layout,
  Card,
  Badge,
  Progress,
  Text,
  Select,
  Input,
  Button,
  Modal,
} from '@prototipo/design-system';
import styles from './gestor-redes.module.css';

// Mock data
const mockEscolas = [
  { id: 1, nome: 'EMEF PROF. JOÃO SILVA', grupo: 'Osasco', alunos: 1250, acessaram: 1150, percentual: 92 },
  { id: 2, nome: 'EMEF MARIA EDUARDA', grupo: 'Osasco', alunos: 980, acessaram: 833, percentual: 85 },
  { id: 3, nome: 'EMEI PEQUENOS BRILHANTES', grupo: 'Piracicaba', alunos: 450, acessaram: 378, percentual: 84 },
  { id: 4, nome: 'EMEF CASTRO ALVES', grupo: 'Piracicaba', alunos: 1100, acessaram: 880, percentual: 80 },
  { id: 5, nome: 'EMEF MONTEIRO LOBATO', grupo: 'Rio de Janeiro', alunos: 890, acessaram: 667, percentual: 75 },
  { id: 6, nome: 'EMEI PAULO FREIRE', grupo: 'São Paulo', alunos: 560, acessaram: 392, percentual: 70 },
  { id: 7, nome: 'EMEF TIRADENTES', grupo: 'São Paulo', alunos: 1340, acessaram: 871, percentual: 65 },
  { id: 8, nome: 'EMEF DOM PEDRO II', grupo: 'Sorocaba', alunos: 720, acessaram: 432, percentual: 60 },
  { id: 9, nome: 'EMEI SANTOS DUMONT', grupo: 'Sorocaba', alunos: 380, acessaram: 209, percentual: 55 },
  { id: 10, nome: 'EMEF PRINCESA ISABEL', grupo: 'Rio de Janeiro', alunos: 950, acessaram: 475, percentual: 50 },
];

const mockInteracoes = [
  { tipo: 'Jogaram', emoji: '🎮', total: 28500, percentual: 73 },
  { tipo: 'Vídeos', emoji: '📹', total: 22100, percentual: 57 },
  { tipo: 'Livros', emoji: '📚', total: 18900, percentual: 49 },
  { tipo: 'Avaliações', emoji: '📝', total: 15200, percentual: 39 },
  { tipo: 'Questões', emoji: '❓', total: 12800, percentual: 33 },
  { tipo: 'Música', emoji: '🎵', total: 9500, percentual: 24 },
];

const kpis = [
  { label: 'Alunos', valor: '38.805', cor: '#3B82F6' },
  { label: 'Professores', valor: '1.138', cor: '#10B981' },
  { label: 'Diretores', valor: '49', cor: '#8B5CF6' },
  { label: 'Coordenadores', valor: '120', cor: '#F59E0B' },
];

const grupos = [
  { value: '', label: 'Todos os Grupos' },
  { value: 'Osasco', label: 'Osasco' },
  { value: 'Piracicaba', label: 'Piracicaba' },
  { value: 'Rio de Janeiro', label: 'Rio de Janeiro' },
  { value: 'São Paulo', label: 'São Paulo' },
  { value: 'Sorocaba', label: 'Sorocaba' },
];

export default function GestorRedesPage() {
  const [modalAberto, setModalAberto] = useState(false);
  const [escolaSelecionada, setEscolaSelecionada] = useState<typeof mockEscolas[0] | null>(null);
  const [grupoSelecionado, setGrupoSelecionado] = useState('');
  const [buscaEscola, setBuscaEscola] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filtrar escolas
  const escolasFiltradas = mockEscolas.filter((escola) => {
    const matchGrupo = !grupoSelecionado || escola.grupo === grupoSelecionado;
    const matchBusca = !buscaEscola || escola.nome.toLowerCase().includes(buscaEscola.toLowerCase());
    return matchGrupo && matchBusca;
  });

  // Paginação
  const totalPages = Math.ceil(escolasFiltradas.length / itemsPerPage);
  const escolasPaginadas = escolasFiltradas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const abrirModal = (escola: typeof mockEscolas[0]) => {
    setEscolaSelecionada(escola);
    setModalAberto(true);
  };

  const getCorProgresso = (percentual: number) => {
    if (percentual >= 80) return '#10B981';
    if (percentual >= 60) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <Layout>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <Text as="h1" className={styles.titulo}>
              Gestor de Redes
            </Text>
            <Text as="p" className={styles.subtitulo}>
              Dashboard de engajamento educacional
            </Text>
          </div>
          <Badge variant="info">Atualizado há 5 min</Badge>
        </div>

        {/* KPIs */}
        <div className={styles.kpiGrid}>
          {kpis.map((kpi) => (
            <Card key={kpi.label} className={styles.kpiCard}>
              <Text as="span" className={styles.kpiLabel}>
                {kpi.label}
              </Text>
              <Text as="h2" className={styles.kpiValor} style={{ color: kpi.cor }}>
                {kpi.valor}
              </Text>
            </Card>
          ))}
        </div>

        {/* Filtros */}
        <Card className={styles.filtrosCard}>
          <div className={styles.filtrosRow}>
            <Select
              label="Grupo de Escolas"
              options={grupos}
              value={grupoSelecionado}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setGrupoSelecionado(e.target.value);
                setCurrentPage(1);
              }}
            />
            <Input
              placeholder="Buscar escola..."
              value={buscaEscola}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setBuscaEscola(e.target.value);
                setCurrentPage(1);
              }}
            />
            <Button onClick={() => console.log('Exportar')}>
              📥 Exportar
            </Button>
          </div>
        </Card>

        {/* Tabela de Escolas */}
        <Card className={styles.tabelaCard}>
          <Text as="h3" className={styles.tabelaTitulo}>
            Escolas ({escolasFiltradas.length})
          </Text>
          
          <div className={styles.tabela}>
            <div className={styles.tabelaHeader}>
              <span>Escola</span>
              <span>Grupo</span>
              <span>Alunos</span>
              <span>Acessaram</span>
              <span>Engajamento</span>
              <span>Ações</span>
            </div>
            
            {escolasPaginadas.map((escola) => (
              <div key={escola.id} className={styles.tabelaRow}>
                <span className={styles.escolaNome}>{escola.nome}</span>
                <span>
                  <Badge variant="default">{escola.grupo}</Badge>
                </span>
                <span>{escola.alunos.toLocaleString()}</span>
                <span>{escola.acessaram.toLocaleString()}</span>
                <span className={styles.progressoCell}>
                  <Progress value={escola.percentual} max={100} />
                  <span style={{ color: getCorProgresso(escola.percentual) }}>
                    {escola.percentual}%
                  </span>
                </span>
                <span>
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => abrirModal(escola)}
                  >
                    Ver Detalhes
                  </Button>
                </span>
              </div>
            ))}
          </div>

          {/* Paginação */}
          <div className={styles.paginacao}>
            <Button
              variant="secondary"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              ← Anterior
            </Button>
            <Text>
              Página {currentPage} de {totalPages}
            </Text>
            <Button
              variant="secondary"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              Próxima →
            </Button>
          </div>
        </Card>

        {/* Modal de Detalhes */}
        {modalAberto && escolaSelecionada && (
          <Modal
            isOpen={modalAberto}
            onClose={() => setModalAberto(false)}
            title={`Detalhes: ${escolaSelecionada.nome}`}
          >
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <Badge variant="info">{escolaSelecionada.grupo}</Badge>
                <Text>
                  {escolaSelecionada.acessaram.toLocaleString()} de {escolaSelecionada.alunos.toLocaleString()} alunos acessaram
                </Text>
              </div>

              <Text as="h4" className={styles.modalSubtitulo}>
                Tipos de Interação
              </Text>

              <div className={styles.interacoesList}>
                {mockInteracoes.map((interacao) => (
                  <div key={interacao.tipo} className={styles.interacaoItem}>
                    <div className={styles.interacaoHeader}>
                      <span className={styles.interacaoEmoji}>{interacao.emoji}</span>
                      <span className={styles.interacaoTipo}>{interacao.tipo}</span>
                      <Badge variant={interacao.percentual >= 50 ? 'success' : 'warning'}>
                        {interacao.percentual}%
                      </Badge>
                    </div>
                    <Progress value={interacao.percentual} max={100} />
                    <Text className={styles.interacaoTotal}>
                      {interacao.total.toLocaleString()} interações
                    </Text>
                  </div>
                ))}
              </div>

              <div className={styles.modalAviso}>
                <Text as="small">
                  ⚠️ Os dados podem se sobrepor, pois um aluno pode realizar múltiplas interações.
                </Text>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </Layout>
  );
}
