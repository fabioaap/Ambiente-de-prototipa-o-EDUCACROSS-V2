import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator,
  DropdownCheckboxItem,
  DropdownGroup,
  Button,
} from '@prototipo/design-system';

const meta = {
  title: 'Components/Navigation/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Componente Dropdown baseado em Radix UI com suporte completo a navegação por teclado, ARIA roles e detecção de colisões. Permite criar menus dropdown acessíveis com itens, separadores, labels e checkboxes.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

// Ícones SVG para os exemplos
const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M13 14v-1.5a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3V14M8 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SettingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13 8a4.99 4.99 0 0 1-.17 1.25l1.09.63-.5.87-1.09-.63a5 5 0 0 1-2.16 1.25V13h-1v-1.63a5 5 0 0 1-2.17-1.25l-1.09.63-.5-.87 1.09-.63A5 5 0 0 1 3 8c0-.45.06-.88.17-1.25l-1.09-.63.5-.87 1.09.63a5 5 0 0 1 2.16-1.25V3h1v1.63a5 5 0 0 1 2.17 1.25l1.09-.63.5.87-1.09.63c.11.37.17.8.17 1.25z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LogoutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M6 14H3.5A1.5 1.5 0 0 1 2 12.5v-9A1.5 1.5 0 0 1 3.5 2H6M11 11l3-3-3-3M14 8H6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M11.333 2A1.886 1.886 0 0 1 14 4.667l-9 9-3.667 1 1-3.667 9-9z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M2 4h12M5.333 4V2.667a1.333 1.333 0 0 1 1.334-1.334h2.666a1.333 1.333 0 0 1 1.334 1.334V4m2 0v9.333a1.333 1.333 0 0 1-1.334 1.334H4.667a1.334 1.334 0 0 1-1.334-1.334V4h9.334z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FileIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M9 2H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6L9 2z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 2v4h4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Exemplo básico com trigger de botão
 */
export const Default: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger>
        <Button>Abrir Menu</Button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownItem>Perfil</DropdownItem>
        <DropdownItem>Configurações</DropdownItem>
        <DropdownSeparator />
        <DropdownItem>Sair</DropdownItem>
      </DropdownContent>
    </Dropdown>
  ),
};

/**
 * Dropdown com ícones e atalhos de teclado
 */
export const WithIconsAndShortcuts: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="outline">Menu de Usuário</Button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownItem icon={<UserIcon />} shortcut="⌘P">
          Meu Perfil
        </DropdownItem>
        <DropdownItem icon={<SettingsIcon />} shortcut="⌘S">
          Configurações
        </DropdownItem>
        <DropdownSeparator />
        <DropdownItem icon={<LogoutIcon />} shortcut="⌘Q">
          Sair
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  ),
};

/**
 * Dropdown com item destrutivo (ação perigosa)
 */
export const WithDestructiveItem: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="outline">Ações do Arquivo</Button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownItem icon={<FileIcon />}>Visualizar</DropdownItem>
        <DropdownItem icon={<EditIcon />}>Editar</DropdownItem>
        <DropdownSeparator />
        <DropdownItem icon={<TrashIcon />} destructive>
          Deletar
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  ),
};

/**
 * Dropdown com labels e grupos
 */
export const WithLabelsAndGroups: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="secondary">Menu Completo</Button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownLabel>Conta</DropdownLabel>
        <DropdownGroup>
          <DropdownItem icon={<UserIcon />}>Perfil</DropdownItem>
          <DropdownItem icon={<SettingsIcon />}>Configurações</DropdownItem>
        </DropdownGroup>
        <DropdownSeparator />
        <DropdownLabel>Ações</DropdownLabel>
        <DropdownGroup>
          <DropdownItem>Nova Janela</DropdownItem>
          <DropdownItem>Nova Aba Privada</DropdownItem>
        </DropdownGroup>
        <DropdownSeparator />
        <DropdownItem icon={<LogoutIcon />}>Sair</DropdownItem>
      </DropdownContent>
    </Dropdown>
  ),
};

/**
 * Dropdown com checkboxes para seleção múltipla
 */
