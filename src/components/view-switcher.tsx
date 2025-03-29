"use client"

import { useLocation, useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { Store, Building2 } from "lucide-react"

export function ViewSwitcher() {
  const navigate = useNavigate()
  const location = useLocation()

  const isInIntranet = location.pathname.startsWith("/intranet")

  const handleSwitch = () => {
    if (isInIntranet) {
      navigate("/")
    } else {
      navigate("/intranet")
    }
  }

  return (
    <Button onClick={handleSwitch} variant="outline" className="flex items-center gap-2">
      {isInIntranet ? (
        <>
          <Store className="h-4 w-4" />
          <span>View Store</span>
        </>
      ) : (
        <>
          <Building2 className="h-4 w-4" />
          <span>View Intranet</span>
        </>
      )}
    </Button>
  )
}

