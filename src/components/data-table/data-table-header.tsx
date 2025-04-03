import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Filter, ArrowUpDown } from "lucide-react"
import { DataTableColumn, DataTableFilter, DataTableAction } from "./types"

interface DataTableHeaderProps<T> {
  columns: DataTableColumn<T>[]
  filters?: DataTableFilter<T>[]
  bulkActions?: DataTableAction<T[]>[]
  searchPlaceholder?: string
  searchTerm: string
  onSearchChange: (value: string) => void
  activeFilters: Record<string, string>
  onFilterChange: (filterId: string, value: string) => void
  onSort: (columnId: string) => void
  sortField: string | null
  sortDirection: "asc" | "desc"
  selectedRowsCount: number
  onBulkAction: (action: DataTableAction<T[]>) => void
  isFilterOpen: boolean
  onToggleFilters: () => void
}

export function DataTableHeader<T>({
  columns,
  filters = [],
  bulkActions = [],
  searchPlaceholder = "Search...",
  searchTerm,
  onSearchChange,
  activeFilters,
  onFilterChange,
  onSort,
  sortField,
  sortDirection,
  selectedRowsCount,
  onBulkAction,
  isFilterOpen,
  onToggleFilters,
}: DataTableHeaderProps<T>) {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder={searchPlaceholder}
          className="w-full pl-8"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={onToggleFilters}>
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
                .filter((column) => column.sortable !== false)
                .map((column) => (
                  <DropdownMenuItem key={String(column.id)} onClick={() => onSort(String(column.id))}>
                    {column.header} {sortField === String(column.id) && (sortDirection === "asc" ? "↑" : "↓")}
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {selectedRowsCount > 0 && bulkActions.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Actions ({selectedRowsCount})
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {bulkActions.map((action, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={() => onBulkAction(action)}
                    className={action.variant}
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
                onValueChange={(value) => onFilterChange(filter.id, value)}
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
  )
} 