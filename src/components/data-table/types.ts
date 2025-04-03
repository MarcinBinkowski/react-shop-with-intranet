export interface DataCardProps {
    title: string
    value: string | number
    description?: string
    icon?: React.ReactNode
    className?: string
  }
  
export interface DataTableColumn<T> {
  id: string
  header: string
  accessorKey: keyof T | ((row: T) => any)
  cell?: (row: T) => React.ReactNode
  enableSorting?: boolean
  meta?: {
    className?: string
  }
}

export interface DataTableFilter<T> {
  id: string
  label: string
  options: {
    label: string
    value: string
    filter: (row: T) => boolean
  }[]
}

export interface DataTableAction<T> {
  label: string
  icon?: React.ReactNode
  onClick: (row: T) => void
  className?: string
}

export interface DataTableProps<T> {
  data: T[]
  columns: DataTableColumn<T>[]
  mobileCard?: DataTableCardConfig<T>
  filters?: DataTableFilter<T>[]
  rowActions?: DataTableAction<T>[]
  bulkActions?: DataTableAction<T[]>[]
  searchPlaceholder?: string
  getRowId: (row: T) => string | number
  renderRowMenu?: (row: T) => React.ReactNode
}

export interface DataTableCardConfig<T> {
    primary: {
      title: (row: T) => React.ReactNode
      subtitle?: (row: T) => React.ReactNode
      avatar?: (row: T) => React.ReactNode
    }
    fields: {
      label: string
      value: (row: T) => React.ReactNode
      className?: string
    }[]
    actions?: {
      label: string
      icon?: React.ReactNode
      onClick: (row: T) => void
      variant?: 'default' | 'destructive'
    }[]
  }