import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '@/components/Layout'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Articles from '@/pages/Articles'
import ArticleDetail from '@/pages/ArticleDetail'
import Contact from '@/pages/Contact'
import Tools from '@/pages/Tools'
import NotFound from '@/pages/NotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'articles', element: <Articles /> },
      { path: 'articles/:slug', element: <ArticleDetail /> },
      { path: 'tools', element: <Tools /> },
      { path: 'contact', element: <Contact /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
