import { forwardRef } from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { label: string; value: string }[];
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, className = '', ...props }, ref) => {
    return (
      <div className="space-y-2 w-full">
        {label && (
          <label className="text-xs uppercase tracking-wider font-semibold text-[var(--on-surface-variant)]">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={`w-full bg-[var(--surface-container)] text-[var(--on-surface)] rounded-full px-5 py-3 outline-none focus:ring-1 focus:ring-[var(--primary)] transition-all appearance-none cursor-pointer ${
            error ? 'border border-red-500 focus:ring-red-500' : 'border border-transparent'
          } ${className}`}
          {...props}
        >
          {options.map((opt) => (
             <option key={opt.value} value={opt.value}>
               {opt.label}
             </option>
          ))}
        </select>
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
