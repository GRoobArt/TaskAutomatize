'use server'

import { prisma } from '@/lib/prisma'
import { TaskDto, UpdateTaskDto } from './types'
import {
  CreatePageParameters,
  BlockObjectRequest,
} from '@notionhq/client/build/src/api-endpoints'
import { subDays } from 'date-fns'

export const getTasks = async () => {
  try {
    const thirtyDaysAgo = subDays(new Date(), 30)

    const res = await prisma.task.findMany({
      where: {
        OR: [
          {
            AND: [
              {
                updatedAt: {
                  lte: thirtyDaysAgo, // `UpdateAt` es anterior o igual a hace 30 días
                },
              },
              {
                state: {
                  notIn: ['Completada', 'Cancelada'],
                },
              },
            ],
          },
          {
            AND: [
              {
                updatedAt: {
                  gte: thirtyDaysAgo, // `UpdateAt` es posterior o igual a hace 30 días
                },
              },
              {
                state: {
                  not: undefined,
                },
              },
            ],
          },
        ],
      },
      orderBy: [
        {
          numero: 'desc',
        },
        {
          createdAt: 'asc',
        },
        {
          state: 'desc',
        },
      ],
      select,
    })

    return res
  } catch (e: Error | any) {
    return []
  }
}

export const getTask = async (id: string) => {
  try {
    const res = await prisma.task.findUnique({
      where: {
        id,
      },
      select,
    })

    return res
  } catch (e) {
    return null
  }
}

export const postTask = async (data: TaskDto) => {
  try {
    const {
      name,
      solicitador,
      url,
      notionUrl,
      endDate,
      type,
      description,
      brands,
      request,
      project,
      priority,
      estimate,
      action,
      area,
      notion,
      state,
      relation,
    } = data

    const res = await prisma.task.create({
      data: {
        name,
        notion: notion ? notion : undefined,
        solicitador,
        url,
        notionUrl,
        endDate,
        description,
        request,
        relation,
        state: state ? state : type === 'CUSTOM' ? 'Estimacion' : 'Backlog',
        estimate: estimate
          ? {
              create: {
                startDate: estimate.start,
                endDate: estimate.end,
              },
            }
          : undefined,
        brands: {
          connect: brands.map((brand) => ({ name: brand })),
        },
        types: {
          connect: {
            name: type,
          },
        },
        projects: {
          connect: {
            notion: project,
          },
        },
        priorities: {
          connect: {
            notion: priority,
          },
        },
        areas: area ? { connect: { notion: area } } : undefined,
        actions: action ? { connect: { notion: action } } : undefined,
      },
      select,
    })

    return res
  } catch (e: Error | any) {
    console.log(e.message)
    return null
  }
}

export const putTask = async (id: string, data: UpdateTaskDto) => {
  try {
    const {
      name,
      description,
      notion,
      state,
      priority,
      request,
      notionUrl,
      brands,
      endDate,
      action,
      estimate,
      url,
      createAt,
      area,
    } = data

    const res = await prisma.task.update({
      where: {
        id,
      },
      data: {
        name,
        notion,
        state,
        description,
        url,
        notionUrl,
        endDate,
        createdAt: createAt ? new Date(createAt) : undefined,
        updatedAt: new Date(),
        estimate: estimate
          ? {
              create: {
                startDate: estimate.start,
                endDate: estimate.end,
              },
            }
          : undefined,
        request: request ? JSON.parse(request) : undefined,
        priorities: priority
          ? {
              connect: {
                notion: priority,
              },
            }
          : undefined,
        brands: brands
          ? {
              connect: brands.map((brand) => ({ name: brand })),
            }
          : undefined,
        areas: area ? { connect: { notion: area } } : undefined,
        actions: action ? { connect: { notion: action } } : undefined,
      },
      select,
    })

    return res
  } catch (e: Error | any) {
    console.error(e.message)
    return null
  }
}

export const getResquest = async (id: string) => {
  try {
    const res = await prisma.task.findUnique({
      where: {
        id,
      },
      select: {
        request: true,
      },
    })

    const data = JSON.parse(JSON.stringify(res?.request))

    const properties = data.properties as CreatePageParameters['properties']
    const content = data.content as BlockObjectRequest[]

    return {
      properties,
      content,
    }
  } catch (e) {
    return null
  }
}

export const deleteTask = async (id: string) => {
  try {
    const res = await prisma.task.delete({
      where: {
        id,
      },
      select,
    })

    return res
  } catch (e) {
    return null
  }
}

const select = {
  id: true,
  notion: true,
  name: true,
  solicitador: true,
  url: true,
  notionUrl: true,
  endDate: true,
  description: true,
  state: true,
  type: true,
  numero_project: true,
  estimate: {
    select: {
      startDate: true,
      endDate: true,
    },
  },
  priority: true,
  priorities: {
    select: {
      notion: true,
      name: true,
    },
  },
  project: true,
  projects: {
    select: {
      notion: true,
      name: true,
    },
  },
  area: true,
  areas: {
    select: {
      name: true,
      notion: true,
    },
  },
  brands: {
    select: {
      name: true,
    },
  },
  action: true,
  actions: {
    select: {
      name: true,
    },
  },
  createdAt: true,
  updatedAt: true,
}
