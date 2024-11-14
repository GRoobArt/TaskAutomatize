'use client'

import { use, useState } from 'react'
import { ChevronDown, RefreshCcw, CloudDownload } from 'lucide-react'
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
import { getUser } from '@/actions/database/users'
import { ProjectContext } from '@/providers/projects'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { usePromine } from '@/hooks/usePromise'
import { useSession } from 'next-auth/react'
import { Column } from '@tanstack/react-table'
import { ProjectData } from '@/actions/database/projects/types'
import { generateScaleNumber } from '@/scripts/generateScaleNumber'

export const HeadTable = ({ ...table }) => {
  const { projects, downloadAll, refreshAll } = use(ProjectContext)
  const { data: session } = useSession()
  const { data: user } = usePromine(() =>
    getUser(session?.user?.email as string)
  )
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(5)

  if (!projects) return

  const totalRows = projects.length > 0 ? projects.length : 0
  const qtyPage = generateScaleNumber(projects.length)

  const from = pageIndex * pageSize + 1
  const to = table.getState().pagination.pageSize
  const total = totalRows

  return (
    projects && (
      <>
        <div className='flex-1 flex items-center flex-wrap gap-4 w-full justify-between'>
          <Input
            placeholder='Filter names...'
            className='w-full flex-1'
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('name')?.setFilterValue(event.target.value)
            }
          />
          <div className='flex gap-4'>
            {user?.role === 'ADMIN' && (
              <>
                <Button
                  variant='outline'
                  size={'icon'}
                  onClick={() => downloadAll()}>
                  <CloudDownload className='h-[1.2rem] w-[1.2rem]' />
                </Button>
                <Button
                  variant='outline'
                  size={'icon'}
                  onClick={() => refreshAll()}>
                  <RefreshCcw className='h-[1.2rem] w-[1.2rem]' />
                </Button>
              </>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline'>
                  Columns <ChevronDown className='ml-2 h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {table
                  .getAllColumns()
                  .filter((col: Column<ProjectData>) => col.getCanHide())
                  .map((col: Column<ProjectData>) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={col.id}
                        className='capitalize'
                        checked={col.getIsVisible()}
                        onCheckedChange={(value) =>
                          col.toggleVisibility(!!value)
                        }>
                        {col.id}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {projects.length > 0 && (
            <div className='flex gap-2 items-center w-fit'>
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
                    if (qty > projects.length) return
                    return (
                      <SelectItem
                        key={qty}
                        value={qty.toString()}
                        className='capitalize'>
                        {qty === projects.length ? 'Todos' : qty}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </>
    )
  )
}
