'use server'
import { taskEnv } from '@/env'
import {
  notionCreatePage,
  notionGetPage,
  notionUpdatePage,
} from '@/actions/notion/notion'
import {
  CreatePageParameters,
  BlockObjectRequest,
  PageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { TaskData } from '@/actions/database/tasks/types'
import {
  getResquest,
  getTask,
  postTask,
  putTask,
} from '@/actions/database/tasks'
import {
  QueryDatabaseParameters,
  UpdatePageParameters,
} from '@notionhq/client/build/src/api-endpoints'
import {
  convertNotionByTaskUpdate,
  convertNotionByTasksUpdate,
  convertNotionTask,
  convertNotionByTasks,
  findNotionTask,
} from '@/actions/notion/tasks'
import { postHistory } from '@/actions/database/histories'
import { subDays } from 'date-fns'

const idDatabase = taskEnv as string

interface PageData {
  properties: CreatePageParameters['properties']
  content: BlockObjectRequest[]
}

export const createTaskByNotion = async (id: string) => {
  try {
    const task = await getResquest(id)

    if (!task) throw new Error('Error Find Request Task')

    const { properties, content } = task

    const notion = await notionCreatePage(idDatabase, properties, content)

    if (!notion) throw new Error('Error Create Task by Notion')

    const data = await convertNotionTask(notion as PageObjectResponse)

    if (!data) throw new Error('Error Convert Task by Notion')

    await putTask(id, {
      notion: data.notion,
      notionUrl: data.notionUrl,
      createAt: new Date(),
    })

    return true
  } catch (e: Error | any) {
    console.log('Error Create Task by Notion:', e.message)
    return null
  }
}

export const convertTaskCustomByNotion = async (
  data: TaskData
): Promise<PageData | null> => {
  try {
    const {
      id,
      name,
      solicitador,
      url,
      endDate,
      project,
      brands,
      action,
      description,
      priority,
    } = data

    const properties: CreatePageParameters['properties'] = {
      Marca: {
        multi_select: brands.map((brand) => ({ name: brand.name })),
      },
      Projects: {
        relation: [{ id: project }],
      },
      Prioridades: {
        relation: [{ id: priority }],
      },
      Solicitante: {
        email: solicitador,
      },
      Nombre: {
        type: 'title',
        title: [
          {
            type: 'text',
            text: {
              content: name,
              link: null,
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default',
            },
          },
        ],
      },
      DataBase: {
        rich_text: [
          {
            type: 'text',
            text: {
              content: id,
              link: null,
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default',
            },
          },
        ],
      },
    }

    if (action)
      properties['Actions'] = {
        relation: [{ id: action }],
      }

    if (endDate)
      properties['Limit'] = {
        date: {
          start: endDate.toISOString(),
        },
      }

    const content: BlockObjectRequest[] = [
      {
        type: 'paragraph',
        paragraph: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: url ? 'Link Aqui' : 'No hay link',
                link: url ? { url } : null,
              },
            },
          ],
          color: 'default',
        },
      },
      {
        type: 'divider',
        divider: {},
      },
      {
        type: 'paragraph',
        paragraph: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: description,
                link: null,
              },
            },
          ],
          color: 'default',
        },
      },
    ]

    return { properties, content }
  } catch (e: Error | any) {
    console.error(`Error Convert Task by Notion:`, e.message)
    return null
  }
}

export const convertTaskRedesByNotion = async (
  data: TaskData
): Promise<PageData | null> => {
  try {
    const {
      id,
      name,
      solicitador,
      url,
      endDate,
      project,
      brands,
      type,
      description,
      priority,
    } = data

    const properties: CreatePageParameters['properties'] = {
      Marca: {
        multi_select: brands.map((brand) => ({ name: brand.name })),
      },
      Projects: {
        relation: [{ id: project }],
      },
      Prioridades: {
        relation: [{ id: priority }],
      },
      Solicitante: {
        email: solicitador,
      },
      Area: {
        relation: [{ id: '13eab8f4-3aa0-818f-8ada-cdb6772a7143' }],
      },
      Estado: {
        status: {
          name: 'Backlog',
        },
      },
      Nombre: {
        type: 'title',
        title: [
          {
            type: 'text',
            text: {
              content: name,
              link: null,
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default',
            },
          },
        ],
      },
      DataBase: {
        rich_text: [
          {
            type: 'text',
            text: {
              content: id,
              link: null,
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default',
            },
          },
        ],
      },
    }

    if (endDate)
      properties['Limit'] = {
        date: {
          start: endDate.toISOString(),
        },
      }

    const content: BlockObjectRequest[] = [
      {
        type: 'paragraph',
        paragraph: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: url ? 'Link Aqui' : 'No hay link',
                link: url ? { url } : null,
              },
            },
          ],
          color: 'default',
        },
      },
      {
        type: 'divider',
        divider: {},
      },
      {
        type: 'paragraph',
        paragraph: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: description,
                link: null,
              },
            },
          ],
          color: 'default',
        },
      },
    ]

    return { properties, content }
  } catch (e: Error | any) {
    console.error(`Error Convert Task by Notion:`, e.message)
    return null
  }
}

