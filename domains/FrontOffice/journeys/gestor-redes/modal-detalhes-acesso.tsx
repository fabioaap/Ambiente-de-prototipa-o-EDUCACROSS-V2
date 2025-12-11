'use client';

import React from 'react';
import { Modal, Button, Progress, Badge, Text, Card } from '@prototipo/design-system';
import styles from './gestor-redes.module.css';

interface InteracaoData {
  nome: string;
  icone: string;
  contagem: number;
  percentual: number;
  tooltip: string;
}

interface ModalDetalhesAcessoProps {
  baseAcessaram: number;
  onClose: () => void;
}

export default function ModalDetalhesAcesso({ baseAcessaram, onClose }: ModalDetalhesAcessoProps) {
  // Mock data - Interações baseadas no PRD
  const interacoes: InteracaoData[] = [
    {
      nome: 'Jogaram',
      icone: '🎮',
      contagem: 38485,
      percentual: 99.17,
      tooltip: 'Estudantes que acessaram e jogaram pelo menos um jogo no período',
    },
    {
      nome: 'Viram vídeos',
      icone: '📹',
      contagem: 32500,
      percentual: 83.75,
      tooltip: 'Estudantes que acessaram e assistiram a pelo menos um vídeo',
    },
    {
      nome: 'Leram livros',
      icone: '📚',
      contagem: 28900,
      percentual: 74.49,
      tooltip: 'Estudantes que acessaram e abriram ao menos um livro digital',
    },
    {
      nome: 'Fizeram avaliação',
      icone: '📝',
      contagem: 25600,
      percentual: 65.98,
      tooltip: 'Estudantes que acessaram e responderam ao menos uma avaliação digital',
    },
    {
      nome: 'Responderam questão',
      icone: '❓',
      contagem: 30100,
      percentual: 77.57,
      tooltip: 'Estudantes que acessaram e responderam ao menos uma questão em avaliação ou quiz',
    },
    {
      nome: 'Ouviram música',
      icone: '🎵',
      contagem: 18200,
      percentual: 46.91,
      tooltip: 'Estudantes que acessaram e ouviram ao menos uma trilha de música',
    },
  ];

  const getColorByPercentage = (pct: number): 'success' | 'warning' | 'error' => {
    if (pct >= 90) return 'success';
    if (pct >= 70) return 'warning';
    return 'error';
  };

  const somaTotalPercentuais = interacoes.reduce((acc, int) => acc + int.percentual, 0);

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Detalhes do acesso dos alunos"
      size="lg"
    >
      <div className={styles.modalContent}>
        {/* Subtítulo e contexto */}
        <div className={styles.modalHeader}>
          <Text size="sm" color="secondary">
            Base: estudantes que acessaram a plataforma no período selecionado
          </Text>
          <div className={styles.modalBase}>
            <Text size="lg" weight="bold">
              {baseAcessaram.toLocaleString('pt-BR')} estudantes
            </Text>
            <Text size="xs" color="secondary">
              Total que acessaram no período
            </Text>
          </div>
        </div>

        {/* Texto descritivo */}
        <Card className={styles.modalInfo}>
          <Text size="sm">
            Todos os números desta visão utilizam como base os estudantes que acessaram a plataforma no período selecionado. 
            Cada linha mostra quantos deles realizaram pelo menos uma vez a ação descrita.
          </Text>
        </Card>

        {/* Lista de interações */}
        <div className={styles.interacoesList}>
          {interacoes.map((interacao) => (
            <div key={interacao.nome} className={styles.interacaoItem}>
              <div className={styles.interacaoHeader}>
                <div className={styles.interacaoTitulo}>
                  <span className={styles.interacaoIcone}>{interacao.icone}</span>
                  <div>
                    <Text size="sm" weight="medium">{interacao.nome}</Text>
                    <Text size="xs" color="secondary" title={interacao.tooltip}>
                      {interacao.tooltip}
                    </Text>
                  </div>
                </div>
                <div className={styles.interacaoValores}>
                  <Text size="lg" weight="bold">
                    {interacao.contagem.toLocaleString('pt-BR')}
                  </Text>
                  <Badge
                    variant="solid"
                    color={getColorByPercentage(interacao.percentual)}
                    size="lg"
                  >
                    {interacao.percentual.toFixed(2)}%
                  </Badge>
                </div>
              </div>
              <Progress
                value={interacao.percentual}
                variant="linear"
                size="md"
                color={getColorByPercentage(interacao.percentual)}
                showLabel={false}
                className={styles.interacaoProgress}
              />
              <Text size="xs" color="secondary">
                {interacao.contagem.toLocaleString('pt-BR')} de {baseAcessaram.toLocaleString('pt-BR')} estudantes
              </Text>
            </div>
          ))}
        </div>

        {/* Aviso importante */}
        <Card className={styles.modalAviso}>
          <div className={styles.avisoHeader}>
            <span className={styles.avisoIcone}>⚠️</span>
            <Text size="sm" weight="medium">Importante</Text>
          </div>
          <Text size="sm">
            Um estudante pode aparecer em mais de uma linha. Os percentuais utilizam como base os estudantes que acessaram 
            e podem somar mais que 100%.
          </Text>
          <Text size="xs" color="secondary" className={styles.avisoSoma}>
            Soma total dos percentuais: <strong>{somaTotalPercentuais.toFixed(2)}%</strong>
          </Text>
        </Card>

        {/* Botões de ação */}
        <div className={styles.modalActions}>
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
          <Button variant="solid" color="primary">
            📥 Exportar relatório
          </Button>
        </div>
      </div>
    </Modal>
  );
}
