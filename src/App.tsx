import { Toaster } from "../src/components/ui/sonner";
import { Toaster as Sonner } from "../src/components/ui/sonner";
import { TooltipProvider } from "../src/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRouter from "./router/AppRouter";
import { ThemeProvider } from "./components/theme-provider";

function App() {

  return (
<>
<QueryClientProvider client={ new QueryClient}>
    <TooltipProvider>
       <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Toaster />
      <Sonner />
      <AppRouter />
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
</>
  )
}

export default App
