import React from "react"
import {
  createRoot 
} from "react-dom/client"
import {
  QueryClient, QueryClientProvider 
} from "react-query"
import {
  App 
} from "./components/App"
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import {
  ErrorPage 
} from "./components/Error"
import {
  ViewCharacter 
} from "./components/Character/ViewCharacter"

const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/view/:charactername', 
    element: <ViewCharacter />,
    errorElement: <ErrorPage />
  }
])

const AppWrap = () => (
  <QueryClientProvider client={queryClient}>
    <div className="container">
      <RouterProvider router={router} />
    </div>
  </QueryClientProvider>
)

const container = document.getElementById("root" )
const root = createRoot(container)
root.render(<AppWrap />)
