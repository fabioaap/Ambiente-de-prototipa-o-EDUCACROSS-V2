'use client';

import { Button, Text, Leaderboard } from '@prototipo/design-system';
import styles from './onboarding.module.css';

const mockData = [
  { id: '1', name: 'Ana Silva', score: 1500, avatar: '' },
  { id: '2', name: 'Carlos Santos', score: 1350, avatar: '' },
  { id: '3', name: 'Maria Oliveira', score: 1200, avatar: '' },
  { id: '4', name: 'João Pedro', score: 1100, avatar: '' },
  { id: '5', name: 'Fernanda Costa', score: 950, avatar: '' },
  { id: '6', name: 'Você', score: 100, avatar: '', badge: 'Novato' }
];

export default function LeaderboardPage() {
  return (
    <div className={styles.onboardingContainer}>
      <Text as="h2" size="3xl" weight="bold" color="default">Ranking Global</Text>
      <Text as="p" size="base" weight="normal" color="muted">Veja sua posição e compete com outros jogadores!</Text>
      <Leaderboard entries={mockData} limit={10} highlightId="6" showTopBadges />
      <Button variant="primary" size="lg" onClick={() => window.location.href = '/onboarding/parabens'}>Continuar</Button>
    </div>
  );
}
