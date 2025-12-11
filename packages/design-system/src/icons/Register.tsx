'use client';
import React from 'react';
import { IconProps } from './Dashboard';

export const IconRegister: React.FC<IconProps> = ({ size = 24, title, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden={!title} role={title ? 'img' : 'presentation'} {...props}>
        {title && <title>{title}</title>}
        <path d="M9 17L4 12L5.41 10.59L9 14.17L18.59 4.58L20 6L9 17Z" fill="currentColor" />
        <path d="M19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19Z" fill="currentColor" />
    </svg>
);

export default IconRegister;
