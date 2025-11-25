'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

const buttonVariants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
    destructive: 'bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
    outline: 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
    ghost: 'hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
};

const sizeVariants = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
};

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: keyof typeof buttonVariants;
    size?: keyof typeof sizeVariants;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => (
        <button
            className={cn(
                'inline-flex items-center justify-center rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
                buttonVariants[variant],
                sizeVariants[size],
                className
            )}
            ref={ref}
            {...props}
        />
    )
);
Button.displayName = 'Button';

export { Button, buttonVariants, sizeVariants };
