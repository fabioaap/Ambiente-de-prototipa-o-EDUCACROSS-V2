'use client';

/**
 * Error Boundary Component for Studio
 * 
 * Catches unhandled errors and reports them to Sentry
 * while displaying a graceful error UI to the user.
 * 
 * Usage:
 * Wrap your component tree with this boundary:
 * <ErrorBoundary><YourApp /></ErrorBoundary>
 */

import React, { ReactNode, ReactElement } from 'react';
import * as Sentry from '@sentry/nextjs';
import { Button } from '@prototipo/design-system';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactElement;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorId: string | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorId: null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Capture error in Sentry
    const eventId = Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack,
        },
      },
    });

    this.setState({ errorId: eventId });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error);
      console.error('Component stack:', errorInfo.componentStack);
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorId: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <div className="w-full max-w-md">
            <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-red-900 dark:text-red-100 mb-2">
                Oops! Algo deu errado
              </h2>
              
              <p className="text-red-800 dark:text-red-200 mb-4 text-sm">
                Desculpe, encontramos um erro inesperado. O nosso time foi notificado e está investigando.
              </p>

              {this.state.errorId && (
                <div className="bg-red-100 dark:bg-red-900 rounded p-3 mb-4 font-mono text-xs text-red-900 dark:text-red-100 break-all">
                  <strong>Error ID:</strong> {this.state.errorId}
                </div>
              )}

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mb-4 bg-red-100 dark:bg-red-900 p-3 rounded text-xs text-red-900 dark:text-red-100">
                  <summary className="cursor-pointer font-semibold mb-2">
                    Detalhes do Erro (Dev)
                  </summary>
                  <pre className="overflow-auto whitespace-pre-wrap break-words">
                    {this.state.error.toString()}
                  </pre>
                </details>
              )}

              <div className="flex gap-2">
                <Button
                  onClick={this.handleReset}
                  className="flex-1"
                >
                  Tentar Novamente
                </Button>
                
                <Button
                  onClick={() => window.location.href = '/'}
                  variant="outline"
                  className="flex-1"
                >
                  Voltar ao Início
                </Button>
              </div>

              <p className="text-xs text-red-700 dark:text-red-300 mt-4">
                Se o problema persistir, entre em contato com o suporte usando o ID do erro acima.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
