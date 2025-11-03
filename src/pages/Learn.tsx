import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Lightbulb, HelpCircle, Wrench, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const Learn = () => {
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const articles = [
    {
      title: "The Global E-Waste Crisis: Understanding the Scale",
      excerpt: "Every year, the world generates over 50 million tons of electronic waste. Learn about the environmental and health impacts of improperly disposed electronics, including toxic substances like lead, mercury, and cadmium that leach into soil and water.",
      category: "Environment",
      content: "E-waste is the fastest-growing waste stream globally. Without proper recycling, valuable materials are lost and toxic substances pollute our environment. Studies show that informal recycling exposes workers to dangerous chemicals, causing severe health issues.",
    },
    {
      title: "How Recycling Saves Resources and Energy",
      excerpt: "Discover the incredible resource recovery potential of e-waste. One recycled laptop can save enough energy to power a home for days, and one ton of circuit boards contains more gold than 17 tons of gold ore.",
      category: "Impact",
      content: "Recycling e-waste recovers precious metals like gold, silver, copper, and rare earth elements. This reduces the need for mining, which is energy-intensive and environmentally destructive. For every million cell phones recycled, we can recover 24kg of gold, 250kg of silver, and 9,000kg of copper.",
    },
    {
      title: "Data Security: Why It Matters Before Recycling",
      excerpt: "Your old devices contain sensitive personal and financial data. Learn why proper data sanitization is crucial before recycling, and discover the methods used by certified recyclers to ensure your information is permanently destroyed.",
      category: "Security",
      content: "Simply deleting files or factory reset isn't enough. Professional data destruction uses DoD-certified wiping software or physical destruction methods. Certified recyclers follow strict protocols to ensure data cannot be recovered, protecting you from identity theft.",
    },
    {
      title: "The Circular Economy: Designing for Sustainability",
      excerpt: "Moving beyond the linear 'take-make-dispose' model, the circular economy emphasizes product longevity, repair, refurbishment, and recycling. Learn how this approach transforms e-waste from a problem into a resource.",
      category: "Innovation",
      content: "Companies are now designing products with modularity and repairability in mind. The 'Right to Repair' movement empowers consumers to extend device lifespans. This shift reduces waste, conserves resources, and creates new economic opportunities in repair and refurbishment sectors.",
    },
    {
      title: "Telangana's E-Waste Management Success Story",
      excerpt: "Discover how Telangana is leading India's e-waste revolution with TSPCB-certified centers, transparent tracking systems, and community engagement programs that have diverted thousands of tons from landfills.",
      category: "Local Impact",
      content: "Telangana's integrated approach combines government policy, industry partnerships, and citizen participation. Collection centers across districts, door-to-door pickup services, and awareness campaigns have achieved remarkable collection rates while ensuring safe, compliant recycling.",
    },
    {
      title: "Toxic Components in Electronics: What You Should Know",
      excerpt: "Electronics contain hazardous materials including lead in solder, mercury in screens, cadmium in batteries, and brominated flame retardants in plastics. Understanding these dangers underscores the importance of proper disposal.",
      category: "Health & Safety",
      content: "When e-waste is burned or dumped in landfills, these toxins contaminate air, soil, and water. Children and pregnant women are particularly vulnerable. Certified recycling facilities use specialized equipment and processes to safely extract and dispose of these materials.",
    },
  ];

  const facts = [
    {
      fact: "Only 17.4% of global e-waste is properly recycled",
      detail: "This means over 40 million tons of valuable materials are lost annually, and toxic substances pollute our environment."
    },
    {
      fact: "1 million cell phones contain 24kg of gold and 250kg of silver",
      detail: "The concentration of precious metals in e-waste is significantly higher than in natural ore deposits."
    },
    {
      fact: "E-waste contains over 1,000 toxic substances",
      detail: "Including lead, mercury, cadmium, arsenic, and brominated flame retardants that can cause severe health problems."
    },
    {
      fact: "Recycling 1 million laptops saves energy equivalent to powering 3,657 homes for a year",
      detail: "The energy saved through recycling can significantly reduce carbon emissions and combat climate change."
    },
    {
      fact: "India generates 3.2 million tons of e-waste annually",
      detail: "Making it the third-largest e-waste generator globally, yet only 10% is currently recycled through formal channels."
    },
    {
      fact: "The average smartphone contains over 60 elements from the periodic table",
      detail: "Including rare earth metals that are finite resources and energy-intensive to mine."
    },
    {
      fact: "E-waste recycling creates 50 times more jobs than landfilling",
      detail: "The recycling industry provides employment in collection, sorting, processing, and refurbishment sectors."
    },
    {
      fact: "A single laptop can take 1,000 years to decompose in a landfill",
      detail: "During this time, it releases toxic chemicals that contaminate soil and groundwater."
    },
  ];

  const quizQuestions = [
    {
      question: "What percentage of global e-waste is properly recycled?",
      options: ["5%", "17.4%", "35%", "50%"],
      correct: 1,
      explanation: "Only 17.4% of e-waste is properly recycled globally, meaning valuable resources are lost and environmental damage occurs."
    },
    {
      question: "Which toxic metal commonly found in e-waste can cause brain damage?",
      options: ["Aluminum", "Lead", "Iron", "Zinc"],
      correct: 1,
      explanation: "Lead, commonly used in solder and batteries, can cause serious neurological damage, especially in children."
    },
    {
      question: "How much gold can be recovered from 1 million cell phones?",
      options: ["5kg", "12kg", "24kg", "50kg"],
      correct: 2,
      explanation: "One million cell phones contain approximately 24kg of gold, demonstrating the resource recovery potential of e-waste."
    },
    {
      question: "What is the primary benefit of the circular economy in e-waste management?",
      options: [
        "Lower product prices",
        "Faster technological innovation",
        "Resource conservation and waste reduction",
        "Increased manufacturing speed"
      ],
      correct: 2,
      explanation: "The circular economy focuses on keeping resources in use longer through repair, refurbishment, and recycling, reducing waste and environmental impact."
    },
    {
      question: "What should you do before recycling your old smartphone?",
      options: [
        "Just delete all files",
        "Factory reset only",
        "Use certified data wiping software or service",
        "Remove the SIM card only"
      ],
      correct: 2,
      explanation: "Certified data wiping ensures information cannot be recovered. Simple deletion or factory reset may leave data vulnerable to recovery."
    },
  ];

  const repairGuides = [
    { 
      device: "Smartphone Screen Replacement", 
      difficulty: "Medium", 
      time: "30 min",
      steps: "1. Power off device 2. Remove screws 3. Disconnect battery 4. Remove damaged screen 5. Install new screen 6. Reassemble",
      tools: "Precision screwdriver set, suction cup, plastic pry tools, heat gun"
    },
    { 
      device: "Laptop Battery Replacement", 
      difficulty: "Easy", 
      time: "15 min",
      steps: "1. Power off and unplug 2. Remove back panel 3. Disconnect battery cable 4. Remove battery 5. Install new battery 6. Reconnect",
      tools: "Phillips screwdriver, anti-static wrist strap"
    },
    { 
      device: "Desktop RAM Upgrade", 
      difficulty: "Easy", 
      time: "10 min",
      steps: "1. Power off and unplug 2. Open case 3. Release RAM clips 4. Remove old RAM 5. Align and insert new RAM 6. Press firmly until clips lock",
      tools: "Phillips screwdriver, anti-static wrist strap"
    },
    { 
      device: "Monitor Cable Repair", 
      difficulty: "Hard", 
      time: "45 min",
      steps: "1. Identify damaged section 2. Cut and strip wires 3. Solder connections 4. Apply heat shrink tubing 5. Test continuity 6. Secure with cable sleeve",
      tools: "Wire strippers, soldering iron, heat shrink tubing, multimeter"
    },
    { 
      device: "Keyboard Key Replacement", 
      difficulty: "Easy", 
      time: "5 min",
      steps: "1. Gently pry off damaged key 2. Clean underneath 3. Align replacement key 4. Press firmly until it clicks into place",
      tools: "Plastic pry tool or flathead screwdriver, isopropyl alcohol"
    },
    { 
      device: "Tablet Charging Port Cleaning", 
      difficulty: "Easy", 
      time: "10 min",
      steps: "1. Power off device 2. Use compressed air to remove debris 3. Gently clean with toothpick 4. Test charging 5. If needed, use isopropyl alcohol on cotton swab",
      tools: "Compressed air, wooden toothpick, isopropyl alcohol, cotton swabs"
    },
  ];

  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    
    if (answerIndex === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
      toast.success("Correct! " + quizQuestions[currentQuestion].explanation);
    } else {
      toast.error("Incorrect. " + quizQuestions[currentQuestion].explanation);
    }

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        const finalScore = Math.round(((score + (answerIndex === quizQuestions[currentQuestion].correct ? 1 : 0)) / quizQuestions.length) * 100);
        setQuizScore(finalScore);
      }
    }, 3000);
  };

  const resetQuiz = () => {
    setQuizScore(null);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
  };

  return (
    <div className="min-h-screen bg-secondary/20">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">E-Waste Awareness Hub</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
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
            <div className="grid md:grid-cols-2 gap-6">
              {articles.map((article, index) => (
                <Card key={index} className="p-6 hover:shadow-eco transition-all animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex flex-col h-full">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full w-fit mb-3">
                      {article.category}
                    </span>
                    <h3 className="text-xl font-semibold mb-3">{article.title}</h3>
                    <p className="text-muted-foreground mb-4 flex-grow">{article.excerpt}</p>
                    <div className="border-t pt-4">
                      <p className="text-sm text-muted-foreground">{article.content}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="facts" className="grid md:grid-cols-2 gap-6">
            {facts.map((item, index) => (
              <Card key={index} className="p-6 hover:shadow-eco transition-all animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex gap-4">
                  <Lightbulb className="h-8 w-8 text-impact-yellow flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-lg font-semibold mb-2">{item.fact}</p>
                    <p className="text-sm text-muted-foreground">{item.detail}</p>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="quiz">
            <Card className="p-8 animate-scale-in">
              {quizScore === null ? (
                <div>
                  {currentQuestion === 0 && selectedAnswer === null && (
                    <div className="text-center mb-8">
                      <HelpCircle className="h-16 w-16 text-primary mx-auto mb-6" />
                      <h3 className="text-2xl font-semibold mb-4">Test Your E-Waste Knowledge</h3>
                      <p className="text-muted-foreground mb-6">
                        Answer {quizQuestions.length} questions to test your understanding and learn more!
                      </p>
                    </div>
                  )}
                  
                  <div className="max-w-2xl mx-auto">
                    <div className="mb-6">
                      <div className="flex justify-between text-sm text-muted-foreground mb-2">
                        <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
                        <span>Score: {score}/{currentQuestion}</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-300"
                          style={{ width: `${((currentQuestion) / quizQuestions.length) * 100}%` }}
                        />
                      </div>
                    </div>

                    <h4 className="text-xl font-semibold mb-6">{quizQuestions[currentQuestion].question}</h4>
                    
                    <div className="space-y-3">
                      {quizQuestions[currentQuestion].options.map((option, index) => (
                        <Button
                          key={index}
                          onClick={() => handleQuizAnswer(index)}
                          disabled={selectedAnswer !== null}
                          variant={
                            selectedAnswer === index
                              ? index === quizQuestions[currentQuestion].correct
                                ? "default"
                                : "destructive"
                              : "outline"
                          }
                          className="w-full justify-start text-left h-auto py-4 px-6"
                        >
                          <span className="flex items-center gap-3">
                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-semibold">
                              {String.fromCharCode(65 + index)}
                            </span>
                            <span>{option}</span>
                            {selectedAnswer === index && index === quizQuestions[currentQuestion].correct && (
                              <CheckCircle className="ml-auto h-5 w-5" />
                            )}
                          </span>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className={`w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center ${
                    quizScore >= 80 ? 'bg-green-500/20' : quizScore >= 60 ? 'bg-yellow-500/20' : 'bg-red-500/20'
                  }`}>
                    <p className="text-5xl font-bold">{quizScore}%</p>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    {quizScore >= 80 ? "Excellent!" : quizScore >= 60 ? "Good Job!" : "Keep Learning!"}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    You scored {score} out of {quizQuestions.length} questions correctly.
                    {quizScore >= 80 && " You're an e-waste champion!"}
                    {quizScore >= 60 && quizScore < 80 && " You have a solid understanding!"}
                    {quizScore < 60 && " Review the articles to improve your knowledge!"}
                  </p>
                  <Button size="lg" onClick={resetQuiz}>
                    Retake Quiz
                  </Button>
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="repair" className="space-y-6">
            <div className="mb-8 text-center animate-fade-in">
              <h3 className="text-2xl font-semibold mb-2">Device Repair Guides</h3>
              <p className="text-muted-foreground">
                Extend your device's life with our step-by-step repair tutorials. Repairing is the most sustainable choice!
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {repairGuides.map((guide, index) => (
                <Card key={index} className="p-6 hover:shadow-eco transition-all animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10 flex-shrink-0">
                      <Wrench className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold mb-2">{guide.device}</h4>
                      <div className="flex gap-4 text-sm text-muted-foreground mb-4">
                        <span className={`font-medium ${
                          guide.difficulty === 'Easy' ? 'text-green-500' : 
                          guide.difficulty === 'Medium' ? 'text-yellow-500' : 'text-red-500'
                        }`}>
                          {guide.difficulty}
                        </span>
                        <span>⏱️ {guide.time}</span>
                      </div>
                      <div className="border-t pt-4 space-y-3">
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground mb-1">STEPS:</p>
                          <p className="text-sm">{guide.steps}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground mb-1">TOOLS NEEDED:</p>
                          <p className="text-sm">{guide.tools}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Learn;