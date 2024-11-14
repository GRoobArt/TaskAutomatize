'use server'

import {
  QueryDatabaseParameters,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { notionGetDatabase } from '../notion'
import { priorityEnv } from '@/env'
import {
  PriorityDto,
  UpdatePriorityDto,
} from '@/actions/database/priorities/types'

export const findNotionPriorities = async (
  sorts?: QueryDatabaseParameters['sorts'],
  filter?: QueryDatabaseParameters['filter']
): Promise<QueryDatabaseResponse['results'] | null> => {
  const response = await notionGetDatabase(priorityEnv as string, sorts, filter)
  if (!response) return null
  return response.results
}

export const convertNotionByPriorities = async (
  data: QueryDatabaseResponse['results']
): Promise<PriorityDto[]> => {
  const res: PriorityDto[] = data.map((area: any) => {
    const properties = area.properties
    return {
      notion: area.id,
      name: properties.Nombre.title[0].plain_text,
      number: properties.Number.number,
    }
  })
  return res
}

export const convertNotionByPrioritiesUpdate = async (
  data: QueryDatabaseResponse['results']
): Promise<UpdatePriorityDto[]> => {
  const res: UpdatePriorityDto[] = data.map((area: any) => {
    const properties = area.properties
    return {
      notion: area.id,
      database: properties.DataBase.rich_text[0].plain_text,
      name: properties.Nombre.title[0].plain_text,
    }
  })
  return res
}
