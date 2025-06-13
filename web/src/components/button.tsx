import { ComponentProps } from 'react'
import { IconProps } from '@phosphor-icons/react'
import { twMerge } from 'tailwind-merge'

type ButtonRootProps = ComponentProps<'button'>

function Root({ className, children, ...props }: ButtonRootProps) {
  return (
    <button
      {...props}
      className={twMerge(
        'hover:border-blue-base mr-2 flex cursor-pointer flex-row items-center gap-2 rounded-sm border border-transparent bg-gray-200 p-2 transition-colors duration-300 hover:border disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-transparent',
        className
      )}
    >
      {children}
    </button>
  )
}

type ButtonIconProps = {
  icon: React.ElementType<IconProps>
} & IconProps

function Icon({ icon: IconComponent, ...props }: ButtonIconProps) {
  return <IconComponent {...props} />
}

type ButtonLabelProps = ComponentProps<'span'>

function Label({ children, className, ...props }: ButtonLabelProps) {
  return (
    <span
      className={twMerge('text-sm font-semibold text-gray-600', className)}
      {...props}
    >
      {children}
    </span>
  )
}

Root.Icon = Icon
Root.Label = Label

Label.displayName = 'Button.Label'
Icon.displayName = 'Button.Icon'
Root.displayName = 'Button.Root'

export const Button = {
  Root,
  Icon,
  Label,
}
