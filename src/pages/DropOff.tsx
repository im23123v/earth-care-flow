import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Search, Phone, Clock, Navigation as NavigationIcon, Building2, X, ExternalLink } from "lucide-react";

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

interface SelectedCenter {
  id: number;
  name: string;
  lat: number;
  lng: number;
  address: string;
}

const DropOff = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("all");
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState<SelectedCenter | null>(null);

  const filteredCenters = selectedDistrict === "all" 
    ? telanganaDropOffCenters 
    : telanganaDropOffCenters.filter(c => c.district === selectedDistrict);

  const handleGetDirections = (center: typeof telanganaDropOffCenters[0]) => {
    setSelectedCenter({
      id: center.id,
      name: center.name,
      lat: center.lat,
      lng: center.lng,
      address: center.address,
    });
    setIsMapFullscreen(true);
  };

  const closeFullscreenMap = () => {
    setIsMapFullscreen(false);
    setSelectedCenter(null);
  };

  const openGoogleMaps = () => {
    if (selectedCenter) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedCenter.lat},${selectedCenter.lng}&destination_place_id=${encodeURIComponent(selectedCenter.name)}`;
      window.open(url, '_blank');
    }
  };

  const getMapEmbedUrl = (center: SelectedCenter | null) => {
    if (center) {
      return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${center.lng}!3d${center.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${center.lat}%2C${center.lng}!5e0!3m2!1sen!2sin!4v1234567890`;
    }
    return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.358!2d78.4867!3d17.3850!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1234567890";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navigation />
      
      {/* Fullscreen Map Overlay */}
      {isMapFullscreen && selectedCenter && (
        <div className="fixed inset-0 z-50 bg-background">
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-10 bg-background/95 backdrop-blur-sm border-b p-4">
            <div className="container mx-auto flex items-center justify-between">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-foreground">{selectedCenter.name}</h2>
                <p className="text-sm text-muted-foreground">{selectedCenter.address}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={closeFullscreenMap}>
                <X className="h-6 w-6" />
              </Button>
            </div>
          </div>

          {/* Map */}
          <iframe
            src={getMapEmbedUrl(selectedCenter)}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="pt-20 pb-24"
          />

          {/* Bottom Action Bar */}
          <div className="absolute bottom-0 left-0 right-0 z-10 bg-background/95 backdrop-blur-sm border-t p-4">
            <div className="container mx-auto flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={openGoogleMaps}
                className="flex-1 gap-2 h-12 text-lg"
              >
                <ExternalLink className="h-5 w-5" />
                Open in Google Maps
              </Button>
              <Button 
                variant="outline" 
                onClick={closeFullscreenMap}
                className="sm:w-auto h-12"
              >
                Close Map
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <div className="container mx-auto px-4 pt-24 pb-12">
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
              
              <div className="rounded-lg overflow-hidden border mb-6 h-[500px]">
                <iframe
                  src={getMapEmbedUrl(null)}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
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

                  <Button 
                    className="w-full mt-4 gap-2" 
                    variant="outline"
                    onClick={() => handleGetDirections(center)}
                  >
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
