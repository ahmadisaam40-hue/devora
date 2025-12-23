import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Students from "./pages/Students";
import Business from "./pages/Business";
import Contact from "./pages/Contact";
import Portfolio from "./pages/Portfolio";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

import { LanguageProvider } from "@/contexts/LanguageContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/students" element={<Students />} />
          <Route path="/business" element={<Business />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/devora-admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
