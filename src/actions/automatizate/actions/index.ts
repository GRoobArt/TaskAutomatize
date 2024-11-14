'use server'

import {
  QueryDatabaseParameters,
  UpdatePageParameters,
} from '@notionhq/client/build/src/api-endpoints'

import {
  findNotionActions,
  convertNotionByActions,
  convertNotionByActionsUpdate,
} from '@/actions/notion/actions'
import { notionUpdatePage } from '@/actions/notion/notion'

import { postAction, updateAction } from '@/actions/database/actions'
import { postHistory } from '@/actions/database/histories'

export const downloadActions = async () => {
  try {
    const filter: QueryDatabaseParameters['filter'] = {
      property: 'DataBase',
      rich_text: {
        is_empty: true,
      },
    }

    const actionsNotion = await findNotionActions(undefined, filter)

    if (!actionsNotion) return null

    const data = await convertNotionByActions(actionsNotion)

    if (!data) return null

    data.forEach(async (action) => {
      const res = await postAction(action)

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
      name: 'ACTION',
      action: 'DOWNLOAD',
    })

    return true
  } catch (e: Error | any) {
    console.error(`Error DownloadActions: ${e.message}`)
    return false
  }
}

export const updateDatabaseActions = async () => {
  try {
    const filter: QueryDatabaseParameters['filter'] = {
      property: 'DataBase',
      rich_text: {
        is_not_empty: true,
      },
    }

    const response = await findNotionActions(undefined, filter)

    if (!response) return null

    const data = await convertNotionByActionsUpdate(response)

    if (!data) return null

    data.forEach(async (action) => {
      const id = action.database as string
      delete action.database
      await updateAction(id, action)
    })

    await postHistory({
      name: 'ACTION',
      action: 'UPDATE',
    })

    return true
  } catch (e: Error | any) {
    console.log('Error updateDatabaseActions: ', e.message)
    return false
  }
}
