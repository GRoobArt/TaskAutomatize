'use client'

import { use, useState } from 'react'
import {
  Columns3,
  Table,
  ChevronDownIcon,
  ListFilter,
  CircleUserRound,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { TaskData } from '@/actions/database/tasks/types'
import { TaskContext } from '@/providers/taks'
import { Button } from '@/components/ui/button'
import { TableTask } from '@/components/task/table/tasks'
import { BoardTask } from '@/components/task/boards'
import { columns } from '@/components/task/colums'
import { Input } from '@/components/ui/input'
import { generateScaleNumber } from '@/scripts/generateScaleNumber'
import { Switch } from '@/components/ui/switch'

import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useSession } from 'next-auth/react'
import { usePromine } from '@/hooks/usePromise'
import { getTypes } from '@/actions/database/types'
import { getProjects } from '@/actions/database/projects'
import { getUsers } from '@/actions/database/users'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export const ViewTasks = () => {
  const { tasks } = use(TaskContext)
  const { data: projects } = usePromine(getProjects)
  const { data: session } = useSession()
  const { data: types } = usePromine(getTypes)
  const { data: users } = usePromine(getUsers)
  const [view, setView] = useState(true)
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'numero_project',
      desc: false,
    },
    {
      id: 'priorities',
      desc: true,
    },
    {
      id: 'createdAt',
      desc: true,
    },
  ])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    description: false,
    solicitador: false,
    notionUrl: false,
    url: false,
    notion: false,
    id: false,
    updatedAt: false,
    createdAt: false,
    state: false,
    priorities: false,
    projects: false,
    numero_project: false,
    project: false,
  })
  const [rowSelection, setRowSelection] = useState({})
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(5)
  const table = useReactTable({
    data: tasks as TaskData[],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: { pagination: { pageIndex, pageSize } },
  })

  if (!tasks) return

  const totalRows = tasks.length > 0 ? tasks.length : 0
  const qtyPage = generateScaleNumber(tasks.length)

  const from = pageIndex * pageSize + 1
  const to = table.getState().pagination.pageSize
  const total = totalRows

  return (
    tasks && (
      <>
        <div className='relative'>
          <div className='pb-2 flex justify-between p-2 flex-wrap gap-y-4 gap-x-4 relative items-center'>
            <div
              data-state={view ? 'grid' : 'table'}
              className={cn(
                'p-1 bg-secondary w-fit rounded-full min-w-16 flex transition-all duration-200',
                view ? 'justify-start' : 'justify-end'
              )}
              onClick={() => setView(!view)}>
              <Button
                className='rounded-full w-8 h-8'
                size={'icon'}
                variant={view ? 'default' : 'ghost'}>
                {view ? (
                  <Columns3 className='w-4' />
                ) : (
                  <Table className='w-4' />
                )}
              </Button>
            </div>
            <div className='flex gap-4 flex-1'>
              <Input
                placeholder='Filtrar por nombre'
                value={
                  (table.getColumn('name')?.getFilterValue() as string) ?? ''
                }
                onChange={(event) =>
                  table.getColumn('name')?.setFilterValue(event.target.value)
                }
                className='max-w-sm '
              />
            </div>
            {!view && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='outline' className='ml-auto'>
                    Columns <ChevronDownIcon className='ml-2 h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className='capitalize'
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }>
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      )
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            {tasks.length > 0 && (
              <>
                <div className='flex justify-center items-center'>
                  <p>
                    {from} al {to} de {total}
                  </p>
                </div>
                <Select
                  value={table.getState().pagination.pageSize.toString()}
                  onValueChange={(e) => table.setPageSize(Number(e))}
                  defaultValue={pageSize.toString()}>
                  <SelectTrigger className='max-w-24'>
                    <SelectValue placeholder={pageSize} />
                  </SelectTrigger>
                  <SelectContent align='end'>
                    {qtyPage.reverse().map((qty) => {
                      if (qty > tasks.length) return
                      return (
                        <SelectItem
                          key={qty}
                          value={qty.toString()}
                          className='capitalize'>
                          {qty === tasks.length ? 'Todos' : qty}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </>
            )}
            {session && session.user && (
              <Avatar
                className={cn(
                  table.getColumn('solicitador')?.getFilterValue() ===
                    session.user?.email &&
                    'ring-2 ring-primary border-background border-4'
                )}
                onClick={() => {
                  if (!table.getColumn('solicitador')?.getFilterValue()) {
                    table
                      .getColumn('solicitador')
                      ?.setFilterValue(session.user?.email)
                    return
                  } else if (
                    table.getColumn('solicitador')?.getFilterValue() !==
                    session.user?.email
                  ) {
                    table
                      .getColumn('solicitador')
                      ?.setFilterValue(session.user?.email)
                    return
                  }
                  table.getColumn('solicitador')?.setFilterValue('')
                }}>
                <AvatarFallback>
                  {session.user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
          <div className='pb-2 flex justify-between p-2 flex-wrap gap-y-4 gap-x-4 relative items-center'>
            <div className='flex gap-4 flex-1 items-center'>
              {types && (
                <Select
                  onValueChange={(e) =>
                    table.getColumn('type')?.setFilterValue(e)
                  }
                  value={
                    (table.getColumn('type')?.getFilterValue() as string) ?? ''
                  }>
                  <SelectTrigger className='max-w-32'>
                    <SelectValue placeholder={'Tipos'} />
                  </SelectTrigger>
                  <SelectContent align='start' className='capitalize'>
                    {types.map((type) => (
                      <SelectItem key={type.id} value={type.name}>
                        {type.name.toLowerCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {projects && (
                <Select
                  onValueChange={(e) => {
                    table.getColumn('project')?.setFilterValue(e)
                  }}
                  value={
                    (table.getColumn('project')?.getFilterValue() as string) ??
                    ''
                  }>
                  <SelectTrigger className='max-w-80'>
                    <SelectValue placeholder={'Proyetos'} />
                  </SelectTrigger>
                  <SelectContent align='start' className='capitalize'>
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.notion}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {users && (
                <Select
                  onValueChange={(e) => {
                    table.getColumn('solicitador')?.setFilterValue(e)
                  }}
                  value={
                    (table
                      .getColumn('solicitador')
                      ?.getFilterValue() as string) ?? ''
                  }>
                  <SelectTrigger className='max-w-44'>
                    <SelectValue placeholder={'Solicitador'} />
                  </SelectTrigger>
                  <SelectContent align='start' className='capitalize'>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.email}>
                        <div className='flex items-center gap-2'>
                          <CircleUserRound className='w-4' />
                          <span>{user.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
            <Button
              onClick={(e) => table.resetColumnFilters()}
              variant={'secondary'}>
              Borrar Filtros
            </Button>
          </div>
          <div className='text-xs pb-2 text-muted-foreground italic text-center'>
            <p>
              {
                'El orden de las tareas se basa en la prioridad y luego en la fecha de creación. '
              }
              <span className='text-foreground not-italic'>
                Recuerda que si todo es importante, nada es importante.
              </span>
            </p>
          </div>
          <div className='flex flex-wrap gap-4 justify-start items-start'>
            {view ? <BoardTask table={table} /> : <TableTask table={table} />}
          </div>
        </div>
      </>
    )
  )
}
