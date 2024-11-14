import { cn } from '@/lib/utils'
import { clsx } from 'clsx'
import { forwardRef } from 'react'

interface ColumnBoardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  view: boolean
  value: string
  color: string
  children?: React.ReactNode
}

export const ColumnBoard = forwardRef<HTMLDivElement, ColumnBoardProps>(
  ({ name, view, color, children, onClick }, ref, ...props) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded max-w-full flex-1 flex flex-col w-full gap-2 relative',
          clsx(
            view
              ? `bg-${color} min-w-72 lg:max-w-80 py-2 px-4`
              : 'bg-transparent'
          )
        )}
        {...props}>
        <p
          onClick={onClick}
          className={cn(
            'w-fit font-bold capitalize flex justify-start items-center gap-2 cursor-pointer pl-2 min-w-32',
            `text-${color}-foreground`
          )}>
          {name.toLowerCase()}
        </p>
        {children && view && (
          <div className='overflow-auto flex lg:flex-col flex-row gap-2 pb-4 items-start'>
            {children}
          </div>
        )}
      </div>
    )
  }
)
ColumnBoard.displayName = 'ColumnBoard'
