'use client';

import React, { useState } from 'react';
import { Button, Input, Text, Card } from '@prototipo/design-system';
import styles from './admin-workflow.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validação básica
    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      setLoading(false);
      return;
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor, insira um email válido');
      setLoading(false);
      return;
    }

    // Validação de senha (mínimo 6 caracteres)
    if (password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres');
      setLoading(false);
      return;
    }

    // Simular autenticação (em produção, chamar API)
    setTimeout(() => {
      // Mock: aceitar qualquer email com senha válida
      if (email && password.length >= 6) {
        // Redirecionar para dashboard
        window.location.href = '/backoffice/dashboard';
      } else {
        setError('Credenciais inválidas');
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <Card variant="elevated" padding="lg">
          <div className={styles.loginHeader}>
            <Text as="h1" size="3xl" weight="bold" color="primary">
              EDUCACROSS
            </Text>
            <Text as="h2" size="xl" weight="medium" color="default">
              BackOffice Admin
            </Text>
            <Text as="p" size="base" weight="normal" color="muted">
              Faça login para acessar o painel administrativo
            </Text>
          </div>

          <form onSubmit={handleSubmit} className={styles.loginForm}>
            {error && (
              <div className={styles.errorBanner} role="alert">
                <Text as="p" size="sm" weight="medium" color="error">
                  ⚠️ {error}
                </Text>
              </div>
            )}

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                aria-label="Email"
                aria-required="true"
                autoComplete="email"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>
                <Text as="span" size="sm" weight="medium" color="default">
                  Senha
                </Text>
              </label>
              <div className={styles.passwordWrapper}>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  aria-label="Senha"
                  aria-required="true"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className={styles.togglePassword}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  disabled={loading}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            <div className={styles.formActions}>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={loading}
                className={styles.submitButton}
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
            </div>

            <div className={styles.formFooter}>
              <a href="/recuperar-senha" className={styles.forgotLink}>
                <Text as="span" size="sm" weight="normal" color="primary">
                  Esqueceu sua senha?
                </Text>
              </a>
            </div>
          </form>
        </Card>
      </div>

      <div className={styles.loginFooter}>
        <Text as="p" size="xs" weight="normal" color="muted">
          © 2025 EDUCACROSS. Todos os direitos reservados.
        </Text>
      </div>
    </div>
  );
}
