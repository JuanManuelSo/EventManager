type Size = 'xs' | 'sm' | 'md' | 'lg';

const sizeMap: Record<Size, string> = {
  xs: 'w-3 h-3 border',
  sm: 'w-4 h-4 border-[1.5px]',
  md: 'w-5 h-5 border-2',
  lg: 'w-6 h-6 border-2',
};

interface SpinnerProps {
  size?: Size;
  className?: string;
}

export default function Spinner({ size = 'md', className = '' }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label="Cargando"
      className={[
        sizeMap[size],
        'rounded-full border-current border-t-transparent animate-spin opacity-70',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    />
  );
}
