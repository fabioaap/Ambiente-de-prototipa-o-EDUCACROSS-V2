import React, { useState } from 'react';
import { getRedeColor } from '../tokens/jornada-4800.tokens';

export interface NetworkFilterProps {
  /**
   * Lista de redes disponíveis
   */
  redes: { id: string; nome: string; sigla: string }[];

  /**
   * Rede selecionada atualmente
   */
  selectedRede?: string;

  /**
   * Callback quando rede é selecionada
   */
  onRedeChange?: (rede: string | null) => void;

  /**
   * Rótulo do filtro
   * @default "Filtrar por Rede"
   */
  label?: string;

  /**
   * Placeholder quando nenhuma rede selecionada
   * @default "Todas as redes"
   */
  placeholder?: string;

  /**
   * Se deve mostrar opção "Todas as redes"
   * @default true
   */
  showAllOption?: boolean;

  /**
   * Classe CSS adicional
   */
  className?: string;
}

/**
 * Componente Network Filter
 * Permite filtrar questões por rede/contexto
 */
export const NetworkFilter = React.forwardRef<HTMLDivElement, NetworkFilterProps>(
  (
    {
      redes,
      selectedRede,
      onRedeChange,
      label = 'Filtrar por Rede',
      placeholder = 'Todas as redes',
      showAllOption = true,
      className = '',
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (rede: string | null) => {
      onRedeChange?.(rede);
      setIsOpen(false);
    };

    const selectedRedeData = redes.find((r) => r.nome === selectedRede);
    const displayText = selectedRedeData ? selectedRedeData.nome : placeholder;

    return (
      <div
        ref={ref}
        className={className}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        {label && (
          <label
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#374151',
              fontFamily: 'Inter, system-ui, sans-serif',
            }}
          >
            {label}
          </label>
        )}

        <div style={{ position: 'relative', width: '100%', minWidth: '200px' }}>
          {/* Trigger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              width: '100%',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#F9FAFB',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              fontSize: '14px',
              fontFamily: 'Inter, system-ui, sans-serif',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              color: selectedRedeData ? '#111827' : '#9CA3AF',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#D1D5DB';
              e.currentTarget.style.backgroundColor = '#F3F4F6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#E5E7EB';
              e.currentTarget.style.backgroundColor = '#F9FAFB';
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {selectedRedeData && (
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '3px',
                    backgroundColor: getRedeColor(selectedRedeData.nome).primary,
                  }}
                />
              )}
              {displayText}
            </span>
            <span style={{ fontSize: '12px' }}>▼</span>
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 4px)',
                left: 0,
                right: 0,
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                zIndex: 10,
                overflow: 'hidden',
              }}
            >
              {/* Todas as Redes */}
              {showAllOption && (
                <button
                  onClick={() => handleSelect(null)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontSize: '14px',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    backgroundColor: selectedRede === undefined ? '#F3F4F6' : '#FFFFFF',
                    border: 'none',
                    borderBottom: '1px solid #F3F4F6',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease',
                    color: '#374151',
                    fontWeight: selectedRede === undefined ? 600 : 400,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#F3F4F6';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      selectedRede === undefined ? '#F3F4F6' : '#FFFFFF';
                  }}
                >
                  {placeholder}
                </button>
              )}

              {/* Redes */}
              {redes.map((rede) => {
                const colors = getRedeColor(rede.nome);
                return (
                  <button
                    key={rede.id}
                    onClick={() => handleSelect(rede.nome)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      textAlign: 'left',
                      fontSize: '14px',
                      fontFamily: 'Inter, system-ui, sans-serif',
                      backgroundColor: selectedRede === rede.nome ? '#F3F4F6' : '#FFFFFF',
                      border: 'none',
                      borderBottom: '1px solid #F3F4F6',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#374151',
                      fontWeight: selectedRede === rede.nome ? 600 : 400,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#F3F4F6';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        selectedRede === rede.nome ? '#F3F4F6' : '#FFFFFF';
                    }}
                  >
                    <div
                      style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '3px',
                        backgroundColor: colors.primary,
                      }}
                    />
                    <span>
                      {rede.nome} <span style={{ fontSize: '12px', color: '#9CA3AF' }}>({rede.sigla})</span>
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }
);

NetworkFilter.displayName = 'NetworkFilter';

export default NetworkFilter;
