import type { Meta, StoryObj } from '@storybook/react';
import { Modal, Button } from '@prototipo/design-system';
import { useState } from 'react';

const meta = {
  title: 'BackOffice/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    a11y: {
      config: {
        rules: [
          { id: 'aria-required-attr', enabled: true },
          { id: 'dialog-name', enabled: true },
        ],
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

function ModalExample({ size = 'medium', title = 'Modal Title' }: { size?: 'small' | 'medium' | 'large' | 'fullscreen'; title?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} aria-label="Abrir modal">Abrir Modal</Button>
      <Modal open={open} onClose={() => setOpen(false)} title={title} size={size} ariaLabel={title}>
        <div style={{ padding: '1rem 0' }}>
          <p>Este é o conteúdo do modal. Você pode adicionar qualquer elemento React aqui.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
      </Modal>
    </>
  );
}

export const Small: Story = {
  render: () => <ModalExample size="small" title="Modal Pequeno" />,
};

export const Medium: Story = {
  render: () => <ModalExample size="medium" title="Modal Médio" />,
};

export const Large: Story = {
  render: () => <ModalExample size="large" title="Modal Grande" />,
};

export const Fullscreen: Story = {
  render: () => <ModalExample size="fullscreen" title="Modal Tela Cheia" />,
};

function ModalWithFooter() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Abrir Modal com Rodapé</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Confirmar Ação"
        footer={
          <>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={() => {
              alert('Ação confirmada!');
              setOpen(false);
            }}>
              Confirmar
            </Button>
          </>
        }
      >
        <div style={{ padding: '1rem 0' }}>
          <p>Você tem certeza que deseja realizar esta ação?</p>
          <p>Esta operação não pode ser desfeita.</p>
        </div>
      </Modal>
    </>
  );
}

export const WithFooter: Story = {
  render: () => <ModalWithFooter />,
};

function ModalWithLongContent() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Abrir Modal com Scroll</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Termos de Uso">
        <div>
          {Array.from({ length: 20 }).map((_, i) => (
            <p key={i}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
              nostrud exercitation ullamco laboris.
            </p>
          ))}
        </div>
      </Modal>
    </>
  );
}

export const WithScroll: Story = {
  render: () => <ModalWithLongContent />,
};

function ModalWithForm() {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Formulário enviado!');
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Novo Usuário</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Criar Novo Usuário"
        footer={
          <>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit" form="user-form">
              Criar Usuário
            </Button>
          </>
        }
      >
        <form id="user-form" onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Nome Completo
              </label>
              <input
                id="name"
                type="text"
                placeholder="Digite o nome"
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                }}
                required
              />
            </div>
            <div>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                E-mail
              </label>
              <input
                id="email"
                type="email"
                placeholder="usuario@exemplo.com"
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                }}
                required
              />
            </div>
            <div>
              <label htmlFor="role" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Função
              </label>
              <select
                id="role"
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                }}
                required
              >
                <option value="">Selecione...</option>
                <option value="admin">Administrador</option>
                <option value="editor">Editor</option>
                <option value="viewer">Visualizador</option>
              </select>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}

export const WithForm: Story = {
  render: () => <ModalWithForm />,
};

function ModalNoOverlayClose() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Modal sem fechar no overlay</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Aviso Importante"
        closeOnOverlayClick={false}
        closeOnEsc={false}
        footer={
          <Button variant="primary" onClick={() => setOpen(false)}>
            Entendi
          </Button>
        }
      >
        <div style={{ padding: '1rem 0' }}>
          <p>Este modal só pode ser fechado clicando no botão "Entendi" ou no X.</p>
          <p>Clicar fora do modal ou pressionar ESC não funcionará.</p>
        </div>
      </Modal>
    </>
  );
}

export const NoOverlayClose: Story = {
  render: () => <ModalNoOverlayClose />,
};
