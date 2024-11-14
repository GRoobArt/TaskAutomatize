'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card'
import { TaskProps, TaskData } from '@/actions/database/tasks/types'
import {
  Trash2,
  Pencil,
  ChevronRight,
  MessageSquareText,
  ChevronsUp,
  ChevronsUpDown,
  ChevronsDown,
  TableProperties,
  CloudUpload,
} from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Row } from '@tanstack/react-table'
import { TaskContext } from '@/providers/taks'
import { ProjectContext } from '@/providers/projects'
import { useSession } from 'next-auth/react'
import { UserContext } from '@/providers/user'
interface ColumnsTask extends TaskProps {
  select?: boolean
}

export const CardTask = ({ row }: { row: Row<TaskData> }) => {
  const { role, work } = use(UserContext)
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)

  if (!role) return

  const cells = row.getAllCells().reduce((acc, cell) => {
    acc[cell.column.id] = cell.getValue()
    return acc
  }, {} as Record<string, unknown>)

  const { notion, solicitador, state } = cells as unknown as ColumnsTask

  cells['isSavign'] = !notion || notion === ''
  cells['isProperty'] = solicitador === session?.user?.email
  cells['role'] = role
  cells['open'] = open
  cells['setOpen'] = setOpen
  cells['isAdmin'] = role === 'ADMIN'
  cells['isPermiso'] = ['GERENCIA', 'JEFATURA'].includes(work)
  cells['isTotalAccess'] =
    role === 'ADMIN' || solicitador === session?.user?.email
  cells['isRemove'] = ![
    'COMPLETE',
    'CANCEL',
    'FOLLOWUP',
    'INPROGRESS',
  ].includes(state)

  return (
    <Card
      data-state={row.getIsSelected() && 'selected'}
      className={cn(
        'border-2  bg-secondary [&_>div]:px-2 [&_>div]:py-2 min-w-64 max-w-80 relative',
        !notion && solicitador === session?.user?.email && 'mt-1'
      )}>
      <CardHeaderTask data={cells} />
      <CardContentTask data={cells} />
      <CardFooterTask data={cells} />
      {!notion && solicitador === session?.user?.email && (
        <div className='absolute top-[-3%] right-[-2%] bg-primary text-primary rounded-full' />
      )}
    </Card>
  )
}

const CardHeaderTask = ({ data }: { data: unknown | ColumnsTask }) => {
  const {
    id,
    notion,
    actions,
    name,
    notionUrl,
    brands,
    type,
    priorities,
    projects,
    open,
    setOpen,
  } = data as unknown as ColumnsTask

  return (
    <CardHeader className='bg-background rounded-t-lg capitalize flex-row justify-between gap-2 space-y-0'>
      <div className='flex flex-col justify-between'>
        <div className='space-y-1'>
          <p className='text-[8px] leading-3'>{projects.name}</p>
          <p className='text-muted-foreground text-[10px] leading-3'>
            <span
              className={cn(
                'text-white font-bold',
                selectColor(priorities.name)
              )}>
              {priorities.name}:{' '}
            </span>
            {actions && `${actions.name}`} {type.toLowerCase()}
          </p>
          <p className='text-md font-bold'>{name}</p>
        </div>
        <p className='text-xs'>
          {brands.map((brand) => brand.name.toLowerCase()).join(', ')}
        </p>
      </div>
      <div className='flex items-center flex-col gap-2'>
        <Button
          size={'icon'}
          variant={'ghost'}
          onClick={() => setOpen && setOpen(!open)}
          className='p-0'>
          <TableProperties className='w-4 h-4' />
        </Button>
        {notion && notionUrl && (
          <>
            <Link
              href={notionUrl}
              target='_blank'
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'icon' }),
                'relative'
              )}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='1em'
                height='1em'
                viewBox='0 0 24 24'>
                <path
                  fill='currentColor'
                  d='M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514c-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233l4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632'
                />
              </svg>
            </Link>
          </>
        )}
      </div>
    </CardHeader>
  )
}

