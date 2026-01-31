import React from 'react'
import clsx from 'clsx'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'md' | 'lg'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  isLoading,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading

  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center gap-2 font-medium',
        'select-none whitespace-nowrap outline-none',
        'transition-colors duration-150',
        'focus-visible:ring-2 focus-visible:ring-[color:color-mix(in_oklab,var(--color-primary),transparent_60%)] focus-visible:ring-offset-2 focus-visible:ring-offset-white',
        size === 'lg' && 'h-[62px] px-[30px] rounded-[40px] text-[18px]',
        size === 'md' && 'h-10 px-4 rounded-[10px] text-[16px]',
        variant === 'primary' && [
          'bg-[--color-primary] text-white',
          'hover:bg-[color-mix(in_oklab,var(--color-primary),black_10%)]',
          'active:bg-[color-mix(in_oklab,var(--color-primary),black_16%)]'
        ],
        variant === 'secondary' && [
          'bg-white text-[--color-ink] border border-[--color-line]',
          'hover:bg-[--color-soft]'
        ],
        variant === 'ghost' && [
          'bg-transparent text-[--color-ink]',
          'hover:bg-black/5 active:bg-black/10'
        ],
        isDisabled && 'opacity-60 pointer-events-none',
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <span
            aria-hidden="true"
            className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
          />
          <span>{children}</span>
        </span>
      ) : (
        children
      )}
    </button>
  )
}
