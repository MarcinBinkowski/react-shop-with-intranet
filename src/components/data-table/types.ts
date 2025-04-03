export interface DataTableColumn<T> {
  id: keyof T | 'actions'
  header: string
  cell?: (item: T) => React.ReactNode
  accessorKey?: keyof T
  sortable?: boolean
  className?: string
}

export interface DataTableFilter<T> {
  id: string
  label: string
  options: {
    label: string
    value: string
    filter: (item: T) => boolean
  }[]
}

export interface DataTableAction<T> {
  label: string
  icon?: React.ReactNode
  onClick: (item: T) => void
  variant?: 'default' | 'destructive'
}

export interface DataTableCardConfig<T> {
  primary: {
    title: (item: T) => React.ReactNode
    subtitle?: (item: T) => React.ReactNode
    avatar?: (item: T) => React.ReactNode
  }
  fields: {
    label: string
    value: (item: T) => React.ReactNode
    className?: string
  }[]
  actions?: DataTableAction<T>[]
}

export interface DataTableProps<T> {
  data: T[]
  columns: DataTableColumn<T>[]
  filters?: DataTableFilter<T>[]
  rowActions?: DataTableAction<T>[]
  bulkActions?: DataTableAction<T[]>[]
  searchPlaceholder?: string
  getRowId: (row: T) => string | number
  mobileCard?: DataTableCardConfig<T>
  renderRowMenu?: (row: T) => React.ReactNode
}