import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Search, Phone, Clock, Navigation as NavigationIcon } from "lucide-react";

const DropOff = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const centers = [
    {
      id: 1,
      name: "Green Tech Recycling Hub",
      address: "123 Eco Street, Downtown",
      phone: "+1 234-567-8900",
      hours: "Mon-Sat: 9AM-6PM",
      distance: "2.3 km",
      coordinates: { lat: 40.7128, lng: -74.0060 },
    },
    {
      id: 2,
      name: "EcoCenter Electronics",
      address: "456 Sustainability Ave, Westside",
      phone: "+1 234-567-8901",
      hours: "Mon-Fri: 8AM-7PM",
      distance: "4.1 km",
      coordinates: { lat: 40.7589, lng: -73.9851 },
    },
    {
      id: 3,
      name: "Planet Recycle Point",
      address: "789 Green Valley Rd, Eastside",
      phone: "+1 234-567-8902",
      hours: "Tue-Sun: 10AM-5PM",
      distance: "5.7 km",
      coordinates: { lat: 40.7614, lng: -73.9776 },
    },
  ];

  return (
    <div className="min-h-screen bg-secondary/20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">Find Drop-off Centers</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Locate the nearest certified e-waste recycling center. All locations follow
            strict environmental and data security standards.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Search Bar */}
          <div className="mb-8 animate-scale-in">
            <div className="relative">
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter your location or zip code"
                className="pl-10 h-12 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Map Placeholder */}
          <Card className="mb-8 overflow-hidden shadow-eco animate-scale-in" style={{ animationDelay: "100ms" }}>
            <div className="bg-muted h-96 flex items-center justify-center relative">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Interactive map will display here</p>
                <p className="text-sm text-muted-foreground mt-2">
                  (Integration with mapping service can be added)
                </p>
              </div>
            </div>
          </Card>

          {/* Centers List */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {centers.map((center, index) => (
              <Card
                key={center.id}
                className="p-6 hover:shadow-eco transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${200 + index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold">{center.name}</h3>
                  <span className="text-sm text-primary font-medium">{center.distance}</span>
                </div>

                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>{center.address}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 flex-shrink-0" />
                    <span>{center.phone}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 flex-shrink-0" />
                    <span>{center.hours}</span>
                  </div>
                </div>

                <Button className="w-full mt-4 gap-2" variant="outline">
                  <NavigationIcon className="h-4 w-4" />
                  Get Directions
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropOff;
