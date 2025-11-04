import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, MessageSquare, ExternalLink, Sparkles } from "lucide-react";
import VoiceAgent from "@/components/VoiceAgent";

const EcoAI = () => {
  const handleOpenChat = () => {
    window.open("https://ecoguide-3d8121.zapier.app/", "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navigation />
      <div className="page-container pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <Bot className="h-5 w-5" />
              <span className="text-sm font-medium">AI-Powered Assistant</span>
            </div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
              EcoAI Assistant
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get instant help with e-waste questions, recycling guidance, and environmental insights
            </p>
          </div>

          {/* AI Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Chat Assistant */}
            <Card className="hover:shadow-glow transition-all hover:scale-[1.02] duration-300">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-3 rounded-lg bg-blue-500/20 animate-pulse">
                    <MessageSquare className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <CardTitle>Chat Assistant</CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">Powered by AI</p>
                  </div>
                </div>
                <CardDescription className="mt-4">
                  Ask questions about e-waste recycling, get personalized recommendations, and learn about proper disposal methods
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 p-8 rounded-lg border-2 border-blue-500/20">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 mx-auto rounded-full bg-blue-500/20 flex items-center justify-center">
                      <MessageSquare className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Interactive Chat Bot</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Get instant answers to your e-waste questions
                      </p>
                    </div>
                  </div>
                </div>
                <Button onClick={handleOpenChat} className="w-full gap-2 h-12" size="lg">
                  <MessageSquare className="h-5 w-5" />
                  Open Chat Assistant
                  <ExternalLink className="h-4 w-4 ml-auto" />
                </Button>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Sparkles className="h-4 w-4" />
                  <span>Available 24/7 • Real-time responses</span>
                </div>
              </CardContent>
            </Card>

            {/* Voice Assistant */}
            <VoiceAgent />
          </div>

          {/* Info Section */}
          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
            <CardHeader>
              <CardTitle>How EcoAI Can Help You</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-primary">Recycling Guidance</h3>
                  <p className="text-sm text-muted-foreground">
                    Get step-by-step instructions for recycling specific devices safely
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-primary">Data Security</h3>
                  <p className="text-sm text-muted-foreground">
                    Learn how to properly wipe and secure your data before recycling
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-primary">Environmental Impact</h3>
                  <p className="text-sm text-muted-foreground">
                    Understand the environmental benefits of responsible e-waste management
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EcoAI;
