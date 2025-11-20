import type { Meta, StoryObj } from '@storybook/react';
import { Layout, Text, Card } from '@prototipo/design-system';

const meta = {
  title: 'Components/Layout',
  component: Layout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    maxWidth: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl', 'full'],
    },
    paddingX: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    paddingY: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    centered: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Layout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    maxWidth: 'xl',
    paddingX: 'md',
    paddingY: 'md',
    centered: true,
    children: (
      <>
        <Text as="h1" size="4xl" weight="bold" style={{ marginBottom: '1rem' }}>
          Welcome to Layout
        </Text>
        <Text size="lg" color="muted">
          This is the default layout configuration with centered content.
        </Text>
      </>
    ),
  },
};

export const FullWidth: Story = {
  args: {
    maxWidth: 'full',
    paddingX: 'lg',
    paddingY: 'lg',
    centered: false,
    children: (
      <>
        <Text as="h2" size="3xl" weight="bold" style={{ marginBottom: '1rem' }}>
          Full Width Layout
        </Text>
        <Text size="lg" color="muted">
          This layout spans the full width of the viewport.
        </Text>
      </>
    ),
  },
};

export const Narrow: Story = {
  args: {
    maxWidth: 'sm',
    paddingX: 'md',
    paddingY: 'md',
    centered: true,
    children: (
      <>
        <Text as="h2" size="2xl" weight="bold" style={{ marginBottom: '1rem' }}>
          Narrow Layout
        </Text>
        <Text color="muted">
          This layout is constrained to a small width, perfect for reading content.
        </Text>
      </>
    ),
  },
};

export const WithCards: Story = {
  args: {
    maxWidth: 'xl',
    paddingX: 'md',
    paddingY: 'lg',
    centered: true,
    children: (
      <>
        <Text as="h1" size="4xl" weight="bold" style={{ marginBottom: '2rem' }}>
          Dashboard
        </Text>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          <Card variant="elevated" padding="md">
            <Text as="h3" size="xl" weight="semibold" style={{ marginBottom: '0.5rem' }}>
              Card 1
            </Text>
            <Text color="muted">Some content here.</Text>
          </Card>
          <Card variant="elevated" padding="md">
            <Text as="h3" size="xl" weight="semibold" style={{ marginBottom: '0.5rem' }}>
              Card 2
            </Text>
            <Text color="muted">More content here.</Text>
          </Card>
          <Card variant="elevated" padding="md">
            <Text as="h3" size="xl" weight="semibold" style={{ marginBottom: '0.5rem' }}>
              Card 3
            </Text>
            <Text color="muted">Even more content.</Text>
          </Card>
        </div>
      </>
    ),
  },
};

export const NoPadding: Story = {
  args: {
    maxWidth: 'xl',
    paddingX: 'none',
    paddingY: 'none',
    centered: true,
    children: (
      <div style={{ backgroundColor: '#f3f4f6', padding: '2rem' }}>
        <Text as="h2" size="3xl" weight="bold">
          No Padding Layout
        </Text>
        <Text color="muted">
          The layout has no padding, allowing custom spacing.
        </Text>
      </div>
    ),
  },
};
