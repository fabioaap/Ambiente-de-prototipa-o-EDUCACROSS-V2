'use client';

import { Button, Text } from '@prototipo/design-system';
import styles from './onboarding.module.css';

export default function BoasVindasPage() {
  return (
    <div className={styles.onboardingContainer}>
      <div className={styles.hero}>
        <div className={styles.logo}>🎓</div>
        <Text as="h1" size="4xl" weight="bold" color="primary">Bem-vindo ao EDUCACROSS</Text>
        <Text as="p" size="lg" weight="normal" color="muted">Sua jornada de aprendizado gamificado começa aqui!</Text>
        <Button variant="primary" size="lg" onClick={() => window.location.href = '/onboarding/personagem'}>
          Começar
        </Button>
      </div>
    </div>
  );
}
