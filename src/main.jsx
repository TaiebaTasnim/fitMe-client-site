import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Route from './Route/Route.jsx'
import AuthProvider from './Provider/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast'
import { HelmetProvider } from 'react-helmet-async';
//import AuthProvider from './Provider/AuthProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <AuthProvider>
      <QueryClientProvider client={queryClient}>
      <HelmetProvider>
      <RouterProvider router={Route} />
      </HelmetProvider>
        </QueryClientProvider>
      
      <Toaster position='top-center' reverseOrder={false} />
      </AuthProvider>
     
     
     
     
    </StrictMode>,
  )
  

