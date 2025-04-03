import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { DataTableColumn, DataTableAction } from "./types"

interface DataTableBodyProps<T> {
  data: T[]
  columns: DataTableColumn<T>[]
  rowActions?: DataTableAction<T>[]
  selectedRows: (string | number)[]
  onToggleSelectAll: () => void
  onToggleSelectRow: (id: string | number) => void
  onRowAction: (action: DataTableAction<T>, row: T) => void
  getRowId: (row: T) => string | number
  renderRowMenu?: (row: T) => React.ReactNode
  getCellValue: (column: DataTableColumn<T>, row: T) => React.ReactNode
}

export function DataTableBody<T>({
  data,
  columns,
  rowActions = [],
  selectedRows,
  onToggleSelectAll,
  onToggleSelectRow,
  onRowAction,
  getRowId,
  renderRowMenu,
  getCellValue,
}: DataTableBodyProps<T>) {
  return (
    <div className="rounded-md border overflow-x-auto">
      <Table className="min-w-[800px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]">
              <Checkbox
                checked={selectedRows.length === data.length && data.length > 0}
                onCheckedChange={onToggleSelectAll}
              />
            </TableHead>
            {columns.map((column) => (
              <TableHead
                key={String(column.id)}
                className={column.className}
              >
                {column.header}
              </TableHead>
            ))}
            {(rowActions.length > 0 || renderRowMenu) && <TableHead className="w-[80px]"></TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length + 2} className="h-24 text-center">
                No items found.
              </TableCell>
            </TableRow>
          ) : (
            data.map((row) => {
              const rowId = getRowId(row)
              return (
                <TableRow key={rowId}>
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(rowId)}
                      onCheckedChange={() => onToggleSelectRow(rowId)}
                    />
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell key={String(column.id)} className={column.className}>
                      {getCellValue(column, row)}
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
                                onClick={() => onRowAction(action, row)}
                                className={action.variant}
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
  )
} 