export const convertTaskMailingByNotion = async (
  data: TaskData
): Promise<PageData | null> => {
  try {
    const {
      id,
      name,
      solicitador,
      url,
      endDate,
      project,
      brands,
      type,
      action,
      description,
      priority,
    } = data

    const properties: CreatePageParameters['properties'] = {
      Marca: {
        multi_select: brands.map((brand) => ({ name: brand.name })),
      },
      Projects: {
        relation: [{ id: project }],
      },
      Prioridades: {
        relation: [{ id: priority }],
      },
      Solicitante: {
        email: solicitador,
      },
      Estado: {
        status: {
          name: 'Backlog',
        },
      },
      Area: {
        relation: [{ id: '13eab8f4-3aa0-81cd-95e0-cade7447a5d6' }],
      },
      Nombre: {
        type: 'title',
        title: [
          {
            type: 'text',
            text: {
              content: name,
              link: null,
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default',
            },
          },
        ],
      },
      DataBase: {
        rich_text: [
          {
            type: 'text',
            text: {
              content: id,
              link: null,
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default',
            },
          },
        ],
      },
    }

    if (action)
      properties['Actions'] = {
        relation: [{ id: action }],
      }

    if (endDate)
      properties['Limit'] = {
        date: {
          start: endDate.toISOString(),
        },
      }

    const content: BlockObjectRequest[] = [
      {
        type: 'paragraph',
        paragraph: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: url ? url : 'No hay link',
                link: url ? { url } : null,
              },
            },
          ],
          color: 'default',
        },
      },
      {
        type: 'divider',
        divider: {},
      },
      {
        type: 'heading_3',
        heading_3: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: 'Productos:',
                link: null,
              },
            },
          ],
        },
      },
    ]

    const products = JSON.parse(description).products

    products.forEach((product: any) => {
      content.push({
        type: 'numbered_list_item',
        numbered_list_item: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: `${product.style}: ${product.url}`,
                link: null,
              },
            },
          ],
          color: 'default',
        },
      })
    })

    const note = JSON.parse(description).description

    if (note) {
      content.push(
        {
          type: 'divider',
          divider: {},
        },
        {
          type: 'paragraph',
          paragraph: {
            rich_text: [
              {
                type: 'text',
                text: {
                  content: note,
                  link: null,
                },
              },
            ],
            color: 'default',
          },
        }
      )
    }

    return { properties, content }
  } catch (e: Error | any) {
    console.error(`Error Convert Task by Notion:`, e.message)
    return null
  }
}

export const convertTaskWebByNotion = async (
  data: TaskData
): Promise<PageData | null> => {
  try {
    const {
      id,
      name,
      solicitador,
      url,
      endDate,
      project,
      brands,
      action,
      area,
      description,
      priority,
    } = data

    const properties: CreatePageParameters['properties'] = {
      Marca: {
        multi_select: brands.map((brand) => ({ name: brand.name })),
      },
      Projects: {
        relation: [{ id: project }],
      },
      Prioridades: {
        relation: [{ id: priority }],
      },
      Solicitante: {
        email: solicitador,
      },
      Estado: {
        status: {
          name: 'Backlog',
        },
      },
      Nombre: {
        type: 'title',
        title: [
          {
            type: 'text',
            text: {
              content: name,
              link: null,
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default',
            },
          },
        ],
      },
      DataBase: {
        rich_text: [
          {
            type: 'text',
            text: {
              content: id,
              link: null,
            },
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: 'default',
            },
          },
        ],
      },
    }

    if (action)
      properties['Actions'] = {
        relation: [{ id: action }],
      }

    if (area) properties['Area'] = { relation: [{ id: area }] }

    if (endDate)
      properties['Limit'] = {
        date: {
          start: endDate.toISOString(),
        },
      }

    const content: BlockObjectRequest[] = [
      {
        type: 'paragraph',
        paragraph: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: url ? 'Link Aqui' : 'No hay link',
                link: url ? { url } : null,
              },
            },
          ],
          color: 'default',
        },
      },
      {
        type: 'divider',
        divider: {},
      },
      {
        type: 'paragraph',
        paragraph: {
          rich_text: [
            {
              type: 'text',
              text: {
                content: description,
                link: null,
              },
            },
          ],
          color: 'default',
        },
      },
    ]

    return { properties, content }
  } catch (e: Error | any) {
    console.error(`Error Convert Task by Notion:`, e.message)
    return null
  }
}

