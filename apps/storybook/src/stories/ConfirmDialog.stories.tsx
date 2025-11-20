import type { Meta, StoryObj } from '@storybook/react';
import { ConfirmDialog, Button } from '@prototipo/design-system';
import { useState } from 'react';

const meta = {
  title: 'Components/ConfirmDialog',
  component: ConfirmDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['danger', 'warning', 'info'],
      description: 'Variante visual do diálogo',
    },
  },
} satisfies Meta<typeof ConfirmDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

const ConfirmDialogWithTrigger = (props: Omit<React.ComponentProps<typeof ConfirmDialog>, 'isOpen' | 'onConfirm' | 'onCancel'>) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Abrir Diálogo</Button>
      <ConfirmDialog
        {...props}
        isOpen={isOpen}
        onConfirm={() => {
          console.log('Confirmado!');
          setIsOpen(false);
        }}
        onCancel={() => {
          console.log('Cancelado!');
          setIsOpen(false);
        }}
      />
    </>
  );
};

export const Danger: Story = {
  render: () => (
    <ConfirmDialogWithTrigger
      variant="danger"
      title="Excluir questão?"
      message="Esta ação não pode ser desfeita. A questão será permanentemente removida do sistema."
      confirmLabel="Excluir"
      cancelLabel="Cancelar"
    />
  ),
};

export const Warning: Story = {
  render: () => (
    <ConfirmDialogWithTrigger
      variant="warning"
      title="Rejeitar questão?"
      message="A questão será devolvida ao educador para ajustes. Deseja continuar?"
      confirmLabel="Rejeitar"
      cancelLabel="Voltar"
    />
  ),
};

export const Info: Story = {
  render: () => (
    <ConfirmDialogWithTrigger
      variant="info"
      title="Aprovar questão?"
      message="A questão será publicada e ficará disponível para os alunos. Confirma a aprovação?"
      confirmLabel="Aprovar"
      cancelLabel="Revisar novamente"
    />
  ),
};

export const BatchApproval: Story = {
  render: () => (
    <ConfirmDialogWithTrigger
      variant="info"
      title="Aprovar 5 questões em lote?"
      message="As questões selecionadas serão aprovadas e publicadas simultaneamente."
      confirmLabel="Aprovar todas"
      cancelLabel="Cancelar"
    />
  ),
};
