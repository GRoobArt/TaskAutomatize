'use server'

import {
  QueryDatabaseParameters,
  QueryDatabaseResponse,
  PageObjectResponse,
  PartialPageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { notionGetDatabase } from '../notion'
import { taskEnv } from '@/env'
import { TaskDto, UpdateTaskDto } from '@/actions/database/tasks/types'

export const findNotionTask = async (
  sorts?: QueryDatabaseParameters['sorts'],
  filter?: QueryDatabaseParameters['filter']
): Promise<QueryDatabaseResponse['results'] | null> => {
  const response = await notionGetDatabase(taskEnv as string, sorts, filter)
  if (!response) return null
  return response.results
}

export const convertNotionByTasks = async (
  data: QueryDatabaseResponse['results']
): Promise<TaskDto[]> => {
  const res: TaskDto[] = data.map((task: any) => {
    const properties = task.properties
    const data: TaskDto = {
      notion: task.id,
      name: properties.Nombre.title[0].plain_text,
      solicitador: properties.Solicitante.email,
      description: '',
      brands: properties.Marca.multi_select.map((brand: any) => brand.name),
      url: '',
      type: 'CUSTOM',
      notionUrl: task.public_url,
      state: properties.Estado.status.name,
      area: properties.Area.relation[0]?.id,
      project: properties.Projects.relation[0]?.id,
      action: properties.Actions.relation[0]?.id,
      priority: properties.Prioridades.relation[0]?.id,
    }

    if (properties.Limit.date?.start)
      data['endDate'] = new Date(properties.Limit.date.start)

    if (properties.Depende.relation[0]?.id)
      data['relation'] = properties.Depende.relation[0]?.id

    return data
  })
  return res
}

export const convertNotionByTasksUpdate = async (
  data: QueryDatabaseResponse['results']
): Promise<UpdateTaskDto[] | null> => {
  try {
    const res: UpdateTaskDto[] = data.map((task: any) => {
      const properties = task.properties
      const data: UpdateTaskDto = {
        state: properties.Estado.status.name,
        database: properties.DataBase.rich_text[0].plain_text,
        brands: properties.Marca.multi_select.map((brand: any) => brand.name),
        name: properties.Nombre.title[0].plain_text,
        priority: properties.Prioridades.relation[0]?.id,
        project: properties.Projects.relation[0]?.id,
        action: properties.Actions.relation[0]?.id,
        area: properties.Area.relation[0]?.id,
      }

      if (properties.Depende.relation[0]?.id)
        data['relation'] = properties.Depende.relation[0]?.id

      return data
    })
    return res
  } catch (e: Error | any) {
    console.log(`Error convertNotionByTasksUpdate: ${e.message}`)
    return null
  }
}

export const convertNotionTask = async (
  data: PageObjectResponse
): Promise<UpdateTaskDto | null> => {
  try {
    const props = data.properties as PageObjectResponse['properties']
    return {
      notion: data.id,
      notionUrl: data.public_url || undefined,
    }
  } catch (e: Error | any) {
    console.log(`Error convertNotionTask: ${e.message}`)
    return null
  }
}

export const convertNotionByTaskUpdate = (data: any): UpdateTaskDto => {
  const properties = data.properties as any

  return {
    notion: data.id,
    state: properties.Estado.status.name,
    database: properties.DataBase.rich_text[0].plain_text,
    brands: properties.Marca.multi_select.map((brand: any) => brand.name),
    name: properties.Nombre.title[0].plain_text,
    action: properties.Actions.relation[0]?.id,
    priority: properties.Prioridades.relation[0].id,
    project: properties.Projects.relation[0].id,
    estimate:
      (properties.Estimacion?.date?.start && {
        start:
          (properties.Estimacion?.date?.start &&
            new Date(properties.Estimacion?.date?.start)) ||
          undefined,
        end: properties.Estimacion?.date?.end || undefined,
      }) ||
      undefined,
  }
}
