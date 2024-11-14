'use client'

import {
  createContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
  use,
} from 'react'
import {
  getProjects,
  getProject,
  connectAcceso,
} from '@/actions/database/projects'
import { ToastAction } from '@/components/ui/toast'
import { getTypes } from '@/actions/database/types'
import {
  downloadProjects,
  updateDabaseProject,
} from '@/actions/automatizate/projects'
import { toast } from '@/components/ui/use-toast'
import { ProjectData } from '@/actions/database/projects/types'
import { UserContext } from '../user'
import { AreaEnum } from '@prisma/client'
import { TypeData } from '@/actions/database/types/types'

interface ProjectProviderProps {
  children: React.ReactNode
}

interface ProjectContextProps {
  projects: ProjectData[] | null
  project: ProjectData | null
  types: TypeData[] | null
  type: string | undefined
  formView: boolean
  loading: boolean
  downloadAll: () => void
  refreshAll: () => void
  findOne: (id: string) => void
  connectAccess: (data: string[]) => void
  notView: () => void
  setType: React.Dispatch<React.SetStateAction<string | undefined>>
}

export const ProjectContext = createContext({} as ProjectContextProps)

export const ProjectProvider = ({ children }: ProjectProviderProps) => {
  const [projects, setProjects] = useState<ProjectData[] | null>(null)
  const [project, setProject] = useState<ProjectData | null>(null)
  const [types, setTypes] = useState<TypeData[]>([])
  const [type, setType] = useState<string | undefined>('custom')
  const [formView, setFormView] = useState<boolean>(false)
  const [loading, setLoading] = useState(true)
  const { access, role } = use(UserContext)

  const findAll = useCallback(async () => {
    if (!access || !role) return

    let projectData
    let typeData
    projectData = await getProjects(
      role === 'ADMIN' ? undefined : (access as AreaEnum)
    )
    typeData = await getTypes(
      role === 'ADMIN' ? undefined : (access as AreaEnum)
    )

    if (!projectData)
      return toast({
        title: 'Tuvimos un problema en buscar los proyectos',
        variant: 'destructive',
      })
    setProjects(projectData)
    setTypes(typeData as TypeData[])
    setLoading(false)
  }, [access, role])

  const findOne = useCallback(async (id: string) => {
    const res = await getProject(id)
    if (!res)
      return toast({
        title: 'Tuvimos un problema en encontrar el proyecto',
        variant: 'destructive',
      })
    setProject(res)
    setFormView(false)
  }, [])

  const downloadAll = useCallback(async () => {
    await downloadProjects()
    setLoading(true)
    toast({
      title: 'Se han descargado los proyectos',
      action: <ToastAction altText='Crear Alert'>Cerrar</ToastAction>,
    })
  }, [])

  const refreshAll = useCallback(async () => {
    const res = await updateDabaseProject()
    if (!res)
      return toast({
        title: 'Tuvimos un problema en actualizar los proyectos',
        variant: 'destructive',
        action: <ToastAction altText='Crear Alert'>Cerrar</ToastAction>,
      })

    setLoading(true)
    toast({
      title: 'Se han actualizado los proyectos',
      action: <ToastAction altText='Crear Alert'>Cerrar</ToastAction>,
    })
  }, [])

  const connectAccess = useCallback(
    async (data: string[]) => {
      if (!project)
        return toast({
          title: 'Tuvimos un problema en conectar el proyecto al acceso',
          variant: 'destructive',
        })
      const id = project.id
      await connectAcceso(id, data)
      setProject(null)
      setFormView(false)
      setLoading(true)
    },
    [project]
  )

  const notView = useCallback(() => {
    setFormView(false)
    setProject(null)
  }, [])

  useEffect(() => {
    if (loading) findAll()
  }, [loading, findAll])

  const value = useMemo(
    () =>
      ({
        projects,
        project,
        types,
        formView,
        type,
        loading,
        downloadAll,
        refreshAll,
        findOne,
        connectAccess,
        notView,
        setType,
      } as ProjectContextProps),
    [
      projects,
      project,
      types,
      formView,
      type,
      loading,
      downloadAll,
      refreshAll,
      findOne,
      connectAccess,
      notView,
      setType,
    ]
  )

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  )
}
