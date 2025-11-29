'use client';

import React, { useState } from 'react';
import styles from './page.module.css';

// Mock data inline para evitar problemas de resolução de caminho
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

// Tipos baseados no mock
// type Questao = typeof mockData.questoes[0];
// type Rede = typeof mockData.redes[0];

export default function ExibirCampoUsoPage() {
  const [filtroRede, setFiltroRede] = useState<string>('todas');
  
  // Filtragem
  const questoesFiltradas = mockData.questoes.filter(q => {
    if (filtroRede === 'todas') return true;
    return q.uso === filtroRede;
  });

  // Helper para encontrar cor da rede
  const getRedeColor = (nomeRede: string) => {
    const rede = mockData.redes.find(r => r.nome === nomeRede);
    return rede ? rede.cor : '#9CA3AF'; // Gray fallback
  };

  // Opções para o Select
  const opcoesRede = [
    { label: 'Todas as Redes', value: 'todas' },
    ...mockData.redes.map(r => ({ label: r.nome, value: r.nome }))
  ];

  return (
    <div className="p-8 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col gap-2">
        <Text as="h1" size="3xl" weight="bold" className="text-gray-900">Banco de Questões</Text>
        <Text className="text-gray-500">Gestão Pedagógica - Cadastro de Tópicos e Questões</Text>
      </div>

      <Card className="p-6 space-y-6">
        {/* Header com Filtros */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="w-full md:w-64">
            <label className="block text-sm font-medium text-gray-700 mb-1">Filtrar por Rede (USO)</label>
            <Select 
              options={opcoesRede}
              value={filtroRede}
              onChange={(e) => setFiltroRede(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Exportar</Button>
            <Button>Nova Questão</Button>
          </div>
        </div>

        {/* Tabela de Questões */}
        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enunciado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Disciplina / Tópico</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nível</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">USO (Rede)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {questoesFiltradas.map((questao) => (
                <tr key={questao.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{questao.codigo}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" title={questao.enunciado}>
                    {questao.enunciado}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="font-medium">{questao.disciplina}</div>
                    <div className="text-xs text-gray-400">{questao.topico}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {questao.nivel}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {/* Badge de Rede Customizado usando style inline para cor dinâmica do mock */}
                    <span 
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white"
                      style={{ backgroundColor: getRedeColor(questao.uso) }}
                    >
                      {questao.uso}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={questao.status === 'aprovada' ? 'success' : questao.status === 'rejeitada' ? 'error' : 'warning'}>
                      {questao.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 font-semibold">
                      Ver Detalhes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="text-sm text-gray-500 text-right">
          Mostrando {questoesFiltradas.length} de {mockData.questoes.length} questões
        </div>
      </Card>
    </div>
  );
}
