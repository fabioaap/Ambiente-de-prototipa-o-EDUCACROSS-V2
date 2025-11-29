import React from 'react';
import './Select.css';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  error?: boolean;
  errorText?: string;
  required?: boolean;
  fullWidth?: boolean;
  options?: Array<{ value: string; label: string }>;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      helperText,
      error = false,
      errorText,
      required = false,
      fullWidth = true,
      options = [],
      className,
      id,
      children,
      ...props
    },
    ref
  ) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
    const selectClassName = [
      'Select_select',
      error && 'Select_error',
      className,
    ].filter(Boolean).join(' ');

    const renderSelect = () => (
      <select
        ref={ref}
        id={selectId}
        className={selectClassName}
        aria-invalid={error}
        aria-describedby={
          errorText
            ? `${selectId}-error`
            : helperText
            ? `${selectId}-helper`
            : undefined
        }
        aria-required={required}
        {...props}
      >
        {children || options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );

    if (!label && !helperText && !errorText) {
      return renderSelect();
    }

    return (
      <div className="Select_selectWrapper" style={{ width: fullWidth ? '100%' : 'auto' }}>
        {label && (
          <label
            htmlFor={selectId}
            className={`Select_label ${required ? 'Select_required' : ''}`}
          >
            {label}
          </label>
        )}
        {renderSelect()}
        {errorText && (
          <span id={`${selectId}-error`} className="Select_errorText" role="alert">
            {errorText}
          </span>
        )}
        {!errorText && helperText && (
          <span id={`${selectId}-helper`} className="Select_helperText">
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
