import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon, MapPin, Package } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

const Pickup = () => {
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    deviceType: "",
    quantity: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Pickup scheduled successfully! We'll send you a confirmation email.");
  };

  return (
    <div className="min-h-screen bg-secondary/20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold mb-4">Schedule E-Waste Pickup</h1>
            <p className="text-muted-foreground">
              Free doorstep collection for your electronic waste. We'll handle the rest responsibly.
            </p>
          </div>

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
                <Label htmlFor="address">Pickup Address *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Textarea
                    id="address"
                    className="pl-10"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Enter your complete address"
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
                  I confirm the devices don't contain hazardous materials and agree to data sanitization
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
