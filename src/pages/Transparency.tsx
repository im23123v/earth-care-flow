import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileText, Globe, Shield } from "lucide-react";

const Transparency = () => {
  const resources = [
    {
      title: "UNEP E-Waste Reports",
      description: "United Nations Environment Programme's comprehensive global e-waste monitoring reports and statistics.",
      link: "https://www.unep.org",
      icon: Globe,
    },
    {
      title: "Basel Convention",
      description: "International treaty on hazardous waste movement and disposal, including e-waste regulations.",
      link: "https://www.basel.int",
      icon: FileText,
    },
    {
      title: "R2 Certification Standards",
      description: "Responsible Recycling practices and certification requirements for electronics recyclers.",
      link: "https://sustainableelectronics.org",
      icon: Shield,
    },
    {
      title: "e-Stewards Initiative",
      description: "Gold standard for ethical and responsible electronics recycling and refurbishment.",
      link: "https://e-stewards.org",
      icon: Shield,
    },
  ];

  const principles = [
    {
      title: "Full Transparency",
      description: "We publish detailed reports on where and how your e-waste is processed.",
    },
    {
      title: "Zero Landfill",
      description: "100% of collected e-waste is recycled or properly disposed, never sent to landfills.",
    },
    {
      title: "Data Security",
      description: "All devices undergo certified data sanitization following NIST guidelines.",
    },
    {
      title: "Worker Safety",
      description: "Our partners ensure safe working conditions and fair wages for all workers.",
    },
  ];

  return (
    <div className="min-h-screen bg-secondary/20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">Transparency & Standards</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We believe in complete transparency. Learn about our certifications, standards,
            and access resources from global environmental organizations.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Our Principles */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-8 text-center">Our Core Principles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {principles.map((principle, index) => (
                <Card
                  key={principle.title}
                  className="p-6 hover:shadow-eco transition-all animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <h3 className="text-xl font-semibold mb-3">{principle.title}</h3>
                  <p className="text-muted-foreground">{principle.description}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* External Resources */}
          <div>
            <h2 className="text-2xl font-semibold mb-8 text-center">
              International Standards & Resources
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {resources.map((resource, index) => (
                <Card
                  key={resource.title}
                  className="p-6 hover:shadow-eco transition-all animate-fade-in"
                  style={{ animationDelay: `${400 + index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <resource.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {resource.description}
                      </p>
                      <Button variant="outline" size="sm" className="gap-2" asChild>
                        <a href={resource.link} target="_blank" rel="noopener noreferrer">
                          Visit Resource
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Impact Report */}
          <Card className="mt-12 p-8 text-center shadow-eco animate-scale-in" style={{ animationDelay: "800ms" }}>
            <h2 className="text-2xl font-semibold mb-4">Annual Transparency Report</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Read our detailed annual report on recycling volumes, environmental impact,
              partner certifications, and continuous improvement initiatives.
            </p>
            <Button size="lg" className="gap-2">
              <FileText className="h-5 w-5" />
              Download 2024 Report
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Transparency;
