import { Building2, FileText, Users, Calendar, Briefcase, BarChart3, Package, User } from "lucide-react"
import { BaseLayout } from "@/layouts/base-layout"

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
        name: "Users",
        href: "/intranet/users",
        icon: <User className="h-4 w-4" />,
      },

    ],
  }
]

const IntranetLayout = () => {
  return (
    <BaseLayout icon={<Building2 className="h-5 w-5" />} title="Intranet" navItems={intranetNavItems}/>
  )
}

export default IntranetLayout

