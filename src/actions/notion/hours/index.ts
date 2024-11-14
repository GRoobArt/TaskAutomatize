'use server'

import {
  QueryDatabaseParameters,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { notionGetDatabase } from '../notion'
import { estimateEnv } from '@/env'
import { HourDto, UpdateHourDto } from '@/actions/database/hours/types'

export const findNotionAreas = async (
  sorts?: QueryDatabaseParameters['sorts'],
  filter?: QueryDatabaseParameters['filter']
): Promise<QueryDatabaseResponse['results'] | null> => {
  const response = await notionGetDatabase(estimateEnv as string, sorts, filter)
  if (!response) return null
  return response.results
}

export const convertNotionByAreas = async (
  data: QueryDatabaseResponse['results']
): Promise<HourDto[]> => {
  const res: HourDto[] = data.map((area: any) => {
    const properties = area.properties
    return {
      notion: area.id,
      name: properties.Nombre.title[0].plain_text,
      time: properties.Horas.number,
      area: '',
      action: '',
    }
  })
  return res
}

export const convertNotionByAreasUpdate = async (
  data: QueryDatabaseResponse['results']
): Promise<UpdateHourDto[]> => {
  const res: UpdateHourDto[] = data.map((area: any) => {
    const properties = area.properties
    return {
      notion: area.id,
      database: properties.DataBase.rich_text[0].plain_text,
      name: properties.Nombre.title[0].plain_text,
      time: properties.Horas.number,
      area: '',
      action: '',
    }
  })
  return res
}
