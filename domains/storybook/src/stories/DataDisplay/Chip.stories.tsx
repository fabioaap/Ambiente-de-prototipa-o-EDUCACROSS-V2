import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from '@prototipo/design-system';
import React from 'react';

const meta = {
  title: 'DataDisplay/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'error', 'info'],
      description: 'Variante visual do chip',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamanho do chip',
    },
    clickable: {
      control: 'boolean',
      description: 'Se o chip pode ser clicado',
    },
    deletable: {
      control: 'boolean',
      description: 'Se o chip pode ser deletado',
    },
    selected: {
      control: 'boolean',
      description: 'Se o chip está selecionado',
    },
    disabled: {
      control: 'boolean',
      description: 'Se o chip está desabilitado',
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Chip',
    variant: 'default',
    size: 'md',
  },
};

export const Primary: Story = {
  args: {
    children: 'Primary Chip',
    variant: 'primary',
    size: 'md',
  },
};

export const Success: Story = {
  args: {
    children: 'Success Chip',
    variant: 'success',
    size: 'md',
  },
};

export const Warning: Story = {
  args: {
    children: 'Warning Chip',
    variant: 'warning',
    size: 'md',
  },
};

export const Error: Story = {
  args: {
    children: 'Error Chip',
    variant: 'error',
    size: 'md',
  },
};

export const Info: Story = {
  args: {
    children: 'Info Chip',
    variant: 'info',
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    children: 'Small Chip',
    variant: 'primary',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Chip',
    variant: 'primary',
    size: 'lg',
  },
};

export const Clickable: Story = {
  args: {
    children: 'Clickable Chip',
    variant: 'primary',
    size: 'md',
    clickable: true,
    onClick: () => alert('Chip clicado!'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Chip clicável. Use Tab para focar e Enter/Space para ativar.',
      },
    },
  },
};

export const Deletable: Story = {
  args: {
    children: 'Deletable Chip',
    variant: 'default',
    size: 'md',
    deletable: true,
    onDelete: () => alert('Chip deletado!'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Chip deletável. Clique no X ou pressione Delete/Backspace quando focado.',
      },
    },
  },
};

export const Selected: Story = {
  args: {
    children: 'Selected Chip',
    variant: 'primary',
    size: 'md',
    clickable: true,
    selected: true,
    onClick: () => alert('Chip clicado!'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Chip no estado selecionado com aria-pressed="true".',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Chip',
    variant: 'primary',
    size: 'md',
    clickable: true,
    disabled: true,
    onClick: () => alert('Não deve ser chamado'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Chip desabilitado não responde a cliques ou teclado.',
      },
    },
  },
};

// Stories com ícones
const IconUser = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </svg>
);

const IconTag = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/>
  </svg>
);

export const WithIcon: Story = {
  args: {
    children: 'With Icon',
    variant: 'primary',
    size: 'md',
    icon: <IconTag />,
  },
};

export const WithAvatar: Story = {
  render: () => (
    <Chip
      variant="default"
      size="md"
      avatar={
        <img
          src="https://i.pravatar.cc/150?img=1"
          alt="Avatar"
          style={{ borderRadius: '50%' }}
        />
      }
    >
      John Doe
    </Chip>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Chip com avatar de usuário.',
      },
    },
  },
};

