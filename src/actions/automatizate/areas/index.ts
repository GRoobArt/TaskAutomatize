'use server'

import {
  QueryDatabaseParameters,
  UpdatePageParameters,
} from '@notionhq/client/build/src/api-endpoints'

import {
  findNotionAreas,
  convertNotionByAreas,
  convertNotionByAreasUpdate,
} from '@/actions/notion/areas'
import { notionUpdatePage } from '@/actions/notion/notion'

import { postHistory } from '@/actions/database/histories'
import { postArea, putArea } from '@/actions/database/areas'

export const downloadAreas = async () => {
  try {
    const filter: QueryDatabaseParameters['filter'] = {
      property: 'DataBase',
      rich_text: {
        is_empty: true,
      },
    }

    const response = await findNotionAreas(undefined, filter)

    if (!response) return null

    const data = await convertNotionByAreas(response)

    if (!data) return null

    data.forEach(async (area) => {
      const res = await postArea(area)

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
      name: 'AREAS',
      action: 'DOWNLOAD',
    })

    return true
  } catch (e: Error | any) {
    console.error(`Error DownloadAreas: ${e.message}`)

    return false
  }
}

export const updateDatabaseAreas = async () => {
  try {
    const filter: QueryDatabaseParameters['filter'] = {
      property: 'DataBase',
      rich_text: {
        is_not_empty: true,
      },
    }

    const response = await findNotionAreas(undefined, filter)

    if (!response) return null

    const data = await convertNotionByAreasUpdate(response)

    if (!data) return null

    data.forEach(async (area) => {
      const id = area.database as string
      delete area.database
      await putArea(id, area)
    })

    await postHistory({
      name: 'AREAS',
      action: 'UPDATE',
    })

    return true
  } catch (e: Error | any) {
    console.error(`Error UpdateAreas: ${e.message}`)
    return false
  }
}
