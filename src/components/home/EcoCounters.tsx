import { useEffect, useState } from "react";
import { Recycle, Zap, TreePine, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

const EcoCounters = () => {
  const [counters, setCounters] = useState({
    ewaste: 125847,
    energy: 42350,
    trees: 8934,
    users: 15678,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCounters(prev => ({
        ewaste: prev.ewaste + Math.floor(Math.random() * 3),
        energy: prev.energy + Math.floor(Math.random() * 2),
        trees: prev.trees + (Math.random() > 0.7 ? 1 : 0),
        users: prev.users + (Math.random() > 0.8 ? 1 : 0),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      icon: Recycle,
      label: "Kg E-Waste Recycled",
      value: counters.ewaste.toLocaleString(),
      color: "text-primary",
    },
    {
      icon: Zap,
      label: "kWh Energy Saved",
      value: counters.energy.toLocaleString(),
      color: "text-impact-yellow",
    },
    {
      icon: TreePine,
      label: "Trees Equivalent",
      value: counters.trees.toLocaleString(),
      color: "text-eco-dark",
    },
    {
      icon: Users,
      label: "Active Contributors",
      value: counters.users.toLocaleString(),
      color: "text-accent",
    },
  ];

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Live Impact Tracker</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Watch our collective impact grow in real-time as our community works together
            for a cleaner, greener planet.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={stat.label}
              className="p-6 text-center shadow-card hover:shadow-eco transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <stat.icon className={`h-12 w-12 mx-auto mb-4 ${stat.color}`} />
              <div className="text-3xl md:text-4xl font-bold mb-2 animate-counter-up">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EcoCounters;
