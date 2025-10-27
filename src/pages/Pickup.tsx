import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon, MapPin, Package, Building2, Phone } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Telangana collection centers
const telanganaCollectionCenters = [
  { id: 1, name: "E-Waste Collection Center - Hyderabad", lat: 17.385044, lng: 78.486671, address: "Banjara Hills, Hyderabad", phone: "+91 40 2345 6789", district: "Hyderabad" },
  { id: 2, name: "Green Recycling Hub - Secunderabad", lat: 17.443507, lng: 78.474736, address: "Secunderabad, Hyderabad", phone: "+91 40 2345 6790", district: "Hyderabad" },
  { id: 3, name: "E-Waste Center - Warangal", lat: 18.002358, lng: 79.588440, address: "Hanamkonda, Warangal", phone: "+91 870 234 5678", district: "Warangal" },
  { id: 4, name: "TSPCB Authorized Center - Nizamabad", lat: 18.672314, lng: 78.094528, address: "Nizamabad Urban", phone: "+91 8461 234567", district: "Nizamabad" },
  { id: 5, name: "Eco Collection Point - Khammam", lat: 17.247499, lng: 80.143654, address: "Khammam City", phone: "+91 8742 234567", district: "Khammam" },
];

const Pickup = () => {
  const [date, setDate] = useState<Date>();
  const [selectedDistrict, setSelectedDistrict] = useState<string>("all");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    district: "",
    deviceType: "",
    quantity: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Pickup scheduled successfully! TSPCB-authorized pickup confirmed.");
  };

  const filteredCenters = selectedDistrict === "all" 
    ? telanganaCollectionCenters 
    : telanganaCollectionCenters.filter(c => c.district === selectedDistrict);

  const telanganaDistricts = [
    "Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar", 
    "Rangareddy", "Medak", "Nalgonda", "Mahbubnagar", "Adilabad"
  ];

  return (
    <div className="min-h-screen bg-secondary/20">
      <Navigation />
      
      <div className="container mx-auto px-4 page-container py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">Schedule E-Waste Pickup - Telangana</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Free doorstep collection across Telangana. TSPCB-authorized e-waste management with transparent tracking.
          </p>
        </div>

        {/* Interactive Map Section */}
        <Card className="mb-12 shadow-eco animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-6 w-6 text-primary" />
              E-Waste Collection Centers in Telangana
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Label>Filter by District</Label>
              <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                <SelectTrigger>
                  <SelectValue placeholder="All Districts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Districts</SelectItem>
                  {Array.from(new Set(telanganaCollectionCenters.map(c => c.district))).map(district => (
                    <SelectItem key={district} value={district}>{district}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="h-[400px] rounded-lg overflow-hidden border">
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
                        <p className="text-xs flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {center.phone}
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>

            <div className="mt-6 grid gap-4">
              <h3 className="font-semibold">Collection Centers ({filteredCenters.length})</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {filteredCenters.map((center) => (
                  <Card key={center.id} className="p-4">
                    <div className="flex items-start gap-3">
                      <Building2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm mb-1">{center.name}</h4>
                        <p className="text-xs text-muted-foreground mb-1">{center.address}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {center.phone}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pickup Form */}
        <div className="max-w-3xl mx-auto">

          <Card className="p-8 shadow-eco animate-scale-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="district">District *</Label>
                <Select
                  value={formData.district}
                  onValueChange={(value) => setFormData({ ...formData, district: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your district" />
                  </SelectTrigger>
                  <SelectContent>
                    {telanganaDistricts.map(district => (
                      <SelectItem key={district} value={district}>{district}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="address">Pickup Address *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Textarea
                    id="address"
                    className="pl-10"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Enter your complete address in Telangana"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="deviceType">Device Type *</Label>
                  <Select
                    value={formData.deviceType}
                    onValueChange={(value) => setFormData({ ...formData, deviceType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select device type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mobile">Mobile Phones</SelectItem>
                      <SelectItem value="laptop">Laptops/Computers</SelectItem>
                      <SelectItem value="tv">TVs/Monitors</SelectItem>
                      <SelectItem value="appliances">Home Appliances</SelectItem>
                      <SelectItem value="batteries">Batteries</SelectItem>
                      <SelectItem value="other">Other Electronics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="quantity">Approximate Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label>Preferred Pickup Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Select a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Any specific instructions or details about the items?"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" required />
                <label
                  htmlFor="terms"
                  className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I confirm compliance with TSPCB e-waste guidelines and agree to authorized data sanitization
                </label>
              </div>

              <Button type="submit" className="w-full gap-2" size="lg">
                <Package className="h-5 w-5" />
                Schedule Pickup
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Pickup;
