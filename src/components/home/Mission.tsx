import { Target, Leaf, Users, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";

const Mission = () => {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To create a zero-waste future by making e-waste recycling accessible, transparent, and rewarding for everyone.",
    },
    {
      icon: Leaf,
      title: "Sustainability First",
      description: "Every device recycled prevents toxic materials from polluting our environment and conserves precious resources.",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Join a growing network of eco-conscious individuals making tangible environmental impact together.",
    },
    {
      icon: Globe,
      title: "Global Standards",
      description: "We follow international certifications (R2, e-Stewards, CPCB) ensuring responsible recycling practices.",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why E-Waste Matters</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Electronic waste is the fastest-growing waste stream globally. Together, we can turn
            this challenge into an opportunity for environmental restoration and resource recovery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card
              key={value.title}
              className="p-6 hover:shadow-eco transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mb-4">
                <value.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mission;
