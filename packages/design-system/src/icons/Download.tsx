'use client';
import React from 'react';
import { IconProps } from './Dashboard';

export const IconDownload: React.FC<IconProps> = ({ size = 24, title, ...props }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden={!title} role={title ? 'img' : 'presentation'} {...props}>
        {title && <title>{title}</title>}
        <path d="M19 9H15V3H9V9H5L12 16L19 9ZM11 11V5H13V11H14.17L12 13.17L9.83 11H11ZM5 18H19V20H5V18Z" fill="currentColor" />
    </svg>
);

export default IconDownload;
