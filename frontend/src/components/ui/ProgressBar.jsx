import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

const ProgressBar = ({ value, max = 100, color = 'bg-brand-blue', className }) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    return (
        <div className={cn("h-3 bg-slate-100 rounded-full overflow-hidden", className)}>
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={cn("h-full rounded-full", color)}
            />
        </div>
    );
};

export default ProgressBar;
