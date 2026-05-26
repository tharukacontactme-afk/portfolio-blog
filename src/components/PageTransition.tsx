import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

export default function PageTransition() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <div key={location.pathname} className="page-transition">
      <Outlet />
    </div>
  )
}
