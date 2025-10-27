import { Card, CardContent } from "@/components/ui/card";
import { Shield, Building2, Scale, Users, FileText, AlertCircle } from "lucide-react";

const GovtInitiatives = () => {
  const initiatives = [
    {
      icon: Scale,
      title: "E-Waste Management Rules 2016",
      description: "Central government rules enforced by TSPCB for Extended Producer Responsibility (EPR) and authorized collection.",
      color: "text-primary"
    },
    {
      icon: Building2,
      title: "TSPCB Authorized Centers",
      description: "127+ authorized e-waste collection and recycling facilities across all districts of Telangana.",
      color: "text-accent"
    },
    {
      icon: Shield,
      title: "Green Protocol Initiative",
      description: "Mandatory e-waste disposal guidelines for government offices, schools, and public institutions.",
      color: "text-primary"
    },
    {
      icon: Users,
      title: "Public Awareness Campaigns",
      description: "Regular awareness programs in communities about safe e-waste disposal and environmental impact.",
      color: "text-eco-dark"
    },
    {
      icon: FileText,
      title: "EPR Compliance Portal",
      description: "Digital platform for manufacturers to report e-waste collection targets and achievements.",
      color: "text-impact-yellow"
    },
    {
      icon: AlertCircle,
      title: "TSPCB Monitoring System",
      description: "Real-time tracking of e-waste movement from collection to final disposal with GPS integration.",
      color: "text-destructive"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-primary">Government of Telangana</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">TSPCB E-Waste Management Initiatives</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Telangana State Pollution Control Board (TSPCB) leads comprehensive e-waste management 
            policies to protect our environment and public health.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {initiatives.map((initiative, index) => (
            <Card 
              key={index}
              className="group hover:shadow-eco transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:scale-110 transition-transform">
                    <initiative.icon className={`h-6 w-6 ${initiative.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{initiative.title}</h3>
                    <p className="text-sm text-muted-foreground">{initiative.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Information */}
        <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20 animate-fade-in">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">TSPCB E-Waste Helpline</h3>
              <p className="text-muted-foreground">
                Report illegal dumping, get information, or register complaints
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Helpline Number</p>
                <p className="text-xl font-bold text-primary">040-2321 5634</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Email Support</p>
                <p className="text-xl font-bold text-primary">ewaste@telangana.gov.in</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Online Portal</p>
                <p className="text-xl font-bold text-primary">tspcb.cgg.gov.in</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default GovtInitiatives;