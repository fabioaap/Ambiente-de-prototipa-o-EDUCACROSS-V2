'use client';

import React, { useState } from 'react';

interface Escola {
  nome: string;
  grupo: string;
  escolaridade: string;
  alunos: { total: number; ativo: number };
  professores: { total: number; ativo: number };
  gestores: { total: number; ativo: number };
  auxiliares: { total: number; ativo: number };
}

const escolasMock: Escola[] = [
  {
    nome: 'Escola Estadual Professor João Silva',
    grupo: 'SEDUC - Zona Sul',
    escolaridade: 'Ensino Fundamental II',
    alunos: { total: 450, ativo: 92 },
    professores: { total: 32, ativo: 88 },
    gestores: { total: 5, ativo: 95 },
    auxiliares: { total: 8, ativo: 78 },
  },
  {
    nome: 'Colégio Municipal Maria Santos',
    grupo: 'SEDUC - Zona Norte',
    escolaridade: 'Ensino Médio',
    alunos: { total: 380, ativo: 75 },
    professores: { total: 28, ativo: 82 },
    gestores: { total: 4, ativo: 90 },
    auxiliares: { total: 6, ativo: 85 },
  },
  {
    nome: 'Instituto Educacional Dom Pedro II',
    grupo: 'SEDUC - Centro',
    escolaridade: 'Ensino Fundamental I e II',
    alunos: { total: 520, ativo: 58 },
    professores: { total: 38, ativo: 65 },
    gestores: { total: 6, ativo: 70 },
    auxiliares: { total: 10, ativo: 55 },
  },
  {
    nome: 'Escola Municipal Santa Catarina',
    grupo: 'SEDUC - Zona Oeste',
    escolaridade: 'Ensino Fundamental I',
    alunos: { total: 310, ativo: 25 },
    professores: { total: 22, ativo: 30 },
    gestores: { total: 3, ativo: 40 },
    auxiliares: { total: 5, ativo: 28 },
  },
  {
    nome: 'Centro Educacional Novo Horizonte',
    grupo: 'SEDUC - Zona Leste',
    escolaridade: 'Ensino Médio',
    alunos: { total: 420, ativo: 87 },
    professores: { total: 30, ativo: 90 },
    gestores: { total: 5, ativo: 92 },
    auxiliares: { total: 7, ativo: 80 },
  },
];

