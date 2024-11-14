'use client'

import { use, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Calendar as CalendarIcon, RefreshCcw, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Input } from '@/components/ui/input'
import { usePromine } from '@/hooks/usePromise'
import { getBrands } from '@/actions/database/brands'
import { TaskContext } from '@/providers/taks'
import { useSession } from 'next-auth/react'
import { UserContext } from '@/providers/user'
import { getAreas } from '@/actions/database/areas'

const FormSchema = z.object({
  name: z.string().nonempty().trim(),
  solicitador: z.string().email(),
  url: z.string().url().optional(),
  project: z.string().min(1),
  priority: z.string().min(1),
  type: z.string(),
  area: z.string().min(1),
  action: z.string().min(1),
  endDate: z.date().optional(),
  brands: z.string().min(1),
  description: z.string().min(20).trim(),
})

export const FormWebTask = () => {
  const { task, setTask } = use(TaskContext)
  const [event, setEvent] = useState<'SAVED' | 'COMPLET'>('SAVED')
  const { event: eventTask, actions, handleValueChange } = use(TaskContext)
  const { data: brands } = usePromine(getBrands)
  const { data: session } = useSession()
  const { data: areas } = usePromine(getAreas)
  const { createTask } = use(TaskContext)
  const { role } = use(UserContext)

  const defaultValues = {
    name: '',
    url: '',
    solicitador: session?.user?.email as string,
    project: '3c60c092-c475-497d-b2e7-0b64d4090b04',
    priority: 'bfc1f74f-36ea-4c8b-8adc-bdb025445d16',
    type: 'WEB',
    area: '',
    brands: '',
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    description: '',
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValues,
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // @ts-ignore
    data.brands = [data.brands]

    if (!task) {
      form.reset()
      createTask(event, data)
      return
    }

    createTask(event, data, task.id)
    form.reset(defaultValues)
    return
  }

  useEffect(() => {
    if (task?.type === 'WEB') {
      if (!eventTask) {
        form.reset({
          name: task.name,
          url: task?.url || undefined,
          solicitador: task.solicitador,
          project: task.project,
          priority: task.priority,
          type: task.type,
          brands: task.brands[0].name,
          endDate: task?.endDate || undefined,
          description: task.description,
        })
      }
    }
  }, [task, form, eventTask])

  if (!brands || !areas) return

  const itemsBrads = brands
    .filter((brand) => brand.name !== 'ADMIN')
    .map((brand) => ({
      id: brand.name,
      label: brand.name,
    }))

  let notViewArea = ['Redes Sociales', 'Mailing']

  const itemsAreas = areas
    .filter((ar) => !notViewArea.includes(ar.name))
    .map((area) => {
      return {
        id: area.notion,
        label: area.name,
      }
    })

  const resetBlank = () => {
    form.reset(defaultValues)
    setTask(null)
  }

  const isAdmin = role === 'ADMIN'

  return (
    brands && (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-4 grid grid-cols-2 gap-x-4 px-2 w-full items-end'
          {...form}>
          <FormField
            control={form.control}
            name='solicitador'
            render={({ field }) => (
              <FormItem className={cn('col-span-2', !isAdmin && 'hidden')}>
                <FormLabel>Solicitador</FormLabel>
                <FormControl>
                  <Input disabled={!isAdmin} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <fieldset className='col-span-2 grid grid-cols-[125px_125px_1fr] gap-4'>
            <FormField
              control={form.control}
              name='action'
              render={({ field }) => (
                <FormItem className='capitalize'>
                  <FormLabel>
                    Acción <span className='text-destructive'>*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Acción' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {actions?.map((action) => (
                        <SelectItem
                          key={action.id}
                          value={action.notion}
                          className='capitalize'>
                          {action.name.toLowerCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='area'
              render={({ field }) => (
                <FormItem className='capitalize'>
                  <FormLabel>
                    Acción <span className='text-destructive'>*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Acción' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {itemsAreas?.map((action) => (
                        <SelectItem
                          key={action.id}
                          value={action.id}
                          className='capitalize'>
                          {action.label.toLowerCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Title <span className='text-destructive'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>
          <FormField
            control={form.control}
            name='url'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Url</FormLabel>
                <FormControl>
                  <Input placeholder='https://mauiandsons.cl' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='endDate'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>
                  Fecha Limit <span className='text-destructive'>*</span>
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}>
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='end'>
                    <Calendar
                      mode='single'
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date >
                          new Date(Date.now() + 1000 * 60 * 60 * 24 * 45) ||
                        date < new Date(Date.now() - 1000 * 60 * 60 * 24 * 30)
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='brands'
            render={({ field }) => (
              <FormItem className='space-y-3 col-span-2'>
                <FormLabel>Marca</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className='flex flex-wrap'>
                    {itemsBrads.map((item) => (
                      <FormItem
                        className='flex  items-center space-x-3 space-y-0'
                        key={item.label}>
                        <FormControl>
                          <RadioGroupItem value={item.id} />
                        </FormControl>
                        <FormLabel className='font-normal capitalize'>
                          {item.label.toLowerCase()}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem className='col-span-2'>
                <FormLabel>
                  Descripción <span className='text-destructive'>*</span>
                </FormLabel>
                <FormControl>
                  <Textarea placeholder='' className='resize-none' {...field} />
                </FormControl>
                <FormDescription>
                  Descripción detallada de los cambios a realizar.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex col-span-2 gap-2'>
            <Button
              type='button'
              size={'icon'}
              variant={'secondary'}
              onClick={() => form.reset()}>
              <RefreshCcw size={16} />
            </Button>
            {task && (
              <Button
                type='button'
                size={'icon'}
                variant={'secondary'}
                onClick={() => resetBlank()}>
                <Trash2 size={16} />
              </Button>
            )}
            {!task && (
              <Button
                type='submit'
                variant={'secondary'}
                className='min-w-32'
                onClick={() => {
                  handleValueChange('pendings')
                  setEvent('SAVED')
                }}>
                Guardar
              </Button>
            )}
            <Button
              className=' flex-1'
              type='submit'
              onClick={() => {
                handleValueChange('tasks')
                setEvent('COMPLET')
              }}
              disabled={form.formState.isSubmitting}>
              Enviar
            </Button>
          </div>
        </form>
      </Form>
    )
  )
}
