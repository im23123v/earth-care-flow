import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, TrendingUp, Award, Smartphone, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const ModernFeatures = () => {
  const features = [
    {
      icon: Shield,
      title: "Certified Security",
      description: "TSPCB-authorized facilities with guaranteed data destruction",
      gradient: "from-blue-500/20 to-cyan-500/20",
      link: "/security",
    },
    {
      icon: Zap,
      title: "Instant Tracking",
      description: "Real-time updates from pickup to recycling completion",
      gradient: "from-purple-500/20 to-pink-500/20",
      link: "/tracker",
    },
    {
      icon: TrendingUp,
      title: "Impact Metrics",
      description: "See exactly how your contribution helps the environment",
      gradient: "from-green-500/20 to-emerald-500/20",
      link: "/impact",
    },
    {
      icon: Award,
      title: "Earn Rewards",
      description: "Get points for every kilogram recycled and redeem rewards",
      gradient: "from-yellow-500/20 to-orange-500/20",
      link: "/rewards",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Smartphone className="h-5 w-5" />
            <span className="text-sm font-medium">Smart E-Waste Management</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Why Choose Our Platform?
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            State-of-the-art technology meets environmental responsibility
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group p-6 hover:shadow-glow transition-all duration-300 animate-scale-in border-2 hover:border-primary/50 cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Link to={feature.link}>
                <div
                  className={`p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">{feature.description}</p>
                <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                  Learn More
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-3xl p-8 md:p-12 animate-fade-in border border-primary/20">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <div className="text-4xl md:text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                10,000+
              </div>
              <p className="text-muted-foreground">Tons Recycled</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div className="text-4xl md:text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                100%
              </div>
              <p className="text-muted-foreground">Data Security</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div className="text-4xl md:text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                50,000+
              </div>
              <p className="text-muted-foreground">Happy Users</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernFeatures;