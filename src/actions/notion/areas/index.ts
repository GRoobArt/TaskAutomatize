'use server'

import {
  QueryDatabaseParameters,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { notionGetDatabase } from '../notion'
import { AreaDto, UpdateAreaDto } from '@/actions/database/areas/types'
import { areaEnv } from '@/env'

export const findNotionAreas = async (
  sorts?: QueryDatabaseParameters['sorts'],
  filter?: QueryDatabaseParameters['filter']
): Promise<QueryDatabaseResponse['results'] | null> => {
  const response = await notionGetDatabase(areaEnv as string, sorts, filter)
  if (!response) return null
  return response.results
}

export const convertNotionByAreas = async (
  data: QueryDatabaseResponse['results']
): Promise<AreaDto[]> => {
  const res: AreaDto[] = data.map((area: any) => {
    const properties = area.properties
    return {
      name: properties.Nombre.title[0].plain_text,
      notion: area.id,
    }
  })
  return res
}

export const convertNotionByAreasUpdate = async (
  data: QueryDatabaseResponse['results']
): Promise<UpdateAreaDto[]> => {
  const res: UpdateAreaDto[] = data.map((area: any) => {
    const properties = area.properties
    return {
      database: properties.DataBase.rich_text[0].plain_text,
      name: properties.Nombre.title[0].plain_text,
    }
  })
  return res
}
