
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
import CoverLetterAIForm from "./pages/CoverLetterAIForm";
import JobDetail from "./pages/JobDetail";
import PartTimeJobs from "./pages/PartTimeJobs";
import NearbyJobs from "./pages/NearbyJobs";
import EducationInfo from "./pages/EducationInfo";
import NotFound from "./pages/NotFound";
import ResumeForm from "./pages/ResumeForm";

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
            <Route path="/resume/create" element={<ResumeForm />} />
            <Route path="/resume/edit/:id" element={<ResumeForm />} />
            <Route path="/cover-letter" element={<CoverLetter />} />
            <Route path="/cover-letter/ai-create" element={<CoverLetterAIForm />} />
            <Route path="/cover-letter/create" element={<ResumeForm />} /> {/* Reusing ResumeForm for now */}
            <Route path="/cover-letter/edit/:id" element={<ResumeForm />} /> {/* Reusing ResumeForm for now */}
            <Route path="/job/:id" element={<JobDetail />} />
            <Route path="/jobs/part-time" element={<PartTimeJobs />} />
            <Route path="/jobs/nearby" element={<NearbyJobs />} />
            <Route path="/education" element={<EducationInfo />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
