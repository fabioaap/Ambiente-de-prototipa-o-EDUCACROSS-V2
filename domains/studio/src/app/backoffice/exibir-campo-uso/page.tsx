'use client';

import React, { useState, useMemo } from 'react';
import { Badge, Modal, DataTable, Button } from '@prototipo/design-system';
import questoesMock from '../../../../data/backoffice/questoes-mock.json';

interface Questao {
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
    status: string;
    habilidades: string[];
}

const redesDisponiveis = ['Todas as Redes', 'Canoas', 'Porto Alegre', 'Gravataí'];

const redesCores: Record<string, 'blue' | 'red' | 'green' | 'default'> = {
    'Canoas': 'blue',
    'Porto Alegre': 'red',
    'Gravataí': 'green',
};

export default function ExibirCampoUsoPage() {
    const [redeFiltrada, setRedeFiltrada] = useState<string>('Todas as Redes');
    const [questaoSelecionada, setQuestaoSelecionada] = useState<Questao | null>(null);
    const [modalAberto, setModalAberto] = useState(false);

    const questoesFiltradas = useMemo(() => {
        if (redeFiltrada === 'Todas as Redes') {
            return questoesMock.questoes as Questao[];
        }
        return (questoesMock.questoes as Questao[]).filter(q => q.uso === redeFiltrada);
    }, [redeFiltrada]);

    const handleVerDetalhes = (questao: Questao) => {
        setQuestaoSelecionada(questao);
        setModalAberto(true);
    };

    const colunas = [
        {
            key: 'codigo',
            header: 'Código',
            render: (questao: Questao) => <span>{questao.codigo}</span>,
        },
        {
            key: 'enunciado',
            header: 'Enunciado',
            render: (questao: Questao) => (
                <span style={{ display: 'block', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {questao.enunciado}
                </span>
            ),
        },
        {
            key: 'uso',
            header: 'USO (Rede)',
            render: (questao: Questao) => (
                <Badge variant={redesCores[questao.uso] || 'default'}>
                    {questao.uso}
                </Badge>
            ),
        },
        {
            key: 'disciplina',
            header: 'Disciplina',
            render: (questao: Questao) => <span>{questao.disciplina}</span>,
        },
        {
            key: 'habilidades',
            header: 'Habilidades',
            render: (questao: Questao) => <span>{questao.habilidades?.join(', ') || 'N/A'}</span>,
        },
        {
            key: 'acoes',
            header: 'Ações',
            render: (questao: Questao) => (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleVerDetalhes(questao)}
                >
                    Ver Detalhes
                </Button>
            ),
        },
    ];

    return (
        <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>
                    Banco de Questões - Aprovadas
                </h1>
                <p style={{ color: '#666' }}>
                    Visualize e filtre questões por rede (USO)
                </p>
            </div>

            {/* Filtro por Rede */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <label htmlFor="filtro-rede" style={{ fontWeight: 500 }}>
                    Filtrar por Rede:
                </label>
                <select
                    id="filtro-rede"
                    value={redeFiltrada}
                    onChange={(e) => setRedeFiltrada(e.target.value)}
                    style={{
                        padding: '8px 12px',
                        borderRadius: '6px',
                        border: '1px solid #ddd',
                        minWidth: '200px'
                    }}
                >
                    {redesDisponiveis.map(rede => (
                        <option key={rede} value={rede}>{rede}</option>
                    ))}
                </select>
                <span style={{ fontSize: '14px', color: '#666' }}>
                    {questoesFiltradas.length} questões
                    {redeFiltrada !== 'Todas as Redes' && ` de ${redeFiltrada}`}
                </span>
            </div>

            {/* Tabela de Questões */}
            <DataTable
                data={questoesFiltradas}
                columns={colunas}
                keyExtractor={(questao) => questao.id}
            />

            {/* Modal de Detalhes */}
            {questaoSelecionada && (
                <Modal
                    isOpen={modalAberto}
                    onClose={() => setModalAberto(false)}
                    title={`Questão ${questaoSelecionada.codigo}`}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {/* Badge de Rede */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontWeight: 500 }}>Rede:</span>
                            <Badge variant={redesCores[questaoSelecionada.uso] || 'default'}>
                                {questaoSelecionada.uso}
                            </Badge>
                        </div>

                        {/* Enunciado */}
                        <div>
                            <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>Enunciado</h3>
                            <p>{questaoSelecionada.enunciado}</p>
                        </div>

                        {/* Alternativas */}
                        <div>
                            <h3 style={{ fontWeight: 600, marginBottom: '8px' }}>Alternativas</h3>
                            <ol style={{ listStyleType: 'lower-alpha', paddingLeft: '24px' }}>
                                {questaoSelecionada.alternativas.map((alt, idx) => (
                                    <li
                                        key={idx}
                                        style={{
                                            fontWeight: alt === questaoSelecionada.gabarito ? 'bold' : 'normal',
                                            color: alt === questaoSelecionada.gabarito ? '#16a34a' : 'inherit'
                                        }}
                                    >
                                        {alt}
                                        {alt === questaoSelecionada.gabarito && ' ✓ (Gabarito)'}
                                    </li>
                                ))}
                            </ol>
                        </div>

                        {/* Metadados */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '14px' }}>
                            <div>
                                <span style={{ fontWeight: 500 }}>Disciplina:</span> {questaoSelecionada.disciplina}
                            </div>
                            <div>
                                <span style={{ fontWeight: 500 }}>Nível:</span> {questaoSelecionada.nivel}
                            </div>
                            <div>
                                <span style={{ fontWeight: 500 }}>Tópico:</span> {questaoSelecionada.topico}
                            </div>
                            <div>
                                <span style={{ fontWeight: 500 }}>Habilidades:</span> {questaoSelecionada.habilidades?.join(', ') || 'N/A'}
                            </div>
                            <div>
                                <span style={{ fontWeight: 500 }}>Autor:</span> {questaoSelecionada.autor}
                            </div>
                            <div>
                                <span style={{ fontWeight: 500 }}>Criador:</span> {questaoSelecionada.criador}
                            </div>
                            <div>
                                <span style={{ fontWeight: 500 }}>Revisor:</span> {questaoSelecionada.revisor}
                            </div>
                            <div>
                                <span style={{ fontWeight: 500 }}>Data:</span>{' '}
                                {new Date(questaoSelecionada.dataCriacao).toLocaleDateString('pt-BR')}
                            </div>
                        </div>

                        {/* Ações do Modal */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', paddingTop: '16px' }}>
                            <Button variant="outline" onClick={() => setModalAberto(false)}>
                                Voltar
                            </Button>
                            <Button variant="primary">
                                Usar esta Questão
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}
