// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import type * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import StoreLayout from "./layouts/store-layout";

interface AppLayoutProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        refetchOnWindowFocus: false,
      },
    },
  })

function App({ children }: AppLayoutProps) {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
        <Routes>
        <Route path="/" element={<StoreLayout />}>
            {/* Add more intranet routes */}
        </Route>

        </Routes>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>)
}

export default App;
