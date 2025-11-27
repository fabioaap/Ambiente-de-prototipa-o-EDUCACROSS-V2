import React, { useState } from 'react';
import { USOBadge } from './USOBadge';
import { getStatusColor } from '../tokens/jornada-4800.tokens';

export interface QuestionData {
  id: string;
  codigo: string;
  enunciado: string;
  alternativas: string[];
  gabarito: string;
  disciplina: string;
  topico: string;
  nivel: string;
  autor: string;
  criador: string;
  revisor: string;
  dataCriacao: string;
  uso: string;
  status: 'aprovada' | 'em-revisao' | 'rejeitada';
  habilidades: string[];
}

export interface QuestionDetailModalProps {
  /**
   * Dados da questão
   */
  questao: QuestionData;

  /**
   * Se o modal está aberto
   */
  isOpen: boolean;

  /**
   * Callback para fechar modal
   */
  onClose: () => void;

  /**
   * Callback para confirmar seleção da questão
   */
  onSelect?: (questao: QuestionData) => void;

  /**
   * Se deve mostrar botão de seleção
   * @default false
   */
  showSelectButton?: boolean;

  /**
   * Classe CSS adicional
   */
  className?: string;
}

/**
 * Componente Question Detail Modal
 * Exibe detalhes completos de uma questão
 */
export const QuestionDetailModal = React.forwardRef<
  HTMLDivElement,
  QuestionDetailModalProps
>(
  (
    {
      questao,
      isOpen,
      onClose,
      onSelect,
      showSelectButton = false,
      className = '',
    },
    ref
  ) => {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const statusColors = getStatusColor(questao.status);

    if (!isOpen) return null;

    const statusLabel = {
      aprovada: '✓ Aprovada',
      'em-revisao': '⟳ Em Revisão',
      rejeitada: '✗ Rejeitada',
    };

    return (
      <>
        {/* Overlay */}
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 39,
          }}
        />

        {/* Modal */}
        <div
          ref={ref}
          className={className}
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            zIndex: 40,
            maxWidth: '600px',
            width: '90%',
            maxHeight: '90vh',
            overflow: 'auto',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '20px',
              borderBottom: '1px solid #E5E7EB',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'start',
            }}
          >
            <div>
              <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#111827' }}>
                Detalhes da Questão
              </h2>
              <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#9CA3AF' }}>
                Código: {questao.codigo}
              </p>
            </div>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#9CA3AF',
                padding: 0,
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div style={{ padding: '20px' }}>
            {/* Metadata */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                marginBottom: '20px',
                padding: '12px',
                backgroundColor: '#F9FAFB',
                borderRadius: '8px',
              }}
            >
              <div>
                <p style={{ margin: 0, fontSize: '12px', color: '#6B7280', fontWeight: 600 }}>
                  Rede
                </p>
                <div style={{ marginTop: '4px' }}>
                  <USOBadge rede={questao.uso} variant="filled" size="sm" />
                </div>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '12px', color: '#6B7280', fontWeight: 600 }}>
                  Status
                </p>
                <p
                  style={{
                    margin: '4px 0 0 0',
                    fontSize: '14px',
                    color: statusColors.primary,
                    fontWeight: 600,
                  }}
                >
                  {statusLabel[questao.status]}
                </p>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '12px', color: '#6B7280', fontWeight: 600 }}>
                  Disciplina
                </p>
                <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#374151' }}>
                  {questao.disciplina}
                </p>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '12px', color: '#6B7280', fontWeight: 600 }}>
                  Nível
                </p>
                <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#374151' }}>
                  {questao.nivel}
                </p>
              </div>
            </div>

            {/* Enunciado */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 600, color: '#111827' }}>
                Enunciado
              </h3>
              <p style={{ margin: 0, fontSize: '14px', lineHeight: '20px', color: '#374151' }}>
                {questao.enunciado}
              </p>
            </div>

            {/* Alternativas */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 600, color: '#111827' }}>
                Alternativas
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {questao.alternativas.map((alt, index) => (
                  <label
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '10px 12px',
                      border: `2px solid ${selectedAnswer === alt ? '#3B82F6' : '#E5E7EB'}`,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      backgroundColor:
                        selectedAnswer === alt ? '#EFF6FF' : '#F9FAFB',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <input
                      type="radio"
                      name="alternativa"
                      value={alt}
                      checked={selectedAnswer === alt}
                      onChange={(e) => setSelectedAnswer(e.target.value)}
                      style={{ marginRight: '8px' }}
                    />
                    <span style={{ fontSize: '14px', color: '#374151' }}>{alt}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Gabarito */}
            <div
              style={{
                marginBottom: '20px',
                padding: '12px',
                backgroundColor: '#DCFCE7',
                borderRadius: '8px',
                border: '1px solid #BBF7D0',
              }}
            >
              <p style={{ margin: 0, fontSize: '12px', fontWeight: 600, color: '#166534' }}>
                Gabarito
              </p>
              <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#166534', fontWeight: 600 }}>
                {questao.gabarito}
              </p>
            </div>

            {/* Habilidades */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 600, color: '#111827' }}>
                Habilidades
              </h3>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {questao.habilidades.map((hab) => (
                  <span
                    key={hab}
                    style={{
                      padding: '4px 8px',
                      backgroundColor: '#F3F4F6',
                      borderRadius: '6px',
                      fontSize: '12px',
                      color: '#374151',
                      fontFamily: 'monospace',
                    }}
                  >
                    {hab}
                  </span>
                ))}
              </div>
            </div>

            {/* Metadados */}
            <div
              style={{
                padding: '12px',
                backgroundColor: '#F9FAFB',
                borderRadius: '8px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
              }}
            >
              <div>
                <p style={{ margin: 0, fontSize: '12px', color: '#6B7280', fontWeight: 600 }}>
                  Autor
                </p>
                <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#374151' }}>
                  {questao.autor}
                </p>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '12px', color: '#6B7280', fontWeight: 600 }}>
                  Criador
                </p>
                <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#374151' }}>
                  {questao.criador}
                </p>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '12px', color: '#6B7280', fontWeight: 600 }}>
                  Revisor
                </p>
                <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#374151' }}>
                  {questao.revisor}
                </p>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '12px', color: '#6B7280', fontWeight: 600 }}>
                  Data
                </p>
                <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#374151' }}>
                  {new Date(questao.dataCriacao).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              padding: '16px 20px',
              borderTop: '1px solid #E5E7EB',
              display: 'flex',
              gap: '8px',
              justifyContent: 'flex-end',
            }}
          >
            <button
              onClick={onClose}
              style={{
                padding: '8px 16px',
                border: '1px solid #D1D5DB',
                borderRadius: '8px',
                backgroundColor: '#FFFFFF',
                color: '#374151',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F3F4F6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
              }}
            >
              Fechar
            </button>
            {showSelectButton && (
              <button
                onClick={() => {
                  onSelect?.(questao);
                  onClose();
                }}
                style={{
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '8px',
                  backgroundColor: '#3B82F6',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#2563EB';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#3B82F6';
                }}
              >
                Selecionar
              </button>
            )}
          </div>
        </div>
      </>
    );
  }
);

QuestionDetailModal.displayName = 'QuestionDetailModal';

export default QuestionDetailModal;
