'use client';
import React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
    title?: string;
}

export const IconDashboard: React.FC<IconProps> = ({ size = 20, title, ...props }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden={!title}
        role={title ? 'img' : 'presentation'}
        {...props}
    >
        {title && <title>{title}</title>}
        <rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="11" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="3" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="11" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
);

export default IconDashboard;
