import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { ViewPendings } from './pendings'
import { ViewTasks } from './tasks'

export const TaskItems = () => {
  return (
    <>
      <AccordionItem value='pendings'>
        <AccordionTrigger className='px-2'>
          <h3>Guardadas</h3>
        </AccordionTrigger>
        <AccordionContent>
          <ViewPendings />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='tasks'>
        <AccordionTrigger className='px-2'>
          <h3>Tareas</h3>
        </AccordionTrigger>
        <AccordionContent>
          <ViewTasks />
        </AccordionContent>
      </AccordionItem>
    </>
  )
}
