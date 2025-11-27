import type { Meta, StoryObj } from '@storybook/react';
import tokens from '@prototipo/tokens/src/tokens.json';

const meta = {
  title: 'Design System/Tokens',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Visual reference for all design tokens used across the system'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Colors: Story = {
  render: () => (
    <div style={{ padding: '2rem' }}>
      <h1>Colors</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
        {Object.entries(tokens.colors).map(([colorName, colorShades]) => (
          <div key={colorName}>
            <h3 style={{ marginTop: 0, textTransform: 'capitalize' }}>{colorName}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {Object.entries(colorShades as Record<string, string>).map(([shade, color]) => (
                <div key={shade} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div
                    style={{
                      width: '60px',
                      height: '40px',
                      backgroundColor: color,
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                    }}
                  />
                  <div style={{ fontSize: '0.875rem' }}>
                    <div style={{ fontWeight: '600' }}>{shade}</div>
                    <div style={{ color: '#666', fontFamily: 'monospace' }}>{color}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Typography: Story = {
  render: () => (
    <div style={{ padding: '2rem', fontFamily: tokens.typography.fontFamily.sans }}>
      <h1>Typography</h1>

      <section style={{ marginBottom: '3rem' }}>
        <h2>Font Families</h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {Object.entries(tokens.typography.fontFamily).map(([name, family]) => (
            <div key={name}>
              <h3 style={{ textTransform: 'capitalize', marginBottom: '0.5rem' }}>{name}</h3>
              <p
                style={{
                  fontFamily: family,
                  margin: '0.5rem 0',
                  padding: '1rem',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '4px',
                }}
              >
                The quick brown fox jumps over the lazy dog
              </p>
              <code style={{ fontSize: '0.75rem' }}>{family}</code>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2>Font Sizes</h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {Object.entries(tokens.typography.fontSize).map(([size, value]) => (
            <div key={size} style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <span style={{ fontSize: value as any, minWidth: '200px' }}>Sample text</span>
              <span style={{ color: '#666' }}>
                {size}: {value}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2>Font Weights</h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {Object.entries(tokens.typography.fontWeight).map(([weight, value]) => (
            <div key={weight} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <span style={{ fontWeight: parseInt(value) as any }}>
                The quick brown fox
              </span>
              <span style={{ color: '#666' }}>
                {weight}: {value}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Line Heights</h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {Object.entries(tokens.typography.lineHeight).map(([height, value]) => (
            <div key={height}>
              <p
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                style={{ lineHeight: parseFloat(value) as any, marginBottom: '0.5rem', color: '#666' }}>
                {height}: {value}
              </p>
              <p
                 
                style={{
                  lineHeight: parseFloat(value) as any,
                  padding: '1rem',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '4px',
                  margin: 0,
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  ),
};

export const Spacing: Story = {
  render: () => (
    <div style={{ padding: '2rem' }}>
      <h1>Spacing</h1>
      <p style={{ marginBottom: '2rem', color: '#666' }}>All spacing values in rem units</p>
      <div style={{ display: 'grid', gap: '2rem' }}>
        {Object.entries(tokens.spacing).map(([size, value]) => (
          <div key={size}>
            <div style={{ marginBottom: '0.5rem' }}>
              <strong>{size}</strong> — {value}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <div
                style={{
                  width: value,
                  height: value,
                  backgroundColor: '#3b82f6',
                  borderRadius: '4px',
                }}
              />
              <div style={{ fontSize: '0.875rem', color: '#666' }}>
                {size === '0' ? 'No spacing' : `${parseFloat(value) * 16}px`}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const BorderRadius: Story = {
  render: () => (
    <div style={{ padding: '2rem' }}>
      <h1>Border Radius</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '2rem' }}>
        {Object.entries(tokens.borderRadius).map(([radius, value]) => (
          <div key={radius} style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '100px',
                height: '100px',
                backgroundColor: '#3b82f6',
                borderRadius: value,
                margin: '0 auto 1rem',
              }}
            />
            <div style={{ fontWeight: '600', textTransform: 'capitalize' }}>{radius}</div>
            <div style={{ fontSize: '0.875rem', color: '#666' }}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Shadows: Story = {
  render: () => (
    <div style={{ padding: '2rem' }}>
      <h1>Shadows</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
        {Object.entries(tokens.shadows).map(([shadow, value]) => (
          <div key={shadow}>
            <div
              style={{
                width: '100%',
                height: '150px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: value,
                marginBottom: '1rem',
              }}
            />
            <div style={{ fontWeight: '600', textTransform: 'capitalize' }}>{shadow}</div>
            <code style={{ fontSize: '0.75rem', color: '#666' }}>{value}</code>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Breakpoints: Story = {
  render: () => (
    <div style={{ padding: '2rem' }}>
      <h1>Breakpoints</h1>
      <div style={{ display: 'grid', gap: '1rem', maxWidth: '600px' }}>
        {Object.entries(tokens.breakpoints).map(([bp, value]) => (
          <div
            key={bp}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '1rem',
              backgroundColor: '#f5f5f5',
              borderRadius: '4px',
            }}
          >
            <span style={{ fontWeight: '600', textTransform: 'uppercase' }}>{bp}</span>
            <code>{value}</code>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const AllTokens: Story = {
  render: () => (
    <div style={{ padding: '2rem' }}>
      <h1>All Design Tokens</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        Complete reference of all design tokens available in the system
      </p>
      <pre
        style={{
          backgroundColor: '#f5f5f5',
          padding: '1.5rem',
          borderRadius: '8px',
          overflow: 'auto',
          fontSize: '0.875rem',
        }}
      >
        {JSON.stringify(tokens, null, 2)}
      </pre>
    </div>
  ),
};
