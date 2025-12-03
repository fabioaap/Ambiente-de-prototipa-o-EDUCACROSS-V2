# Avatar Component

Componente de avatar para exibir imagens de perfil de usuários com múltiplas opções de fallback e recursos avançados.

## Características

- **Fallback chain**: src → initials → icon → default
- **Tamanhos**: xs, sm, md, lg, xl
- **Status**: online, offline, away, busy, none
- **Badge**: Suporte para badges customizados
- **Acessibilidade**: aria-label, alt para imagens, aria-describedby para status

## Uso Básico

### Avatar com Imagem

```tsx
import { Avatar } from '@prototipo/design-system';

<Avatar 
  src="https://example.com/avatar.jpg"
  alt="Foto de perfil"
  size="md"
/>
```

### Avatar com Iniciais

```tsx
<Avatar 
  initials="JS"
  size="md"
  aria-label="Avatar de João Silva"
/>
```

### Avatar com Status

```tsx
<Avatar 
  src="https://example.com/avatar.jpg"
  status="online"
  size="lg"
  aria-describedby="status-online"
/>
<div id="status-online">Online</div>
```

### Avatar com Badge

```tsx
<Avatar 
  src="https://example.com/avatar.jpg"
  badge={<span>5</span>}
  size="lg"
/>
```

## AvatarGroup

Componente para agrupar múltiplos avatares com suporte a overflow (+N).

### Uso Básico

```tsx
import { AvatarGroup } from '@prototipo/design-system';

<AvatarGroup
  avatars={[
    { src: 'https://example.com/avatar1.jpg', alt: 'Usuário 1' },
    { src: 'https://example.com/avatar2.jpg', alt: 'Usuário 2' },
    { initials: 'AB', alt: 'Usuário 3' },
    { initials: 'CD', alt: 'Usuário 4' },
  ]}
  max={3}
  size="md"
/>
```

### Sem Empilhamento

```tsx
<AvatarGroup
  avatars={[...]}
  stacked={false}
  size="md"
/>
```

## Props

### Avatar

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| src | string | - | URL da imagem do avatar |
| alt | string | '' | Texto alternativo para a imagem |
| initials | string | - | Iniciais a serem exibidas como fallback |
| icon | ReactNode | - | Ícone a ser exibido como fallback |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' | Tamanho do avatar |
| status | 'online' \| 'offline' \| 'away' \| 'busy' \| 'none' | 'none' | Status do usuário |
| badge | ReactNode | - | Badge a ser exibido no canto do avatar |
| aria-label | string | - | Label acessível para o avatar |
| aria-describedby | string | - | ID para aria-describedby (usado com status) |

### AvatarGroup

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| avatars | AvatarProps[] | [] | Array de props de Avatar para renderizar |
| max | number | 5 | Número máximo de avatares antes de mostrar +N |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' | Tamanho dos avatares no grupo |
| stacked | boolean | true | Renderizar avatares empilhados (overlap) |
| aria-label | string | - | Label acessível para o grupo |

## Fallback Chain

O componente implementa uma cadeia de fallback robusta:

1. **Imagem (src)**: Tenta carregar a imagem da URL fornecida
2. **Iniciais (initials)**: Se a imagem falhar, exibe as iniciais
3. **Ícone (icon)**: Se não houver iniciais, exibe o ícone customizado
4. **Padrão**: Se nada mais estiver disponível, exibe um ícone de usuário padrão

## Acessibilidade

- Imagens possuem texto alternativo via prop `alt`
- Iniciais e ícones possuem `aria-label` apropriado
- Status pode ser descrito via `aria-describedby`
- AvatarGroup tem `role="group"` e label descritivo
- Overflow de avatares tem label indicando quantos usuários estão ocultos

## Exemplos no Storybook

Veja todas as variações e casos de uso no Storybook:

```bash
pnpm dev:storybook
```

Navegue até **DataDisplay > Avatar** para ver:
- Avatar com imagem, iniciais, ícone
- Diferentes tamanhos (xs, sm, md, lg, xl)
- Status (online, offline, away, busy)
- Badges
- Cadeia de fallback
- AvatarGroup básico
- AvatarGroup com overflow (+N)
- Grupos com e sem empilhamento
