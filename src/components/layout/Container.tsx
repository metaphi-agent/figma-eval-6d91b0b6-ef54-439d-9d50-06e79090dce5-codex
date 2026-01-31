import React from 'react'
import clsx from 'clsx'

export function Container({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx('mx-auto w-full max-w-[1180px] px-5', className)}
      {...props}
    />
  )
}

