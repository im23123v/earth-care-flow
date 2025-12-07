import { Globe, Building2 } from "lucide-react";

const InternationalPartners = () => {
  const partners = [
    {
      name: "African E-Waste Alliance",
      country: "Africa",
      flag: "🌍",
    },
    {
      name: "European Green Initiative",
      country: "Europe",
      flag: "🇪🇺",
    },
    {
      name: "Asia Pacific Recyclers",
      country: "Asia Pacific",
      flag: "🌏",
    },
    {
      name: "Americas Sustainability Network",
      country: "Americas",
      flag: "🌎",
    },
    {
      name: "Global E-Waste Foundation",
      country: "International",
      flag: "🌐",
    },
  ];

  return (
    <section className="py-16 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Globe className="h-4 w-4" />
            <span className="text-sm font-medium">Global Collaboration</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by International Organizations
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            EcoRecycle has partnered with leading environmental organizations across the globe
            to create a sustainable future for e-waste management.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
          {partners.map((partner, index) => (
            <div
              key={partner.name}
              className="flex items-center gap-3 bg-background border border-border rounded-xl px-6 py-4 hover:shadow-eco transition-all duration-300 animate-scale-in hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="text-3xl">{partner.flag}</span>
              <div>
                <h4 className="font-semibold text-sm">{partner.name}</h4>
                <p className="text-xs text-muted-foreground">{partner.country}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-2 text-muted-foreground">
            <Building2 className="h-5 w-5" />
            <span className="text-sm">
              Together, we've recycled over <strong className="text-primary">50,000+ tons</strong> of e-waste globally
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InternationalPartners;
