import { Award, Sparkles, Trophy, Code } from "lucide-react";
import { Card } from "@/components/ui/card";

const HackathonSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10">
      <div className="container mx-auto px-4">
        <Card className="relative overflow-hidden border-2 border-primary/20 bg-card/80 backdrop-blur-sm">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Trophy className="w-12 h-12 md:w-16 md:h-16 text-primary-foreground" />
                  </div>
                  <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-accent animate-pulse" />
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                  <Award className="w-5 h-5 text-primary" />
                  <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                    Hackathon Project
                  </span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                  Built for HACKATHON 1.0
                </h3>
                
                <p className="text-muted-foreground text-lg mb-4">
                  Proudly developed by <span className="font-semibold text-foreground">Team ORIGIN</span> at{" "}
                  <span className="font-semibold text-foreground">St. Peters Engineering College</span>
                </p>
                
                <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Code className="w-4 h-4" />
                    <span>Innovation Track</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Sparkles className="w-4 h-4" />
                    <span>Sustainability Focus</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default HackathonSection;
