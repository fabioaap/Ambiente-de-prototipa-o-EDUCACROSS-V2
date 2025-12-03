import React from 'react';
import './Switch.css';

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
      "Switch_switch",
      error && "Switch_error",
      className,
    ].filter(Boolean).join(' ');

    return (
      <div>
        <div className={"Switch_switchWrapper"}>
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
              className={`${"Switch_label"} ${disabled ? "Switch_disabled" : ''}`}
            >
              {label}
            </label>
          )}
        </div>
        {errorText && (
          <div id={`${switchId}-error`} className={"Switch_errorText"} role="alert">
            {errorText}
          </div>
        )}
        {!errorText && helperText && (
          <div id={`${switchId}-helper`} className={"Switch_helperText"}>
            {helperText}
          </div>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';
