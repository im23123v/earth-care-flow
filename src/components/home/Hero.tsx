import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center text-primary-foreground animate-fade-in">
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Transform E-Waste into
            <span className="block mt-2">Environmental Impact</span>
          </h1>
          <p className="mb-8 text-lg md:text-xl opacity-95 max-w-2xl mx-auto">
            Join thousands making a difference. Schedule pickups, find recycling centers,
            and track your contribution to a sustainable future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/pickup">
              <Button size="lg" variant="secondary" className="gap-2 shadow-lg hover:shadow-xl transition-all">
                <Calendar className="h-5 w-5" />
                Schedule Pickup
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/dropoff">
              <Button 
                size="lg" 
                variant="outline" 
                className="gap-2 bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white"
              >
                <MapPin className="h-5 w-5" />
                Find Drop-off Center
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse-eco" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse-eco" style={{ animationDelay: "1s" }} />
      </div>
    </section>
  );
};

export default Hero;
