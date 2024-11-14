'use server'

import {
  QueryDatabaseParameters,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { notionGetDatabase } from '../notion'
import { actionEnv } from '@/env'
import { ActionDto, UpdateActionDto } from '@/actions/database/actions/types'

export const findNotionActions = async (
  sorts?: QueryDatabaseParameters['sorts'],
  filter?: QueryDatabaseParameters['filter']
): Promise<QueryDatabaseResponse['results'] | null> => {
  const response = await notionGetDatabase(actionEnv as string, sorts, filter)
  if (!response) return null
  return response.results
}

export const convertNotionByActions = async (
  data: QueryDatabaseResponse['results']
): Promise<ActionDto[]> => {
  const res: ActionDto[] = data.map((action: any) => {
    const properties = action.properties
    return {
      name: properties.Nombre.title[0].plain_text,
      notion: action.id,
    }
  })
  return res
}

export const convertNotionByActionsUpdate = async (
  data: QueryDatabaseResponse['results']
): Promise<UpdateActionDto[]> => {
  const res: UpdateActionDto[] = data.map((action: any) => {
    const properties = action.properties
    return {
      database: properties.DataBase.rich_text[0].plain_text,
      name: properties.Nombre.title[0].plain_text,
    }
  })
  return res
}
