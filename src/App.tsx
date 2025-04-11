
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import Apply from "./pages/Apply";
import Resume from "./pages/Resume";
import CoverLetter from "./pages/CoverLetter";
import JobDetail from "./pages/JobDetail";
import NotFound from "./pages/NotFound";

// Create a client
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/cover-letter" element={<CoverLetter />} />
            <Route path="/job/:id" element={<JobDetail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
