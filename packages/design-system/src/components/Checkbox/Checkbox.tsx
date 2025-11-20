import React from 'react';
import styles from './Checkbox.module.css';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  helperText?: string;
  error?: boolean;
  errorText?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
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
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
    const checkboxClassName = [
      styles.checkbox,
      error && styles.error,
      className,
    ].filter(Boolean).join(' ');

    return (
      <div>
        <div className={styles.checkboxWrapper}>
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className={checkboxClassName}
            aria-invalid={error}
            aria-describedby={
              errorText
                ? `${checkboxId}-error`
                : helperText
                ? `${checkboxId}-helper`
                : undefined
            }
            disabled={disabled}
            {...props}
          />
          {label && (
            <label
              htmlFor={checkboxId}
              className={`${styles.label} ${disabled ? styles.disabled : ''}`}
            >
              {label}
            </label>
          )}
        </div>
        {errorText && (
          <div id={`${checkboxId}-error`} className={styles.errorText} role="alert">
            {errorText}
          </div>
        )}
        {!errorText && helperText && (
          <div id={`${checkboxId}-helper`} className={styles.helperText}>
            {helperText}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
