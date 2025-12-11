'use client';
import React from 'react';
import { IconProps } from './Dashboard';

export const IconBook: React.FC<IconProps> = ({ size = 24, title, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden={!title} role={title ? 'img' : 'presentation'} {...props}>
        {title && <title>{title}</title>}
        <path d="M18 2H12V9L9.5 7.5L7 9V2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V4C20 2.9 19.1 2 18 2Z" fill="currentColor" />
    </svg>
);

export default IconBook;
