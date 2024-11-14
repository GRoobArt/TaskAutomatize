'use client'

import React, {
  createContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
  use,
} from 'react'
import {
  getTask,
  getTasks,
  postTask,
  putTask,
  deleteTask,
} from '@/actions/database/tasks'
import { TaskData, TaskDto } from '@/actions/database/tasks/types'
import { getActions } from '@/actions/database/actions'
import { ActionData } from '@/actions/database/actions/types'
import {
  convertTaskMailingByNotion,
  convertTaskCustomByNotion,
  convertTaskRedesByNotion,
  convertTaskWebByNotion,
  createTaskByNotion,
  updateTaskNotionByDB,
} from '@/actions/automatizate/tasks'
import { notionUpdatePage } from '@/actions/notion/notion'
import { UpdatePageParameters } from '@notionhq/client/build/src/api-endpoints'
import { ToastAction } from '@/components/ui/toast'
import { toast } from '@/components/ui/use-toast'
import { ProjectContext } from '../projects'
import { UserContext } from '../user'
import { useSession } from 'next-auth/react'

interface TaskProviderProps {
  children: React.ReactNode
}

interface TaskContextProps {
  task: TaskData | null
  tasks: TaskData[] | null
  actions: ActionData[] | null
  pending: TaskData[] | null
  view: string
  event: 'comment' | null
  loading: boolean
  findOne: (id: string, event?: 'comment') => void
  createTask: (event: 'SAVED' | 'COMPLET', data: any, id?: string) => void
  updatePriority: (id: string, notion: string, priority: string) => void
  removeTask: (id: string, notion?: string) => void
  connectToNotion: (id: string) => void
  handleValueChange: (value: string) => void
  updateTask: (notion: string) => void
  setTask: React.Dispatch<React.SetStateAction<TaskData | null>>
}

export const TaskContext = createContext({} as TaskContextProps)

