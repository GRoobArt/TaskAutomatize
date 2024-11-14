import { PageLayout } from '@/app/dashboard/componets/page'
import { getSession } from '@/lib/auth'
import { getUser } from '@/actions/database/users'
import { TaskItems } from '@/components/task/item'
import { AccordionView } from './componets/accordion'
import { ProjectItem } from '@/components/projects'

export default async function Dashboard() {
  const session = await getSession()
  const user = await getUser(session?.user?.email as string)
  const limit = ['JEFATURA', 'GERENCIA']

  return (
    <PageLayout>
      <AccordionView>
        {limit.includes(user?.work as string) ? <ProjectItem /> : null}
        <TaskItems />
      </AccordionView>
    </PageLayout>
  )
}
