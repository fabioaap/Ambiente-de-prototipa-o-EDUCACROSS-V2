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
- [Cadastro de Usuário](http://localhost:3000/frontoffice/onboarding/cadastro)
- [Confirmação de Email](http://localhost:3000/frontoffice/onboarding/confirmacao)
- [Primeiro Login](http://localhost:3000/frontoffice/onboarding/primeiro-login)
- [Configurar Preferências](http://localhost:3000/frontoffice/onboarding/preferencias)
- [Conclusão do Onboarding](http://localhost:3000/frontoffice/onboarding/conclusao)

## 🧩 Componentes Utilizados

- `Layout` - Container principal responsivo (maxWidth: sm, md, lg)
- `Button` - CTAs (Começar, Próximo, Pular, Continuar, Salvar)
  * Variantes: primary, secondary, outline, ghost
  * Tamanhos: sm, md, lg
- `Card` - Cards informativos e containers
  * Variantes: default, bordered, elevated
  * Padding: none, sm, md, lg
- `Text` - Tipografia completa
  * Elementos: p, h1, h2, h3, h4, h5, h6
  * Tamanhos: xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl
  * Pesos: normal, medium, semibold, bold
  * Cores: default, muted, primary, secondary, success, warning, error

**Componentes implementados via Text (simulação)**:
- Input fields (email, password, código)
- Radio buttons (tipo de usuário, tema)
- Checkboxes (notificações, interesses)
- Select (idioma)

**Componentes novos necessários (identificados)**:
- [ ] `Input` - Campo de texto real com validações
- [ ] `Radio` - Botão de opção única
- [ ] `Checkbox` - Caixa de seleção múltipla
- [ ] `Select` - Lista suspensa
- [ ] `Progress` - Barra de progresso do onboarding (visual)
- [ ] `Badge` - Distintivo/medalha (componente de gamificação)

## 📊 Status

**Status atual**: ✅ Concluído (Prototipação)

**Última atualização**: 2025-11-23

**Páginas criadas**:
- ✅ Welcome (Boas-vindas)
- ✅ Cadastro (Formulário de registro)
- ✅ Confirmação (Verificação de email)
- ✅ Primeiro Login (Autenticação + Badge)
- ✅ Preferências (Configurações personalizadas)
- ✅ Conclusão (Finalização e próximos passos)

**Total**: 6 páginas completas no Studio

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
[1] Tela de Boas-vindas (/welcome)
    - Mensagem de boas-vindas com emoji 👋
    - O que é EDUCACROSS
    - Principais benefícios (4 itens)
    - CTA: "Começar Agora" ou "Pular Tutorial"
      ↓
[2] Cadastro (/cadastro)
    - Formulário com validações
      * Nome completo
      * Email (com ajuda contextual)
      * Senha (mínimo 8 caracteres, letras e números)
      * Confirmar senha
      * Tipo de usuário (Estudante/Educador/Responsável)
    - Termos de uso
    - CTA: "Criar Conta" ou "Voltar"
      ↓
[3] Confirmação de Email (/confirmacao)
    - Email enviado com código de 6 dígitos
    - Campo para inserir código
    - Opção de reenviar email
    - Dica sobre validade (15 minutos) e pasta spam
    - CTA: "Verificar Código"
      ↓
[4] Primeiro Login (/primeiro-login)
    - Confirmação de sucesso 🎉
    - Formulário de login
      * Email (pré-preenchido)
      * Senha
    - Primeiro Badge desbloqueado: "Bem-vindo ao EDUCACROSS" 🎖️
    - +50 pontos
    - CTA: "Entrar na Plataforma"
      ↓
[5] Configurar Preferências (/preferencias)
    - Idioma (select)
    - Tema (claro/escuro/automático)
    - Notificações (email, push, novidades, dicas)
    - Áreas de interesse (Matemática, Português, Ciências, etc)
    - CTA: "Salvar e Continuar" ou "Configurar Depois"
      ↓
[6] Conclusão (/conclusao)
    - Parabéns! 🏁
    - Resumo do que aprendeu (4 itens)
    - Próximos passos recomendados (4 itens)
    - Recursos adicionais:
      * Central de Ajuda
      * Tutoriais em Vídeo
      * Comunidade
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

## ✅ Validações Necessárias

### Cadastro
- **Nome completo**: 
  * Obrigatório
  * Mínimo 3 caracteres
  * Apenas letras e espaços
- **Email**:
  * Obrigatório
  * Formato válido (regex: `^[^\s@]+@[^\s@]+\.[^\s@]+$`)
  * Verificar se já existe no sistema
- **Senha**:
  * Obrigatório
  * Mínimo 8 caracteres
  * Deve conter pelo menos: 1 letra maiúscula, 1 letra minúscula, 1 número
  * Não pode conter o nome ou email do usuário
- **Confirmar senha**:
  * Obrigatório
  * Deve ser idêntica à senha
- **Tipo de usuário**:
  * Obrigatório (Estudante/Educador/Responsável)

### Confirmação de Email
- **Código de verificação**:
  * Obrigatório
  * Exatamente 6 dígitos numéricos
  * Válido por 15 minutos após envio
  * Máximo 3 tentativas incorretas antes de bloquear

### Primeiro Login
- **Email**:
  * Obrigatório
  * Deve existir no sistema
- **Senha**:
  * Obrigatório
  * Máximo 5 tentativas incorretas antes de bloquear temporariamente (15 min)

### Preferências
- **Idioma**: Obrigatório (padrão: Português Brasil)
- **Tema**: Obrigatório (padrão: Automático)
- **Notificações**: Opcional (padrão: todas habilitadas)
- **Áreas de interesse**: Opcional (mínimo 1 recomendado)

## 🔜 Próximos Passos

- [x] Validar wireframe com PM/UX
- [x] Criar mockups no Figma (simulado via Studio)
- [x] Criar páginas no Studio (6 páginas completas)
- [ ] Implementar componentes faltantes (`Input`, `Radio`, `Checkbox`, `Select`, `Progress`, `Badge`)
- [ ] Adicionar analytics para tracking (quando backend disponível)
- [ ] Testes A/B (onboarding vs sem onboarding)
- [ ] Coletar feedback de usuários
- [ ] Implementar validações reais de formulário
- [ ] Integrar com backend de autenticação

## 📎 Referências

- [EDUCACROSS - Documento de Requisitos](../../../docs/backlog.md)
- [Design System - Componentes](../../../apps/storybook)
- [Studio - Editor Visual](../../../apps/studio)

---

**Autores**: Sprint 2 - Equipe  
**Revisores**: TBD  
**Data de criação**: 2025-11-20
