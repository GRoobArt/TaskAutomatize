'use client'

import { use } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { usePromine } from '@/hooks/usePromise'
import { getAccess } from '@/actions/database/access'
import { ProjectContext } from '@/providers/projects'

const FormSchema = z.object({
  access: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.',
  }),
})

export const FormUpdateAccess = ({ ...project }) => {
  const { connectAccess } = use(ProjectContext)
  const { data: access } = usePromine(() => getAccess())

  const defaultValue =
    project.access.length > 0 ? project.access.map((t: any) => t.id) : []

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      access: defaultValue,
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await connectAccess(data.access)
  }

  if (!access || !project) return

  const items: { id: string; label: string }[] = access.map((item) => {
    return {
      id: item.id,
      label: item.name.toLowerCase(),
    }
  })

  return (
    access && (
      <>
        <p>Actualizar accesos de tareas que se pueden asignar</p>
        <div className='w-full flex relative'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              {...form}
              className='space-y-2 grid px-2 w-full'>
              <FormField
                control={form.control}
                name='access'
                render={() => (
                  <FormItem
                    className={cn(
                      'flex flex-wrap gap-x-4 gap-y-2 items-end py-2 my-0',
                      'lg:flex-col lg:gap-0 lg:items-start'
                    )}>
                    {items.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name='access'
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className='flex flex-row items-start space-x-3 space-y-0'>
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          item.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className='font-normal capitalize'>
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </FormItem>
                )}
              />
              <Button type='submit' size={'sm'} className='h-8'>
                Actualizar Accessos
              </Button>
            </form>
          </Form>
        </div>
      </>
    )
  )
}
