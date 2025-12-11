'use client';

import { Button, Text } from '@prototipo/design-system';
import styles from './onboarding.module.css';

export default function ParabensPage() {
  return (
    <div className={styles.onboardingContainer}>
      <div className={styles.celebration}>
        <div className={styles.confetti}>🎉</div>
        <Text as="h1" size="5xl" weight="bold" color="success">Parabéns!</Text>
        <Text as="p" size="xl" weight="medium" color="default">Você completou o onboarding!</Text>
        <Text as="p" size="base" weight="normal" color="muted">Agora você está pronto para começar sua jornada de aprendizado.</Text>
        <Button variant="primary" size="lg" onClick={() => window.location.href = '/dashboard'}>Ir para o Jogo</Button>
      </div>
    </div>
  );
}
