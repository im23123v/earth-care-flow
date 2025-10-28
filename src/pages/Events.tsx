import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Calendar, MapPin, Clock, ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";

const events = [
  {
    title: "Community E-Waste Collection Drive",
    date: "February 15, 2025",
    time: "9:00 AM - 3:00 PM",
    location: "Central Park Community Center",
    address: "123 Main Street, EcoCity",
    spots: "Unlimited",
    description: "Join us for our monthly e-waste collection event. Drop off any electronics, no appointment needed!",
    items: ["Phones", "Laptops", "TVs", "Small appliances", "Cables & chargers"]
  },
  {
    title: "Electronics Repair Workshop",
    date: "February 22, 2025",
    time: "2:00 PM - 5:00 PM",
    location: "Tech Hub Makerspace",
    address: "456 Innovation Blvd, Tech District",
    spots: "25 spots remaining",
    description: "Learn basic electronics repair skills. Bring your broken devices and our experts will guide you!",
    items: ["Free entry", "Tools provided", "Refreshments included"]
  },
  {
    title: "Corporate E-Waste Recycling Day",
    date: "March 5, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Business Park Hub",
    address: "789 Corporate Drive, Business District",
    spots: "Pre-registration required",
    description: "Special event for businesses to responsibly recycle bulk electronics. Volume discounts available.",
    items: ["Bulk pickup", "Data wiping services", "Compliance certificates"]
  },
  {
    title: "E-Waste Awareness Seminar",
    date: "March 12, 2025",
    time: "6:00 PM - 8:00 PM",
    location: "Public Library Auditorium",
    address: "321 Knowledge Street, Downtown",
    spots: "50 spots remaining",
    description: "Educational session about e-waste impact and proper disposal methods. Guest speakers from EPA.",
    items: ["Free attendance", "Q&A session", "Refreshments"]
  }
];

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [registrationForm, setRegistrationForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleRegister = (event: typeof events[0]) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };

  const handleSubmitRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Successfully registered for ${selectedEvent?.title}! Check your email for confirmation.`);
    setIsDialogOpen(false);
    setRegistrationForm({ name: "", email: "", phone: "" });
  };

  const handleGetDirections = (address: string) => {
    const query = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-card">
      <Navigation />
      <div className="page-container pt-12 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
                Community Events
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join local e-waste collection drives, workshops, and educational events
              </p>
            </div>

            <div className="grid gap-6">
              {events.map((event, index) => (
                <Card key={index} className="shadow-card hover:shadow-eco transition-shadow animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-2xl mb-2">{event.title}</CardTitle>
                        <CardDescription className="text-base">{event.description}</CardDescription>
                      </div>
                      <Badge variant="secondary" className="whitespace-nowrap">
                        {event.spots}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Date</p>
                          <p className="text-sm text-muted-foreground">{event.date}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Time</p>
                          <p className="text-sm text-muted-foreground">{event.time}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 md:col-span-2">
                        <MapPin className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">{event.location}</p>
                          <p className="text-sm text-muted-foreground">{event.address}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="font-medium mb-2">What to expect:</p>
                      <ul className="space-y-1">
                        {event.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="text-sm flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-3">
                      <Button className="flex-1" onClick={() => handleRegister(event)}>
                        <Calendar className="mr-2 h-4 w-4" />
                        Register Now
                      </Button>
                      <Button variant="outline" onClick={() => handleGetDirections(event.address)}>
                        <MapPin className="mr-2 h-4 w-4" />
                        Get Directions
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-12 shadow-card bg-gradient-hero text-primary-foreground">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-2">Want to Host an Event?</h3>
                <p className="mb-6 opacity-90">
                  Partner with us to organize e-waste collection drives in your community
                </p>
                <Button size="lg" variant="secondary">
                  Become a Partner
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Registration Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Register for Event</DialogTitle>
            <DialogDescription>
              {selectedEvent?.title}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitRegistration} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={registrationForm.name}
                onChange={(e) => setRegistrationForm({ ...registrationForm, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={registrationForm.email}
                onChange={(e) => setRegistrationForm({ ...registrationForm, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={registrationForm.phone}
                onChange={(e) => setRegistrationForm({ ...registrationForm, phone: e.target.value })}
                required
              />
            </div>
            <div className="bg-primary/5 p-4 rounded-lg text-sm">
              <p className="font-medium mb-1">Event Details:</p>
              <p className="text-muted-foreground">{selectedEvent?.date} at {selectedEvent?.time}</p>
              <p className="text-muted-foreground">{selectedEvent?.location}</p>
            </div>
            <Button type="submit" className="w-full">
              <Check className="mr-2 h-4 w-4" />
              Confirm Registration
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Events;
