import React from 'react';
import styles from './Radio.module.css';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  helperText?: string;
  error?: boolean;
  errorText?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      label,
      helperText,
      error = false,
      errorText,
      className,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;
    const radioClassName = [
      styles.radio,
      error && styles.error,
      className,
    ].filter(Boolean).join(' ');

    return (
      <div>
        <div className={styles.radioWrapper}>
          <input
            ref={ref}
            type="radio"
            id={radioId}
            className={radioClassName}
            aria-invalid={error}
            aria-describedby={
              errorText
                ? `${radioId}-error`
                : helperText
                ? `${radioId}-helper`
                : undefined
            }
            disabled={disabled}
            {...props}
          />
          {label && (
            <label
              htmlFor={radioId}
              className={`${styles.label} ${disabled ? styles.disabled : ''}`}
            >
              {label}
            </label>
          )}
        </div>
        {errorText && (
          <div id={`${radioId}-error`} className={styles.errorText} role="alert">
            {errorText}
          </div>
        )}
        {!errorText && helperText && (
          <div id={`${radioId}-helper`} className={styles.helperText}>
            {helperText}
          </div>
        )}
      </div>
    );
  }
);

Radio.displayName = 'Radio';