// Story de filtros interativos
export const FilterChips: Story = {
  render: () => {
    const [selectedFilters, setSelectedFilters] = React.useState<string[]>(['react']);

    const filters = [
      { id: 'react', label: 'React', variant: 'primary' as const },
      { id: 'typescript', label: 'TypeScript', variant: 'info' as const },
      { id: 'nodejs', label: 'Node.js', variant: 'success' as const },
      { id: 'design', label: 'Design', variant: 'warning' as const },
    ];

    const toggleFilter = (id: string) => {
      setSelectedFilters((prev) =>
        prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
      );
    };

    return (
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {filters.map((filter) => (
          <Chip
            key={filter.id}
            variant={filter.variant}
            clickable
            selected={selectedFilters.includes(filter.id)}
            onClick={() => toggleFilter(filter.id)}
          >
            {filter.label}
          </Chip>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Exemplo de chips de filtro interativos com seleção múltipla.',
      },
    },
  },
};

// Story de tags deletáveis
export const DeletableTags: Story = {
  render: () => {
    const [tags, setTags] = React.useState([
      { id: '1', label: 'JavaScript' },
      { id: '2', label: 'CSS' },
      { id: '3', label: 'HTML' },
      { id: '4', label: 'React' },
    ]);

    const deleteTag = (id: string) => {
      setTags((prev) => prev.filter((tag) => tag.id !== id));
    };

    return (
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {tags.map((tag) => (
          <Chip
            key={tag.id}
            variant="default"
            deletable
            onDelete={() => deleteTag(tag.id)}
            deleteLabel={`Remover tag ${tag.label}`}
          >
            {tag.label}
          </Chip>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Exemplo de tags deletáveis. Clique no X ou use Delete/Backspace.',
      },
    },
  },
};

// Story de chips com avatar e delete
export const AvatarWithDelete: Story = {
  render: () => {
    const [users, setUsers] = React.useState([
      { id: '1', name: 'Ana Silva', avatar: 'https://i.pravatar.cc/150?img=5' },
      { id: '2', name: 'João Costa', avatar: 'https://i.pravatar.cc/150?img=12' },
      { id: '3', name: 'Maria Santos', avatar: 'https://i.pravatar.cc/150?img=20' },
    ]);

    const removeUser = (id: string) => {
      setUsers((prev) => prev.filter((user) => user.id !== id));
    };

    return (
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {users.map((user) => (
          <Chip
            key={user.id}
            variant="primary"
            deletable
            onDelete={() => removeUser(user.id)}
            deleteLabel={`Remover ${user.name}`}
            avatar={
              <img
                src={user.avatar}
                alt={user.name}
                style={{ borderRadius: '50%' }}
              />
            }
          >
            {user.name}
          </Chip>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Chips com avatar de usuário e opção de remoção.',
      },
    },
  },
};

// Story de demonstração de acessibilidade
export const KeyboardNavigation: Story = {
  render: () => {
    const [items, setItems] = React.useState([
      { id: '1', label: 'Item 1', selected: false },
      { id: '2', label: 'Item 2', selected: false },
      { id: '3', label: 'Item 3', selected: false },
    ]);

    const toggleItem = (id: string) => {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, selected: !item.selected } : item
        )
      );
    };

    const deleteItem = (id: string) => {
      setItems((prev) => prev.filter((item) => item.id !== id));
    };

    return (
      <div>
        <p style={{ marginBottom: '16px', fontSize: '14px', color: '#666' }}>
          <strong>Instruções de acessibilidade:</strong>
          <br />
          • Use <kbd>Tab</kbd> para navegar entre chips
          <br />
          • Pressione <kbd>Enter</kbd> ou <kbd>Space</kbd> para selecionar/desselecionar
          <br />
          • Pressione <kbd>Delete</kbd> ou <kbd>Backspace</kbd> para remover
          <br />
          • O foco é visível com outline azul
          <br />
          • Chips têm aria-pressed quando selecionados
        </p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {items.map((item) => (
            <Chip
              key={item.id}
              variant="primary"
              clickable
              deletable
              selected={item.selected}
              onClick={() => toggleItem(item.id)}
              onDelete={() => deleteItem(item.id)}
              deleteLabel={`Remover ${item.label}`}
            >
              {item.label}
            </Chip>
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstração completa de navegação por teclado e acessibilidade.',
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Chip variant="default">Default</Chip>
        <Chip variant="primary">Primary</Chip>
        <Chip variant="success">Success</Chip>
        <Chip variant="warning">Warning</Chip>
        <Chip variant="error">Error</Chip>
        <Chip variant="info">Info</Chip>
      </div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Chip variant="primary" size="sm">Small</Chip>
        <Chip variant="primary" size="md">Medium</Chip>
        <Chip variant="primary" size="lg">Large</Chip>
      </div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Chip variant="primary" icon={<IconTag />}>With Icon</Chip>
        <Chip variant="primary" clickable>Clickable</Chip>
        <Chip variant="primary" deletable>Deletable</Chip>
        <Chip variant="primary" clickable selected>Selected</Chip>
        <Chip variant="primary" disabled>Disabled</Chip>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Todas as variantes e estados do Chip em uma visão geral.',
      },
    },
  },
};
