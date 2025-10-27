import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Package, Search, CheckCircle2, Clock, Truck, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const mockTracking = {
  "PU-2024-001": {
    id: "PU-2024-001",
    status: "completed",
    device: "2x Laptops, 1x Monitor",
    scheduledDate: "2024-01-20",
    address: "123 Green Street, EcoCity",
    timeline: [
      { status: "scheduled", date: "2024-01-18", time: "10:30 AM", label: "Pickup Scheduled" },
      { status: "confirmed", date: "2024-01-19", time: "2:15 PM", label: "Driver Assigned" },
      { status: "in-transit", date: "2024-01-20", time: "9:00 AM", label: "Driver En Route" },
      { status: "completed", date: "2024-01-20", time: "10:45 AM", label: "Pickup Completed" },
    ]
  },
  "PU-2024-002": {
    id: "PU-2024-002",
    status: "in-transit",
    device: "1x Desktop, 3x Smartphones",
    scheduledDate: "2024-01-25",
    address: "456 Sustainability Ave, GreenTown",
    timeline: [
      { status: "scheduled", date: "2024-01-23", time: "11:00 AM", label: "Pickup Scheduled" },
      { status: "confirmed", date: "2024-01-24", time: "3:30 PM", label: "Driver Assigned" },
      { status: "in-transit", date: "2024-01-25", time: "8:30 AM", label: "Driver En Route" },
    ]
  }
};

const Tracker = () => {
  const [trackingId, setTrackingId] = useState("");
  const [trackingInfo, setTrackingInfo] = useState<any>(null);

  const handleTrack = () => {
    const info = mockTracking[trackingId as keyof typeof mockTracking];
    setTrackingInfo(info || null);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle2 className="h-5 w-5 text-primary" />;
      case "in-transit": return <Truck className="h-5 w-5 text-accent" />;
      case "confirmed": return <CheckCircle2 className="h-5 w-5 text-muted-foreground" />;
      default: return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "default";
      case "in-transit": return "secondary";
      default: return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-card">
      <Navigation />
      <div className="page-container pt-12 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Package className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
                Track Your Pickup
              </h1>
              <p className="text-lg text-muted-foreground">
                Enter your tracking ID to see the status of your e-waste pickup
              </p>
            </div>

            <Card className="mb-8 shadow-card">
              <CardHeader>
                <CardTitle>Enter Tracking ID</CardTitle>
                <CardDescription>Your tracking ID was sent via email after scheduling</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Input
                    placeholder="e.g., PU-2024-001"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
                  />
                  <Button onClick={handleTrack}>
                    <Search className="mr-2 h-4 w-4" />
                    Track
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Try: PU-2024-001 or PU-2024-002
                </p>
              </CardContent>
            </Card>

            {trackingInfo && (
              <div className="space-y-6 animate-scale-in">
                <Card className="shadow-card">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl">Pickup #{trackingInfo.id}</CardTitle>
                        <CardDescription className="mt-2">{trackingInfo.device}</CardDescription>
                      </div>
                      <Badge variant={getStatusColor(trackingInfo.status)}>
                        {trackingInfo.status.replace("-", " ").toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                      <MapPin className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Pickup Address</p>
                        <p className="text-sm text-muted-foreground">{trackingInfo.address}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Pickup Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {trackingInfo.timeline.map((item: any, index: number) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            {getStatusIcon(item.status)}
                            {index < trackingInfo.timeline.length - 1 && (
                              <div className="w-0.5 h-full bg-border mt-2" />
                            )}
                          </div>
                          <div className="flex-1 pb-6">
                            <p className="font-medium">{item.label}</p>
                            <p className="text-sm text-muted-foreground">
                              {item.date} at {item.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {trackingId && !trackingInfo && trackingId.length > 0 && (
              <Card className="shadow-card border-destructive/50">
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground">
                    No tracking information found for ID: <span className="font-mono">{trackingId}</span>
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracker;
