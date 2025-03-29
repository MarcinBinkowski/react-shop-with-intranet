import { Building2, FileText, Users, Calendar } from "lucide-react"
import { BaseLayout } from "./base-layout"
import type { LayoutProps } from "./types"

const intranetNavItems = [
  {
    title: "Company",
    items: [
      {
        name: "Dashboard",
        href: "/intranet",
        icon: <Building2 className="h-4 w-4" />,
      },
      {
        name: "Documents",
        href: "/intranet/documents",
        icon: <FileText className="h-4 w-4" />,
      },
      {
        name: "Team",
        href: "/intranet/team",
        icon: <Users className="h-4 w-4" />,
      },
    ],
  },
  {
    title: "Resources",
    items: [
      {
        name: "Products",
        href: "/intranet/products",
        icon: <Calendar className="h-4 w-4" />,
      },
    ],
  },
]

const IntranetLayout = ({ children }: LayoutProps) => {
  return (
    <BaseLayout icon={<Building2 className="h-5 w-5" />} title="Intranet" navItems={intranetNavItems}>
      {children}
    </BaseLayout>
  )
}

export default IntranetLayout

