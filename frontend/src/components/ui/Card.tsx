import { motion } from 'framer-motion';
import { forwardRef } from 'react';

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrag'> {
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({
    variant = 'default',
    padding = 'md',
    hover = false,
    className = '',
    children,
    ...props
  }, ref) => {
    const variants = {
      default: 'bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700',
      outlined: 'bg-white border-2 border-slate-300 dark:bg-slate-800 dark:border-slate-600',
      elevated: 'bg-white border border-slate-200 shadow-lg dark:bg-slate-800 dark:border-slate-700'
    };

    const paddings = {
      none: '',
      sm: 'p-2 sm:p-3',
      md: 'p-3 sm:p-4',
      lg: 'p-4 sm:p-6'
    };

    return (
      <motion.div
        ref={ref}
        className={`rounded-xl transition-all ${variants[variant]} ${paddings[padding]} ${className} ${
          hover ? 'hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600' : ''
        }`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={hover ? { scale: 1.01 } : {}}
        {...(props as any)}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';
