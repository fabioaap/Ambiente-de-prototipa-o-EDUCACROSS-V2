import Link from 'next/link';
import { Layout, Text, Button, Card } from '@prototipo/design-system';

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
            Dashboard
          </Text>
          <Text color="muted" style={{ marginBottom: '1.5rem' }}>
            Visão geral das páginas, domínios e indicadores de saúde.
          </Text>
          <Link href="/dashboard">
            <Button variant="primary" fullWidth>
              Ver Dashboard
            </Button>
          </Link>
        </Card>

        <Card variant="elevated" padding="lg">
          <Text as="h2" size="2xl" weight="semibold" style={{ marginBottom: '1rem' }}>
            Editor Visual
          </Text>
          <Text color="muted" style={{ marginBottom: '1.5rem' }}>
            Acesse o Puck para criar e editar páginas de forma visual.
          </Text>
          <Link href="/studio">
            <Button variant="secondary" fullWidth>
              Abrir Studio
            </Button>
          </Link>
        </Card>

        <Card variant="elevated" padding="lg">
          <Text as="h2" size="2xl" weight="semibold" style={{ marginBottom: '1rem' }}>
            Storybook
          </Text>
          <Text color="muted" style={{ marginBottom: '1.5rem' }}>
            Catálogo de componentes do Design System.
          </Text>
          <Button variant="outline" fullWidth disabled>
            Em Breve
          </Button>
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
