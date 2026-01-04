import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

const Card = ({ children, className, hover = false, ...props }) => {
    return (
        <motion.div
            whileHover={hover ? { y: -5 } : {}}
            className={cn("bg-white rounded-2xl border border-slate-200 shadow-sm p-6", className)}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Card;
