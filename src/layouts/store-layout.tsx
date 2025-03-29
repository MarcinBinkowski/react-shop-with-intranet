import { Store, Home, Package, Users, ShoppingCart, BarChart3 } from "lucide-react"
import { BaseLayout } from "./base-layout"
import type { LayoutProps } from "./types"

const storeNavItems = [
  {
    title: "Main",
    items: [
      {
        name: "Dashboard",
        href: "/",
        icon: <Home className="h-4 w-4" />,
      },
      {
        name: "Products",
        href: "/products",
        icon: <Package className="h-4 w-4" />,
      },
      {
        name: "Customers",
        href: "/customers",
        icon: <Users className="h-4 w-4" />,
      },
    ],
  },
  {
    title: "Sales",
    items: [
      {
        name: "Orders",
        href: "/orders",
        icon: <ShoppingCart className="h-4 w-4" />,
      },
      {
        name: "Analytics",
        href: "/analytics",
        icon: <BarChart3 className="h-4 w-4" />,
      },
    ],
  },
]

const StoreLayout = ({ children }: LayoutProps) => {
  return (
    <BaseLayout icon={<Store className="h-5 w-5" />} title="Shop" navItems={storeNavItems}>
      {children}
    </BaseLayout>
  )
}

export default StoreLayout

