import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, Calendar, Package, MapPin, Shield, Users, TrendingUp, BookOpen, Award, FileText, MessageSquare, Bot } from "lucide-react";

const FeatureTiles = () => {
  const features = [
    {
      to: "/calculator",
      icon: Calculator,
      title: "Calculator",
      description: "Calculate environmental impact of your e-waste",
      color: "from-green-500/20 to-emerald-500/20"
    },
    {
      to: "/pickup",
      icon: Calendar,
      title: "Pickup",
      description: "Schedule a convenient pickup time",
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      to: "/tracker",
      icon: Package,
      title: "Tracker",
      description: "Track your e-waste pickup status",
      color: "from-purple-500/20 to-violet-500/20"
    },
    {
      to: "/dropoff",
      icon: MapPin,
      title: "Drop-off",
      description: "Find nearby recycling centers",
      color: "from-orange-500/20 to-amber-500/20"
    },
    {
      to: "/security",
      icon: Shield,
      title: "Security",
      description: "Learn about data security practices",
      color: "from-red-500/20 to-rose-500/20"
    },
    {
      to: "/events",
      icon: Users,
      title: "Events",
      description: "Join community recycling events",
      color: "from-indigo-500/20 to-blue-500/20"
    },
    {
      to: "/impact",
      icon: TrendingUp,
      title: "Impact",
      description: "View your environmental impact",
      color: "from-teal-500/20 to-green-500/20"
    },
    {
      to: "/learn",
      icon: BookOpen,
      title: "Learn",
      description: "Educational resources and guides",
      color: "from-yellow-500/20 to-orange-500/20"
    },
    {
      to: "/rewards",
      icon: Award,
      title: "Rewards",
      description: "Earn badges and climb leaderboards",
      color: "from-pink-500/20 to-purple-500/20"
    },
    {
      to: "/transparency",
      icon: FileText,
      title: "Transparency",
      description: "Our certifications and reports",
      color: "from-slate-500/20 to-gray-500/20"
    },
    {
      to: "/pledge",
      icon: MessageSquare,
      title: "Pledge",
      description: "Make a sustainability commitment",
      color: "from-lime-500/20 to-green-500/20"
    },
    {
      to: "/ecoai",
      icon: Bot,
      title: "EcoAI",
      description: "AI-powered recycling assistant",
      color: "from-cyan-500/20 to-blue-500/20"
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            Explore Our Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to make responsible e-waste management simple and rewarding
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Link key={feature.to} to={feature.to}>
              <Card 
                className="h-full hover:shadow-glow transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="h-6 w-6 text-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureTiles;
