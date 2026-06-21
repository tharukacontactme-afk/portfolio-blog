import PageTransition from './PageTransition'
import BackToTop from './BackToTop'
import Footer from './Footer'
import Header from './Header'

export default function Layout() {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto] bg-surface">
      <Header />
      <main className="relative min-w-0">
        <PageTransition />
        <BackToTop />
      </main>
      <Footer />
    </div>
  )
}
