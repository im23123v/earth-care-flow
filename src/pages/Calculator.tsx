import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator as CalcIcon, Leaf, Zap, Droplets, Trees, IndianRupee } from "lucide-react";
import { Label } from "@/components/ui/label";

const deviceData: Record<string, { co2: number; energy: number; water: number; materials: number }> = {
  smartphone: { co2: 55, energy: 85, water: 240, materials: 0.2 },
  laptop: { co2: 270, energy: 530, water: 1200, materials: 1.5 },
  tablet: { co2: 130, energy: 190, water: 520, materials: 0.6 },
  monitor: { co2: 220, energy: 380, water: 890, materials: 1.2 },
  desktop: { co2: 350, energy: 620, water: 1500, materials: 2.1 },
  printer: { co2: 180, energy: 290, water: 670, materials: 0.9 },
  tv: { co2: 400, energy: 720, water: 1800, materials: 2.5 },
  keyboard: { co2: 45, energy: 65, water: 150, materials: 0.15 },
};

const Calculator = () => {
  const [deviceType, setDeviceType] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [results, setResults] = useState<any>(null);

  const calculateImpact = () => {
    if (!deviceType) return;
    
    const device = deviceData[deviceType];
    const qty = quantity || 1;
    
    const materialWeight = device.materials * qty;
    setResults({
      co2Saved: (device.co2 * qty).toFixed(1),
      energySaved: (device.energy * qty).toFixed(0),
      waterSaved: (device.water * qty).toFixed(0),
      materialsSaved: materialWeight.toFixed(2),
      treesEquivalent: ((device.co2 * qty) / 21).toFixed(1),
      approxCost: (materialWeight * 5).toFixed(0),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-card">
      <Navigation />
      <div className="page-container pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <CalcIcon className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
                E-Waste Impact Calculator
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Calculate the environmental impact of recycling your electronic devices
              </p>
            </div>

            <Card className="mb-8 shadow-card">
              <CardHeader>
                <CardTitle>Device Information</CardTitle>
                <CardDescription>Select your device type and quantity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Device Type</Label>
                    <Select value={deviceType} onValueChange={setDeviceType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select device type" />
                      </SelectTrigger>
                      <SelectContent className="bg-background">
                        <SelectItem value="smartphone">Smartphone</SelectItem>
                        <SelectItem value="laptop">Laptop</SelectItem>
                        <SelectItem value="tablet">Tablet</SelectItem>
                        <SelectItem value="monitor">Monitor</SelectItem>
                        <SelectItem value="desktop">Desktop Computer</SelectItem>
                        <SelectItem value="printer">Printer</SelectItem>
                        <SelectItem value="tv">Television</SelectItem>
                        <SelectItem value="keyboard">Keyboard/Mouse</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Quantity</Label>
                    <Input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                      placeholder="Enter quantity"
                    />
                  </div>
                </div>

                <Button onClick={calculateImpact} className="w-full" size="lg">
                  <CalcIcon className="mr-2 h-5 w-5" />
                  Calculate Impact
                </Button>
              </CardContent>
            </Card>

            {results && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-scale-in">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Leaf className="h-5 w-5 text-primary" />
                      CO₂ Emissions Prevented
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-primary">{results.co2Saved} kg</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Equivalent to {results.treesEquivalent} trees planted
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-impact-yellow" />
                      Energy Saved
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-impact-yellow">{results.energySaved} kWh</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Enough to power a home for {Math.floor(parseInt(results.energySaved) / 30)} days
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Droplets className="h-5 w-5 text-accent" />
                      Water Conserved
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-accent">{results.waterSaved} L</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      That's {Math.floor(parseInt(results.waterSaved) / 8)} bathtubs of water
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trees className="h-5 w-5 text-eco-dark" />
                      Raw Materials Recovered
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-eco-dark">{results.materialsSaved} kg</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Including precious metals, plastics, and glass
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-card md:col-span-2 lg:col-span-1">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <IndianRupee className="h-5 w-5 text-orange-500" />
                      Approx. Value
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-orange-500">₹{results.approxCost}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Based on ₹5 per kg of recovered materials
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
