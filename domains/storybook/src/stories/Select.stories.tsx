import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '@prototipo/design-system';

const meta = {
  title: 'Components/Forms/Select',
  component: Select,
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
    required: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const countryOptions = [
  { value: '', label: 'Select a country' },
  { value: 'br', label: 'Brazil' },
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
];

export const Default: Story = {
  args: {
    options: countryOptions,
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Preferred Language',
    options: [
      { value: '', label: 'Select language' },
      { value: 'pt', label: 'Portuguese' },
      { value: 'en', label: 'English' },
      { value: 'es', label: 'Spanish' },
      { value: 'fr', label: 'French' },
    ],
    helperText: 'Choose your preferred language',
  },
};

export const Required: Story = {
  args: {
    label: 'State',
    required: true,
    options: [
      { value: '', label: 'Select state' },
      { value: 'sp', label: 'São Paulo' },
      { value: 'rj', label: 'Rio de Janeiro' },
      { value: 'mg', label: 'Minas Gerais' },
    ],
    helperText: 'This field is required',
  },
};

export const WithError: Story = {
  args: {
    label: 'Category',
    error: true,
    errorText: 'Please select a category',
    options: [
      { value: '', label: 'Select category' },
      { value: 'tech', label: 'Technology' },
      { value: 'science', label: 'Science' },
      { value: 'arts', label: 'Arts' },
    ],
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Select',
    disabled: true,
    options: [
      { value: 'locked', label: 'Locked Option' },
    ],
  },
};

export const WithCustomChildren: Story = {
  render: (args) => (
    <Select {...args}>
      <option value="">Select a size</option>
      <optgroup label="Small Sizes">
        <option value="xs">Extra Small</option>
        <option value="s">Small</option>
      </optgroup>
      <optgroup label="Medium Sizes">
        <option value="m">Medium</option>
        <option value="l">Large</option>
      </optgroup>
      <optgroup label="Large Sizes">
        <option value="xl">Extra Large</option>
        <option value="xxl">2X Large</option>
      </optgroup>
    </Select>
  ),
  args: {
    label: 'Size',
    helperText: 'Select your size',
  },
};
