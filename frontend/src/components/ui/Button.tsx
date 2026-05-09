import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import Spinner from './Spinner';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size    = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: ReactNode;
  children: ReactNode;
  fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950 ' +
    'focus:ring-slate-900 border-transparent',
  secondary:
    'bg-white text-slate-700 hover:bg-slate-50 active:bg-slate-100 ' +
    'focus:ring-slate-300 border-slate-200',
  ghost:
    'bg-transparent text-slate-600 hover:bg-slate-100 active:bg-slate-200 ' +
    'focus:ring-slate-200 border-transparent',
  danger:
    'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 ' +
    'focus:ring-red-500 border-transparent',
};

const sizeClasses: Record<Size, string> = {
  sm: 'text-xs px-3 py-1.5 gap-1.5',
  md: 'text-sm px-4 py-2.5 gap-2',
  lg: 'text-sm px-5 py-3 gap-2',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  children,
  fullWidth = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      disabled={isDisabled}
      className={[
        'inline-flex items-center justify-center font-medium rounded border',
        'focus:outline-none focus:ring-2 focus:ring-offset-1',
        'transition-colors duration-150',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {loading ? (
        <Spinner size={size === 'sm' ? 'xs' : 'sm'} />
      ) : (
        icon && <span className="shrink-0">{icon}</span>
      )}
      <span>{children}</span>
    </button>
  );
}