const CardContentTask = ({ data }: { data: unknown | ColumnsTask }) => {
  const { work } = use(UserContext)
  const { setType } = use(ProjectContext)
  const {
    removeTask,
    connectToNotion,
    findOne,
    task,
    updatePriority,
    updateTask,
    loading,
  } = use(TaskContext)
  const {
    id,
    notion,
    priorities,
    isSavign,
    isAdmin,
    isPermiso,
    isProperty,
    isTotalAccess,
    isRemove,
  } = data as unknown as ColumnsTask

  if (isSavign) {
    return (
      isTotalAccess && (
        <CardContent className='bg-background rounded-b-lg gap-4 flex justify-between border-t-2'>
          <div className='flex gap-2'>
            {isRemove && (isAdmin || isProperty) && (
              <Button
                size={'icon'}
                variant={'secondary'}
                disabled={loading}
                onClick={() => {
                  removeTask(id)
                }}>
                <Trash2 className='w-4 h-6' />
              </Button>
            )}
            {id !== task?.id && (
              <Button
                size={'icon'}
                variant={'secondary'}
                disabled={loading}
                onClick={() => findOne(id)}>
                <Pencil className='w-4 h-6' />
              </Button>
            )}
            {isAdmin && (
              <Button
                size={'icon'}
                variant={'secondary'}
                onClick={() => {
                  updateTask(notion as string)
                }}
                disabled={loading}>
                <CloudUpload className='w-4 h-6' />
              </Button>
            )}
          </div>
          {isAdmin ||
            (isProperty && (
              <Button
                size={'icon'}
                disabled={loading}
                onClick={() => {
                  connectToNotion(id)
                }}>
                <ChevronRight className='w-6 h-6' />
              </Button>
            ))}
        </CardContent>
      )
    )
  } else {
    return (
      <CardContent className='bg-background rounded-b-lg gap-2 flex justify-between border-t-2'>
        <div className='flex gap-1 justify-between flex-1'>
          {isRemove && isTotalAccess && (
            <Button
              size={'icon'}
              variant={'secondary'}
              onClick={() => {
                removeTask(id, notion as string)
              }}
              disabled={loading}>
              <Trash2 className='w-4 h-6' />
            </Button>
          )}
          <Link
            href={'#comment'}
            className={cn(
              buttonVariants({ size: 'icon', variant: 'secondary' })
            )}
            onClick={() => {
              findOne(id, 'comment')
              setType('comment')
            }}>
            <MessageSquareText className='w-4 h-6' />
          </Link>
          {isAdmin && (
            <Button
              size={'icon'}
              variant={'secondary'}
              onClick={() => {
                updateTask(notion as string)
              }}
              disabled={loading}>
              <CloudUpload className='w-4 h-6' />
            </Button>
          )}
        </div>

        <div className='flex gap-2'>
          {isPermiso && priorities.name !== 'LOW' && (
            <Button
              size={'icon'}
              variant={'ghost'}
              disabled={loading}
              onClick={() => {
                updatePriority(
                  id,
                  notion as string,
                  'bfc1f74f-36ea-4c8b-8adc-bdb025445d16'
                )
              }}>
              <ChevronsDown className='w-4 h-6 text-gray-500' />
            </Button>
          )}
          {isPermiso && priorities.name !== 'MEDIUM' && (
            <Button
              size={'icon'}
              variant={'ghost'}
              disabled={loading}
              onClick={() => {
                updatePriority(
                  id,
                  notion as string,
                  '0d0c800d-4456-41dc-99ea-d2b120d67b25'
                )
              }}>
              <ChevronsUpDown className='w-4 h-6 text-orange-500' />
            </Button>
          )}
          {work === 'JEFATURA' && priorities.name !== 'HIGH' && (
            <Button
              size={'icon'}
              variant={'ghost'}
              disabled={loading}
              onClick={() => {
                updatePriority(
                  id,
                  notion as string,
                  'ebd59921-b7eb-41f9-9268-339695f39a9a'
                )
              }}>
              <ChevronsUp className='w-4 h-6 text-red-500' />
            </Button>
          )}
        </div>
      </CardContent>
    )
  }
}

const CardFooterTask = ({ data }: { data: unknown | ColumnsTask }) => {
  const {
    notion,
    solicitador,
    url,
    type,
    description,
    endDate,
    updatedAt,
    createdAt,
    open,
  } = data as unknown as ColumnsTask

  return (
    open && (
      <CardFooter className='bg-secondary gap-2 text-start flex-col item-start justify-start'>
        <div className='flex-1 w-full space-y-2'>
          <p className='flex justify-between items-center text-[10px] text-muted-foreground mb-1 leading-3'>
            <span className='text-[10px] text-muted-foreground mr-2'>
              Solicitado:
            </span>
            {solicitador}
          </p>
          {notion && (
            <>
              <p className='flex justify-between items-center text-xs leading-3'>
                <span className='text-[10px] text-muted-foreground mr-2'>
                  Creado:
                </span>
                {createdAt.toLocaleString()}
              </p>
              <p className='flex justify-between items-center text-xs leading-3'>
                <span className='text-[10px] text-muted-foreground mr-2'>
                  Actualizado:
                </span>
                {updatedAt.toLocaleString()}
              </p>
            </>
          )}
          <p className='flex justify-between items-center text-xs leading-3'>
            <span className='text-[10px] text-muted-foreground mr-2'>
              Fecha Estimada:
            </span>
            {endDate && endDate.toLocaleDateString()}
          </p>
        </div>
        <div className='flex justify-between gap-2 text-start items-center flex-wrap  w-full'>
          {type === 'MAILING' ? (
            <>
              <ul className='list-decimal ml-6 flex-1'>
                {JSON.parse(description).products &&
                  JSON.parse(description).products.map(
                    (product: { style: string; url: string }) => (
                      <li key={product.style}>
                        <a
                          href={product.url}
                          target='_blank'
                          className='underline'>
                          {product.style}
                        </a>
                      </li>
                    )
                  )}
              </ul>
              <p>
                {JSON.parse(description).description &&
                  JSON.parse(description).description}
              </p>
            </>
          ) : (
            <p className=''>{description}</p>
          )}
          {url && (
            <Link
              href={url}
              target='_blank'
              className='underline text-primary mt-1 font-bold leading-3 text-xs'>
              Ver Link
            </Link>
          )}
        </div>
      </CardFooter>
    )
  )
}

const selectColor = (name: string) => {
  switch (name) {
    case 'LOW':
      return 'text-gray-500'
    case 'MEDIUM':
      return 'text-orange-500'
    case 'HIGH':
      return 'text-red-500'
    default:
      return 'text-secondary'
  }
}