export default function GestorRedesPage() {
  const [activeTab, setActiveTab] = useState<'engajamento' | 'desempenho'>('engajamento');
  const [currentPage, setCurrentPage] = useState(4);

  const totalAlunos = escolasMock.reduce((sum, e) => sum + e.alunos.total, 0);
  const alunosAtivos = Math.round(
    escolasMock.reduce((sum, e) => sum + (e.alunos.total * e.alunos.ativo) / 100, 0)
  );
  const percentualAlunos = Math.round((alunosAtivos / totalAlunos) * 100);

  const totalProfessores = escolasMock.reduce((sum, e) => sum + e.professores.total, 0);
  const professoresAtivos = Math.round(
    escolasMock.reduce((sum, e) => sum + (e.professores.total * e.professores.ativo) / 100, 0)
  );
  const percentualProfessores = Math.round((professoresAtivos / totalProfessores) * 100);

  const totalGestores = escolasMock.reduce((sum, e) => sum + e.gestores.total, 0);
  const gestoresAtivos = Math.round(
    escolasMock.reduce((sum, e) => sum + (e.gestores.total * e.gestores.ativo) / 100, 0)
  );
  const percentualGestores = Math.round((gestoresAtivos / totalGestores) * 100);

  const totalAuxiliares = escolasMock.reduce((sum, e) => sum + e.auxiliares.total, 0);
  const auxiliaresAtivos = Math.round(
    escolasMock.reduce((sum, e) => sum + (e.auxiliares.total * e.auxiliares.ativo) / 100, 0)
  );
  const percentualAuxiliares = Math.round((auxiliaresAtivos / totalAuxiliares) * 100);

  return (
    <div className="min-h-screen bg-[#f8f7fa] px-[256px] py-10">
      <div className="mx-auto" style={{ maxWidth: '1366px' }}>
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('engajamento')}
            className={`px-6 py-2 rounded-md font-['Montserrat',sans-serif] font-semibold text-sm transition-colors ${activeTab === 'engajamento'
                ? 'bg-[#7367F0] text-white'
                : 'bg-white text-[#6e6b7b] hover:bg-gray-50'
              }`}
          >
            Engajamento
          </button>
          <button
            onClick={() => setActiveTab('desempenho')}
            className={`px-6 py-2 rounded-md font-['Montserrat',sans-serif] font-semibold text-sm transition-colors ${activeTab === 'desempenho'
                ? 'bg-[#7367F0] text-white'
                : 'bg-white text-[#6e6b7b] hover:bg-gray-50'
              }`}
          >
            Desempenho
          </button>
        </div>

        {/* Filtros */}
        <div className="flex gap-[10px] mb-6">
          <div className="relative bg-white rounded-md px-4 py-2 flex items-center gap-2 border border-[#d8d6de]">
            <span className="font-['Montserrat',sans-serif] font-medium text-sm text-[#6e6b7b]">
              Grupo de Escolas
            </span>
            <span className="bg-[#7367F0] text-white px-2 py-0.5 rounded text-xs font-['Montserrat',sans-serif] font-semibold">
              2 selecionadas
            </span>
            <svg width="12" height="7" viewBox="0 0 12 7" fill="none">
              <path d="M1 1L6 6L11 1" stroke="#6e6b7b" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="relative bg-white rounded-md px-4 py-2 flex items-center gap-2 border border-[#d8d6de]">
            <span className="font-['Montserrat',sans-serif] font-medium text-sm text-[#6e6b7b]">
              Ano Escolar
            </span>
            <svg width="12" height="7" viewBox="0 0 12 7" fill="none">
              <path d="M1 1L6 6L11 1" stroke="#6e6b7b" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="relative bg-white rounded-md px-4 py-2 flex items-center gap-2 border border-[#d8d6de]">
            <span className="font-['Montserrat',sans-serif] font-medium text-sm text-[#6e6b7b]">
              Período
            </span>
            <svg width="12" height="7" viewBox="0 0 12 7" fill="none">
              <path d="M1 1L6 6L11 1" stroke="#6e6b7b" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* KPI Grid - Asymmetric Layout */}
        <div className="grid gap-[10px] mb-6" style={{ gridTemplateColumns: '349px 1fr' }}>
          {/* Alunos Card - Larger */}
          <div className="bg-white rounded-md p-6 shadow-[0px_4px_24px_rgba(0,0,0,0.06)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#7367F0] flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <span className="font-['Montserrat',sans-serif] font-medium text-sm text-[#6e6b7b]">
                Alunos
              </span>
            </div>
            <div className="text-3xl font-['Montserrat',sans-serif] font-extrabold text-[#5e5873] mb-4">
              {totalAlunos.toLocaleString('pt-BR')}
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-['Montserrat',sans-serif] font-medium text-[#6e6b7b]">
                    Ativos
                  </span>
                  <span className="text-xs font-['Montserrat',sans-serif] font-bold text-[#5e5873]">
                    {alunosAtivos} ({percentualAlunos}%)
                  </span>
                </div>
                <div className="w-full bg-[#eae8fd] rounded-full h-[12px]">
                  <div
                    className="bg-[#28C76F] h-[12px] rounded-full transition-all"
                    style={{ width: `${percentualAlunos}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-['Montserrat',sans-serif] font-medium text-[#6e6b7b]">
                    Inativos
                  </span>
                  <span className="text-xs font-['Montserrat',sans-serif] font-bold text-[#5e5873]">
                    {totalAlunos - alunosAtivos} ({100 - percentualAlunos}%)
                  </span>
                </div>
                <div className="w-full bg-[#eae8fd] rounded-full h-[12px]">
                  <div
                    className="bg-[#EA5455] h-[12px] rounded-full transition-all"
                    style={{ width: `${100 - percentualAlunos}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 2x2 Grid for other roles */}
          <div className="grid grid-cols-2 gap-[10px]">
            {/* Professores */}
            <div className="bg-white rounded-md p-6 shadow-[0px_4px_24px_rgba(0,0,0,0.06)]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#28C76F] flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <span className="font-['Montserrat',sans-serif] font-medium text-sm text-[#6e6b7b]">
                  Professores
                </span>
              </div>
              <div className="text-2xl font-['Montserrat',sans-serif] font-extrabold text-[#5e5873] mb-3">
                {totalProfessores}
              </div>
              <div>
                <div className="w-full bg-[#eae8fd] rounded-full h-[12px] mb-2">
                  <div
                    className="bg-[#28C76F] h-[12px] rounded-full"
                    style={{ width: `${percentualProfessores}%` }}
                  />
                </div>
                <span className="text-xs font-['Montserrat',sans-serif] font-medium text-[#6e6b7b]">
                  {professoresAtivos} ativos ({percentualProfessores}%)
                </span>
              </div>
            </div>

            {/* Gestores */}
            <div className="bg-white rounded-md p-6 shadow-[0px_4px_24px_rgba(0,0,0,0.06)]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#FFB443] flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <span className="font-['Montserrat',sans-serif] font-medium text-sm text-[#6e6b7b]">
                  Gestores
                </span>
              </div>
              <div className="text-2xl font-['Montserrat',sans-serif] font-extrabold text-[#5e5873] mb-3">
                {totalGestores}
              </div>
              <div>
                <div className="w-full bg-[#eae8fd] rounded-full h-[12px] mb-2">
                  <div
                    className="bg-[#FFB443] h-[12px] rounded-full"
                    style={{ width: `${percentualGestores}%` }}
                  />
                </div>
                <span className="text-xs font-['Montserrat',sans-serif] font-medium text-[#6e6b7b]">
                  {gestoresAtivos} ativos ({percentualGestores}%)
                </span>
              </div>
            </div>

            {/* Auxiliares */}
            <div className="bg-white rounded-md p-6 shadow-[0px_4px_24px_rgba(0,0,0,0.06)] col-span-2">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#EA5455] flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <span className="font-['Montserrat',sans-serif] font-medium text-sm text-[#6e6b7b]">
                  Auxiliares
                </span>
              </div>
              <div className="text-2xl font-['Montserrat',sans-serif] font-extrabold text-[#5e5873] mb-3">
                {totalAuxiliares}
              </div>
              <div>
                <div className="w-full bg-[#eae8fd] rounded-full h-[12px] mb-2">
                  <div
                    className="bg-[#EA5455] h-[12px] rounded-full"
                    style={{ width: `${percentualAuxiliares}%` }}
                  />
                </div>
                <span className="text-xs font-['Montserrat',sans-serif] font-medium text-[#6e6b7b]">
                  {auxiliaresAtivos} ativos ({percentualAuxiliares}%)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabela */}
        <div className="bg-white rounded-md shadow-[0px_4px_24px_rgba(0,0,0,0.06)] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#ebe9f1]">
                <th className="text-left py-4 px-6 font-['Montserrat',sans-serif] font-semibold text-xs text-[#5e5873] uppercase tracking-wide">
                  Nome da Escola
                </th>
                <th className="text-left py-4 px-6 font-['Montserrat',sans-serif] font-semibold text-xs text-[#5e5873] uppercase tracking-wide">
                  Grupo
                </th>
                <th className="text-left py-4 px-6 font-['Montserrat',sans-serif] font-semibold text-xs text-[#5e5873] uppercase tracking-wide">
                  Escolaridade
                </th>
                <th className="text-left py-4 px-6 font-['Montserrat',sans-serif] font-semibold text-xs text-[#5e5873] uppercase tracking-wide">
                  Alunos
                </th>
                <th className="text-left py-4 px-6 font-['Montserrat',sans-serif] font-semibold text-xs text-[#5e5873] uppercase tracking-wide">
                  Professores
                </th>
                <th className="text-left py-4 px-6 font-['Montserrat',sans-serif] font-semibold text-xs text-[#5e5873] uppercase tracking-wide">
                  Gestores
                </th>
                <th className="text-left py-4 px-6 font-['Montserrat',sans-serif] font-semibold text-xs text-[#5e5873] uppercase tracking-wide">
                  Auxiliares
                </th>
              </tr>
            </thead>
            <tbody>
              {escolasMock.map((escola, idx) => (
                <tr key={idx} className="border-b border-[#ebe9f1] hover:bg-[#f8f7fa] transition-colors">
                  <td className="py-4 px-6 font-['Montserrat',sans-serif] font-medium text-sm text-[#5e5873]">
                    {escola.nome}
                  </td>
                  <td className="py-4 px-6 font-['Montserrat',sans-serif] text-sm text-[#6e6b7b]">
                    {escola.grupo}
                  </td>
                  <td className="py-4 px-6 font-['Montserrat',sans-serif] text-sm text-[#6e6b7b]">
                    {escola.escolaridade}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <span className="font-['Montserrat',sans-serif] text-sm text-[#6e6b7b] w-8">
                        {escola.alunos.total}
                      </span>
                      <div className="flex-1 bg-[#eae8fd] rounded-full h-[12px] min-w-[80px]">
                        <div
                          className={`h-[12px] rounded-full ${escola.alunos.ativo >= 80
                              ? 'bg-[#28C76F]'
                              : escola.alunos.ativo >= 50
                                ? 'bg-[#FFB443]'
                                : 'bg-[#EA5455]'
                            }`}
                          style={{ width: `${escola.alunos.ativo}%` }}
                        />
                      </div>
                      <span className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#5e5873] w-10">
                        {escola.alunos.ativo}%
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <span className="font-['Montserrat',sans-serif] text-sm text-[#6e6b7b] w-8">
                        {escola.professores.total}
                      </span>
                      <div className="flex-1 bg-[#eae8fd] rounded-full h-[12px] min-w-[80px]">
                        <div
                          className={`h-[12px] rounded-full ${escola.professores.ativo >= 80
                              ? 'bg-[#28C76F]'
                              : escola.professores.ativo >= 50
                                ? 'bg-[#FFB443]'
                                : 'bg-[#EA5455]'
                            }`}
                          style={{ width: `${escola.professores.ativo}%` }}
                        />
                      </div>
                      <span className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#5e5873] w-10">
                        {escola.professores.ativo}%
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <span className="font-['Montserrat',sans-serif] text-sm text-[#6e6b7b] w-8">
                        {escola.gestores.total}
                      </span>
                      <div className="flex-1 bg-[#eae8fd] rounded-full h-[12px] min-w-[80px]">
                        <div
                          className={`h-[12px] rounded-full ${escola.gestores.ativo >= 80
                              ? 'bg-[#28C76F]'
                              : escola.gestores.ativo >= 50
                                ? 'bg-[#FFB443]'
                                : 'bg-[#EA5455]'
                            }`}
                          style={{ width: `${escola.gestores.ativo}%` }}
                        />
                      </div>
                      <span className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#5e5873] w-10">
                        {escola.gestores.ativo}%
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <span className="font-['Montserrat',sans-serif] text-sm text-[#6e6b7b] w-8">
                        {escola.auxiliares.total}
                      </span>
                      <div className="flex-1 bg-[#eae8fd] rounded-full h-[12px] min-w-[80px]">
                        <div
                          className={`h-[12px] rounded-full ${escola.auxiliares.ativo >= 80
                              ? 'bg-[#28C76F]'
                              : escola.auxiliares.ativo >= 50
                                ? 'bg-[#FFB443]'
                                : 'bg-[#EA5455]'
                            }`}
                          style={{ width: `${escola.auxiliares.ativo}%` }}
                        />
                      </div>
                      <span className="font-['Montserrat',sans-serif] font-semibold text-sm text-[#5e5873] w-10">
                        {escola.auxiliares.ativo}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-[#ebe9f1]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#28C76F]"></span>
              <span className="font-['Montserrat',sans-serif] text-xs text-[#6e6b7b]">
                Ativo (≥80%)
              </span>
              <span className="w-2 h-2 rounded-full bg-[#FFB443] ml-4"></span>
              <span className="font-['Montserrat',sans-serif] text-xs text-[#6e6b7b]">
                Médio (50-79%)
              </span>
              <span className="w-2 h-2 rounded-full bg-[#EA5455] ml-4"></span>
              <span className="font-['Montserrat',sans-serif] text-xs text-[#6e6b7b]">
                Baixo (&lt;50%)
              </span>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5, 6, 7].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded font-['Montserrat',sans-serif] font-semibold text-sm transition-colors ${currentPage === page
                      ? 'bg-[#7367F0] text-white'
                      : 'bg-transparent text-[#6e6b7b] hover:bg-gray-100'
                    }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer com ícones sociais */}
        <div className="flex justify-center gap-4 mt-8">
          <a href="#" className="text-[#6e6b7b] hover:text-[#7367F0] transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
          <a href="#" className="text-[#6e6b7b] hover:text-[#7367F0] transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
          </a>
          <a href="#" className="text-[#6e6b7b] hover:text-[#7367F0] transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
