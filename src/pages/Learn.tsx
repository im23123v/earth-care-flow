import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Lightbulb, HelpCircle, Wrench } from "lucide-react";

const Learn = () => {
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const articles = [
    {
      title: "The Hidden Cost of E-Waste",
      excerpt: "Learn about the environmental and health impacts of improperly disposed electronics.",
      category: "Environment",
    },
    {
      title: "How Recycling Saves Resources",
      excerpt: "Discover how one recycled laptop can save enough energy to power a home for days.",
      category: "Impact",
    },
    {
      title: "Data Security in E-Waste",
      excerpt: "Why proper data sanitization is crucial before recycling your devices.",
      category: "Security",
    },
  ];

  const facts = [
    "Only 17.4% of global e-waste is properly recycled",
    "1 million cell phones contain 24kg of gold and 250kg of silver",
    "E-waste contains over 1000 toxic substances including lead and mercury",
    "Recycling 1 million laptops saves energy equivalent to powering 3,657 homes",
  ];

  const repairGuides = [
    { device: "Smartphone Screen Replacement", difficulty: "Medium", time: "30 min" },
    { device: "Laptop Battery Swap", difficulty: "Easy", time: "15 min" },
    { device: "Desktop RAM Upgrade", difficulty: "Easy", time: "10 min" },
    { device: "Monitor Cable Repair", difficulty: "Hard", time: "45 min" },
  ];

  return (
    <div className="min-h-screen bg-secondary/20">
      <Navigation />
      
      <div className="container mx-auto px-4 page-container py-12">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">Awareness Hub</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Expand your knowledge about e-waste, sustainability, and how you can make
            a bigger impact through education and action.
          </p>
        </div>

        <Tabs defaultValue="articles" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="articles" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Articles
            </TabsTrigger>
            <TabsTrigger value="facts" className="gap-2">
              <Lightbulb className="h-4 w-4" />
              Facts
            </TabsTrigger>
            <TabsTrigger value="quiz" className="gap-2">
              <HelpCircle className="h-4 w-4" />
              Quiz
            </TabsTrigger>
            <TabsTrigger value="repair" className="gap-2">
              <Wrench className="h-4 w-4" />
              Repair
            </TabsTrigger>
          </TabsList>

          <TabsContent value="articles" className="space-y-6">
            {articles.map((article, index) => (
              <Card key={index} className="p-6 hover:shadow-eco transition-all animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                      {article.category}
                    </span>
                    <h3 className="text-xl font-semibold mt-3 mb-2">{article.title}</h3>
                    <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                    <Button variant="outline">Read More</Button>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="facts" className="grid md:grid-cols-2 gap-6">
            {facts.map((fact, index) => (
              <Card key={index} className="p-6 hover:shadow-eco transition-all animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                <Lightbulb className="h-8 w-8 text-impact-yellow mb-4" />
                <p className="text-lg">{fact}</p>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="quiz">
            <Card className="p-8 text-center animate-scale-in">
              <HelpCircle className="h-16 w-16 text-primary mx-auto mb-6" />
              <h3 className="text-2xl font-semibold mb-4">Test Your E-Waste Knowledge</h3>
              <p className="text-muted-foreground mb-6">
                Take our interactive quiz to learn more about e-waste and earn badges!
              </p>
              {quizScore === null ? (
                <Button size="lg" onClick={() => setQuizScore(85)}>
                  Start Quiz
                </Button>
              ) : (
                <div>
                  <p className="text-3xl font-bold text-primary mb-2">{quizScore}%</p>
                  <p className="text-muted-foreground">Great job! You're an e-waste champion!</p>
                  <Button variant="outline" className="mt-4" onClick={() => setQuizScore(null)}>
                    Retake Quiz
                  </Button>
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="repair" className="space-y-6">
            <div className="mb-8 text-center">
              <h3 className="text-2xl font-semibold mb-2">iFixit-Style Repair Guides</h3>
              <p className="text-muted-foreground">
                Extend your device's life with our step-by-step repair tutorials
              </p>
            </div>
            {repairGuides.map((guide, index) => (
              <Card key={index} className="p-6 hover:shadow-eco transition-all animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold mb-2">{guide.device}</h4>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span>Difficulty: <strong>{guide.difficulty}</strong></span>
                      <span>Time: <strong>{guide.time}</strong></span>
                    </div>
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Wrench className="h-4 w-4" />
                    View Guide
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Learn;
