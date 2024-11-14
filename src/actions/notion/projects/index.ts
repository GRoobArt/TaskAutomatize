'use server'

import {
  QueryDatabaseParameters,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { notionGetDatabase } from '../notion'
import { projectEnv } from '@/env'
import { ProjectDto, UpdateProjectDto } from '@/actions/database/projects/types'

export const findNotionProject = async (
  sorts?: QueryDatabaseParameters['sorts'],
  filter?: QueryDatabaseParameters['filter']
): Promise<QueryDatabaseResponse['results'] | null> => {
  const response = await notionGetDatabase(projectEnv as string, sorts, filter)
  if (!response) return null
  return response.results
}

export const convertNotionByProject = async (
  data: QueryDatabaseResponse['results']
): Promise<ProjectDto[]> => {
  const res: ProjectDto[] = data.map((project: any) => {
    const properties = project.properties
    return {
      name: properties.Nombre.title[0].plain_text,
      notion: project.id,
      complete: properties.Completes.rollup.number,
      pending:
        properties.Count.rollup.number - properties.Completes.rollup.number,
      count: properties.Count.rollup.number,
      priority: properties.Priority.number,
      url: project.public_url,
    }
  })
  return res
}

export const convertNotionByProjectUpdate = async (
  data: QueryDatabaseResponse['results']
): Promise<UpdateProjectDto[]> => {
  const res: UpdateProjectDto[] = data.map((project: any) => {
    const properties = project.properties
    return {
      name: properties.Nombre.title[0].plain_text,
      priority: properties.Priority.number,
      database: properties.DataBase.rich_text[0].plain_text,
      complete: properties.Completes.rollup.number,
      pending:
        properties.Count.rollup.number - properties.Completes.rollup.number,
      count: properties.Count.rollup.number,
    }
  })
  return res
}
