import React from 'react';
import './HealthIndicator.css';

export type HealthStatus = 'success' | 'warning' | 'error' | 'info';

export interface HealthIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Title of the health indicator */
  title: string;
  /** Current value to display */
  value: string | number;
  /** Health status determining the color scheme */
  status: HealthStatus;
  /** Optional description or additional information */
  description?: string;
  /** Optional icon/emoji to display */
  icon?: string;
  /** Optional link URL for more details */
  href?: string;
  /** Optional size variant */
  size?: 'sm' | 'md' | 'lg';
}

export const HealthIndicator = React.forwardRef<HTMLDivElement, HealthIndicatorProps>(
  (
    {
      title,
      value,
      status = 'info',
      description,
      icon,
      href,
      size = 'md',
      className = '',
      ...props
    },
    ref
  ) => {
    const classNames = [
      "HealthIndicator_healthIndicator",
      `HealthIndicator_${status}`,
      `HealthIndicator_${size}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const content = (
      <div ref={ref} className={classNames} {...props}>
        <div className={"HealthIndicator_header"}>
          {icon && <span className={"HealthIndicator_icon"}>{icon}</span>}
          <span className={"HealthIndicator_title"}>{title}</span>
        </div>
        <div className={"HealthIndicator_content"}>
          <div className={"HealthIndicator_value"}>{value}</div>
          {description && <div className={"HealthIndicator_description"}>{description}</div>}
        </div>
        <div className={"HealthIndicator_statusIndicator"} />
      </div>
    );

    if (href) {
      return (
        <a 
          href={href} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={"HealthIndicator_link"}
          aria-label={`${title}: ${value}. Opens in new tab`}
        >
          {content}
        </a>
      );
    }

    return content;
  }
);

HealthIndicator.displayName = 'HealthIndicator';
