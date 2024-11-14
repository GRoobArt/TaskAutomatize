import { useState } from 'react'
import { TaskData } from '@/actions/database/tasks/types'
import { ColumnBoard } from './columns'
import { CardTask } from '@/components/task/card'
import { Table as TableType } from '@tanstack/react-table'

interface ColsTaskProps {
  name: string
  view: boolean
  value: string
  color: string
}

export const BoardTask = ({ table }: { table: TableType<TaskData> }) => {
  const [cols, setCols] = useState([
    {
      name: 'Estimación',
      view: true,
      value: 'Estimacion',
      color: 'gray',
    },
    {
      name: 'Backlog',
      view: true,
      value: 'Backlog',
      color: 'zinc',
    },
    {
      name: 'En Proceso',
      view: true,
      value: 'Proceso',
      color: 'blue',
    },
    {
      name: 'Seguimiento',
      view: true,
      value: 'Seguimiento',
      color: 'yellow',
    },
    {
      name: 'Completada',
      view: false,
      value: 'Completada',
      color: 'green',
    },
    {
      name: 'Cancelada',
      view: false,
      value: 'Cancelada',
      color: 'red',
    },
  ])

  const onChangeView = (col: ColsTaskProps) => {
    setCols([
      ...cols.map((c) => {
        if (c.value === col.value) {
          return {
            ...c,
            view: !c.view,
          }
        }
        return c
      }),
    ])
  }

  return (
    <div className='flex flex-col lg:flex-row w-full gap-4 overflow-auto lg:pb-3 items-start relative'>
      {table &&
        cols.map((col) => {
          if (col.view)
            return (
              <ColumnBoard
                key={col.value}
                {...col}
                onClick={() => onChangeView(col)}>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => {
                    if (row.original.state === col.value)
                      return <CardTask key={row.id} row={row} />
                  })
                ) : (
                  <>No results...</>
                )}
              </ColumnBoard>
            )
        })}
      <div className='flex flex-row lg:flex-col gap-2'>
        {table &&
          cols.map((col) => {
            if (!col.view)
              return (
                <ColumnBoard
                  key={col.value}
                  {...col}
                  onClick={() => onChangeView(col)}
                />
              )
          })}
      </div>
    </div>
  )
}
