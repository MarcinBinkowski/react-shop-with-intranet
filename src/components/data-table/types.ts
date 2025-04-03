import { ReactNode } from "react"

export interface DataTableColumn<T> {
  id: string
  header: string
  cell?: (row: T) => ReactNode
  sortable?: boolean
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
  icon?: ReactNode
  onClick: (row: T) => void
  className?: string
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
  getRowId: (row: T) => string | number
  searchPlaceholder?: string
  rowActions?: DataTableAction<T>[]
  onSort?: (columnId: string, direction: "asc" | "desc") => void
  sortColumn?: string
  sortDirection?: "asc" | "desc"
  bulkActions?: DataTableAction<T[]>[]
  mobileCard?: DataTableCardConfig<T>
  renderRowMenu?: (row: T) => React.ReactNode
}