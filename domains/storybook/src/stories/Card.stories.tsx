import type { Meta, StoryObj } from '@storybook/react';
import { Card, Text, Button } from '@prototipo/design-system';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'elevated'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    clickable: {
      control: 'boolean',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    padding: 'md',
    children: (
      <>
        <Text as="h3" size="xl" weight="semibold" style={{ marginBottom: '0.5rem' }}>
          Card Title
        </Text>
        <Text color="muted">
          This is a default card with some content inside.
        </Text>
      </>
    ),
  },
};

export const Bordered: Story = {
  args: {
    variant: 'bordered',
    padding: 'md',
    children: (
      <>
        <Text as="h3" size="xl" weight="semibold" style={{ marginBottom: '0.5rem' }}>
          Bordered Card
        </Text>
        <Text color="muted">
          This card has a border around it.
        </Text>
      </>
    ),
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    padding: 'md',
    children: (
      <>
        <Text as="h3" size="xl" weight="semibold" style={{ marginBottom: '0.5rem' }}>
          Elevated Card
        </Text>
        <Text color="muted">
          This card has a shadow elevation effect.
        </Text>
      </>
    ),
  },
};

export const WithButton: Story = {
  args: {
    variant: 'bordered',
    padding: 'lg',
    children: (
      <>
        <Text as="h3" size="2xl" weight="bold" style={{ marginBottom: '0.5rem' }}>
          Action Card
        </Text>
        <Text color="muted" style={{ marginBottom: '1rem' }}>
          This card includes a call-to-action button.
        </Text>
        <Button variant="primary" size="md">
          Take Action
        </Button>
      </>
    ),
  },
};

export const Clickable: Story = {
  args: {
    variant: 'elevated',
    padding: 'md',
    clickable: true,
    onClick: () => alert('Card clicked!'),
    children: (
      <>
        <Text as="h3" size="xl" weight="semibold" style={{ marginBottom: '0.5rem' }}>
          Clickable Card
        </Text>
        <Text color="muted">
          Click anywhere on this card to see an action.
        </Text>
      </>
    ),
  },
};

export const NoPadding: Story = {
  args: {
    variant: 'bordered',
    padding: 'none',
    children: (
      <div>
        <div style={{ padding: '1rem', backgroundColor: '#f3f4f6' }}>
          <Text weight="semibold">Header Section</Text>
        </div>
        <div style={{ padding: '1rem' }}>
          <Text>Content without card padding, with custom internal padding.</Text>
        </div>
      </div>
    ),
  },
};

export const SmallPadding: Story = {
  args: {
    variant: 'bordered',
    padding: 'sm',
    children: (
      <>
        <Text as="h4" size="lg" weight="semibold" style={{ marginBottom: '0.25rem' }}>
          Compact Card
        </Text>
        <Text size="sm" color="muted">
          Small padding for compact layouts.
        </Text>
      </>
    ),
  },
};

export const LargePadding: Story = {
  args: {
    variant: 'elevated',
    padding: 'lg',
    children: (
      <>
        <Text as="h3" size="2xl" weight="bold" style={{ marginBottom: '0.75rem' }}>
          Spacious Card
        </Text>
        <Text size="lg" color="muted">
          Large padding for more breathing room.
        </Text>
      </>
    ),
  },
};

// Accessibility Stories
export const AccessibleRegion: Story = {
  args: {
    variant: 'bordered',
    padding: 'md',
    role: 'region',
    'aria-label': 'Resumo do pedido',
    children: (
      <>
        <Text as="h3" size="xl" weight="semibold" style={{ marginBottom: '0.5rem' }}>
          Total: R$ 150,00
        </Text>
        <Text color="muted">
          3 itens no carrinho
        </Text>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Card como região acessível com role="region" e aria-label. Útil para seções importantes da página.',
      },
    },
  },
};

export const ClickableAccessible: Story = {
  args: {
    variant: 'elevated',
    padding: 'md',
    clickable: true,
    onClick: () => alert('Navegando para detalhes...'),
    children: (
      <>
        <Text as="h3" size="xl" weight="semibold" style={{ marginBottom: '0.5rem' }}>
          Card Clicável
        </Text>
        <Text color="muted">
          Card clicável renderizado como button para acessibilidade total
        </Text>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Cards clicáveis usam <button> semanticamente correto, navegável por teclado com foco visível.',
      },
    },
  },
};
