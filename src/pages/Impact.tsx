import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, Leaf, Zap, Users, AlertCircle, Shield, Building2, Scale, MapPin } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from "recharts";
import { toast } from "sonner";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const Impact = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  // Telangana district impact data for map
  const districtImpactData = [
    { name: "Hyderabad", lat: 17.385044, lng: 78.486671, recycled: 19260, generated: 27720, rate: 69.5 },
    { name: "Warangal", lat: 18.002358, lng: 79.588440, recycled: 7704, generated: 11070, rate: 69.6 },
    { name: "Nizamabad", lat: 18.672314, lng: 78.094528, recycled: 5136, generated: 7380, rate: 69.6 },
    { name: "Khammam", lat: 17.247499, lng: 80.143654, recycled: 4280, generated: 6150, rate: 69.6 },
    { name: "Karimnagar", lat: 18.439453, lng: 79.124820, recycled: 3424, generated: 4920, rate: 69.6 },
    { name: "Rangareddy", lat: 17.308, lng: 78.388, recycled: 2568, generated: 3690, rate: 69.6 },
  ];

  // Telangana E-Waste Data (yearly generation and recycling)
  const telanganaYearlyData = [
    { year: "2019", generated: 28500, recycled: 8200, percentage: 28.8 },
    { year: "2020", generated: 32100, recycled: 11500, percentage: 35.8 },
    { year: "2021", generated: 38400, recycled: 16800, percentage: 43.8 },
    { year: "2022", generated: 44200, recycled: 22100, percentage: 50.0 },
    { year: "2023", generated: 52800, recycled: 31200, percentage: 59.1 },
    { year: "2024", generated: 61500, recycled: 42800, percentage: 69.6 },
  ];

  // District-wise contribution
  const districtData = [
    { name: "Hyderabad", value: 45, color: "hsl(142, 76%, 36%)" },
    { name: "Warangal", value: 18, color: "hsl(200, 80%, 50%)" },
    { name: "Nizamabad", value: 12, color: "hsl(45, 90%, 60%)" },
    { name: "Khammam", value: 10, color: "hsl(30, 40%, 40%)" },
    { name: "Others", value: 15, color: "hsl(142, 40%, 70%)" },
  ];

  // Device type distribution
  const deviceData = [
    { name: "Mobile Phones", value: 35, color: "hsl(142, 76%, 36%)" },
    { name: "Laptops", value: 25, color: "hsl(200, 80%, 50%)" },
    { name: "TVs/Monitors", value: 20, color: "hsl(45, 90%, 60%)" },
    { name: "Appliances", value: 15, color: "hsl(30, 40%, 40%)" },
    { name: "Others", value: 5, color: "hsl(142, 40%, 70%)" },
  ];

  const handleDownload = () => {
    toast.success("Downloading Telangana E-Waste Impact Report...");
  };

  return (
    <div className="min-h-screen bg-secondary/20">
      <Navigation />
      
      <div className="container mx-auto px-4 page-container py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">Telangana E-Waste Impact</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Track Telangana's journey towards sustainable e-waste management. Real-time data on generation, 
            recycling rates, and environmental impact across all districts.
          </p>
        </div>

        {/* Key Metrics - Telangana 2024 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="p-6 text-center shadow-card animate-scale-in">
            <Leaf className="h-10 w-10 mx-auto mb-3 text-primary" />
            <div className="text-3xl font-bold mb-1">42.8k MT</div>
            <div className="text-sm text-muted-foreground">E-Waste Recycled (2024)</div>
          </Card>

          <Card className="p-6 text-center shadow-card animate-scale-in" style={{ animationDelay: "100ms" }}>
            <TrendingUp className="h-10 w-10 mx-auto mb-3 text-primary" />
            <div className="text-3xl font-bold mb-1">69.6%</div>
            <div className="text-sm text-muted-foreground">Recycling Rate</div>
          </Card>

          <Card className="p-6 text-center shadow-card animate-scale-in" style={{ animationDelay: "200ms" }}>
            <AlertCircle className="h-10 w-10 mx-auto mb-3 text-destructive" />
            <div className="text-3xl font-bold mb-1">18.7k MT</div>
            <div className="text-sm text-muted-foreground">Gap Remaining</div>
          </Card>

          <Card className="p-6 text-center shadow-card animate-scale-in" style={{ animationDelay: "300ms" }}>
            <Building2 className="h-10 w-10 mx-auto mb-3 text-accent" />
            <div className="text-3xl font-bold mb-1">127</div>
            <div className="text-sm text-muted-foreground">TSPCB Authorized Centers</div>
          </Card>
        </div>

        {/* Interactive Telangana Impact Map */}
        <Card className="mb-12 shadow-eco animate-fade-in" style={{ animationDelay: "400ms" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-6 w-6 text-primary" />
              Telangana E-Waste Impact Map
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[500px] rounded-lg overflow-hidden border mb-4">
              <MapContainer 
                center={[17.7, 79.0]} 
                zoom={7} 
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {districtImpactData.map((district) => (
                  <Circle
                    key={district.name}
                    center={[district.lat, district.lng]}
                    radius={district.recycled * 5}
                    pathOptions={{
                      fillColor: district.rate >= 70 ? "hsl(142, 76%, 36%)" : district.rate >= 60 ? "hsl(45, 90%, 60%)" : "hsl(0, 84%, 60%)",
                      fillOpacity: 0.5,
                      color: district.rate >= 70 ? "hsl(142, 76%, 36%)" : district.rate >= 60 ? "hsl(45, 90%, 60%)" : "hsl(0, 84%, 60%)",
                      weight: 2,
                    }}
                  >
                    <Popup>
                      <div className="p-2 min-w-[200px]">
                        <h3 className="font-semibold text-base mb-2">{district.name} District</h3>
                        <div className="space-y-1 text-sm">
                          <p className="flex justify-between">
                            <span className="text-muted-foreground">Generated:</span>
                            <span className="font-medium">{district.generated.toLocaleString()} MT</span>
                          </p>
                          <p className="flex justify-between">
                            <span className="text-muted-foreground">Recycled:</span>
                            <span className="font-medium text-primary">{district.recycled.toLocaleString()} MT</span>
                          </p>
                          <p className="flex justify-between">
                            <span className="text-muted-foreground">Rate:</span>
                            <span className="font-semibold text-primary">{district.rate}%</span>
                          </p>
                        </div>
                      </div>
                    </Popup>
                  </Circle>
                ))}
              </MapContainer>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "hsl(142, 76%, 36%)" }}></div>
                <span>High Rate (&ge;70%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "hsl(45, 90%, 60%)" }}></div>
                <span>Medium (60-70%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "hsl(0, 84%, 60%)" }}></div>
                <span>Low (&lt;60%)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Yearly Trend - Generation vs Recycling */}
        <Card className="mb-12 shadow-eco animate-fade-in" style={{ animationDelay: "500ms" }}>
          <CardHeader>
            <CardTitle>Telangana E-Waste: Generation vs Recycling (Metric Tons)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={telanganaYearlyData}>
                <defs>
                  <linearGradient id="colorGenerated" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRecycled" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="generated" stroke="hsl(0, 84%, 60%)" fillOpacity={1} fill="url(#colorGenerated)" name="Generated (MT)" />
                <Area type="monotone" dataKey="recycled" stroke="hsl(142, 76%, 36%)" fillOpacity={1} fill="url(#colorRecycled)" name="Recycled (MT)" />
              </AreaChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-destructive/10 rounded-lg">
                <div className="text-2xl font-bold text-destructive">61,500 MT</div>
                <div className="text-sm text-muted-foreground">Total Generated (2024)</div>
              </div>
              <div className="p-4 bg-primary/10 rounded-lg">
                <div className="text-2xl font-bold text-primary">42,800 MT</div>
                <div className="text-sm text-muted-foreground">Total Recycled (2024)</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* District-wise Distribution */}
          <Card className="shadow-eco animate-fade-in" style={{ animationDelay: "600ms" }}>
            <CardHeader>
              <CardTitle>District-wise E-Waste Contribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={districtData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {districtData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Device Type Distribution */}
          <Card className="shadow-eco animate-fade-in" style={{ animationDelay: "700ms" }}>
            <CardHeader>
              <CardTitle>Device Type Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={deviceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-15} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="hsl(142, 76%, 36%)" name="Percentage %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Government Initiatives */}
        <Card className="mb-12 shadow-eco animate-fade-in" style={{ animationDelay: "800ms" }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              Government of Telangana & TSPCB Initiatives
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Scale className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">E-Waste Management Rules 2016</h4>
                    <p className="text-sm text-muted-foreground">
                      TSPCB enforces strict compliance with central e-waste rules, ensuring Extended Producer 
                      Responsibility (EPR) and authorized collection mechanisms.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Building2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">127 Authorized Collection Centers</h4>
                    <p className="text-sm text-muted-foreground">
                      TSPCB has authorized 127 e-waste collection centers across Telangana, with major hubs 
                      in Hyderabad, Warangal, and other district headquarters.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Zap className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Green Protocol Initiative</h4>
                    <p className="text-sm text-muted-foreground">
                      State government's Green Protocol mandates responsible e-waste disposal in all government 
                      offices and educational institutions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <Users className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Awareness Campaigns</h4>
                    <p className="text-sm text-muted-foreground">
                      Regular awareness drives in schools, colleges, and residential areas about harmful 
                      effects of improper e-waste disposal.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">TSPCB Monitoring Portal</h4>
                    <p className="text-sm text-muted-foreground">
                      Online portal for tracking e-waste collection, transportation, and disposal with 
                      real-time compliance monitoring.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <TrendingUp className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Target: 100% by 2026</h4>
                    <p className="text-sm text-muted-foreground">
                      Telangana aims to achieve 100% e-waste recycling rate by 2026 through enhanced 
                      infrastructure and public participation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 p-6 rounded-lg border-l-4 border-primary">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                TSPCB Helpline & Resources
              </h4>
              <div className="grid md:grid-cols-2 gap-4 mt-4 text-sm">
                <div>
                  <p className="font-medium">TSPCB E-Waste Helpline:</p>
                  <p className="text-primary">040-2321 5634</p>
                </div>
                <div>
                  <p className="font-medium">Email:</p>
                  <p className="text-primary">ewaste@telangana.gov.in</p>
                </div>
                <div>
                  <p className="font-medium">Online Portal:</p>
                  <p className="text-primary">tspcb.cgg.gov.in</p>
                </div>
                <div>
                  <p className="font-medium">Complaint Registration:</p>
                  <p className="text-primary">24/7 Available</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Download Report */}
        <Card className="p-8 text-center shadow-eco animate-scale-in" style={{ animationDelay: "900ms" }}>
          <h3 className="text-2xl font-semibold mb-4">Download Telangana E-Waste Report 2024</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Get comprehensive data on e-waste generation, recycling rates, district-wise breakdown, 
            and government initiatives. Certified by TSPCB.
          </p>
          <Button size="lg" className="gap-2" onClick={handleDownload}>
            <Download className="h-5 w-5" />
            Download Official Report
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Impact;