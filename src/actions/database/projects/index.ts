'use server'

import { prisma } from '@/lib/prisma'
import { ProjectDto, UpdateProjectDto } from './types'
import { AreaEnum } from '@prisma/client'

export const getProjects = async (access?: AreaEnum) => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        access: access
          ? {
              some: {
                name: access,
              },
            }
          : undefined,
      },
      select,
      orderBy: {
        priority: 'asc',
      },
    })
    return projects
  } catch (e) {
    console.error(`Error getProjects: ${e}`)
    return []
  }
}

export const getProject = async (id: string) => {
  try {
    const project = await prisma.project.findUnique({
      where: {
        id,
      },
      select,
    })
    return project
  } catch (e) {
    console.error(`Error getProject: ${e}`)
    return null
  }
}

export const postProject = async (data: ProjectDto) => {
  try {
    const res = await prisma.project.create({
      data,
      select,
    })

    return res
  } catch (e) {
    console.error(`Error postProject: ${e}`)
    return null
  }
}

export const updateProject = async (
  id: string,
  { complete, pending, count, priority, type, name }: UpdateProjectDto
) => {
  try {
    await prisma.project.update({
      where: {
        id,
      },
      data: {
        name,
        complete,
        pending,
        count,
        priority,
        updatedAt: new Date(),
      },
    })

    return true
  } catch (e) {
    console.error(`Error updateProject: ${e}`)
    return false
  }
}

export const connectAcceso = async (id: string, accessIds: string[]) => {
  try {
    let connect
    let disconnect

    const access = await projectResumenAccess(id, accessIds)

    access.forEach((t: any) => {
      if (t.connect) connect = t.connect
      if (t.disconnect) disconnect = t.disconnect
    })

    await prisma.project.update({
      where: {
        id,
      },
      data: {
        access: {
          connect: connect ? connect : undefined,
          disconnect: disconnect ? disconnect : undefined,
        },
        updatedAt: new Date(),
      },
    })

    return true
  } catch (e) {
    console.error(`Error connectType: ${e}`)
    return false
  }
}

export const getIdProjectAccess = async (id: string) => {
  try {
    const project = await prisma.project.findUnique({
      where: {
        id,
      },
      select,
    })

    if (!project) return null

    return project.access.map((t: any) => t.id)
  } catch (e) {}
}

const projectResumenAccess = async (id: string, ids: string[]) => {
  try {
    let actions = []
    const idsOld = await getIdProjectAccess(id)

    const accessNew = ids.filter((item) => !idsOld?.includes(item))
    const accessDelete = idsOld?.filter((item) => !ids.includes(item))

    if (accessNew.length > 0) {
      actions.push({
        connect: accessNew.map((id) => ({ id })),
      })
    }

    if (accessDelete && accessDelete.length > 0) {
      actions.push({
        disconnect: accessDelete?.map((id) => ({ id })),
      })
    }

    return actions
  } catch (e) {
    console.error(`Error projectResumen: ${e}`)
    return []
  }
}

const select = {
  id: true,
  name: true,
  notion: true,
  complete: true,
  pending: true,
  count: true,
  priority: true,
  url: true,
  createdAt: true,
  access: {
    select: {
      id: true,
      name: true,
    },
  },
}
