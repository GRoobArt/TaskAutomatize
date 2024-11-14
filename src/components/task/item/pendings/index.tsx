'use client'

import { use, useState } from 'react'
import { Columns3, Table, ChevronDownIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CardTask } from '@/components//task/card'
import { TaskData } from '@/actions/database/tasks/types'
import { TaskContext } from '@/providers/taks'
import { Button } from '@/components/ui/button'
import { TablePending } from '@/components/task/table/pendings'
import { columns } from '@/components/task/colums'
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
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
import { Input } from '@/components/ui/input'

export const ViewPendings = () => {
  const { pending } = use(TaskContext)
  const [view, setView] = useState(true)

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    id: false,
    notion: false,
    priorities: false,
    description: false,
    solicitador: false,
    notionUrl: false,
    url: false,
    state: false,
    project: false,
    numero_project: false,
  })
  const [rowSelection, setRowSelection] = useState({})
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(5)

  const table = useReactTable({
    data: pending as TaskData[],
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
  })

  const totalRows = pending && pending?.length > 0 ? pending?.length : 0

  const qtyPage = [5, 10, 20, 40, 60, 80, 100]

  const from = pageIndex * pageSize + 1
  const to = table.getState().pagination.pageSize
  const total = totalRows

  return (
    pending && (
      <>
        <div>
          <div className='pb-2 flex justify-between p-2 flex-wrap gap-y-4 gap-x-4 relative'>
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

            {pending.length > 0 && (
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
                    {qtyPage.map((qty) => {
                      if (qty > pending.length) return
                      return (
                        <SelectItem
                          key={qty}
                          value={qty.toString()}
                          className='capitalize'>
                          {qty}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </>
            )}
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
            {view ? (
              table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => {
                  return <CardTask key={row.id} row={row} />
                })
              ) : (
                <h3 className='font-bold flex-1 text-center'>No Results</h3>
              )
            ) : (
              <TablePending table={table} />
            )}
          </div>
        </div>
      </>
    )
  )
}
