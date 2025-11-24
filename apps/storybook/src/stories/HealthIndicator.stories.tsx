import type { Meta, StoryObj } from '@storybook/react';
import { HealthIndicator } from '@prototipo/design-system';

const meta = {
  title: 'Components/HealthIndicator',
  component: HealthIndicator,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['success', 'warning', 'error', 'info'],
      description: 'Health status determining the color scheme',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the component',
    },
    title: {
      control: 'text',
      description: 'Title of the health indicator',
    },
    value: {
      control: 'text',
      description: 'Current value to display',
    },
    description: {
      control: 'text',
      description: 'Optional description or additional information',
    },
    icon: {
      control: 'text',
      description: 'Optional icon/emoji to display',
    },
    href: {
      control: 'text',
      description: 'Optional link URL for more details',
    },
  },
} satisfies Meta<typeof HealthIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    title: 'Build Status',
    value: '✅ Passing',
    status: 'success',
    description: 'Last build: 2 minutes ago',
    icon: '🔨',
  },
};

export const Warning: Story = {
  args: {
    title: 'Dependencies',
    value: '3 outdated',
    status: 'warning',
    description: 'Minor updates available',
    icon: '📦',
  },
};

export const Error: Story = {
  args: {
    title: 'Tests',
    value: '❌ Failed',
    status: 'error',
    description: '5 tests failing',
    icon: '🧪',
  },
};

export const Info: Story = {
  args: {
    title: 'Bundle Size',
    value: '142 KB',
    status: 'info',
    description: 'Storybook build',
    icon: '📊',
  },
};

export const WithLink: Story = {
  args: {
    title: 'Coverage',
    value: '85%',
    status: 'success',
    description: 'Click to view report',
    icon: '📈',
    href: 'https://github.com',
  },
};

export const SmallSize: Story = {
  args: {
    title: 'Commits',
    value: '12',
    status: 'info',
    description: 'Last 24h',
    icon: '💾',
    size: 'sm',
  },
};

export const LargeSize: Story = {
  args: {
    title: 'Active Users',
    value: '1,234',
    status: 'success',
    description: 'Currently online',
    icon: '👥',
    size: 'lg',
  },
};

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
      <HealthIndicator
        title="Build Status"
        value="✅ Passing"
        status="success"
        description="Last build: 2 min ago"
        icon="🔨"
      />
      <HealthIndicator
        title="Dependencies"
        value="3 outdated"
        status="warning"
        description="Minor updates available"
        icon="📦"
      />
      <HealthIndicator
        title="Tests"
        value="❌ Failed"
        status="error"
        description="5 tests failing"
        icon="🧪"
      />
      <HealthIndicator
        title="Bundle Size"
        value="142 KB"
        status="info"
        description="Storybook build"
        icon="📊"
      />
    </div>
  ),
};

export const DashboardExample: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
      <HealthIndicator
        title="Build"
        value="✅ Pass"
        status="success"
        icon="🔨"
        size="sm"
      />
      <HealthIndicator
        title="Lint"
        value="✅ Pass"
        status="success"
        icon="🔍"
        size="sm"
      />
      <HealthIndicator
        title="Tests"
        value="85%"
        status="success"
        description="Coverage"
        icon="🧪"
        size="sm"
      />
      <HealthIndicator
        title="Deps"
        value="2"
        status="warning"
        description="Updates"
        icon="📦"
        size="sm"
      />
      <HealthIndicator
        title="Issues"
        value="9"
        status="info"
        description="Open"
        icon="🐛"
        size="sm"
      />
      <HealthIndicator
        title="PRs"
        value="2"
        status="info"
        description="In Review"
        icon="🔄"
        size="sm"
      />
    </div>
  ),
};
