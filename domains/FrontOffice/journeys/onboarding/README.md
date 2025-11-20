# Jornada: Onboarding de Usuários

> 🎓 Jornada de boas-vindas e primeiros passos para novos usuários da plataforma EDUCACROSS

## 🎯 Objetivo

Criar uma experiência de onboarding intuitiva e orientada que guie novos usuários pelos primeiros passos na plataforma, validando a compreensão dos conceitos principais e aumentando o engajamento inicial.

## 📋 Contexto de Negócio

- **Para quem?** Usuários novos (estudantes e educadores) que acessam a plataforma pela primeira vez
- **Por que é importante?** Reduzir a curva de aprendizado, aumentar retention, criar primeira impressão positiva
- **Quando será usado?** Na primeira visitação após criação de conta ou na entrada anônima

## 🔗 Protótipos Relacionados

- [Tela de Boas-vindas](http://localhost:3000/frontoffice/onboarding/welcome)
- [Tutorial: Navegação](http://localhost:3000/frontoffice/onboarding/tutorial-nav)
- [Tutorial: Primeiro Jogo](http://localhost:3000/frontoffice/onboarding/tutorial-game)
- [Confirmação](http://localhost:3000/frontoffice/onboarding/done)

## 🧩 Componentes Utilizados

- `Layout` - Container principal responsivo
- `Button` - CTAs (Começar, Próximo, Pular, Continuar)
- `Card` - Cards informativos
- `Text` - Tipografia (títulos, descrições, labels)
- `Progress` - Indicador de progresso do onboarding (NOVO)
- `Stepper` - Passos visuais (NOVO)

**Componentes novos necessários**:
- [ ] `Progress` - Barra de progresso do onboarding
- [ ] `Stepper` - Indicador de passos (1 de 4, etc)
- [ ] `InfoBox` - Caixa de informação/dica

## 📊 Status

**Status atual**: 🚧 Em andamento

**Última atualização**: 2025-11-20

## 💡 Decisões de Design

### Decisão 1: Onboarding Modal vs Página Separada
- **O que decidimos**: Usar páginas separadas (não modal) com navegação clara
- **Por que**: Melhor para mobile, não bloqueia visualização de conteúdo, permite voltar
- **Alternativas consideradas**: Modal overlay (pode ser intrusivo), inline hints (menos estruturado)
- **Trade-offs**: Um passo a mais na navegação, mas melhor UX geral

### Decisão 2: Onboarding Obrigatório vs Opcional
- **O que decidimos**: Opcional com "Pular" em cada etapa, mas incentivado para novos
- **Por que**: Respeita usuários experientes, ainda atrai novos à jornada
- **Alternativas consideradas**: Completamente obrigatório (pode frustrar), completamente opcional (baixa adoção)
- **Trade-offs**: Balance entre discovery e autonomia do usuário

### Decisão 3: Conteúdo Gamificado
- **O que decidimos**: Integrar elementos de game (pontos, badges) após onboarding
- **Por que**: Aumenta engajamento, diversão, motivação para completar
- **Alternativas consideradas**: Sem gamificação (chato), full gamification (pode ser excessivo)
- **Trade-offs**: Mais complexo de implementar, mas ROI alto em engagement

## 📝 Fluxo

```
Acesso (novo usuário)
      ↓
[1] Tela de Boas-vindas
    - Mensagem de boas-vindas
    - O que é EDUCACROSS
    - Principais benefícios
    - CTA: "Começar" ou "Pular"
      ↓
[2] Tutorial: Navegação
    - Como usar o menu
    - Explorar domínios
    - Encontrar jornadas
    - CTA: "Próximo" ou "Pular"
      ↓
[3] Tutorial: Primeiro Jogo
    - Jogar um mini-game
    - Ganhar primeiro badge
    - Entender mecânica
    - CTA: "Próximo" ou "Pular"
      ↓
[4] Conclusão
    - Resumo do que aprendeu
    - Recursos adicionais
    - Próximos passos
    - CTA: "Explorar Plataforma"
      ↓
Home (onboarding completo)
```

## 🎨 Guia de Estilos

- **Cores**: Primária (#3B82F6 - azul), Secundária (#8B5CF6 - roxo), Sucesso (#10B981 - verde)
- **Tipografia**: Headlines em bold, body text regular, labels em small
- **Spacing**: Generoso (1.5rem entre seções, 1rem entre elementos)
- **Ícones**: Usar emojis grandes (64px) ou ícones SVG
- **Animações**: Suaves, não distrativas (200-300ms)

## 🔜 Próximos Passos

- [ ] Validar wireframe com PM/UX
- [ ] Criar mockups no Figma
- [ ] Implementar componentes `Progress` e `Stepper`
- [ ] Criar páginas no Studio
- [ ] Adicionar analytics para tracking
- [ ] Testes A/B (onboarding vs sem onboarding)
- [ ] Coletar feedback de usuários

## 📎 Referências

- [EDUCACROSS - Documento de Requisitos](../../../docs/backlog.md)
- [Design System - Componentes](../../../apps/storybook)
- [Studio - Editor Visual](../../../apps/studio)

---

**Autores**: Sprint 2 - Equipe  
**Revisores**: TBD  
**Data de criação**: 2025-11-20
