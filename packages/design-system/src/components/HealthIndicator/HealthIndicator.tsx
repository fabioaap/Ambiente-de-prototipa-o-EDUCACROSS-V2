import React from 'react';
import styles from './HealthIndicator.module.css';

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
      styles.healthIndicator,
      styles[status],
      styles[size],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const content = (
      <div ref={ref} className={classNames} {...props}>
        <div className={styles.header}>
          {icon && <span className={styles.icon}>{icon}</span>}
          <span className={styles.title}>{title}</span>
        </div>
        <div className={styles.content}>
          <div className={styles.value}>{value}</div>
          {description && <div className={styles.description}>{description}</div>}
        </div>
        <div className={styles.statusIndicator} />
      </div>
    );

    if (href) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={styles.link}>
          {content}
        </a>
      );
    }

    return content;
  }
);

HealthIndicator.displayName = 'HealthIndicator';
