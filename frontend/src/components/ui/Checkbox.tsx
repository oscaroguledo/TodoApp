import { forwardRef } from 'react';
import { motion } from 'framer-motion';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onDrag'> {
  label?: string;
  error?: string;
  helperText?: string;
  indeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({
    label,
    error,
    helperText,
    indeterminate = false,
    className = '',
    checked,
    ...props
  }, ref) => {
    return (
      <div className="w-full">
        <div className="flex items-start">
          <div className="relative flex items-center">
            <motion.input
              ref={ref}
              type="checkbox"
              className="peer sr-only"
              checked={checked}
              {...(props as any)}
            />
            
            <motion.div
              className={`w-4 h-4 sm:w-5 sm:h-5 rounded border-2 cursor-pointer transition-all flex items-center justify-center ${
                checked
                  ? 'bg-blue-500 border-blue-500'
                  : 'border-slate-300 bg-white hover:border-slate-400'
              } ${error ? 'border-red-300' : ''} ${className}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const input = document.querySelector(`input[name="${props.name}"]`) as HTMLInputElement;
                if (input && !props.disabled) {
                  input.checked = !input.checked;
                  input.dispatchEvent(new Event('change', { bubbles: true }));
                }
              }}
            >
              <motion.svg
                width="10"
                height="10"
                viewBox="0 0 12 12"
                fill="none"
                initial={false}
                animate={{
                  scale: checked ? 1 : 0,
                  opacity: checked ? 1 : 0
                }}
                transition={{ duration: 0.1 }}
              >
                <path
                  d="M10 3L4.5 8.5L2 6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </motion.div>
          </div>
          
          {label && (
            <label
              htmlFor={props.id}
              className={`ml-3 text-sm font-medium cursor-pointer ${
                props.disabled
                  ? 'text-slate-400 cursor-not-allowed'
                  : 'text-slate-700'
              }`}
              onClick={(e) => {
                if (!props.disabled) {
                  const input = document.querySelector(`input[name="${props.name}"]`) as HTMLInputElement;
                  if (input) {
                    input.checked = !input.checked;
                    input.dispatchEvent(new Event('change', { bubbles: true }));
                  }
                }
              }}
            >
              {label}
            </label>
          )}
        </div>
        
        {(error || helperText) && (
          <p className={`mt-1.5 text-sm ${
            error ? 'text-red-600' : 'text-slate-500'
          }`}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
