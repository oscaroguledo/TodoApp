import { forwardRef, useState } from 'react';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
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
    onChange,
    disabled,
    ...props
  }, ref) => {
    const [isChecked, setIsChecked] = useState(checked || false);
    
    const handleClick = () => {
      if (disabled) return;
      const newValue = !isChecked;
      setIsChecked(newValue);
      // Trigger onChange with synthetic event-like object
      if (onChange) {
        const syntheticEvent = {
          target: { checked: newValue },
          currentTarget: { checked: newValue }
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
      }
    };

    return (
      <div className="w-full">
        <div className="flex items-start">
          <div className="relative flex items-center">
            <input
              ref={ref}
              type="checkbox"
              className="peer sr-only"
              checked={checked !== undefined ? checked : isChecked}
              onChange={onChange}
              disabled={disabled}
              {...props}
            />
            
            <div
              className={`w-4 h-4 sm:w-5 sm:h-5 rounded border-2 cursor-pointer transition-all flex items-center justify-center ${
                (checked !== undefined ? checked : isChecked)
                  ? 'bg-blue-500 border-blue-500'
                  : 'border-slate-300 bg-white hover:border-slate-400'
              } ${error ? 'border-red-300' : ''} ${className}`}
              onClick={handleClick}
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 12 12"
                fill="none"
                className={`transition-all ${(checked !== undefined ? checked : isChecked) ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
              >
                <path
                  d="M10 3L4.5 8.5L2 6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          
          {label && (
            <label
              htmlFor={props.id}
              className={`ml-3 text-sm font-medium cursor-pointer ${
                disabled
                  ? 'text-slate-400 cursor-not-allowed'
                  : 'text-slate-700'
              }`}
              onClick={handleClick}
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
