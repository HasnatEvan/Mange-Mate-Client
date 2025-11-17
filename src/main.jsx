import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from "react-router-dom";
import { router } from './Router/Router.jsx';
import AuthProviders from './Providers/AuthProviders.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast'; // <- import Toaster

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProviders>
      <QueryClientProvider client={queryClient}>
        <div className='bg-white'>
          {/* Global toast container */}
          <Toaster 
            position="top-center" 
            reverseOrder={false} 
          />
          <RouterProvider router={router} />
        </div>
      </QueryClientProvider>
    </AuthProviders>
  </StrictMode>,
);
