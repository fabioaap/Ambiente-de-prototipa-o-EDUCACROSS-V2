'use client';

import { useState } from 'react';
import { Button, Text } from '@prototipo/design-system';
import styles from './onboarding.module.css';

const avatars = ['👨‍🎓', '👩‍🎓', '🧑‍🔬', '👨‍💻', '👩‍🏫', '🧑‍🎨'];

export default function PersonagemPage() {
  const [selected, setSelected] = useState(0);
  return (
    <div className={styles.onboardingContainer}>
      <Text as="h2" size="3xl" weight="bold" color="default">Escolha seu Personagem</Text>
      <div className={styles.avatarGrid}>
        {avatars.map((avatar, idx) => (
          <div key={idx} className={`${styles.avatarOption} ${selected === idx ? styles.selected : ''}`} onClick={() => setSelected(idx)}>
            <span className={styles.avatarIcon}>{avatar}</span>
          </div>
        ))}
      </div>
      <div className={styles.preview}><span className={styles.previewAvatar}>{avatars[selected]}</span></div>
      <Button variant="primary" size="lg" onClick={() => window.location.href = '/onboarding/missao'}>Próximo</Button>
    </div>
  );
}
