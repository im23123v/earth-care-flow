import { useConversation } from "@11labs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mic, MicOff, Phone, PhoneOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const VoiceAgent = () => {
  const [agentId, setAgentId] = useState("");
  const [isConfigured, setIsConfigured] = useState(false);

  const conversation = useConversation({
    onConnect: () => {
      toast.success("Connected to voice assistant");
    },
    onDisconnect: () => {
      toast.info("Disconnected from voice assistant");
    },
    onMessage: (message) => {
      console.log("Message:", message);
    },
    onError: (error) => {
      toast.error("Error: " + error.message);
    },
  });

  const startConversation = async () => {
    if (!agentId) {
      toast.error("Please enter your ElevenLabs Agent ID");
      return;
    }

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await conversation.startSession({ agentId });
      setIsConfigured(true);
    } catch (error) {
      toast.error("Failed to start conversation. Please check your agent ID and microphone permissions.");
      console.error(error);
    }
  };

  const endConversation = async () => {
    await conversation.endSession();
    setIsConfigured(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="p-3 rounded-lg bg-purple-500/20">
            <Mic className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <CardTitle>ElevenLabs Voice Assistant</CardTitle>
            <CardDescription>Talk naturally with our AI assistant</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isConfigured ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="agentId">ElevenLabs Agent ID</Label>
              <Input
                id="agentId"
                placeholder="Enter your agent ID"
                value={agentId}
                onChange={(e) => setAgentId(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Get your agent ID from{" "}
                <a
                  href="https://elevenlabs.io/app/conversational-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  ElevenLabs Dashboard
                </a>
              </p>
            </div>
            <Button onClick={startConversation} className="w-full gap-2" size="lg">
              <Phone className="h-5 w-5" />
              Start Voice Chat
            </Button>
          </>
        ) : (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 p-8 rounded-lg border-2 border-purple-500/20">
              <div className="text-center space-y-4">
                <div
                  className={`w-20 h-20 mx-auto rounded-full bg-purple-500/20 flex items-center justify-center ${
                    conversation.isSpeaking ? "animate-pulse" : ""
                  }`}
                >
                  {conversation.isSpeaking ? (
                    <Mic className="h-10 w-10 text-purple-600 dark:text-purple-400" />
                  ) : (
                    <MicOff className="h-10 w-10 text-purple-600 dark:text-purple-400" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    {conversation.status === "connected" ? "Voice Assistant Active" : "Connecting..."}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {conversation.isSpeaking ? "Assistant is speaking..." : "Listening to you..."}
                  </p>
                </div>
              </div>
            </div>
            <Button onClick={endConversation} variant="destructive" className="w-full gap-2" size="lg">
              <PhoneOff className="h-5 w-5" />
              End Voice Chat
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VoiceAgent;
