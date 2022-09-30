import React from "react"
import { 
  createRoot 
} from "react-dom/client"
import { 
  QueryClient, 
  QueryClientProvider 
} from "react-query"
import {
  App 
} from "./components/App";

const queryClient = new QueryClient()

const AppWrap = () => (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
)

const container = document.getElementById("root")
const root = createRoot(container)
root.render(<AppWrap />)
