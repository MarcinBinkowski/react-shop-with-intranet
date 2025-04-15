import { useState, useMemo } from 'react'
import { DataTableColumn, DataTableFilter } from '../types'

export function useDataTable<T>({
  data,
  columns,
  filters = [],
  getRowId,
}: {
  data: T[]
  columns: DataTableColumn<T>[]
  filters?: DataTableFilter<T>[]
  getRowId: (row: T) => string | number
}) {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([])

  const getCellValue = (column: DataTableColumn<T>, row: T): React.ReactNode => {
    if (column.cell) {
      return column.cell(row)
    }
    return ''
  }

  const filteredData = useMemo(() => {
    return data
      .filter((row) => {
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
        if (!sortField) return 0

        const column = columns.find((col) => col.id === sortField)
        if (!column) return 0

        const valueA = getCellValue(column, a)
        const valueB = getCellValue(column, b)

        if (typeof valueA === "string" && typeof valueB === "string") {
          return sortDirection === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
        }

        if (typeof valueA === "number" && typeof valueB === "number") {
          return sortDirection === "asc" ? valueA - valueB : valueB - valueA
        }

        return 0
      })
  }, [data, columns, filters, searchTerm, activeFilters, sortField, sortDirection])

  const handleSort = (columnId: string) => {
    if (sortField === columnId) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(columnId)
      setSortDirection("asc")
    }
  }

  const toggleSelectAll = () => {
    if (selectedRows.length === filteredData.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(filteredData.map((row) => getRowId(row)))
    }
  }

  const toggleSelectRow = (id: string | number) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id))
    } else {
      setSelectedRows([...selectedRows, id])
    }
  }

  const handleFilterChange = (filterId: string, value: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterId]: value === "all" ? "" : value,
    }))
  }

  const getSelectedRows = () => {
    return data.filter((row) => selectedRows.includes(getRowId(row)))
  }

  return {
    searchTerm,
    setSearchTerm,
    activeFilters,
    sortField,
    sortDirection,
    selectedRows,
    filteredData,
    handleSort,
    toggleSelectAll,
    toggleSelectRow,
    handleFilterChange,
    getSelectedRows,
    getCellValue,
  }
}