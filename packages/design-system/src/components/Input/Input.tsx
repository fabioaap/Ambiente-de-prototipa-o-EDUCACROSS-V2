import React from 'react';
import styles from './Input.module.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: boolean;
  errorText?: string;
  required?: boolean;
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error = false,
      errorText,
      required = false,
      fullWidth = true,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const inputClassName = [
      styles.input,
      error && styles.error,
      className,
    ].filter(Boolean).join(' ');

    const renderInput = () => (
      <input
        ref={ref}
        id={inputId}
        className={inputClassName}
        aria-invalid={error}
        aria-describedby={
          errorText
            ? `${inputId}-error`
            : helperText
            ? `${inputId}-helper`
            : undefined
        }
        aria-required={required}
        {...props}
      />
    );

    if (!label && !helperText && !errorText) {
      return renderInput();
    }

    return (
      <div className={styles.inputWrapper} style={{ width: fullWidth ? '100%' : 'auto' }}>
        {label && (
          <label
            htmlFor={inputId}
            className={`${styles.label} ${required ? styles.required : ''}`}
          >
            {label}
          </label>
        )}
        {renderInput()}
        {errorText && (
          <span id={`${inputId}-error`} className={styles.errorText} role="alert">
            {errorText}
          </span>
        )}
        {!errorText && helperText && (
          <span id={`${inputId}-helper`} className={styles.helperText}>
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
