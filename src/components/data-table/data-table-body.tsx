import { TableBody, TableCell, TableRow } from "@/components/ui/table"
import { DataTableColumn, DataTableAction } from "./types"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

interface DataTableBodyProps<T> {
  data: T[]
  columns: DataTableColumn<T>[]
  rowActions?: DataTableAction<T>[]
  getRowId: (row: T) => string | number
}

export function DataTableBody<T>({
  data,
  columns,
  rowActions,
  getRowId,
}: DataTableBodyProps<T>) {
  return (
    <TableBody>
      {data.map((row) => (
        <TableRow key={getRowId(row)}>
          {columns.map((column) => (
            <TableCell key={column.id}>
              <div className="[&>div>svg]:hidden [&>div>svg]:sm:inline-block [&>div>.Avatar]:hidden [&>div>.Avatar]:sm:inline-flex [&>div>div[role=img]]:hidden [&>div>div[role=img]]:sm:inline-flex">
                {column.cell ? column.cell(row) : String(row[column.id as keyof T] ?? '')}
              </div>
            </TableCell>
          ))}
          {rowActions && rowActions.length > 0 && (
            <TableCell className="w-[50px]">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {rowActions.map((action, index) => (
                    <DropdownMenuItem
                      key={index}
                      onClick={() => action.onClick(row)}
                      className={action.className}
                    >
                      {action.icon && (
                        <span className="mr-2">{action.icon}</span>
                      )}
                      {action.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          )}
        </TableRow>
      ))}
    </TableBody>
  )
} 