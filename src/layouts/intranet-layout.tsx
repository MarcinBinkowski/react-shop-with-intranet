import { Building2, FileText, Users, Calendar, Briefcase, BarChart3, Package } from "lucide-react"
import { BaseLayout } from "./base-layout"

const intranetNavItems = [
  {
    title: "Company",
    items: [
    //   {
    //     name: "Dashboard",
    //     href: "/intranet",
    //     icon: <Building2 className="h-4 w-4" />,
    //   },
      {
        name: "Products",
        href: "/intranet/products",
        icon: <Package className="h-4 w-4" />,
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
      {
        name: "Customers",
        href: "/intranet/customers",
        icon: <Users className="h-4 w-4" />,
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        name: "Calendar",
        href: "/intranet/calendar",
        icon: <Calendar className="h-4 w-4" />,
      },
      {
        name: "Projects",
        href: "/intranet/projects",
        icon: <Briefcase className="h-4 w-4" />,
      },
      {
        name: "Reports",
        href: "/intranet/reports",
        icon: <BarChart3 className="h-4 w-4" />,
      },
    ],
  },
]

const IntranetLayout = () => {
  return (
    <BaseLayout icon={<Building2 className="h-5 w-5" />} title="Intranet" navItems={intranetNavItems}/>
  )
}

export default IntranetLayout

