import Navigation from "@/components/Navigation";
import Hero from "@/components/home/Hero";
import EcoCounters from "@/components/home/EcoCounters";
import FeatureTiles from "@/components/home/FeatureTiles";
import Mission from "@/components/home/Mission";
import Partners from "@/components/home/Partners";
import GovtInitiatives from "@/components/home/GovtInitiatives";
import ModernFeatures from "@/components/home/ModernFeatures";
import Testimonials from "@/components/home/Testimonials";
import InternationalPartners from "@/components/home/InternationalPartners";
import HackathonBadge from "@/components/home/HackathonBadge";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-20">
        <HackathonBadge />
        <Hero />
        <EcoCounters />
        <ModernFeatures />
        <FeatureTiles />
        <Testimonials />
        <InternationalPartners />
        <GovtInitiatives />
        <Mission />
        <Partners />
      </div>
      
      {/* Footer */}
      <footer className="bg-foreground text-background py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm opacity-90">
            © 2025 EcoRecycle Platform. Making the world cleaner, one device at a time.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
