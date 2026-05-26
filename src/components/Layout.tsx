import PageTransition from './PageTransition'
import BackToTop from './BackToTop'
import Sidebar from './Sidebar'

export default function Layout() {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[30%_70%]">
      <Sidebar />
      <main className="relative min-h-screen min-w-0 bg-surface-elevated">
        <PageTransition />
        <BackToTop />
      </main>
    </div>
  )
}
