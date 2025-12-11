'use client';
import React from 'react';
import { IconProps } from './Dashboard';

export const IconFlag: React.FC<IconProps> = ({ size = 24, title, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden={!title} role={title ? 'img' : 'presentation'} {...props}>
        {title && <title>{title}</title>}
        <path d="M14 6L13 4H5V21H7V14H12L13 16H20V6H14Z" fill="currentColor" />
    </svg>
);

export default IconFlag;
