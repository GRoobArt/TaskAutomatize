'use client'

import { use, useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { CommentData } from '@/actions/database/comment/type'
import { UserContext } from '@/providers/user'
import { TaskContext } from '@/providers/taks'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { notionPostCommentPage } from '@/actions/notion/notion'
import { viewCommentPage } from '@/actions/automatizate/commets'
const FormSchema = z.object({
  taks: z.string().nonempty('La tarea no puede estar vacía'),
  user: z.string().nonempty('El usuario no puede estar vacío'),
  comment: z.string().nonempty('El comentario no puede estar vacío'),
})

export const FormCommentTask = () => {
  const [comments, setComments] = useState<CommentData[]>([])
  const [loading, setLoading] = useState(true)
  const { task, setTask, event } = use(TaskContext)
  const { name } = use(UserContext)
  const { data: session } = useSession()
  const { role } = use(UserContext)

  const defaultValues = {
    taks: '',
    user: name,
    comment: '',
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValues,
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true)
    if (task && !task.notion) return
    await notionPostCommentPage(data.taks, `${data.user}: ${data.comment}`)
    form.reset({
      taks: task?.notion as string,
      user: name,
      comment: '',
    })
  }

  const isAdmin = role === 'ADMIN'
  const isProperty = task?.solicitador === session?.user?.email

  useEffect(() => {
    if (event === 'comment') {
      if (!task?.notion) return
      form.setValue('taks', task.notion)
      form.setValue('user', name)
    }
  }, [event, task, name, form])

  useEffect(() => {
    const findComments = async () => {
      if (!task?.notion) return
      const res = await viewCommentPage(task.notion)
      setComments(res)
      setTimeout(() => setLoading(false), 2000)
    }

    if (loading) findComments()
  }, [loading, task])

  return (
    <>
      {comments && (
        <div className='p-2 border-b-2 mb-4'>
          <h5 className='text-muted-foreground mb-2'>
            Comentarios{' '}
            <span className='text-white'>{`(${comments.length.toString()})`}</span>
          </h5>
          {task && task.notion && (
            <ul>
              <li>{task.name}</li>
            </ul>
          )}
          <div className='grid justify-items-stretch gap-2 text-xs'>
            {comments.map((comment) => {
              return (
                <div
                  key={comment.notion}
                  className={cn(
                    'border px-4 py-2 rounded-lg max-w-60',
                    name === comment.user && 'bg-secondary justify-self-end'
                  )}>
                  {comment.user && (
                    <p className='capitalize font-bold mb-1'>{comment.user}</p>
                  )}
                  <p>{comment.text}</p>
                </div>
              )
            })}
          </div>
        </div>
      )}
      {task ? (
        <>
          {isAdmin ||
            (isProperty && (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  {...form}
                  className='space-y-4 grid grid-cols-2 gap-x-4 px-2 w-full items-end'>
                  <FormField
                    control={form.control}
                    name='taks'
                    render={({ field }) => (
                      <FormItem
                        className={cn('col-span-2', !isAdmin && 'hidden')}>
                        <FormLabel>Tarea</FormLabel>
                        <FormControl>
                          <Input disabled={!isAdmin} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='user'
                    render={({ field }) => (
                      <FormItem
                        className={cn('col-span-2', !isAdmin && 'hidden')}>
                        <FormLabel>Solicitador</FormLabel>
                        <FormControl>
                          <Input disabled={!isAdmin} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='comment'
                    render={({ field }) => (
                      <FormItem className='col-span-2'>
                        <FormLabel>
                          Comentario <span className='text-destructive'>*</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder=''
                            className='resize-none'
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          {
                            'Evitar poner dos puntos en el comentario, Ejem: "Hola:"'
                          }
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className='flex col-span-2 gap-2'>
                    <Button
                      className=' flex-1'
                      type='submit'
                      disabled={loading && form.formState.isSubmitting}>
                      Enviar
                    </Button>
                  </div>
                </form>
              </Form>
            ))}
        </>
      ) : (
        <>
          <h1 className='text-center p-2'>No hay Tarea Seleccionada</h1>
        </>
      )}
    </>
  )
}
