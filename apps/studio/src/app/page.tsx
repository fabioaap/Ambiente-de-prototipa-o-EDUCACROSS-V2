import Link from 'next/link';
import { Layout, Text, Button, Card, Badge } from '@prototipo/design-system';

export default function Home() {
  return (
    <Layout maxWidth="xl" centered paddingY="lg">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <Text as="h1" size="5xl" weight="bold" color="primary">
          EDUCACROSS Studio
        </Text>
        <Text as="p" size="xl" color="muted" style={{ marginTop: '1rem' }}>
          Ambiente de prototipação visual orientado a jornadas
        </Text>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginTop: '3rem',
        }}
      >
        <Card variant="elevated" padding="lg">
          <Text as="h2" size="2xl" weight="semibold" style={{ marginBottom: '1rem' }}>
            Editor Visual
          </Text>
          <Text color="muted" style={{ marginBottom: '1.5rem' }}>
            Acesse o Puck para criar e editar páginas de forma visual.
          </Text>
          <Link href="/studio">
            <Button variant="primary" fullWidth>
              Abrir Studio
            </Button>
          </Link>
        </Card>

        <Card variant="elevated" padding="lg">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <Text as="h2" size="2xl" weight="semibold">
              Storybook
            </Text>
            <Badge variant="success" size="sm">
              ✓ Disponível
            </Badge>
          </div>
          <Text color="muted" style={{ marginBottom: '1.5rem' }}>
            Catálogo de componentes do Design System.
          </Text>
          <a
            href={process.env.NODE_ENV === 'development' 
              ? 'http://localhost:6006' 
              : 'https://educacross-storybook.vercel.app'}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <Button variant="secondary" fullWidth>
              Abrir Storybook
            </Button>
          </a>
        </Card>

        <Card variant="elevated" padding="lg">
          <Text as="h2" size="2xl" weight="semibold" style={{ marginBottom: '1rem' }}>
            Jornadas
          </Text>
          <Text color="muted" style={{ marginBottom: '1.5rem' }}>
            Documentação organizada por domínio e jornada.
          </Text>
          <Button variant="outline" fullWidth disabled>
            Ver Documentação
          </Button>
        </Card>
      </div>
    </Layout>
  );
}
