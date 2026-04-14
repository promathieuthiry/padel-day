import type {ComponentPropsWithoutRef, ElementType} from 'react'

type ContainerProps<T extends ElementType = 'div'> = {
  as?: T
  className?: string
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className'>

const BASE = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8'

export default function Container<T extends ElementType = 'div'>({
  as,
  className,
  ...props
}: ContainerProps<T>) {
  const Tag = (as ?? 'div') as ElementType
  return <Tag className={className ? `${BASE} ${className}` : BASE} {...props} />
}
