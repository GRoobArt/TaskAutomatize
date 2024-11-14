'use server'

import {
  QueryDatabaseParameters,
  UpdatePageParameters,
} from '@notionhq/client/build/src/api-endpoints'

import {
  findNotionPriorities,
  convertNotionByPriorities,
  convertNotionByPrioritiesUpdate,
} from '@/actions/notion/priorities'
import { notionUpdatePage } from '@/actions/notion/notion'

import { postHistory } from '@/actions/database/histories'
import { postPriority } from '@/actions/database/priorities'

export const downloadPriorities = async () => {
  try {
    const filter: QueryDatabaseParameters['filter'] = {
      property: 'DataBase',
      rich_text: {
        is_empty: true,
      },
    }

    const prioritiesNotion = await findNotionPriorities(undefined, filter)
    if (!prioritiesNotion) return null

    const data = await convertNotionByPriorities(prioritiesNotion)
    if (!data) return null

    data.forEach(async (priority) => {
      const res = await postPriority(priority)

      if (!res) return null

      const properties: UpdatePageParameters['properties'] = {
        DataBase: {
          rich_text: [
            {
              text: {
                content: res?.id as string,
              },
            },
          ],
        },
      }

      await notionUpdatePage(res.notion, properties)
    })

    await postHistory({
      name: 'PRIORITY',
      action: 'DOWNLOAD',
    })

    return true
  } catch (e: Error | any) {
    console.error(`Error DownloadPriorities: ${e.message}`)
    return null
  }
}
