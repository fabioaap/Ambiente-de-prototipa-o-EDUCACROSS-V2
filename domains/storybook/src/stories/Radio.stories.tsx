import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from '@prototipo/design-system';

const meta = {
  title: 'Components/Forms/Radio',
  component: Radio,
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
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Option 1',
    name: 'example',
  },
};

export const Checked: Story = {
  args: {
    label: 'Selected option',
    name: 'example',
    checked: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Premium Plan',
    name: 'plan',
    helperText: '$29/month - All features included',
  },
};

export const WithError: Story = {
  args: {
    label: 'Choose this option',
    name: 'error-example',
    error: true,
    errorText: 'This option is not available',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Unavailable option',
    name: 'disabled-example',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Pre-selected and locked',
    name: 'disabled-checked',
    disabled: true,
    checked: true,
  },
};

export const RadioGroup: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Radio name="plan" label="Free Plan" helperText="Basic features only" defaultChecked />
      <Radio name="plan" label="Pro Plan" helperText="$9/month - More features" />
      <Radio name="plan" label="Enterprise Plan" helperText="$29/month - All features" />
      <Radio name="plan" label="Custom Plan" helperText="Contact sales" disabled />
    </div>
  ),
};

export const HorizontalRadioGroup: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <Radio name="size" label="Small" defaultChecked />
      <Radio name="size" label="Medium" />
      <Radio name="size" label="Large" />
    </div>
  ),
};
