import type { Meta, StoryObj } from '@storybook/react';
import { Text } from '@prototipo/design-system';

const meta = {
  title: 'Components/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['p', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'],
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
    },
    color: {
      control: 'select',
      options: ['default', 'muted', 'primary', 'secondary', 'success', 'warning', 'error'],
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Paragraph: Story = {
  args: {
    as: 'p',
    size: 'base',
    weight: 'normal',
    color: 'default',
    children: 'This is a paragraph of text.',
  },
};

export const Heading1: Story = {
  args: {
    as: 'h1',
    size: '5xl',
    weight: 'bold',
    color: 'primary',
    children: 'Heading 1',
  },
};

export const Heading2: Story = {
  args: {
    as: 'h2',
    size: '4xl',
    weight: 'bold',
    color: 'default',
    children: 'Heading 2',
  },
};

export const Heading3: Story = {
  args: {
    as: 'h3',
    size: '3xl',
    weight: 'semibold',
    color: 'default',
    children: 'Heading 3',
  },
};

export const MutedText: Story = {
  args: {
    as: 'p',
    size: 'base',
    weight: 'normal',
    color: 'muted',
    children: 'This is muted text.',
  },
};

export const PrimaryText: Story = {
  args: {
    as: 'p',
    size: 'lg',
    weight: 'medium',
    color: 'primary',
    children: 'This is primary colored text.',
  },
};

export const ErrorText: Story = {
  args: {
    as: 'p',
    size: 'sm',
    weight: 'medium',
    color: 'error',
    children: 'This is an error message.',
  },
};

export const SuccessText: Story = {
  args: {
    as: 'p',
    size: 'sm',
    weight: 'medium',
    color: 'success',
    children: 'Success! Operation completed.',
  },
};

export const CenteredText: Story = {
  args: {
    as: 'p',
    size: 'xl',
    weight: 'semibold',
    color: 'default',
    align: 'center',
    children: 'This text is centered.',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};
