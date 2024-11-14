import { ColumnDef } from '@tanstack/react-table'
import { TaskData } from '@/actions/database/tasks/types'
import { Checkbox } from '@/components/ui/checkbox'

export const columns: ColumnDef<TaskData>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => {
      const value = row.getValue('id') as string
      return <div className='capitalize'>{value}</div>
    },
  },
  {
    accessorKey: 'numero_project',
    header: 'Prioridad Proyecto',
    cell: ({ row }) => {
      const value = row.getValue('numero_project') as string
      return <div className='capitalize'>{value}</div>
    },
  },
  {
    accessorKey: 'project',
    header: 'project',
  },
  {
    accessorKey: 'updatedAt',
    header: 'Actualizado',
    cell: ({ row }) => {
      const value = row.getValue('updatedAt') as Date
      return <div className='capitalize'>{value.toLocaleDateString()}</div>
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Creado',
    cell: ({ row }) => {
      const value = row.getValue('createdAt') as Date
      return <div className='capitalize'>{value.toLocaleDateString()}</div>
    },
  },
  {
    accessorKey: 'notion',
    header: 'Notion',
    cell: ({ row }) => {
      const value = row.getValue('notion') as string
      return <div className='capitalize'>{value}</div>
    },
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
    cell: ({ row }) => {
      const value = row.getValue('type') as string
      return <div className='capitalize'>{value.toLowerCase()}</div>
    },
  },
  {
    accessorKey: 'actions',
    header: 'Acción',
    cell: ({ row }) => {
      const value = row.getValue('actions') as TaskData['actions']
      return <div className='capitalize'>{value?.name || ''}</div>
    },
  },
  {
    accessorKey: 'name',
    header: 'Titulo',
    cell: ({ row }) => <div className='capitalize'>{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'solicitador',
    header: 'Solicitador',
    cell: ({ row }) => {
      const value = row.getValue('solicitador') as string
      return <div className='capitalize'>{value}</div>
    },
  },
  {
    accessorKey: 'url',
    header: 'Url',
    cell: ({ row }) => {
      const value = row.getValue('url') as string
      return <div className='capitalize'>{value}</div>
    },
  },
  {
    accessorKey: 'notionUrl',
    header: 'Notion Url',
    cell: ({ row }) => {
      const value = row.getValue('notionUrl') as string
      return <div className='capitalize'>{value}</div>
    },
  },
  {
    accessorKey: 'brands',
    header: 'Marcas',
    cell: ({ row }) => {
      const value = row.getValue('brands') as TaskData['brands']
      const text = value.map((brand) => brand.name.toLowerCase()).join(', ')
      return <div className='capitalize'>{text}</div>
    },
  },
  {
    accessorKey: 'state',
    header: 'Estado',
    cell: ({ row }) => {
      const value = row.getValue('state') as string
      return <div className='capitalize'>{value.toLowerCase()}</div>
    },
  },
  {
    accessorKey: 'description',
    header: 'Descripción',
    cell: ({ row }) => {
      const value = row.getValue('description') as string
      return <div className='capitalize'>{value}</div>
    },
  },
  {
    accessorKey: 'priorities',
    header: 'Prioridad',
    cell: ({ row }) => {
      const value = row.getValue('priorities') as TaskData['priorities']
      return <div className='capitalize'>{value.name}</div>
    },
  },
  {
    accessorKey: 'projects',
    header: 'Projecto',
    cell: ({ row }) => {
      const value = row.getValue('projects') as TaskData['projects']
      return <div className='capitalize'>{value.name}</div>
    },
  },
  {
    accessorKey: 'endDate',
    header: 'Entrega Aprox',
    cell: ({ row }) => {
      const value = row.getValue('endDate') as Date
      return (
        <div className='capitalize'>{value?.toLocaleDateString() || ''}</div>
      )
    },
  },
]
