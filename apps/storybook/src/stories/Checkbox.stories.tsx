import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '@prototipo/design-system';

const meta = {
  title: 'Components/Forms/Checkbox',
  component: Checkbox,
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
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
};

export const Checked: Story = {
  args: {
    label: 'I agree to receive newsletters',
    checked: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Enable notifications',
    helperText: 'You will receive email notifications',
  },
};

export const WithError: Story = {
  args: {
    label: 'I have read and agree',
    error: true,
    errorText: 'You must accept to continue',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled option',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Always enabled feature',
    disabled: true,
    checked: true,
    helperText: 'This feature is always active',
  },
};

export const WithoutLabel: Story = {
  args: {
    'aria-label': 'Checkbox without visible label',
  },
};

export const MultipleCheckboxes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Checkbox label="Option 1" defaultChecked />
      <Checkbox label="Option 2" />
      <Checkbox label="Option 3" />
      <Checkbox label="Option 4" disabled />
    </div>
  ),
};
