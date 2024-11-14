import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ProjectContext } from '@/providers/projects'
import { UserContext } from '@/providers/user'
import { AccessData } from '@/actions/database/access/types'
import { TypeData } from '@/actions/database/types/types'
import { ProjectData } from '@/actions/database/projects/types'
import { use } from 'react'

export const ColumnProject: ColumnDef<ProjectData>[] = [
  {
    accessorKey: 'createdAt',
    header: 'Pedido',
    cell: ({ row }) => {
      const value = row.getValue('createdAt') as Date

      return <div>{value.toLocaleDateString()}</div>
    },
  },
  {
    accessorKey: 'priority',
    header: ({ column }) => (
      <Button
        variant='ghost'
        className='p-0 w-full justify-start hover:bg-transparent'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        P
        <ArrowUpDown className='ml-2 h-4 w-4' />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue('priority')}</div>,
  },
  {
    accessorKey: 'notion',
    header: 'Notion',
    cell: ({ row }) => <div>{row.getValue('notion')}</div>,
  },
  {
    accessorKey: 'name',
    header: 'Nombre',
    cell: ({ row }) => <div className='truncate'>{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'count',
    header: 'Cantidad',
    cell: ({ row }) => <div>{row.getValue('count')}</div>,
  },
  {
    accessorKey: 'pending',
    header: 'Pendiente',
    cell: ({ row }) => (
      <div className='text-grey'>{row.getValue('pending')}</div>
    ),
  },
  {
    accessorKey: 'complete',
    header: 'Completo',
    cell: ({ row }) => (
      <div className='text-green'>{row.getValue('complete')}</div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Estado',
    cell: ({ row }) => (
      <div className='capitalize truncate'>
        {((row.getValue('complete') as number) /
          (row.getValue('count') as number)) *
          100 ===
        100
          ? 'completado'
          : 'progreso'}
      </div>
    ),
  },
  {
    accessorKey: 'access',
    header: 'Accesos',
    cell: ({ row }) => {
      let label
      const data: AccessData[] = row.getValue('access')

      label =
        data.length > 0 ? data.map((item) => item.name.toLowerCase()) : 'Vacio'

      return <div className='capitalize truncate'>{label.toString()}</div>
    },
  },
  {
    accessorKey: 'progress',
    header: 'Progreso',
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className='w-full'>
            <Progress
              className='min-w-52'
              value={
                ((row.getValue('complete') as number) /
                  (row.getValue('count') as number)) *
                100
              }
              max={
                row.getValue('count') === 0
                  ? 100
                  : (row.getValue('count') as number)
              }
            />
          </TooltipTrigger>
          <TooltipContent align='start'>
            {'Avance de '}
            {(row.getValue('complete') as number) > 0
              ? ((row.getValue('complete') as number) /
                  (row.getValue('count') as number)) *
                100
              : 0}
            %
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const { findOne } = use(ProjectContext)
      const { role } = use(UserContext)

      const project = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger className='flex justify-end w-full'>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link href={project.url} target='_blank'>
                Ver Notion
              </Link>
            </DropdownMenuItem>
            {role === 'ADMIN' && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Button
                    variant={'ghost'}
                    size={'sm'}
                    className='h-4 justify-start p-0'
                    onClick={() => findOne(project.id)}>
                    Asignar
                  </Button>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
