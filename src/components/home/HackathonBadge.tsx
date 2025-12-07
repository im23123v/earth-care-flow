import { Award, Sparkles } from "lucide-react";

const HackathonBadge = () => {
  return (
    <div className="bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-[gradient-shift_3s_ease-in-out_infinite] py-3">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-3 text-primary-foreground">
          <Sparkles className="h-5 w-5 animate-pulse" />
          <Award className="h-6 w-6" />
          <span className="font-semibold text-sm md:text-base text-center">
            Built for HACKATHON 1.0 by ORIGIN at St. Peters Engineering College
          </span>
          <Award className="h-6 w-6" />
          <Sparkles className="h-5 w-5 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default HackathonBadge;
