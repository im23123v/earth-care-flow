import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Search, Phone, Clock, Navigation as NavigationIcon, Building2 } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Telangana e-waste drop-off centers
const telanganaDropOffCenters = [
  { id: 1, name: "E-Waste Collection Center - Hyderabad", lat: 17.385044, lng: 78.486671, address: "Banjara Hills, Hyderabad", phone: "+91 40 2345 6789", hours: "Mon-Sat: 9AM-6PM", district: "Hyderabad" },
  { id: 2, name: "Green Recycling Hub - Secunderabad", lat: 17.443507, lng: 78.474736, address: "Secunderabad, Hyderabad", phone: "+91 40 2345 6790", hours: "Mon-Fri: 8AM-7PM", district: "Hyderabad" },
  { id: 3, name: "E-Waste Center - Warangal", lat: 18.002358, lng: 79.588440, address: "Hanamkonda, Warangal", phone: "+91 870 234 5678", hours: "Mon-Sat: 10AM-5PM", district: "Warangal" },
  { id: 4, name: "TSPCB Authorized Center - Nizamabad", lat: 18.672314, lng: 78.094528, address: "Nizamabad Urban", phone: "+91 8461 234567", hours: "Tue-Sun: 9AM-6PM", district: "Nizamabad" },
  { id: 5, name: "Eco Collection Point - Khammam", lat: 17.247499, lng: 80.143654, address: "Khammam City", phone: "+91 8742 234567", hours: "Mon-Sat: 9AM-5PM", district: "Khammam" },
  { id: 6, name: "TSPCB Center - Karimnagar", lat: 18.439453, lng: 79.124820, address: "Karimnagar", phone: "+91 878 234 5678", hours: "Mon-Fri: 9AM-6PM", district: "Karimnagar" },
  { id: 7, name: "E-Waste Hub - Nalgonda", lat: 17.050549, lng: 79.267212, address: "Nalgonda Town", phone: "+91 8682 234567", hours: "Mon-Sat: 9AM-5PM", district: "Nalgonda" },
  { id: 8, name: "Recycling Center - Mahbubnagar", lat: 16.733610, lng: 77.984497, address: "Mahbubnagar", phone: "+91 8542 234567", hours: "Tue-Sat: 10AM-6PM", district: "Mahbubnagar" },
];

const DropOff = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("all");

  const filteredCenters = selectedDistrict === "all" 
    ? telanganaDropOffCenters 
    : telanganaDropOffCenters.filter(c => c.district === selectedDistrict);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navigation />
      
      <div className="container mx-auto px-4 page-container py-12">
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">TSPCB Certified Centers</span>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">Find Drop-off Centers</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Locate the nearest TSPCB-certified e-waste recycling center in Telangana. All locations follow
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

          {/* Interactive Map Section */}
          <Card className="mb-8 shadow-eco animate-scale-in" style={{ animationDelay: "100ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-6 w-6 text-primary" />
                E-Waste Drop-off Centers in Telangana
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by District" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Districts</SelectItem>
                    {Array.from(new Set(telanganaDropOffCenters.map(c => c.district))).map(district => (
                      <SelectItem key={district} value={district}>{district}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="h-[500px] rounded-lg overflow-hidden border mb-6">
                <MapContainer 
                  center={[17.385044, 78.486671]} 
                  zoom={7} 
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {filteredCenters.map((center) => (
                    <Marker key={center.id} position={[center.lat, center.lng]}>
                      <Popup>
                        <div className="p-2">
                          <h3 className="font-semibold text-sm mb-1">{center.name}</h3>
                          <p className="text-xs text-muted-foreground mb-1">{center.address}</p>
                          <p className="text-xs flex items-center gap-1 mb-1">
                            <Phone className="h-3 w-3" />
                            {center.phone}
                          </p>
                          <p className="text-xs flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {center.hours}
                          </p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </CardContent>
          </Card>

          {/* Centers List */}
          <div>
            <h3 className="font-semibold text-xl mb-6">All Centers ({filteredCenters.length})</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCenters.map((center, index) => (
                <Card
                  key={center.id}
                  className="p-6 hover:shadow-eco transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${200 + index * 100}ms` }}
                >
                  <div className="flex items-start gap-3 mb-4">
                    <Building2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{center.name}</h3>
                      <span className="text-xs text-primary font-medium">{center.district} District</span>
                    </div>
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
    </div>
  );
};

export default DropOff;
