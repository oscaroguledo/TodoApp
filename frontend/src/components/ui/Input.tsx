import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onDrag'> {
  label?: string;
  error?: string;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  clearable?: boolean;
  onClear?: () => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    label,
    error,
    helperText,
    startIcon,
    endIcon,
    clearable = false,
    onClear,
    className = '',
    value,
    ...props
  }, ref) => {
    const hasValue = value && value.toString().length > 0;
    const showClearButton = clearable && hasValue;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-slate-700 mb-1 sm:mb-1.5">
            {label}
          </label>
        )}
        
        <div className="relative">
          {startIcon && (
            <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 flex items-center pointer-events-none text-slate-400">
              {startIcon}
            </div>
          )}
          
          <motion.input
            ref={ref}
            className={`w-full px-2.5 sm:px-3 py-2 bg-white border rounded-lg text-sm sm:text-base text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              startIcon ? 'pl-8 sm:pl-10' : ''
            } ${
              endIcon || showClearButton ? 'pr-8 sm:pr-10' : ''
            } ${
              error ? 'border-red-300 focus:ring-red-500' : 'border-slate-300'
            } ${className}`}
            value={value}
            whileFocus={{ scale: 1.01 }}
            transition={{ duration: 0.1 }}
            {...(props as any)}
          />
          
          {(endIcon || showClearButton) && (
            <div className="absolute inset-y-0 right-0 flex items-center">
              {showClearButton && (
                <button
                  type="button"
                  onClick={onClear}
                  className="p-1 mr-1 sm:mr-2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X size={14} className="sm:w-4 sm:h-4" />
                </button>
              )}
              {endIcon && (
                <div className="pr-2.5 sm:pr-3 text-slate-400">
                  {endIcon}
                </div>
              )}
            </div>
          )}
        </div>
        
        {(error || helperText) && (
          <p className={`mt-1 sm:mt-1.5 text-xs sm:text-sm ${
            error ? 'text-red-600' : 'text-slate-500'
          }`}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
