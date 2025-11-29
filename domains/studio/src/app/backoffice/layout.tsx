/**
 * Layout específico para rotas BackOffice
 * Remove estilos globais do Tailwind que interferem com os tokens do Figma
 */
export default function BackOfficeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div 
      style={{ 
        all: 'initial',
        display: 'block',
        width: '100%',
        minHeight: '100vh'
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        #__next, body, html {
          all: unset;
          display: block;
          width: 100%;
          min-height: 100vh;
        }
        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
      ` }} />
      {children}
    </div>
  );
}
