import type { Meta, StoryObj } from '@storybook/react';
import { ToolbarButtons } from '@prototipo/design-system';

const meta = {
  title: 'BackOffice/ToolbarButtons',
  component: ToolbarButtons,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ToolbarButtons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onImport: () => alert('Importando...'),
    onExport: () => alert('Exportando...'),
  },
};

export const CustomLabels: Story = {
  args: {
    onImport: () => alert('Importando CSV...'),
    onExport: () => alert('Exportando Excel...'),
    importLabel: 'Importar CSV',
    exportLabel: 'Exportar Excel',
  },
};

export const Disabled: Story = {
  args: {
    onImport: () => alert('Importando...'),
    onExport: () => alert('Exportando...'),
    disabled: true,
  },
};

export const OnlyImport: Story = {
  args: {
    onImport: () => alert('Importando...'),
  },
};

export const OnlyExport: Story = {
  args: {
    onExport: () => alert('Exportando...'),
  },
};
