'use client';
import React from 'react';
import { IconProps } from './Dashboard';

export const IconChart: React.FC<IconProps> = ({ size = 24, title, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden={!title} role={title ? 'img' : 'presentation'} {...props}>
        {title && <title>{title}</title>}
        <path d="M11 2V22C5.5 22 2 18.5 2 13C2 8 5 4 11 2ZM13 2C18.5 2 22 5.5 22 11C22 16 18 20 13 22V2ZM13 4V11.5L19.5 13C19 9 16.5 5.5 13 4Z" fill="currentColor" />
    </svg>
);

export default IconChart;
