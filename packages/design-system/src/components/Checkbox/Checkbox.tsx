import React from 'react';
import './Checkbox.css';

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
      "Checkbox_checkbox",
      error && "Checkbox_error",
      className,
    ].filter(Boolean).join(' ');

    return (
      <div>
        <div className={"Checkbox_checkboxWrapper"}>
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
              className={`${"Checkbox_label"} ${disabled ? "Checkbox_disabled" : ''}`}
            >
              {label}
            </label>
          )}
        </div>
        {errorText && (
          <div id={`${checkboxId}-error`} className={"Checkbox_errorText"} role="alert">
            {errorText}
          </div>
        )}
        {!errorText && helperText && (
          <div id={`${checkboxId}-helper`} className={"Checkbox_helperText"}>
            {helperText}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
