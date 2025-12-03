import React from 'react';
import './Radio.css';

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
      "Radio_radio",
      error && "Radio_error",
      className,
    ].filter(Boolean).join(' ');

    return (
      <div>
        <div className={"Radio_radioWrapper"}>
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
              className={`${"Radio_label"} ${disabled ? "Radio_disabled" : ''}`}
            >
              {label}
            </label>
          )}
        </div>
        {errorText && (
          <div id={`${radioId}-error`} className={"Radio_errorText"} role="alert">
            {errorText}
          </div>
        )}
        {!errorText && helperText && (
          <div id={`${radioId}-helper`} className={"Radio_helperText"}>
            {helperText}
          </div>
        )}
      </div>
    );
  }
);

Radio.displayName = 'Radio';
