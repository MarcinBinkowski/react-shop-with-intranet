import type * as React from "react";
import { BrowserRouter} from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import AppRoutes from "./router";


const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        refetchOnWindowFocus: false,
      },
    },
  })

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
        <AppRoutes/>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>)
}

export default App;
