import { Award, Shield, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

const Partners = () => {
  const certifications = [
    {
      icon: Shield,
      name: "R2 Certified",
      description: "Responsible Recycling (R2) Standard for Electronics Recyclers",
    },
    {
      icon: Award,
      name: "e-Stewards",
      description: "Highest certification for ethical and responsible e-waste recycling",
    },
    {
      icon: CheckCircle,
      name: "CPCB Authorized",
      description: "Central Pollution Control Board certified recycling practices",
    },
  ];

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Certified & Trusted</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our recycling partners meet the highest international standards for
            environmental protection and data security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {certifications.map((cert, index) => (
            <Card
              key={cert.name}
              className="p-6 text-center hover:shadow-eco transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="rounded-full bg-primary/10 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <cert.icon className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{cert.name}</h3>
              <p className="text-sm text-muted-foreground">{cert.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
