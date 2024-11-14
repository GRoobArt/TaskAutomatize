'use client'

import { useState, use } from 'react'
import {
  AccordionContent,
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { CircleX } from 'lucide-react'
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ProjectData } from '@/actions/database/projects/types'
import { ProjectContext } from '@/providers/projects'
import { ColumnProject } from './colums'
import { HeadTable } from './head'
import { FormUpdateAccess } from '../form'
import { cn } from '@/lib/utils'
import { StepBack, StepForward } from 'lucide-react'
import { generateScaleNumber } from '@/scripts/generateScaleNumber'

export const TableProject = () => {
  const { projects, project, notView } = use(ProjectContext)
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'priority',
      desc: false,
    },
    {
      id: 'createdAt',
      desc: false,
    },
  ])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    createdAt: false,
    notion: false,
    complete: false,
    count: false,
    status: false,
    access: false,
  })
  const [rowSelection, setRowSelection] = useState({})
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(5)

  const table = useReactTable({
    data: projects as ProjectData[],
    columns: ColumnProject,
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

  if (!projects) return

  const totalRows = projects.length > 0 ? projects.length : 0
  const qtyPage = generateScaleNumber(projects.length)

  const from = pageIndex * pageSize + 1
  const to = table.getState().pagination.pageSize
  const total = totalRows

  return (
    projects && (
      <>
        <AccordionContent className='p-2 flex flex-wrap lg:relative'>
          <HeadTable {...table} />
          {projects && (
            <>
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id} className='p-2'>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        )
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && 'selected'}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id} className='p-2'>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={ColumnProject.length}
                        className='h-24 text-center'>
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              {project && (
                <div
                  className={cn(
                    'bg-muted px-4 py-3 w-full fixed',
                    'min-w-56 space-y-2 bottom-0 left-0',
                    'lg:right-0 lg:h-full lg:max-w-sm lg:absolute lg:bottom-auto lg:left-auto lg:rounded-s-lg lg:ltr'
                  )}>
                  <div className='flex gap-2 items-center relative'>
                    <Button
                      size={'icon'}
                      onClick={(e) => notView()}
                      className='w-10 h-10 rounded-full bottom-[90%] right-0 absolute lg:bottom-auto lg:right-full lg:w-8 lg:h-8 '>
                      <CircleX className='w-[12px] h-[12px]' />
                    </Button>
                    <h3 className='text-xl font-bold lg:pl-3'>
                      {project.name}
                    </h3>
                  </div>
                  <Accordion
                    type='single'
                    collapsible
                    className='w-full lg:w-auto min-w-80 flex-1'
                    defaultValue='item-1'>
                    <AccordionItem value='item-1'>
                      <AccordionTrigger className='font-bold'>
                        Actualizar Accesos
                      </AccordionTrigger>
                      <AccordionContent>
                        <FormUpdateAccess {...project} />
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              )}
            </>
          )}
          <div className='flex items-center justify-between space-x-2 py-4 w-full'>
            <div className='flex-1 text-sm text-muted-foreground'>
              {from} - {to} of {total}
            </div>
            <div className='space-x-2'>
              <Button
                variant='outline'
                size='icon'
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}>
                <StepBack className='w-4' />
              </Button>
              <Button
                variant='outline'
                size='icon'
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}>
                <StepForward className='w-4' />
              </Button>
            </div>
          </div>
        </AccordionContent>
      </>
    )
  )
}
