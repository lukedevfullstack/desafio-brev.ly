import { Warning } from '@phosphor-icons/react'
import React, { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type RootProps = ComponentProps<'div'>

function Root({ children, ...props }: RootProps) {
  return (
    <div className="group mb-2" {...props}>
      {children}
    </div>
  )
}

type InputProps = ComponentProps<'input'> & {
  children?: React.ReactNode
  divProps?: ComponentProps<'div'>
  hasError?: boolean
}

function InputField({
  className,
  children,
  divProps,
  hasError,
  ...props
}: InputProps) {
  return (
    <div
      data-error={hasError}
      className={twMerge(
        'data-[error=true]:border-danger group-focus-within:border-blue-base flex flex-row rounded-md border border-gray-300 p-4 transition-colors duration-300',
        divProps?.className
      )}
    >
      {children && children}
      <input
        className={twMerge(
          'group w-full text-gray-600 placeholder:text-gray-400 focus-visible:outline-none',
          className
        )}
        {...props}
      />
    </div>
  )
}

type LabelProps = ComponentProps<'label'> & {
  hasError?: boolean
}

function Label({ children, className, hasError, ...props }: LabelProps) {
  return (
    <label
      data-error={hasError}
      className={twMerge(
        'group-focus-within:text-blue-base data-[error=true]:text-danger mb-2 text-xs text-gray-500 uppercase transition-colors duration-300',
        className
      )}
      {...props}
    >
      {children}
    </label>
  )
}

type PlaceholderProps = ComponentProps<'span'>

function Placeholder({ children, className, ...props }: PlaceholderProps) {
  return (
    <span className={className} {...props}>
      {children}
    </span>
  )
}

type ErrorMessageProps = ComponentProps<'span'>

function ErrorMessage({ children, className, ...props }: ErrorMessageProps) {
  return (
    <span
      className={twMerge(
        'mt-2 mb-2 flex flex-row gap-2 text-sm text-gray-500',
        className
      )}
      {...props}
    >
      <Warning width={16} height={16} className="text-danger" />
      {children}
    </span>
  )
}

Root.Input = InputField
Root.Label = Label
Root.Placeholder = Placeholder
Root.ErrorMessage = ErrorMessage

Root.displayName = 'Input.Root'
InputField.displayName = 'Input.Field'
Label.displayName = 'Input.Label'
Placeholder.displayName = 'Input.Placeholder'
ErrorMessage.displayName = 'Input.ErrorMessage'

export const Input = { Root, InputField, Label, Placeholder, ErrorMessage }
