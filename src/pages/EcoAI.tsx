import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, MessageSquare, Mic } from "lucide-react";

const EcoAI = () => {
  useEffect(() => {
    // Load ElevenLabs script
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
    script.async = true;
    script.type = 'text/javascript';
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navigation />
      <div className="pt-24 pb-12 px-4">
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
            <Card className="hover:shadow-glow transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-blue-500/20">
                    <MessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle>Chat Assistant</CardTitle>
                </div>
                <CardDescription>
                  Ask questions about e-waste recycling, get personalized recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative w-full h-[600px] rounded-lg overflow-hidden border bg-background/50">
                  <iframe
                    src="https://ecoguide-3d8121.zapier.app/"
                    className="w-full h-full"
                    title="EcoGuide Chat Assistant"
                    allow="microphone"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Voice Assistant */}
            <Card className="hover:shadow-glow transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-purple-500/20">
                    <Mic className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle>Voice Assistant</CardTitle>
                </div>
                <CardDescription>
                  Talk to our AI assistant for hands-free recycling guidance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative w-full h-[600px] rounded-lg overflow-hidden border bg-background/50 flex items-center justify-center">
                  <div 
                    dangerouslySetInnerHTML={{
                      __html: '<elevenlabs-convai agent-id="agent_0501k8cmq520eb4r8f0st7hame07"></elevenlabs-convai>'
                    }}
                    className="w-full h-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center space-y-4">
                      <div className="w-20 h-20 mx-auto rounded-full bg-purple-500/20 flex items-center justify-center animate-pulse">
                        <Mic className="h-10 w-10 text-purple-600 dark:text-purple-400" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Click to start voice conversation
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
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
