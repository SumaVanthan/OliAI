import React from 'react';
import { motion } from 'framer-motion';

const variants = {
    primary: `
        relative overflow-hidden
        btn-primary-theme
        font-bold tracking-wide
    `,
    secondary: `
        btn-secondary-theme
    `,
    glass: `
        bg-white/80 text-brand-900
        backdrop-blur-md
        border border-brand-200
        hover:bg-white
        hover:shadow-md
    `
};

function Button({
    children,
    variant = 'primary',
    size = 'md',
    icon: Icon,
    iconPosition = 'right',
    className = '',
    ...props
}) {
    const sizeClasses = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg'
    };

    return (
        <motion.button
            className={`
                inline-flex items-center justify-center gap-2
                font-heading font-semibold
                rounded-xl
                transition-all duration-300
                cursor-pointer
                ${sizeClasses[size]}
                ${variants[variant]}
                ${className}
            `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            {...props}
        >
            {Icon && iconPosition === 'left' && <Icon size={size === 'sm' ? 16 : 20} />}
            <span className="relative z-10">{children}</span>
            {Icon && iconPosition === 'right' && <Icon size={size === 'sm' ? 16 : 20} />}
        </motion.button>
    );
}

export default Button;
