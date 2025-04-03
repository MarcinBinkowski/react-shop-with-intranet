import { DataTableAction } from "./data-table"

export interface DataTableCardConfig<T> {
  primary: {
    title: (row: T) => React.ReactNode
    subtitle?: (row: T) => React.ReactNode
  }
  fields: {
    label: string
    value: (row: T) => React.ReactNode
    className?: string
  }[]
  actions?: DataTableAction<T>[]
}