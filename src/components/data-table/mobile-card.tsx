import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import type { DataTableCardConfig } from "./types"

interface MobileCardProps<T> {
  row: T
  config: DataTableCardConfig<T>
  isSelected: boolean
  onToggleSelect: () => void
}

export function MobileCard<T>({ row, config, isSelected, onToggleSelect }: MobileCardProps<T>) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">{config.primary.title(row)}</div>
            {config.primary.subtitle && (
              <div className="text-sm text-muted-foreground">
                {config.primary.subtitle(row)}
              </div>
            )}
          </div>
          <Checkbox checked={isSelected} onCheckedChange={onToggleSelect} />
        </div>
      </CardHeader>
      <CardContent className="grid gap-2">
        {config.fields.map((field, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{field.label}:</span>
            <span className={field.className}>{field.value(row)}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}