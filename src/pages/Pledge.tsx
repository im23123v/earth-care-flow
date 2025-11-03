import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, MessageSquare } from "lucide-react";
import { toast } from "sonner";

const Pledge = () => {
  const [pledgeText, setPledgeText] = useState("");
  const [name, setName] = useState("");

  const pledges = [
    {
      name: "Sarah M.",
      pledge: "I pledge to recycle all my old electronics and encourage my family to do the same!",
      likes: 42,
      date: "2 days ago",
    },
    {
      name: "Michael T.",
      pledge: "Committing to repair my devices before replacing them and only buy from sustainable brands.",
      likes: 38,
      date: "4 days ago",
    },
    {
      name: "Emma L.",
      pledge: "I will organize an e-waste collection drive in my community every quarter!",
      likes: 67,
      date: "1 week ago",
    },
    {
      name: "David K.",
      pledge: "No more throwing electronics in trash! I'll always find proper recycling centers.",
      likes: 29,
      date: "1 week ago",
    },
    {
      name: "Lisa P.",
      pledge: "Teaching my kids about e-waste and making it a family mission to recycle responsibly.",
      likes: 51,
      date: "2 weeks ago",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pledgeText.trim() && name.trim()) {
      toast.success("Thank you for your pledge! Together we make a difference.");
      setPledgeText("");
      setName("");
    }
  };

  return (
    <div className="min-h-screen bg-secondary/20">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">Pledge Wall</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Make your sustainability commitment public! Share your pledge and inspire others
            to join the e-waste revolution.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Pledge Form */}
          <Card className="p-8 mb-12 shadow-eco animate-scale-in">
            <h2 className="text-2xl font-semibold mb-6 text-center">Make Your Pledge</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="How should we display your name?"
                  required
                />
              </div>
              <div>
                <Label htmlFor="pledge">Your Sustainability Pledge</Label>
                <Textarea
                  id="pledge"
                  value={pledgeText}
                  onChange={(e) => setPledgeText(e.target.value)}
                  placeholder="What's your commitment to sustainable e-waste management?"
                  rows={4}
                  required
                />
              </div>
              <Button type="submit" size="lg" className="w-full gap-2">
                <MessageSquare className="h-5 w-5" />
                Share My Pledge
              </Button>
            </form>
          </Card>

          {/* Existing Pledges */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-6">Community Pledges</h2>
            {pledges.map((pledge, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-eco transition-all animate-fade-in"
                style={{ animationDelay: `${200 + index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{pledge.name}</h3>
                    <p className="text-sm text-muted-foreground">{pledge.date}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Heart className="h-4 w-4" />
                    {pledge.likes}
                  </Button>
                </div>
                <p className="text-muted-foreground">{pledge.pledge}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pledge;
