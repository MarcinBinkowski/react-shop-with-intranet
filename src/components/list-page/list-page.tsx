import { useState, useMemo } from "react"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableColumn, DataTableAction, DataTableFilter } from "@/components/data-table/types"
import { PageHeader } from "@/components/page-header/page-header"
import { LucideIcon } from "lucide-react"

interface ListPageProps<T extends Record<string, any>> {
  title: string
  description: string
  data: T[]
  columns: DataTableColumn<T>[]
  filters: DataTableFilter<T>[]
  rowActions: DataTableAction<T>[]
  getRowId: (row: T) => string | number
  searchPlaceholder: string
  action?: {
    label: string
    icon?: LucideIcon
    dialog?: {
      title: string
      description: string
      fields: {
        id: string
        label: string
        type: "text" | "email" | "number" | "select"
        placeholder?: string
        options?: { label: string; value: string }[]
        className?: string
      }[]
      layout?: "single" | "double"
      submitLabel?: string
    }
  }
}

export function ListPage<T extends Record<string, any>>({
  title,
  description,
  data,
  columns,
  filters,
  rowActions,
  getRowId,
  searchPlaceholder,
  action,
}: ListPageProps<T>) {
  const [sortColumn, setSortColumn] = useState<string>()
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilters, setActiveFilters] = useState({})

  const getCellValue = (column: DataTableColumn<T>, row: T): any => {
    // If there's a custom cell renderer, get the raw value from the row
    if (column.cell) {
      return row[column.id as keyof T]
    }
    return row[column.id as keyof T]
  }

  const filteredData = useMemo(() => {
    return data
      .filter((row) => {
        // Search filter - only search by name
        const searchMatches =
          searchTerm === "" ||
          String(getCellValue(columns.find(col => col.id === "name")!, row))
            .toLowerCase()
            .includes(searchTerm.toLowerCase())

        // Custom filters
        const filterMatches = Object.entries(activeFilters).every(([filterId, filterValue]) => {
          if (!filterValue) return true
          const filter = filters.find((f) => f.id === filterId)
          if (!filter) return true
          const option = filter.options.find((o) => o.value === filterValue)
          return option ? option.filter(row) : true
        })

        return searchMatches && filterMatches
      })
      .sort((a, b) => {
        if (!sortColumn) return 0

        const column = columns.find((col) => col.id === sortColumn)
        if (!column) return 0

        const valueA = getCellValue(column, a)
        const valueB = getCellValue(column, b)

        if (typeof valueA === "string" && typeof valueB === "string") {
          return sortDirection === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
        }

        if (typeof valueA === "number" && typeof valueB === "number") {
          return sortDirection === "asc" ? valueA - valueB : valueB - valueA
        }

        // Handle date strings
        if (typeof valueA === "string" && typeof valueB === "string" && 
            valueA.includes("T") && valueB.includes("T")) {
          const dateA = new Date(valueA).getTime()
          const dateB = new Date(valueB).getTime()
          return sortDirection === "asc" ? dateA - dateB : dateB - dateA
        }

        return 0
      })
  }, [data, columns, filters, searchTerm, activeFilters, sortColumn, sortDirection])

  const handleSort = (columnId: string, direction: "asc" | "desc") => {
    setSortColumn(columnId)
    setSortDirection(direction)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={title}
        description={description}
        action={action}
      />

      <DataTable
        data={filteredData}
        columns={columns}
        getRowId={getRowId}
        searchPlaceholder={searchPlaceholder}
        rowActions={rowActions}
        filters={filters}
        onSort={handleSort}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
      />
    </div>
  )
} 