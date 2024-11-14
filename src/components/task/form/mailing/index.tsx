'use client'

import { use, useEffect, useState } from 'react'
import { format } from 'date-fns'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFieldArray } from 'react-hook-form'
import { z } from 'zod'
import { Calendar as CalendarIcon, RefreshCcw, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { usePromine } from '@/hooks/usePromise'
import { getBrands } from '@/actions/database/brands'
import { UserContext } from '@/providers/user'
import { TaskContext } from '@/providers/taks'
import { useSession } from 'next-auth/react'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { X } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const FormSchema = z.object({
  name: z.string().min(1).nonempty(),
  solicitador: z.string().email().nonempty(),
  url: z.string().url().optional(),
  project: z.string().min(1).nonempty(),
  priority: z.string().min(1).nonempty(),
  type: z.string().nonempty(),
  action: z.string().min(1).nonempty(),
  endDate: z.date().optional(),
  brands: z.string().min(1),
  description: z
    .array(
      z.object({
        style: z.string().min(1).nonempty(),
        url: z
          .string()
          .url()
          .min(5)
          .refine((url) => url.includes('?utm'), {
            message: 'La URL debe contener "?utm".',
          }),
      })
    )
    .min(10)
    .nonempty(),
  note: z.string().optional(),
})

export const FormMailingTask = () => {
  const {
    task,
    setTask,
    actions,
    event: eventTask,
    handleValueChange,
    createTask,
  } = use(TaskContext)
  const { data: session } = useSession()
  const { role } = use(UserContext)
  const { data: brands } = usePromine(getBrands)
  const [event, setEvent] = useState<'SAVED' | 'COMPLET'>('SAVED')

  const defaultValues = {
    name: '',
    url: '',
    solicitador: session?.user?.email as string,
    project: '2187b63c-03a9-4314-84f1-ebaf40135cd1',
    priority: 'bfc1f74f-36ea-4c8b-8adc-bdb025445d16',
    action: '',
    type: 'MAILING',
    brands: '',
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    description: [{ style: '', url: '' }],
    note: '',
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultValues,
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // @ts-ignore
    data.description = JSON.stringify({
      products: data.description,
      description: data.note,
    })

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
    if (task?.type === 'MAILING') {
      const description = JSON.parse(task.description)

      form.reset({
        name: task.name,
        url: task?.url || '',
        solicitador: task.solicitador,
        project: task.project,
        priority: task.priority,
        type: task.type,
        action: task?.action || '',
        brands: task.brands[0].name,
        endDate: task?.endDate || undefined,
        description: description.products,
        note: description.description || '',
      })
    }
  }, [task, form, eventTask])

  const resetBlank = () => {
    form.reset(defaultValues)
    setTask(null)
  }

  const isAdmin = role === 'ADMIN'
  const isActions = ['Subir', 'Eliminar']

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'description',
  })

  if (!brands) return

  const items = brands
    .filter((brand) => brand.name !== 'ADMIN')
    .map((brand) => ({
      id: brand.name,
      label: brand.name,
    }))

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        {...form}
        className='space-y-4 grid grid-cols-2 gap-x-4 px-2 w-full items-end'>
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
        <fieldset className='col-span-2 grid grid-cols-[125px_1fr] gap-4'>
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
                    {actions?.map(
                      (action) =>
                        !isActions.includes(action.name) && (
                          <SelectItem
                            key={action.id}
                            value={action.notion}
                            className='capitalize'>
                            {action.name.toLowerCase()}
                          </SelectItem>
                        )
                    )}
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
                      date > new Date(Date.now() + 1000 * 60 * 60 * 24 * 45) ||
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
                  className='flex flex-wrap gap-4 items-center'>
                  {items.map((item) => (
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
          name='note'
          render={({ field }) => (
            <FormItem className='col-span-2'>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea placeholder='' className='resize-none' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <fieldset className='col-span-2 space-y-2'>
          {fields.map((field, index) => (
            <div key={field.id} className='flex items-end gap-x-2 gap-y-2'>
              <FormField
                control={form.control}
                name={`description.${index}.style`}
                render={({ field }) => (
                  <FormItem className='w-32'>
                    <FormControl>
                      <Input {...field} placeholder='Style Code' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`description.${index}.url`}
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormControl>
                      <Input {...field} placeholder='Url' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {index > 0 && (
                <Button
                  variant='destructive'
                  size={'icon'}
                  onClick={() => remove(index)}
                  className='rounded-full'>
                  <X className='w-4 h-4' />
                </Button>
              )}
            </div>
          ))}
        </fieldset>
        <Button
          type='button'
          variant={'ghost'}
          className='w-32'
          onClick={() => append({ style: '', url: '' })}>
          Add Product
        </Button>

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
}
