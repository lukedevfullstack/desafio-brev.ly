import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type ScrollableListProps = ComponentProps<'div'> & {
  children: React.ReactNode
}

export function ScrollableList({
  children,
  className,
  ...props
}: ScrollableListProps) {
  return (
    <div
      className={twMerge(
        'scrollbar scrollbar-thumb-blue-base scrollbar-track-blue-red max-h-[18.75rem] overflow-y-scroll md:max-h-[31.25rem]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
