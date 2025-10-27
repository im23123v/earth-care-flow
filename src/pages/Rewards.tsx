import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, Trophy, Star, Medal, Download, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";

const Rewards = () => {
  const badges = [
    { name: "First Step", icon: Star, earned: true, description: "Completed your first recycling", hasCertificate: true },
    { name: "Eco Warrior", icon: Award, earned: true, description: "Recycled 10+ devices", hasCertificate: true },
    { name: "Green Champion", icon: Trophy, earned: false, description: "Recycled 50+ devices", hasCertificate: true },
    { name: "Planet Hero", icon: Medal, earned: false, description: "Recycled 100+ devices", hasCertificate: true },
  ];

  const handleDownloadCertificate = (badgeName: string) => {
    toast({
      title: "Certificate Downloaded",
      description: `Your ${badgeName} e-certificate has been downloaded successfully!`,
    });
    // In production, this would trigger actual certificate generation and download
  };

  const leaderboard = [
    { rank: 1, name: "Sarah Green", points: 15420, devices: 127 },
    { rank: 2, name: "Mike Eco", points: 14230, devices: 115 },
    { rank: 3, name: "Lisa Planet", points: 12890, devices: 98 },
    { rank: 4, name: "John Recycle", points: 11540, devices: 87 },
    { rank: 5, name: "You", points: 8650, devices: 68, highlight: true },
  ];

  return (
    <div className="min-h-screen bg-secondary/20">
      <Navigation />
      
      <div className="container mx-auto px-4 page-container py-12">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">Rewards & Recognition</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Earn badges, climb the leaderboard, and get recognized for your environmental contributions.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Progress Overview */}
          <Card className="p-8 mb-12 shadow-eco animate-scale-in">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold mb-2">Your Progress</h2>
              <p className="text-muted-foreground">Keep recycling to unlock new badges!</p>
            </div>
            <div className="max-w-2xl mx-auto">
              <div className="flex justify-between text-sm mb-2">
                <span>Level 3</span>
                <span>68/100 devices to Level 4</span>
              </div>
              <Progress value={68} className="h-3" />
            </div>
          </Card>

          {/* Badges */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Your Badges</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {badges.map((badge, index) => (
                <Card
                  key={badge.name}
                  className={`p-6 text-center transition-all animate-scale-in ${
                    badge.earned ? "shadow-eco" : "opacity-50"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center ${
                    badge.earned ? "bg-primary/10" : "bg-muted"
                  }`}>
                    <badge.icon className={`h-10 w-10 ${badge.earned ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <h3 className="font-semibold mb-2">{badge.name}</h3>
                  <p className="text-xs text-muted-foreground">{badge.description}</p>
                  {badge.earned ? (
                    <div className="mt-3 flex flex-col gap-2">
                      <Badge className="bg-primary/20 text-primary">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Earned
                      </Badge>
                      {badge.hasCertificate && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDownloadCertificate(badge.name)}
                          className="gap-2"
                        >
                          <Download className="h-3 w-3" />
                          E-Certificate
                        </Button>
                      )}
                    </div>
                  ) : (
                    <Badge variant="secondary" className="mt-3">Locked</Badge>
                  )}
                </Card>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Global Leaderboard</h2>
            <Card className="overflow-hidden shadow-eco animate-fade-in" style={{ animationDelay: "400ms" }}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Rank</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold">Points</th>
                      <th className="px-6 py-4 text-right text-sm font-semibold">Devices</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((entry, index) => (
                      <tr
                        key={entry.rank}
                        className={`border-b transition-colors ${
                          entry.highlight ? "bg-primary/5 font-semibold" : "hover:bg-muted/50"
                        }`}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {entry.rank <= 3 && (
                              <Trophy className={`h-5 w-5 ${
                                entry.rank === 1 ? "text-impact-yellow" : 
                                entry.rank === 2 ? "text-muted-foreground" : 
                                "text-earth-brown"
                              }`} />
                            )}
                            <span>#{entry.rank}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">{entry.name}</td>
                        <td className="px-6 py-4 text-right">{entry.points.toLocaleString()}</td>
                        <td className="px-6 py-4 text-right">{entry.devices}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
