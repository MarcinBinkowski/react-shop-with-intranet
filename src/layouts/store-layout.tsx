import { Store, Home, Package, Users, ShoppingCart, BarChart3, ShoppingBasket } from "lucide-react"
import { BaseLayout } from "./base-layout"

const storeNavItems = [
  {
    title: "Main",
    items: [
      {
        name: "Shop",
        href: "/shop",
        icon: <ShoppingCart className="h-4 w-4" />,
      },
      {
        name: "Cart",
        href: "/cart",
        icon: <ShoppingBasket className="h-4 w-4" />,
      },

    ],
  }
]

const StoreLayout = () => {
  return (
    <BaseLayout icon={<Store className="h-5 w-5" />} title="Shop" navItems={storeNavItems}/>
  )
}

export default StoreLayout