export const WithCheckboxes: Story = {
  render: () => {
    const CheckboxDropdownExample = () => {
      const [showToolbar, setShowToolbar] = useState(true);
      const [showSidebar, setShowSidebar] = useState(false);
      const [showFooter, setShowFooter] = useState(true);

      return (
        <Dropdown>
          <DropdownTrigger>
            <Button variant="outline">Visualizar</Button>
          </DropdownTrigger>
          <DropdownContent>
            <DropdownLabel>Mostrar/Ocultar</DropdownLabel>
            <DropdownCheckboxItem
              checked={showToolbar}
              onCheckedChange={setShowToolbar}
            >
              Barra de Ferramentas
            </DropdownCheckboxItem>
            <DropdownCheckboxItem
              checked={showSidebar}
              onCheckedChange={setShowSidebar}
            >
              Barra Lateral
            </DropdownCheckboxItem>
            <DropdownCheckboxItem
              checked={showFooter}
              onCheckedChange={setShowFooter}
            >
              Rodapé
            </DropdownCheckboxItem>
          </DropdownContent>
        </Dropdown>
      );
    };

    return <CheckboxDropdownExample />;
  },
};

/**
 * Dropdown com controle de estado externo
 */
export const ControlledOpen: Story = {
  render: () => {
    const ControlledDropdownExample = () => {
      const [open, setOpen] = useState(false);

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <Button onClick={() => setOpen(!open)} variant="outline">
              {open ? 'Fechar Menu (Externo)' : 'Abrir Menu (Externo)'}
            </Button>
          </div>
          <Dropdown open={open} onOpenChange={setOpen}>
            <DropdownTrigger>
              <Button>Toggle Menu</Button>
            </DropdownTrigger>
            <DropdownContent>
              <DropdownItem onSelect={() => setOpen(false)}>
                Opção 1
              </DropdownItem>
              <DropdownItem onSelect={() => setOpen(false)}>
                Opção 2
              </DropdownItem>
              <DropdownItem onSelect={() => setOpen(false)}>
                Opção 3
              </DropdownItem>
            </DropdownContent>
          </Dropdown>
        </div>
      );
    };

    return <ControlledDropdownExample />;
  },
};

/**
 * Dropdown com diferentes posicionamentos
 */
export const Positioning: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Dropdown>
        <DropdownTrigger>
          <Button variant="outline">Bottom (Padrão)</Button>
        </DropdownTrigger>
        <DropdownContent side="bottom" align="start">
          <DropdownItem>Opção 1</DropdownItem>
          <DropdownItem>Opção 2</DropdownItem>
          <DropdownItem>Opção 3</DropdownItem>
        </DropdownContent>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger>
          <Button variant="outline">Top</Button>
        </DropdownTrigger>
        <DropdownContent side="top" align="start">
          <DropdownItem>Opção 1</DropdownItem>
          <DropdownItem>Opção 2</DropdownItem>
          <DropdownItem>Opção 3</DropdownItem>
        </DropdownContent>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger>
          <Button variant="outline">Right</Button>
        </DropdownTrigger>
        <DropdownContent side="right" align="start">
          <DropdownItem>Opção 1</DropdownItem>
          <DropdownItem>Opção 2</DropdownItem>
          <DropdownItem>Opção 3</DropdownItem>
        </DropdownContent>
      </Dropdown>

      <Dropdown>
        <DropdownTrigger>
          <Button variant="outline">Left</Button>
        </DropdownTrigger>
        <DropdownContent side="left" align="start">
          <DropdownItem>Opção 1</DropdownItem>
          <DropdownItem>Opção 2</DropdownItem>
          <DropdownItem>Opção 3</DropdownItem>
        </DropdownContent>
      </Dropdown>
    </div>
  ),
};

/**
 * Dropdown com itens desabilitados
 */
export const WithDisabledItems: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="outline">Menu com Itens Desabilitados</Button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownItem>Item Ativo</DropdownItem>
        <DropdownItem disabled>Item Desabilitado</DropdownItem>
        <DropdownItem>Outro Item Ativo</DropdownItem>
        <DropdownSeparator />
        <DropdownItem disabled>Também Desabilitado</DropdownItem>
      </DropdownContent>
    </Dropdown>
  ),
};

/**
 * Dropdown com alinhamento centralizado
 */
export const CenterAligned: Story = {
  render: () => (
    <Dropdown>
      <DropdownTrigger>
        <Button>Menu Centralizado</Button>
      </DropdownTrigger>
      <DropdownContent align="center">
        <DropdownItem>Centralizado</DropdownItem>
        <DropdownItem>Em relação</DropdownItem>
        <DropdownItem>Ao trigger</DropdownItem>
      </DropdownContent>
    </Dropdown>
  ),
};
