'use client';

import React, { useState } from 'react';

// Mock data inline
const mockData = {
  questoes: [
    {
      id: "13749",
      codigo: "13749",
      enunciado: "Qual é o resultado de 2 + 2?",
      alternativas: ["3", "4", "5", "6"],
      gabarito: "4",
      disciplina: "Matemática",
      topico: "1.17.4 Números Inteiros",
      nivel: "Fácil",
      autor: "GG",
      criador: "FM",
      revisor: "BC",
      dataCriacao: "2025-11-20T10:30:00Z",
      uso: "Canoas",
      status: "aprovada",
      habilidades: ["EF07MA01"]
    },
    {
      id: "13750",
      codigo: "13750",
      enunciado: "Qual é a capital do Brasil?",
      alternativas: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador"],
      gabarito: "Brasília",
      disciplina: "Geografia",
      topico: "2.1 Capitais",
      nivel: "Fácil",
      autor: "AB",
      criador: "CD",
      revisor: "EF",
      dataCriacao: "2025-11-21T14:00:00Z",
      uso: "Porto Alegre",
      status: "aprovada",
      habilidades: ["EF05GE01"]
    },
    {
      id: "13751",
      codigo: "13751",
      enunciado: "Qual é a fórmula da água?",
      alternativas: ["H2O", "CO2", "O2", "N2"],
      gabarito: "H2O",
      disciplina: "Ciências",
      topico: "3.2 Química Básica",
      nivel: "Médio",
      autor: "XY",
      criador: "ZW",
      revisor: "QP",
      dataCriacao: "2025-11-22T09:15:00Z",
      uso: "Gravataí",
      status: "aprovada",
      habilidades: ["EF06CI02"]
    },
    {
      id: "13752",
      codigo: "13752",
      enunciado: "Quantos lados tem um triângulo?",
      alternativas: ["2", "3", "4", "5"],
      gabarito: "3",
      disciplina: "Matemática",
      topico: "1.5 Geometria Básica",
      nivel: "Fácil",
      autor: "GG",
      criador: "FM",
      revisor: "BC",
      dataCriacao: "2025-11-20T11:00:00Z",
      uso: "Canoas",
      status: "aprovada",
      habilidades: ["EF04MA15"]
    },
    {
      id: "13753",
      codigo: "13753",
      enunciado: "Qual é o maior planeta do sistema solar?",
      alternativas: ["Terra", "Marte", "Júpiter", "Saturno"],
      gabarito: "Júpiter",
      disciplina: "Ciências",
      topico: "3.8 Sistema Solar",
      nivel: "Médio",
      autor: "LM",
      criador: "NO",
      revisor: "PQ",
      dataCriacao: "2025-11-23T16:30:00Z",
      uso: "Porto Alegre",
      status: "aprovada",
      habilidades: ["EF07CI12"]
    }
  ],
  redes: [
    { id: "1", nome: "Canoas", cor: "#3B82F6", sigla: "CNS" },
    { id: "2", nome: "Porto Alegre", cor: "#EF4444", sigla: "POA" },
    { id: "3", nome: "Gravataí", cor: "#10B981", sigla: "GRV" }
  ]
};

export default function ExibirCampoUsoPage() {
  const [filtroRede, setFiltroRede] = useState<string>('todas');
  
  const questoesFiltradas = mockData.questoes.filter(q => {
    if (filtroRede === 'todas') return true;
    return q.uso === filtroRede;
  });

  const getRedeColor = (nomeRede: string) => {
    const rede = mockData.redes.find(r => r.nome === nomeRede);
    return rede ? rede.cor : '#9CA3AF';
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      padding: '32px'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{
          fontSize: '30px',
          fontWeight: '700',
          color: '#111827',
          marginBottom: '8px'
        }}>
          Banco de Questões
        </h1>
        <p style={{ color: '#6b7280', fontSize: '14px' }}>
          Gestão Pedagógica - Cadastro de Tópicos e Questões
        </p>
      </div>

      {/* Card Principal */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '24px',
        boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)'
      }}>
        {/* Filtros e Botões */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          gap: '16px',
          flexWrap: 'wrap'
        }}>
          <div style={{ minWidth: '250px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '4px'
            }}>
              Filtrar por Rede (USO)
            </label>
            <select
              value={filtroRede}
              onChange={(e) => setFiltroRede(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                backgroundColor: 'white',
                cursor: 'pointer'
              }}
            >
              <option value="todas">Todas as Redes</option>
              {mockData.redes.map(r => (
                <option key={r.id} value={r.nome}>{r.nome}</option>
              ))}
            </select>
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{
              padding: '8px 16px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              backgroundColor: 'white',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}>
              Exportar
            </button>
            <button style={{
              padding: '8px 16px',
              border: 'none',
              borderRadius: '6px',
              backgroundColor: '#3b82f6',
              color: 'white',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}>
              + Adicionar Questão
            </button>
          </div>
        </div>

        {/* Contador */}
        <p style={{
          fontSize: '14px',
          color: '#6b7280',
          marginBottom: '16px'
        }}>
          {questoesFiltradas.length} questão(ões) encontrada(s)
        </p>

        {/* Tabela */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse'
          }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                <th style={{
                  textAlign: 'left',
                  padding: '12px 8px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6b7280',
                  textTransform: 'uppercase'
                }}>
                  Código
                </th>
                <th style={{
                  textAlign: 'left',
                  padding: '12px 8px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6b7280',
                  textTransform: 'uppercase'
                }}>
                  Enunciado
                </th>
                <th style={{
                  textAlign: 'left',
                  padding: '12px 8px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6b7280',
                  textTransform: 'uppercase'
                }}>
                  Disciplina
                </th>
                <th style={{
                  textAlign: 'left',
                  padding: '12px 8px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6b7280',
                  textTransform: 'uppercase'
                }}>
                  Nível
                </th>
                <th style={{
                  textAlign: 'left',
                  padding: '12px 8px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6b7280',
                  textTransform: 'uppercase'
                }}>
                  Rede (USO)
                </th>
                <th style={{
                  textAlign: 'right',
                  padding: '12px 8px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6b7280',
                  textTransform: 'uppercase'
                }}>
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {questoesFiltradas.map((questao) => (
                <tr key={questao.id} style={{
                  borderBottom: '1px solid #e5e7eb'
                }}>
                  <td style={{
                    padding: '16px 8px',
                    fontSize: '14px',
                    color: '#111827',
                    fontWeight: '500'
                  }}>
                    {questao.codigo}
                  </td>
                  <td style={{
                    padding: '16px 8px',
                    fontSize: '14px',
                    color: '#374151',
                    maxWidth: '300px'
                  }}>
                    {questao.enunciado}
                  </td>
                  <td style={{
                    padding: '16px 8px',
                    fontSize: '14px',
                    color: '#374151'
                  }}>
                    {questao.disciplina}
                  </td>
                  <td style={{
                    padding: '16px 8px',
                    fontSize: '14px',
                    color: '#374151'
                  }}>
                    {questao.nivel}
                  </td>
                  <td style={{
                    padding: '16px 8px'
                  }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '500',
                      backgroundColor: getRedeColor(questao.uso) + '20',
                      color: getRedeColor(questao.uso),
                      border: `1px solid ${getRedeColor(questao.uso)}`
                    }}>
                      {questao.uso}
                    </span>
                  </td>
                  <td style={{
                    padding: '16px 8px',
                    textAlign: 'right'
                  }}>
                    <button style={{
                      padding: '6px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      backgroundColor: 'white',
                      fontSize: '13px',
                      cursor: 'pointer'
                    }}>
                      Ver Detalhes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
