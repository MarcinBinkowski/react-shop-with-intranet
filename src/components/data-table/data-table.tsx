"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useIsMobile } from "@/hooks/use-mobile"
import { DataTableProps } from "./types"
import { useDataTable } from "./hooks/use-data-table"
import { DataTableHeader } from "./data-table-header"
import { DataTableBody } from "./data-table-body"
import { MobileCard } from "./mobile-card"

export function DataTable<T>({
  data,
  columns,
  filters = [],
  rowActions = [],
  bulkActions = [],
  searchPlaceholder = "Search...",
  getRowId,
  mobileCard,
  renderRowMenu,
}: DataTableProps<T>) {
  const isMobile = useIsMobile()
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const {
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
  } = useDataTable({
    data,
    columns,
    filters,
    getRowId,
  })

  const handleBulkAction = (action: typeof bulkActions[number]) => {
    action.onClick(getSelectedRows())
  }

  const handleRowAction = (action: typeof rowActions[number], row: T) => {
    action.onClick(row)
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <DataTableHeader
          columns={columns}
          filters={filters}
          bulkActions={bulkActions}
          searchPlaceholder={searchPlaceholder}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          onSort={handleSort}
          sortField={sortField}
          sortDirection={sortDirection}
          selectedRowsCount={selectedRows.length}
          onBulkAction={handleBulkAction}
          isFilterOpen={isFilterOpen}
          onToggleFilters={() => setIsFilterOpen(!isFilterOpen)}
        />
      </CardHeader>
      <CardContent>
        {isMobile && mobileCard ? (
          <div className="space-y-4">
            {filteredData.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No items found.</div>
            ) : (
              filteredData.map((row) => {
                const rowId = getRowId(row)
                const isSelected = selectedRows.includes(rowId)
                return (
                  <MobileCard
                    key={rowId}
                    row={row}
                    config={mobileCard}
                    isSelected={isSelected}
                    onToggleSelect={() => toggleSelectRow(rowId)}
                  />
                )
              })
            )}
          </div>
        ) : (
          <DataTableBody
            data={filteredData}
            columns={columns}
            rowActions={rowActions}
            selectedRows={selectedRows}
            onToggleSelectAll={toggleSelectAll}
            onToggleSelectRow={toggleSelectRow}
            onRowAction={handleRowAction}
            getRowId={getRowId}
            renderRowMenu={renderRowMenu}
            getCellValue={getCellValue}
          />
        )}
      </CardContent>
    </Card>
  )
}

