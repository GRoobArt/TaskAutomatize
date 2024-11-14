import { AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { TableProject } from '../tabla'

export const ProjectItem = () => {
  return (
    <AccordionItem value='projects'>
      <AccordionTrigger className='px-2'>Proyectos</AccordionTrigger>
      <TableProject />
    </AccordionItem>
  )
}
