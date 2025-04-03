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
import { Filter, ArrowUpDown, Search } from "lucide-react"
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
    if (searchTerm) {
      const matchesSearch = columns.some((column) => {
        let value: any = column.cell ? column.cell(row) : row[column.id]
        
        // Handle different data types
        if (value === null || value === undefined) {
          return false
        }
        
        // Handle numbers
        if (typeof value === 'number') {
          value = value.toString()
        }
        
        // Handle dates
        if (value instanceof Date) {
          value = value.toLocaleDateString()
        }
        
        // Handle objects (including React elements)
        if (typeof value === 'object') {
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
          return false
        }
        console.log()
        return String(value).toLowerCase().includes(searchTerm.toLowerCase())
      })
      if (!matchesSearch) return false
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
    <div className="space-y-4 w-full">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 w-full"
          />
        </div>
        {filters && filters.length > 0 && (
          <div className="flex w-full sm:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                {filters.map((filter) => (
                  <div key={filter.id} className="border-b last:border-0">
                    <div className="px-2 py-1.5 text-sm font-medium">{filter.label}</div>
                    {filter.options.map((option) => (
                      <DropdownMenuCheckboxItem
                        key={option.value}
                        checked={(activeFilters[filter.id] || []).includes(option.value)}
                        onCheckedChange={() => toggleFilter(filter.id, option.value)}
                        className="flex items-center gap-2"
                      >
                        {option.label}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
      <div className="w-full rounded-md border overflow-x-auto">
        <Table className="w-full min-w-full table-fixed">
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column.id}
                  className={column.sortable ? "cursor-pointer select-none whitespace-nowrap" : "whitespace-nowrap"}
                  onClick={() => column.sortable && handleSort(column.id)}
                >
                  <div className="flex items-center gap-2">
                    {column.header}
                    {column.sortable && (
                      <ArrowUpDown className="h-4 w-4" />
                    )}
                    {sortColumn === column.id && (
                      <span className="text-xs text-muted-foreground">
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

