import React from 'react';
import { cn } from '../../lib/utils';

const Badge = ({ children, variant = 'blue', className }) => {
    const variants = {
        blue: 'bg-blue-100 text-blue-700',
        purple: 'bg-purple-100 text-purple-700',
        green: 'bg-green-100 text-green-700',
        yellow: 'bg-yellow-100 text-yellow-700',
    };

    return (
        <span className={cn("px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider", variants[variant], className)}>
            {children}
        </span>
    );
};

export default Badge;