export const TaskProvider = ({ children }: TaskProviderProps) => {
  const { setType } = use(ProjectContext)
  const { role, work } = use(UserContext)
  const { data: session } = useSession()
  const [task, setTask] = useState<TaskData | null>(null)
  const [tasks, setTasks] = useState<TaskData[] | null>(null)
  const [actions, setActions] = useState<ActionData[] | null>(null)
  const [pending, setPending] = useState<TaskData[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<string>('tasks')
  const [event, setEvent] = useState<'comment' | null>(null)

  const findOne = useCallback(
    async (id: string, event?: 'comment') => {
      const res = await getTask(id)
      if (!res) return null

      if (!event) {
        setType(res.type.toLowerCase())
      } else {
        setEvent(event)
      }

      setTask(res)
      return
    },
    [setType]
  )

  const findAll = useCallback(async () => {
    let pending
    const res = await getTasks()
    if (!res) return null
    const task = res.filter((task) => task.notion)
    pending = res.filter((task) => !task.notion)

    if (!role) return

    if (role !== 'ADMIN') {
      pending = res.filter((task) => !task.notion)
      pending = pending.filter(
        (task) => task.solicitador === session?.user?.email
      )
    }

    setTasks(task)
    setPending(pending)
    setLoading(false)
  }, [session?.user?.email, role])

  const findAllActions = useCallback(async () => {
    const res = await getActions()
    if (!res) return null
    setActions(res)
  }, [])

  const createTask = useCallback(
    async (event: 'SAVED' | 'COMPLET', data: TaskDto, id?: string) => {
      let res
      let notion

      // Creamos o Actualizamos la tarea
      if (!id) {
        res = await postTask(data)
      } else {
        res = await putTask(id, data)
      }

      // ! Si la tarea no se crea devolvemos un Null
      if (!res)
        return toast({
          title: 'Error al crear la tarea',
          variant: 'destructive',
        })

      // Convertimos la tarea para notion
      switch (res.type) {
        case 'CUSTOM':
          notion = await convertTaskCustomByNotion(res)
          break

        case 'REDES':
          notion = await convertTaskRedesByNotion(res)
          break

        case 'MAILING':
          notion = await convertTaskMailingByNotion(res)
          break

        case 'WEB':
          notion = await convertTaskWebByNotion(res)
          break

        default:
          break
      }

      // ! Si no se convierte la tarea devolvemos un Null
      if (!notion)
        return toast({
          title: 'Tuvimos problemas en convertir la tarea para notion',
          variant: 'destructive',
        })

      // Actualizamos la tarea con la reques de Notion.
      await putTask(res.id, {
        request: JSON.stringify(notion),
      })

      // Si la Tarea es para Guadar o para Entregar.
      if (event !== 'SAVED') await createTaskByNotion(res.id)

      // Limpiamos se ah seleccionado una tarea para editar.
      if (task) setTask(null)

      // Buscamos la tarea para actualizar la lista.
      toast({
        title: `Tarea ${event === 'SAVED' ? 'Guardada' : 'Creada'} con exito`,
        description: new Date(res.createdAt).toLocaleString(),
        action: <ToastAction altText='Crear Alert'>Cerrar</ToastAction>,
      })
      setLoading(true)
      return
    },
    [task]
  )

  const removeTask = useCallback(
    async (id: string, notion?: string) => {
      const propieties: UpdatePageParameters['properties'] = {
        Estado: {
          status: {
            name: 'CANCEL',
          },
        },
      }

      await deleteTask(id)
      if (notion) await notionUpdatePage(notion as string, propieties)
      if (task) setTask(null)

      setLoading(true)
    },
    [task]
  )

  const connectToNotion = useCallback(
    async (id: string) => {
      const res = await createTaskByNotion(id)
      if (!res)
        return toast({
          title: 'Error al crear la tarea',
          variant: 'destructive',
        })

      // Buscamos la tarea para actualizar la lista.
      toast({
        title: `Tarea creada con exito`,
        description: new Date().toLocaleString(),
        action: <ToastAction altText='Crear Alert'>Cerrar</ToastAction>,
      })

      if (task) setTask(null)
      setLoading(true)
    },
    [task]
  )

  const updatePriority = useCallback(
    async (id: string, notion: string, priority: string) => {
      const propieties: UpdatePageParameters['properties'] = {
        Prioridades: {
          relation: [{ id: priority }],
        },
      }

      const res = await putTask(id, {
        priority: priority,
      })

      if (!res) return toast({ title: 'Error al actualizar la tarea' })

      await notionUpdatePage(notion, propieties)

      // Buscamos la tarea para actualizar la lista.
      toast({
        title: `Se ah Actualizado la prioridad de la tarea`,
        description: new Date().toLocaleString(),
        action: <ToastAction altText='Crear Alert'>Cerrar</ToastAction>,
      })

      setLoading(true)
    },
    []
  )

  const updateTask = useCallback(async (notion: string) => {
    await updateTaskNotionByDB(notion)
    setLoading(true)

    // Buscamos la tarea para actualizar la lista.
    toast({
      title: `Se ah Actualizado la Tarea`,
      description: new Date().toLocaleString(),
      action: <ToastAction altText='Crear Alert'>Cerrar</ToastAction>,
    })
  }, [])

  const handleValueChange = useMemo(
    () => (value: string) => {
      setView(value as 'tasks' | 'pendings')
    },
    []
  )

  useEffect(() => {
    if (loading) {
      findAll()
    }
    findAllActions()
  }, [loading, findAll, findAllActions])

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log('Actualizando tareas')
      findAll()
      toast({
        title: `Tareas Actualizadas con exito`,
        description: new Date().toString(),
        action: <ToastAction altText='Crear Alert'>Cerrar</ToastAction>,
      })
    }, 3 * 60 * 60 * 1000) // Cada 3 horas

    return () => clearInterval(intervalId)
  }, [findAll])

  const value = useMemo(
    () =>
      ({
        task,
        tasks,
        pending,
        actions,
        view,
        event,
        loading,
        findOne,
        createTask,
        updatePriority,
        removeTask,
        connectToNotion,
        handleValueChange,
        setTask,
        updateTask,
      } as TaskContextProps),
    [
      task,
      tasks,
      pending,
      actions,
      view,
      event,
      loading,
      findOne,
      createTask,
      updatePriority,
      removeTask,
      connectToNotion,
      handleValueChange,
      setTask,
      updateTask,
    ]
  )

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}
