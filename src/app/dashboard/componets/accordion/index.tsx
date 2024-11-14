'use client'

import { ReactNode, use } from 'react'
import { TaskContext } from '@/providers/taks'
import { Accordion } from '@/components/ui/accordion'

export const AccordionView = ({ children }: { children: ReactNode }) => {
  const { view, handleValueChange } = use(TaskContext)
  return (
    <Accordion
      type='single'
      collapsible
      className='w-full lg:w-auto min-w-80 flex-1 px-4'
      defaultValue='tasks'
      value={view}
      onValueChange={handleValueChange}>
      {children}
    </Accordion>
  )
}
