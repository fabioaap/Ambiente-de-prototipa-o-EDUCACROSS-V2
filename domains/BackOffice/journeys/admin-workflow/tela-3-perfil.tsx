'use client';

import React, { useState } from 'react';
import { Button, Input, Text, Card, Badge } from '@prototipo/design-system';
import styles from './admin-workflow.module.css';

interface Profile {
  name: string;
  email: string;
  bio: string;
  avatar: string;
  role: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>({
    name: 'Admin EDUCACROSS',
    email: 'admin@educacross.com',
    bio: 'Administrador do sistema EDUCACROSS',
    avatar: '',
    role: 'Administrador',
  });

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof Profile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
    // Limpar erro do campo ao editar
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!profile.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!profile.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(profile.email)) {
        newErrors.email = 'Email inválido';
      }
    }

    if (profile.bio.length > 500) {
      newErrors.bio = 'Biografia deve ter no máximo 500 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setSuccess(false);

    // Simular salvamento (em produção, chamar API)
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setEditing(false);

      // Ocultar mensagem de sucesso após 3 segundos
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }, 1000);
  };

  const handleCancel = () => {
    setEditing(false);
    setErrors({});
    // Restaurar valores originais se necessário
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Em produção, fazer upload para servidor
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((word) => word.charAt(0))
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <div className={styles.profileContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <Text as="h1" size="xl" weight="bold" color="primary">
            EDUCACROSS
          </Text>
          <Badge text="Admin" variant="info" size="sm" />
        </div>

        <nav className={styles.sidebarNav}>
          <a href="/backoffice/dashboard" className={styles.navItem}>
            <span className={styles.navIcon}>📊</span>
            <Text as="span" size="sm" weight="medium" color="default">
              Dashboard
            </Text>
          </a>
          <a href="/backoffice/usuarios" className={styles.navItem}>
            <span className={styles.navIcon}>👥</span>
            <Text as="span" size="sm" weight="medium" color="default">
              Usuários
            </Text>
          </a>
          <a href="/backoffice/jornadas" className={styles.navItem}>
            <span className={styles.navIcon}>🗺️</span>
            <Text as="span" size="sm" weight="medium" color="default">
              Jornadas
            </Text>
          </a>
          <a href="/backoffice/relatorios" className={styles.navItem}>
            <span className={styles.navIcon}>📈</span>
            <Text as="span" size="sm" weight="medium" color="default">
              Relatórios
            </Text>
          </a>
          <a href="/backoffice/perfil" className={`${styles.navItem} ${styles.active}`}>
            <span className={styles.navIcon}>⚙️</span>
            <Text as="span" size="sm" weight="medium" color="default">
              Perfil
            </Text>
          </a>
        </nav>

        <div className={styles.sidebarFooter}>
          <Button variant="ghost" size="sm">
            Sair
          </Button>
        </div>
      </aside>

      <main className={styles.profileMain}>
        <header className={styles.profileHeader}>
          <div>
            <Text as="h2" size="2xl" weight="bold" color="default">
              Gerenciamento de Perfil
            </Text>
            <Text as="p" size="sm" weight="normal" color="muted">
              Atualize suas informações pessoais e preferências
            </Text>
          </div>
          {!editing && (
            <Button variant="primary" size="md" onClick={() => setEditing(true)}>
              Editar Perfil
            </Button>
          )}
        </header>

        {success && (
          <div className={styles.successBanner} role="alert">
            <Text as="p" size="sm" weight="medium" color="success">
              ✅ Perfil atualizado com sucesso!
            </Text>
          </div>
        )}

        <div className={styles.profileContent}>
          <Card variant="elevated" padding="lg" className={styles.profileCard}>
            <div className={styles.avatarSection}>
              <div className={styles.avatarWrapper}>
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt={`Avatar de ${profile.name}`}
                    className={styles.avatarImage}
                  />
                ) : (
                  <div className={styles.avatarPlaceholder}>
                    <Text as="span" size="3xl" weight="bold" color="primary">
                      {getInitials(profile.name)}
                    </Text>
                  </div>
                )}
              </div>
              {editing && (
                <div className={styles.avatarUpload}>
                  <input
                    type="file"
                    id="avatar-upload"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className={styles.fileInput}
                  />
                  <label htmlFor="avatar-upload" className={styles.uploadLabel}>
                    <Button variant="outline" size="sm" as="span">
                      Alterar Foto
                    </Button>
                  </label>
                </div>
              )}
            </div>

            <form onSubmit={handleSave} className={styles.profileForm}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                  <Text as="span" size="sm" weight="medium" color="default">
                    Nome Completo
                  </Text>
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome completo"
                  value={profile.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  disabled={!editing || loading}
                  aria-label="Nome completo"
                  aria-required="true"
                />
                {errors.name && (
                  <Text as="span" size="xs" weight="normal" color="error">
                    {errors.name}
                  </Text>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  <Text as="span" size="sm" weight="medium" color="default">
                    Email
                  </Text>
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={profile.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  disabled={!editing || loading}
                  aria-label="Email"
                  aria-required="true"
                />
                {errors.email && (
                  <Text as="span" size="xs" weight="normal" color="error">
                    {errors.email}
                  </Text>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="role" className={styles.label}>
                  <Text as="span" size="sm" weight="medium" color="default">
                    Função
                  </Text>
                </label>
                <Input
                  id="role"
                  type="text"
                  value={profile.role}
                  disabled
                  aria-label="Função"
                />
                <Text as="span" size="xs" weight="normal" color="muted">
                  A função é definida pelo sistema e não pode ser alterada
                </Text>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="bio" className={styles.label}>
                  <Text as="span" size="sm" weight="medium" color="default">
                    Biografia
                  </Text>
                </label>
                <textarea
                  id="bio"
                  placeholder="Conte um pouco sobre você..."
                  value={profile.bio}
                  onChange={(e) => handleChange('bio', e.target.value)}
                  disabled={!editing || loading}
                  rows={4}
                  maxLength={500}
                  className={styles.textarea}
                  aria-label="Biografia"
                />
                <Text as="span" size="xs" weight="normal" color="muted">
                  {profile.bio.length}/500 caracteres
                </Text>
                {errors.bio && (
                  <Text as="span" size="xs" weight="normal" color="error">
                    {errors.bio}
                  </Text>
                )}
              </div>

              {editing && (
                <div className={styles.formActions}>
                  <Button
                    type="button"
                    variant="outline"
                    size="md"
                    onClick={handleCancel}
                    disabled={loading}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" variant="primary" size="md" disabled={loading}>
                    {loading ? 'Salvando...' : 'Salvar Alterações'}
                  </Button>
                </div>
              )}
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
}
