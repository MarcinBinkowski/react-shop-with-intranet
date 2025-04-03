import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DataMetric {
  title: string
  value: string | number
  description?: string
  icon?: React.ReactNode
}

interface DataMetricsProps {
  metrics: DataMetric[]
}

export function DataMetrics({ metrics }: DataMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              {metric.icon && <div className="text-muted-foreground">{metric.icon}</div>}
              <div>
                <div className="text-2xl font-bold">{metric.value}</div>
                {metric.description && <p className="text-xs text-muted-foreground">{metric.description}</p>}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

