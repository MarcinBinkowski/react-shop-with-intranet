import { Building2, FileText, Package, User, DollarSign, BriefcaseBusiness, Bell, Star} from "lucide-react"
import { BaseLayout } from "@/layouts/base-layout"

const intranetNavItems = [
  {
    title: "Company",
    items: [
      {
        name: "Products",
        href: "/intranet/products",
        icon: <Package className="h-4 w-4" />,
      },
      {
        name: "Employee",
        href: "/intranet/employees",
        icon: <BriefcaseBusiness className="h-4 w-4" />,
      },
      {
        name: "Users",
        href: "/intranet/users",
        icon: <User className="h-4 w-4" />,
      },
      {
        name: "Invoices",
        href: "/intranet/invoices",
        icon: <FileText className="h-4 w-4" />,
      },
      {
        name: "Orders",
        href: "/intranet/orders",
        icon: <Package className="h-4 w-4" />,
      },
      {
        name: "Payments",
        href: "/intranet/payments",
        icon: <DollarSign className="h-4 w-4" />,
      },
      {
        name: "Notifications",
        href: "/intranet/notifications",
        icon: <Bell className="h-4 w-4" />,
      },
      {
        name: "Ratings",
        href: "/intranet/ratings",
        icon: <Star className="h-4 w-4" />,
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

