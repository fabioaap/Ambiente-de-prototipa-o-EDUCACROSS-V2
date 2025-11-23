import React from 'react';
import styles from './Switch.module.css';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  helperText?: string;
  error?: boolean;
  errorText?: string;
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
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
    const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;
    const switchClassName = [
      styles.switch,
      error && styles.error,
      className,
    ].filter(Boolean).join(' ');

    return (
      <div>
        <div className={styles.switchWrapper}>
          <input
            ref={ref}
            type="checkbox"
            role="switch"
            id={switchId}
            className={switchClassName}
            aria-checked={props.checked ?? false}
            aria-invalid={error}
            aria-describedby={
              errorText
                ? `${switchId}-error`
                : helperText
                ? `${switchId}-helper`
                : undefined
            }
            disabled={disabled}
            {...props}
          />
          {label && (
            <label
              htmlFor={switchId}
              className={`${styles.label} ${disabled ? styles.disabled : ''}`}
            >
              {label}
            </label>
          )}
        </div>
        {errorText && (
          <div id={`${switchId}-error`} className={styles.errorText} role="alert">
            {errorText}
          </div>
        )}
        {!errorText && helperText && (
          <div id={`${switchId}-helper`} className={styles.helperText}>
            {helperText}
          </div>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';
