import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '@prototipo/design-system';

const meta = {
  title: 'Components/Forms/Switch',
  component: Switch,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
    checked: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Enable feature',
  },
};

export const Checked: Story = {
  args: {
    label: 'Auto-save enabled',
    checked: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Email notifications',
    helperText: 'Receive email updates about your activity',
  },
};

export const WithError: Story = {
  args: {
    label: 'Critical setting',
    error: true,
    errorText: 'This setting cannot be changed',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled toggle',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Always on',
    disabled: true,
    checked: true,
    helperText: 'This feature is always enabled',
  },
};

export const WithoutLabel: Story = {
  args: {
    'aria-label': 'Toggle switch without visible label',
  },
};

export const MultipleSwitches: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Switch label="Dark mode" defaultChecked />
      <Switch label="Push notifications" helperText="Receive notifications on your device" />
      <Switch label="Two-factor authentication" helperText="Extra security for your account" />
      <Switch label="Marketing emails" />
      <Switch label="Beta features" helperText="Try new features before they are released" disabled />
    </div>
  ),
};

export const CompactSwitches: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <Switch label="Wi-Fi" defaultChecked />
      <Switch label="Bluetooth" />
      <Switch label="Airplane mode" />
    </div>
  ),
};

// Accessibility Stories
export const AccessibilityDemo: Story = {
  args: {
    label: 'Notificações ativadas',
    checked: true,
    helperText: 'Use Space para alternar o estado',
  },
  parameters: {
    docs: {
      description: {
        story: 'Switch com role="switch" e aria-checked explícito. Totalmente navegável por teclado com foco visível.',
      },
    },
  },
};

export const KeyboardNavigation: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <p style={{ marginBottom: '0.5rem', fontSize: '14px', color: '#666' }}>
        Use Tab para navegar entre os switches e Space para alternar:
      </p>
      <Switch label="Primeiro switch" />
      <Switch label="Segundo switch" defaultChecked />
      <Switch label="Terceiro switch" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstra navegação por teclado entre múltiplos switches. Cada switch mantém foco visível claro.',
      },
    },
  },
};
