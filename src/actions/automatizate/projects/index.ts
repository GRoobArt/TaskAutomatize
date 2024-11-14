'use server'

import {
  QueryDatabaseParameters,
  UpdatePageParameters,
} from '@notionhq/client/build/src/api-endpoints'

import {
  findNotionProject,
  convertNotionByProject,
  convertNotionByProjectUpdate,
} from '@/actions/notion/projects'
import { notionUpdatePage } from '@/actions/notion/notion'

import { postHistory } from '@/actions/database/histories'
import { postProject, updateProject } from '@/actions/database/projects'

export const downloadProjects = async () => {
  try {
    const filter: QueryDatabaseParameters['filter'] = {
      and: [
        {
          property: 'DataBase',
          rich_text: {
            is_empty: true,
          },
        },
        {
          property: 'Priority',
          number: {
            is_not_empty: true,
          },
        },
      ],
    }

    const projectNotion = await findNotionProject(undefined, filter)
    if (!projectNotion) return null

    const data = await convertNotionByProject(projectNotion)
    if (!data) return null

    data.forEach(async (project) => {
      delete project.database
      const res = await postProject(project)
      if (!res) return null

      const properties: UpdatePageParameters['properties'] = {
        DataBase: {
          rich_text: [
            {
              text: {
                content: res.id as string,
              },
            },
          ],
        },
      }

      await notionUpdatePage(res.notion, properties)
    })

    await postHistory({
      name: 'PROJECT',
      action: 'DOWNLOAD',
    })

    return true
  } catch (e: Error | any) {
    console.error(`Error DownloadProjects: ${e.message}`)

    return false
  }
}

export const updateDabaseProject = async () => {
  try {
    const filter: QueryDatabaseParameters['filter'] = {
      property: 'DataBase',
      rich_text: {
        is_not_empty: true,
      },
    }

    const response = await findNotionProject(undefined, filter)
    if (!response) throw new Error('Error updateDabaseProject')

    const data = await convertNotionByProjectUpdate(response)

    data.forEach(async (projects) => {
      const id = projects.database as string
      delete projects.database
      await updateProject(id, projects)
    })

    await postHistory({
      name: 'PROJECT',
      action: 'UPDATE',
    })

    return true
  } catch (e: Error | any) {
    console.error(`Error updateDabaseProject: ${e.message}`)

    return false
  }
}
