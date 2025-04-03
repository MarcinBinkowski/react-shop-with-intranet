"use client"

import { useState } from "react"
import { DataTableProps } from "./types"
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { DataTableBody } from "./data-table-body"
import { Button } from "@/components/ui/button"
import { Filter, ArrowUpDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  getRowId,
  searchPlaceholder = "Search...",
  rowActions,
  filters,
  onSort,
  sortColumn,
  sortDirection,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({})

  const filteredData = data.filter((row) => {
    // Apply search term filter
    if (searchTerm) {
      const matchesSearch = columns.some((column) => {
        const value = column.cell
          ? String(column.cell(row))
          : String(row[column.id] ?? "")
        return value.toLowerCase().includes(searchTerm.toLowerCase())
      })
      if (!matchesSearch) return false
    }

    // Apply column filters
    if (filters) {
      for (const filter of filters) {
        const selectedValues = activeFilters[filter.id] || []
        if (selectedValues.length > 0) {
          const matchesFilter = selectedValues.some((value) => {
            const option = filter.options.find((opt) => opt.value === value)
            return option?.filter(row)
          })
          if (!matchesFilter) return false
        }
      }
    }

    return true
  })

  const toggleFilter = (filterId: string, value: string) => {
    setActiveFilters((prev) => {
      const currentValues = prev[filterId] || []
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value]
      return {
        ...prev,
        [filterId]: newValues,
      }
    })
  }

  const handleSort = (columnId: string) => {
    if (!onSort) return

    if (sortColumn === columnId) {
      onSort(columnId, sortDirection === "asc" ? "desc" : "asc")
    } else {
      onSort(columnId, "asc")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Input
          placeholder={searchPlaceholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        {filters && filters.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="ml-auto">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              {filters.map((filter) => (
                <div key={filter.id} className="px-2 py-1.5">
                  <div className="text-sm font-medium">{filter.label}</div>
                  {filter.options.map((option) => (
                    <DropdownMenuCheckboxItem
                      key={option.value}
                      checked={(activeFilters[filter.id] || []).includes(option.value)}
                      onCheckedChange={() => toggleFilter(filter.id, option.value)}
                    >
                      {option.label}
                    </DropdownMenuCheckboxItem>
                  ))}
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column.id}
                  className={column.sortable ? "cursor-pointer select-none" : ""}
                  onClick={() => column.sortable && handleSort(column.id)}
                >
                  <div className="flex items-center gap-2">
                    {column.header}
                    {column.sortable && (
                      <ArrowUpDown className="h-4 w-4" />
                    )}
                    {sortColumn === column.id && (
                      <span className="text-xs">
                        {sortDirection === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </TableHead>
              ))}
              {rowActions && rowActions.length > 0 && (
                <TableHead className="w-[50px]"></TableHead>
              )}
            </TableRow>
          </TableHeader>
          <DataTableBody
            data={filteredData}
            columns={columns}
            rowActions={rowActions}
            getRowId={getRowId}
          />
        </Table>
      </div>
    </div>
  )
}

