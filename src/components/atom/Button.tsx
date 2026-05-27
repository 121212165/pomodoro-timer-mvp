interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'icon'
  size?: 'sm' | 'md' | 'lg' | 'icon'
}

export default function Button({ variant = 'primary', size = 'md', className = '', ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-xl font-medium transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer'
  const variants = {
    primary: 'text-white shadow-md hover:shadow-lg',
    ghost: 'hover:opacity-80',
    icon: 'rounded-full hover:opacity-80',
  }
  const sizes = {
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
    icon: 'h-10 w-10',
  }
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      style={variant === 'primary' ? { backgroundColor: 'var(--color-primary)' } : undefined}
      {...props}
    />
  )
}
