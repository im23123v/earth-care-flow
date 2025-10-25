import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Pickup from "./pages/Pickup";
import DropOff from "./pages/DropOff";
import Impact from "./pages/Impact";
import Learn from "./pages/Learn";
import Rewards from "./pages/Rewards";
import Transparency from "./pages/Transparency";
import Pledge from "./pages/Pledge";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/pickup" element={<Pickup />} />
          <Route path="/dropoff" element={<DropOff />} />
          <Route path="/impact" element={<Impact />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/transparency" element={<Transparency />} />
          <Route path="/pledge" element={<Pledge />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
