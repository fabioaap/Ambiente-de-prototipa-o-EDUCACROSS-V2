import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from '@prototipo/design-system';

const meta = {
  title: 'BackOffice/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
    a11y: {
      config: {
        rules: [
          { id: 'aria-required-attr', enabled: true },
          { id: 'button-name', enabled: true },
        ],
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FewPages: Story = {
  args: {
    currentPage: 1,
    totalPages: 5,
    onChange: (page: number) => console.log('Page changed to:', page),
    ariaLabel: 'Navegação de páginas',
  },
};

export const ManyPages: Story = {
  args: {
    currentPage: 5,
    totalPages: 20,
    onChange: (page: number) => console.log('Page changed to:', page),
  },
};

export const WithFirstLast: Story = {
  args: {
    currentPage: 10,
    totalPages: 50,
    showFirstLast: true,
    onChange: (page: number) => console.log('Page changed to:', page),
  },
};

export const CustomSiblingCount: Story = {
  args: {
    currentPage: 15,
    totalPages: 30,
    siblingCount: 2,
    onChange: (page: number) => console.log('Page changed to:', page),
  },
};

export const FirstPage: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    onChange: (page: number) => console.log('Page changed to:', page),
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
    onChange: (page: number) => console.log('Page changed to:', page),
  },
};

export const Disabled: Story = {
  args: {
    currentPage: 5,
    totalPages: 15,
    disabled: true,
    onChange: (page: number) => console.log('Page changed to:', page),
  },
};
