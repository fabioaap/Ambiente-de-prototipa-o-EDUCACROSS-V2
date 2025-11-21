# @prototipo/design-system

Biblioteca de componentes React para o sistema de prototipação EDUCACROSS.

## Componentes

### Button
Botão reutilizável com múltiplas variantes e tamanhos.

```tsx
import { Button } from '@prototipo/design-system';

<Button variant="primary" size="md">
  Clique aqui
</Button>
```

### Text
Componente de tipografia com controle completo de estilo.

```tsx
import { Text } from '@prototipo/design-system';

<Text as="h1" size="3xl" weight="bold" color="primary">
  Título Principal
</Text>
```

### Card
Container com estilização consistente.

```tsx
import { Card } from '@prototipo/design-system';

<Card variant="elevated" padding="md">
  Conteúdo do card
</Card>
```

### Layout
Container de página com configurações responsivas.

```tsx
import { Layout } from '@prototipo/design-system';

<Layout maxWidth="xl" centered>
  Conteúdo da página
</Layout>
```

## Componentes de Formulário

### Input
Campo de entrada de texto com suporte a múltiplos tipos, estados de erro e acessibilidade completa.

**Recursos:**
- Estados: default, focus, disabled, error
- Tipos suportados: text, email, password, number, tel, url
- Labels, helper text e mensagens de erro
- Acessibilidade ARIA completa

```tsx
import { Input } from '@prototipo/design-system';

// Input básico
<Input 
  label="Nome completo" 
  placeholder="Digite seu nome" 
/>

// Com validação de erro
<Input 
  label="Email"
  type="email"
  error={true}
  errorText="Por favor, insira um email válido"
/>

// Campo obrigatório com helper text
<Input 
  label="Senha"
  type="password"
  required={true}
  helperText="Mínimo de 8 caracteres"
/>

// Campo desabilitado
<Input 
  label="Campo bloqueado"
  disabled={true}
  value="Valor fixo"
/>
```

### Select
Componente de seleção (dropdown) com opções configuráveis.

**Recursos:**
- Estados: default, focus, disabled, error
- Suporte a opções dinâmicas via prop `options`
- Suporte a `optgroup` via children
- Acessibilidade ARIA completa

```tsx
import { Select } from '@prototipo/design-system';

// Select com array de opções
<Select 
  label="País"
  options={[
    { value: '', label: 'Selecione um país' },
    { value: 'br', label: 'Brasil' },
    { value: 'us', label: 'Estados Unidos' },
  ]}
/>

// Com validação de erro
<Select 
  label="Categoria"
  error={true}
  errorText="Por favor, selecione uma categoria"
  options={categorias}
/>

// Select com optgroups personalizados
<Select label="Tamanho">
  <optgroup label="Tamanhos Pequenos">
    <option value="xs">Extra Pequeno</option>
    <option value="s">Pequeno</option>
  </optgroup>
  <optgroup label="Tamanhos Grandes">
    <option value="l">Grande</option>
    <option value="xl">Extra Grande</option>
  </optgroup>
</Select>
```

### Checkbox
Caixa de seleção para opções múltiplas.

**Recursos:**
- Estados: unchecked, checked, disabled, error
- Labels e helper text
- Role ARIA `checkbox`
- Suporte a controlled/uncontrolled

```tsx
import { Checkbox } from '@prototipo/design-system';

// Checkbox básico
<Checkbox label="Aceito os termos e condições" />

// Com helper text
<Checkbox 
  label="Ativar notificações"
  helperText="Você receberá atualizações por email"
/>

// Com estado de erro
<Checkbox 
  label="Li e concordo"
  error={true}
  errorText="Você deve aceitar para continuar"
/>

// Desabilitado e marcado
<Checkbox 
  label="Recurso sempre ativo"
  disabled={true}
  checked={true}
/>

// Múltiplos checkboxes
<div>
  <Checkbox label="Opção 1" name="opcoes" />
  <Checkbox label="Opção 2" name="opcoes" />
  <Checkbox label="Opção 3" name="opcoes" />
</div>
```

### Radio
Botão de opção para seleção única em grupo.

**Recursos:**
- Estados: unchecked, checked, disabled, error
- Agrupamento via prop `name`
- Role ARIA `radio`
- Labels e helper text

```tsx
import { Radio } from '@prototipo/design-system';

// Grupo de radio buttons
<div>
  <Radio name="plano" label="Plano Gratuito" defaultChecked />
  <Radio name="plano" label="Plano Pro" helperText="R$ 29/mês" />
  <Radio name="plano" label="Plano Enterprise" helperText="R$ 99/mês" />
</div>

// Com estado de erro
<Radio 
  name="escolha"
  label="Esta opção"
  error={true}
  errorText="Esta opção não está disponível"
/>

// Opção desabilitada
<Radio 
  name="tamanho"
  label="Indisponível"
  disabled={true}
/>
```

### Switch
Interruptor (toggle) para ativação/desativação de recursos.

**Recursos:**
- Estados: off, on, disabled, error
- Role ARIA `switch`
- Animação suave de transição
- Labels e helper text

```tsx
import { Switch } from '@prototipo/design-system';

// Switch básico
<Switch label="Modo escuro" />

// Com helper text
<Switch 
  label="Notificações push"
  helperText="Receba notificações no dispositivo"
/>

// Switch ativo por padrão
<Switch 
  label="Salvamento automático"
  defaultChecked={true}
/>

// Switch desabilitado
<Switch 
  label="Recurso bloqueado"
  disabled={true}
  helperText="Este recurso requer upgrade"
/>

// Lista de switches
<div>
  <Switch label="Wi-Fi" defaultChecked />
  <Switch label="Bluetooth" />
  <Switch label="Modo avião" />
</div>
```

## Acessibilidade

Todos os componentes de formulário incluem:

- **Roles ARIA apropriados**: `checkbox`, `radio`, `switch`
- **Atributos aria-invalid**: Para estados de erro
- **Atributos aria-describedby**: Vinculando helper text e mensagens de erro
- **Atributos aria-required**: Para campos obrigatórios
- **Labels associados**: Usando `htmlFor` e IDs únicos
- **Feedback visual e textual**: Estados claramente identificáveis
- **Suporte a navegação por teclado**: Todos os componentes são focáveis e operáveis via teclado

## Testes

Todos os componentes de formulário possuem:
- **Stories no Storybook**: Com múltiplos estados e variações
- **Testes de interação**: Usando `@storybook/test`
- **Verificação de acessibilidade**: Roles e atributos ARIA corretos

Execute o Storybook para visualizar e testar os componentes:

```bash
pnpm dev:storybook
```

## Scripts

- `pnpm build` - Compila a biblioteca
- `pnpm dev` - Modo watch para desenvolvimento
- `pnpm lint` - Executa o linter
- `pnpm type-check` - Verifica tipos TypeScript
