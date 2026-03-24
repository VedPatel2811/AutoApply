import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="space-y-2 w-full">
        {label && (
          <label className="text-xs uppercase tracking-wider font-semibold text-[var(--on-surface-variant)]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full bg-[var(--surface-container)] text-[var(--on-surface)] rounded-full px-5 py-3 outline-none focus:ring-1 focus:ring-[var(--primary)] transition-all ${
            error ? 'border border-red-500 focus:ring-red-500' : 'border border-transparent'
          } ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
