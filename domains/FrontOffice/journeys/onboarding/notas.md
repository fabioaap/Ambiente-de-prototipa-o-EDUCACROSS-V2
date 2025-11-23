# Notas - Jornada Onboarding

## 📌 Descobertas Principais

### Usuário Persona
- **João** (20 anos, estudante, primeiro acesso)
  - Nunca usou plataforma similar
  - Acessa via mobile (70% do tempo)
  - Espera feedback visual imediato
  - Tempo de atenção: ~10 minutos

### Pain Points Identificados
1. Muitas opções → confusão inicial
2. Não sabe onde começar
3. Quer resultados rápidos (gamification)
4. Quer poder pular (não gosta de forçados)

### Oportunidades
1. Primeira vitória rápida (criar conta, ganhar badge)
2. Exploração guiada (tutorial interativo)
3. Progressão visível (barra de progresso)
4. Comunidade (ver outros usuários)

---

## 🎬 Storyboard - Primeira Experiência

```
T0: Novo usuário acessa plataforma
    ↓ (Redirecionado para /onboarding)
T1: Vê mensagem "Bem-vindo à EDUCACROSS"
    ↓ (Clica "Começar")
T5: Passa por 4 telas de onboarding
    ↓ (Completa em ~3 minutos)
T8: Recebe primeiro badge 🎖️
    ↓ (Feel good!)
T10: Explora plataforma com confiança
```

---

## 🎯 Métricas de Sucesso

| Métrica | Meta | Como Medir |
|---------|------|-----------|
| Completion Rate | 80% | Usuários que completam todo onboarding |
| Time to Complete | 3-5 min | Tempo médio de conclusão |
| Skip Rate | <30% | % que pulam algumas etapas |
| Engagement | +50% | Diferença entre com/sem onboarding |
| Retention (7d) | 70% | Volta após 7 dias |

---

## 🎨 Elementos Visuais

### Ícones
- 👋 Boas-vindas
- 🧭 Navegação
- 🎮 Primeiro jogo
- 🏁 Conclusão

### Cores por Etapa
1. Azul (#3B82F6) - Boas-vindas
2. Roxo (#8B5CF6) - Navegação
3. Verde (#10B981) - Jogo
4. Ouro (#F59E0B) - Conclusão

---

## 💬 Copy Reference

**Etapa 1 - Boas-vindas**
- Headline: "Bem-vindo à EDUCACROSS!"
- Subheadline: "Plataforma de aprendizagem gamificada para estudantes e educadores"
- Body: "Em 3 minutos, você saberá como começar sua jornada de aprendizado."

**Etapa 2 - Navegação**
- Headline: "Explore 3 Domínios"
- Body: "BackOffice (Administração), FrontOffice (Aprendizado), Game (Gamificação)"

**Etapa 3 - Primeiro Jogo**
- Headline: "Teste uma Atividade"
- Body: "Complete este mini-game para ganhar seu primeiro badge!"

**Etapa 4 - Conclusão**
- Headline: "🎉 Parabéns!"
- Body: "Você completou o onboarding. Agora explore a plataforma!"

---

## 🔧 Implementação

### Abordagem Técnica
1. **Páginas Estáticas**: 4 páginas no Studio
2. **Cliente-side**: Rastreamento de progresso em localStorage
3. **URL Hash**: `/onboarding/welcome` → `/onboarding/done`
4. **Skip Logic**: Botão de skip em cada página

### API (Quando Backend Disponível)
```
POST /api/onboarding/complete
  { userId, timestamp, skipped: true/false }
```

---

## 📱 Responsive

- **Desktop (1024+)**: Layout com imagens grandes, espaço para explorar
- **Tablet (768-1024)**: Layout ajustado, botões maiores
- **Mobile (<768)**: Stack vertical, full-width, toque-amigável

---

## ✅ Checklist de Implementação

- [x] Criar 6 páginas no Studio
  - [x] Welcome (Boas-vindas)
  - [x] Cadastro
  - [x] Confirmação de email
  - [x] Primeiro login
  - [x] Preferências
  - [x] Conclusão
- [x] Atualizar README da jornada com links e fluxo completo
- [x] Documentar validações necessárias
- [x] Identificar componentes faltantes
- [ ] Implementar componente `Input` no Design System
- [ ] Implementar componente `Radio` no Design System
- [ ] Implementar componente `Checkbox` no Design System
- [ ] Implementar componente `Select` no Design System
- [ ] Implementar componente `Progress` no Design System
- [ ] Implementar componente `Badge` no Design System
- [ ] Adicionar localStorage para tracking de progresso
- [ ] Adicionar Analytics/Mixpanel (quando disponível)
- [ ] Testes com usuários reais
- [ ] Ajustar copy baseado em feedback
- [ ] Mobile testing (iOS, Android)
- [ ] Documentação para PMs

---

**Última atualização**: 2025-11-23
