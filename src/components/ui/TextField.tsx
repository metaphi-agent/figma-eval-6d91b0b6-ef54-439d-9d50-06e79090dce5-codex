import React from 'react'
import clsx from 'clsx'

export type TextFieldProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size'
> & {
  label: string
  error?: string
}

export function TextField({ label, error, className, id, ...props }: TextFieldProps) {
  const generatedId = React.useId()
  const inputId = id ?? generatedId
  const errorId = `${inputId}-error`

  return (
    <label className={clsx('block text-white', className)} htmlFor={inputId}>
      <span className="block text-[18px] font-medium">{label}</span>
        <input
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={clsx(
          'mt-3 h-[70px] w-full rounded-[10px] bg-white px-6 text-[16px] text-[--color-ink] outline-none',
          'placeholder:text-black/35',
          'focus:ring-2 focus:ring-[color:color-mix(in_oklab,var(--color-primary),transparent_50%)]',
          error && 'ring-2 ring-red-500/70'
        )}
        {...props}
      />
      {error ? (
        <span id={errorId} className="mt-2 block text-sm text-red-300">
          {error}
        </span>
      ) : null}
    </label>
  )
}
