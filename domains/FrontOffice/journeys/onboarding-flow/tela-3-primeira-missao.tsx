'use client';

import { useState } from 'react';
import { Button, Text, Progress } from '@prototipo/design-system';
import styles from './onboarding.module.css';

const steps = ['Explore o menu de navegação', 'Complete seu perfil', 'Escolha sua primeira jornada'];

export default function PrimeiraMissaoPage() {
  const [step, setStep] = useState(0);
  const progress = ((step + 1) / steps.length) * 100;
  return (
    <div className={styles.onboardingContainer}>
      <Text as="h2" size="3xl" weight="bold" color="default">Primeira Missão</Text>
      <Progress value={progress} variant="linear" size="lg" color="primary" showLabel />
      <div className={styles.tutorialStep}>
        <Text as="p" size="xl" weight="medium" color="default">{steps[step]}</Text>
      </div>
      {step < steps.length - 1 ? (
        <Button variant="primary" size="lg" onClick={() => setStep(step + 1)}>Próximo Passo</Button>
      ) : (
        <Button variant="primary" size="lg" onClick={() => window.location.href = '/onboarding/leaderboard'}>Concluir Tutorial</Button>
      )}
    </div>
  );
}
