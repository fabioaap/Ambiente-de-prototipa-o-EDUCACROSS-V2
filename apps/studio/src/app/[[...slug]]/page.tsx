import fs from 'fs';
import path from 'path';
import { Render, Data } from '@measured/puck';
import Link from 'next/link';
import { puckConfig } from '@/config/puck.config';

const PAGES_DIR = path.join(process.cwd(), 'data', 'pages');

// Criar o diretório se não existir
if (!fs.existsSync(PAGES_DIR)) {
  fs.mkdirSync(PAGES_DIR, { recursive: true });
}

export function generateStaticParams() {
  if (!fs.existsSync(PAGES_DIR)) return [];

  const files = fs.readdirSync(PAGES_DIR);
  return files
    .filter(file => file.endsWith('.json'))
    .map(file => {
      const slug = file.replace('.json', '');
      return {
        slug: slug === 'index' ? [] : slug.split('/'),
      };
    });
}

interface PageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const pagePath = slug ? slug.join('/') : 'index';
  const filePath = path.join(PAGES_DIR, `${pagePath}.json`);

  let data: Data;

  // Tentar carregar dados do arquivo
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    data = JSON.parse(fileContent);
  } else {
    // Página não encontrada, renderizar uma página padrão
    return (
      <div
        style={{
          maxWidth: '800px',
          margin: '4rem auto',
          padding: '2rem',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          Página não encontrada
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#666', marginBottom: '2rem' }}>
          A página <code>/{pagePath}</code> ainda não foi criada.
        </p>
        <Link
          href="/studio"
          style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            borderRadius: '0.375rem',
            textDecoration: 'none',
            fontWeight: 500,
          }}
        >
          Criar no Studio
        </Link>
      </div>
    );
  }

  return <Render config={puckConfig} data={data} />;
}