export const downloadTask = async () => {
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
          property: 'Estado',
          status: {
            does_not_equal: 'Cancelada',
          },
        },
        {
          and: [
            {
              property: 'Nombre',
              title: {
                is_not_empty: true,
              },
            },
            {
              property: 'Marca',
              multi_select: {
                is_not_empty: true,
              },
            },
            {
              property: 'Projects',
              relation: {
                is_not_empty: true,
              },
            },
            {
              property: 'Prioridades',
              relation: {
                is_not_empty: true,
              },
            },
          ],
        },
      ],
    }

    const taskNotion = await findNotionTask(undefined, filter)
    if (!taskNotion) throw new Error('Error Download Task')

    if (taskNotion.length === 0) return true

    const data = await convertNotionByTasks(taskNotion)
    if (!data) throw new Error('Error Convert Task')

    let update: number = 0
    let error: string[] = []

    await Promise.all(
      data.map(async (task) => {
        const response = await postTask(task)

        if (!response) {
          error.push(task.notion as string)
          throw new Error('Error Post Task')
        }

        update++

        const properties: UpdatePageParameters['properties'] = {
          DataBase: {
            rich_text: [
              {
                text: {
                  content: response.id as string,
                },
              },
            ],
          },
        }

        await notionUpdatePage(response.notion as string, properties)
      })
    )

    await postHistory({
      name: 'TASK',
      action: 'DOWNLOAD',
    })

    return {
      date: new Date().toISOString(),
      notion: taskNotion.length,
      convert: data.length,
      update,
      error,
    }
  } catch (e: Error | any) {
    console.error(`Error Download Task: ${e.message}`)
    return false
  }
}

export const updateDatabaseTask = async () => {
  try {
    const thirtyDaysAgo = subDays(new Date(), 21)

    const filter: QueryDatabaseParameters['filter'] = {
      or: [
        {
          and: [
            {
              property: 'DataBase',
              rich_text: {
                is_not_empty: true,
              },
            },
            {
              property: 'UpdateAt',
              date: {
                on_or_before: thirtyDaysAgo.toISOString(),
              },
            },
            {
              property: 'Estado',
              status: {
                does_not_equal: 'Completada',
              },
            },
            {
              property: 'Estado',
              status: {
                does_not_equal: 'Cancelada',
              },
            },
          ],
        },
        {
          and: [
            {
              property: 'DataBase',
              rich_text: {
                is_not_empty: true,
              },
            },
            {
              property: 'UpdateAt',
              date: {
                on_or_after: thirtyDaysAgo.toISOString(),
              },
            },
            {
              property: 'Estado',
              status: {
                is_not_empty: true,
              },
            },
          ],
        },
      ],
    }

    const taskNotion = await findNotionTask(undefined, filter)

    if (!taskNotion) throw new Error('Error Download Task')

    const data = await convertNotionByTasksUpdate(taskNotion)

    if (!data) throw new Error('Error Convert Task')

    let update: number = 0
    let error: string[] = []

    Promise.all(
      data.map(async (task) => {
        const id = task.database as string
        delete task.database
        const res = await putTask(id, task)
        if (!res) {
          error.push(id)
          throw new Error('Error Update Task, ID: ' + id)
        }
        update++
      })
    )

    await postHistory({
      name: 'TASK',
      action: 'UPDATE',
    })

    return {
      date: thirtyDaysAgo.toISOString(),
      notion: taskNotion.length,
      convert: data.length,
      update,
      error,
    }
  } catch (e: Error | any) {
    console.error(`Error Update Database Task: ${e.message}`)
    return null
  }
}

export const updateTaskNotionByDB = async (notion: string) => {
  try {
    const notionTask = await notionGetPage(notion)

    const task = await convertNotionByTaskUpdate(
      notionTask as PageObjectResponse
    )

    if (!notionTask) return

    const id = task.database as string
    delete task.database

    await putTask(id, task)
  } catch (e: Error | any) {
    console.error(`Error Update Task: ${e.message}`)
    return null
  }
}
