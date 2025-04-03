"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Filter, ArrowUpDown, MoreHorizontal } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

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
  filters?: DataTableFilter<T>[]
  rowActions?: DataTableAction<T>[]
  bulkActions?: DataTableAction<T[]>[]
  searchPlaceholder?: string
  getRowId: (row: T) => string | number
  renderMobileCard?: (row: T, isSelected: boolean, toggleSelect: () => void) => React.ReactNode
  renderRowMenu?: (row: T) => React.ReactNode
}

export function DataTable<T>({
  data,
  columns,
  filters = [],
  rowActions = [],
  bulkActions = [],
  searchPlaceholder = "Search...",
  getRowId,
  renderMobileCard,
  renderRowMenu,
}: DataTableProps<T>) {
  const isMobile = useIsMobile()
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Filter and sort data
  const filteredData = data
    .filter((row) => {
      // Search filter
      const searchMatches =
        searchTerm === "" ||
        columns.some((column) => {
          const value =
            typeof column.accessorKey === "function" ? column.accessorKey(row) : row[column.accessorKey as keyof T]
          return String(value).toLowerCase().includes(searchTerm.toLowerCase())
        })

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

      const valueA = typeof column.accessorKey === "function" ? column.accessorKey(a) : a[column.accessorKey as keyof T]
      const valueB = typeof column.accessorKey === "function" ? column.accessorKey(b) : b[column.accessorKey as keyof T]

      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortDirection === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
      }

      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortDirection === "asc" ? valueA - valueB : valueB - valueA
      }

      return 0
    })

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

  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen)
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

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col gap-4">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={searchPlaceholder}
              className="w-full pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm" onClick={toggleFilters}>
              <Filter className="mr-2 h-4 w-4" />
              Filters {Object.values(activeFilters).some(Boolean) && "(Active)"}
            </Button>

            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                    Sort
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px]">
                  {columns
                    .filter((column) => column.enableSorting !== false)
                    .map((column) => (
                      <DropdownMenuItem key={column.id} onClick={() => handleSort(column.id)}>
                        {column.header} {sortField === column.id && (sortDirection === "asc" ? "↑" : "↓")}
                      </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {selectedRows.length > 0 && bulkActions.length > 0 && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      Actions ({selectedRows.length})
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {bulkActions.map((action, index) => (
                      <DropdownMenuItem
                        key={index}
                        onClick={() => action.onClick(getSelectedRows())}
                        className={action.className}
                      >
                        {action.icon && <span className="mr-2">{action.icon}</span>}
                        {action.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>

          {isFilterOpen && filters.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {filters.map((filter) => (
                <div key={filter.id}>
                  <Label htmlFor={`filter-${filter.id}`}>{filter.label}</Label>
                  <Select
                    value={activeFilters[filter.id] || "all"}
                    onValueChange={(value) => handleFilterChange(filter.id, value)}
                  >
                    <SelectTrigger id={`filter-${filter.id}`}>
                      <SelectValue placeholder={`All ${filter.label}`} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{`All ${filter.label}`}</SelectItem>
                      {filter.options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isMobile && renderMobileCard ? (
          <div className="space-y-4">
            {filteredData.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No items found.</div>
            ) : (
              filteredData.map((row) => {
                const rowId = getRowId(row)
                const isSelected = selectedRows.includes(rowId)
                return renderMobileCard(row, isSelected, () => toggleSelectRow(rowId))
              })
            )}
          </div>
        ) : (
          <div className="rounded-md border overflow-x-auto">
            <Table className="min-w-[800px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox
                      checked={selectedRows.length === filteredData.length && filteredData.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                  {columns.map((column) => (
                    <TableHead
                      key={column.id}
                      className={column.meta?.className}
                      onClick={() => column.enableSorting !== false && handleSort(column.id)}
                      style={{ cursor: column.enableSorting !== false ? "pointer" : "default" }}
                    >
                      {column.header}
                      {sortField === column.id && <span className="ml-2">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                    </TableHead>
                  ))}
                  {(rowActions.length > 0 || renderRowMenu) && <TableHead className="w-[80px]"></TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={columns.length + 2} className="h-24 text-center">
                      No items found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredData.map((row) => {
                    const rowId = getRowId(row)
                    return (
                      <TableRow key={rowId}>
                        <TableCell>
                          <Checkbox
                            checked={selectedRows.includes(rowId)}
                            onCheckedChange={() => toggleSelectRow(rowId)}
                          />
                        </TableCell>
                        {columns.map((column) => (
                          <TableCell key={column.id} className={column.meta?.className}>
                            {column.cell
                              ? column.cell(row)
                              : typeof column.accessorKey === "function"
                                ? column.accessorKey(row)
                                : String(row[column.accessorKey as keyof T] || "")}
                          </TableCell>
                        ))}
                        {(rowActions.length > 0 || renderRowMenu) && (
                          <TableCell>
                            {renderRowMenu ? (
                              renderRowMenu(row)
                            ) : (
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Open menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  {rowActions.map((action, index) => (
                                    <DropdownMenuItem
                                      key={index}
                                      onClick={() => action.onClick(row)}
                                      className={action.className}
                                    >
                                      {action.icon && <span className="mr-2">{action.icon}</span>}
                                      {action.label}
                                    </DropdownMenuItem>
                                  ))}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            )}
                          </TableCell>
                        )}
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
      {/* <CardFooter className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {filteredData.length} of {data.length} items
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </CardFooter> */}
    </Card>
  )
}

