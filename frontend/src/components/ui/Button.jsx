import React from 'react';
import { cn } from '../../lib/utils';

const Button = ({ children, variant = 'primary', className, ...props }) => {
    const variants = {
        primary: 'bg-brand-blue text-white shadow-brand-blue/30',
        secondary: 'bg-brand-purple text-white shadow-brand-purple/30',
        outline: 'border-2 border-slate-200 text-slate-600 hover:border-brand-blue hover:text-brand-blue',
        ghost: 'text-slate-600 hover:bg-slate-100',
    };

    return (
        <button
            className={cn(
                "px-5 py-2.5 rounded-xl font-medium transition-all duration-200 shadow-sm flex items-center justify-center gap-2 active:scale-95",
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
