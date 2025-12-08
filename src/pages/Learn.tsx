import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Lightbulb, HelpCircle, Wrench, CheckCircle, X, ChevronRight, Clock, AlertTriangle, Recycle, Globe, Shield, Leaf, Cpu, Battery, Smartphone, Monitor, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  icon: React.ReactNode;
  content: string;
  keyPoints: string[];
  stats: { label: string; value: string }[];
  actionItems: string[];
  readTime: string;
}

interface Fact {
  id: number;
  fact: string;
  detail: string;
  source: string;
  relatedFacts: string[];
  impact: string;
  icon: React.ReactNode;
}

interface RepairGuide {
  id: number;
  device: string;
  difficulty: "Easy" | "Medium" | "Hard";
  time: string;
  steps: string[];
  tools: string[];
  tips: string[];
  warnings: string[];
  videoPlaceholder: string;
  icon: React.ReactNode;
}

const Learn = () => {
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedFact, setSelectedFact] = useState<Fact | null>(null);
  const [selectedRepair, setSelectedRepair] = useState<RepairGuide | null>(null);

  const articles: Article[] = [
    {
      id: 1,
      title: "The Global E-Waste Crisis: Understanding the Scale",
      excerpt: "Every year, the world generates over 50 million tons of electronic waste. Learn about the environmental and health impacts.",
      category: "Environment",
      icon: <Globe className="h-5 w-5" />,
      content: "E-waste is the fastest-growing waste stream globally, with an estimated 57.4 million metric tonnes generated in 2021 alone. This represents about 7.6 kg per person worldwide. Without proper recycling, valuable materials are lost and toxic substances pollute our environment. Studies show that informal recycling exposes workers to dangerous chemicals, causing severe health issues including respiratory problems, neurological damage, and increased cancer risk.",
      keyPoints: [
        "E-waste is growing 3x faster than other waste streams",
        "Less than 20% is formally recycled globally",
        "Contains over 1,000 different substances, many toxic",
        "Improper disposal contaminates soil and groundwater for decades"
      ],
      stats: [
        { label: "Annual Global E-Waste", value: "57.4M tonnes" },
        { label: "Properly Recycled", value: "17.4%" },
        { label: "Value of Raw Materials", value: "$57 billion" },
        { label: "Expected by 2030", value: "74.7M tonnes" }
      ],
      actionItems: [
        "Research certified e-waste recyclers in your area",
        "Extend device lifespan through proper maintenance",
        "Consider refurbished electronics when purchasing",
        "Educate friends and family about proper disposal"
      ],
      readTime: "8 min"
    },
    {
      id: 2,
      title: "How Recycling Saves Resources and Energy",
      excerpt: "Discover the incredible resource recovery potential of e-waste and how recycling conserves natural resources.",
      category: "Impact",
      icon: <Recycle className="h-5 w-5" />,
      content: "Recycling e-waste recovers precious metals like gold, silver, copper, and rare earth elements at concentrations far higher than natural ore deposits. One ton of circuit boards contains 40-800 times more gold than one ton of gold ore. This reduces the need for mining, which is energy-intensive and environmentally destructive. The energy saved by recycling aluminum from e-waste is 95% less than producing it from raw bauxite ore.",
      keyPoints: [
        "Circuit boards contain 40-800x more gold than gold ore",
        "Recycling saves 95% of energy vs. mining new materials",
        "One smartphone contains over 60 elements from the periodic table",
        "Rare earth elements are finite and critical for technology"
      ],
      stats: [
        { label: "Gold per Million Phones", value: "24 kg" },
        { label: "Silver per Million Phones", value: "250 kg" },
        { label: "Copper per Million Phones", value: "9,000 kg" },
        { label: "Energy Saved (Aluminum)", value: "95%" }
      ],
      actionItems: [
        "Recycle all electronics through certified channels",
        "Support companies with take-back programs",
        "Choose products made with recycled materials",
        "Advocate for extended producer responsibility"
      ],
      readTime: "6 min"
    },
    {
      id: 3,
      title: "Data Security: Why It Matters Before Recycling",
      excerpt: "Your old devices contain sensitive data. Learn why proper data sanitization is crucial before recycling.",
      category: "Security",
      icon: <Shield className="h-5 w-5" />,
      content: "Your old devices contain a treasure trove of sensitive personal and financial data. Simply deleting files or performing a factory reset is not sufficient, as data recovery software can often retrieve this information. Professional data destruction uses DoD 5220.22-M certified wiping software or physical destruction methods like shredding. Identity theft from improperly disposed electronics is a growing concern, with criminals targeting e-waste for valuable personal information.",
      keyPoints: [
        "Factory reset doesn't fully erase data",
        "Data recovery software can retrieve deleted files",
        "Identity theft from e-waste is increasingly common",
        "DoD-certified wiping ensures complete data destruction"
      ],
      stats: [
        { label: "Data Breaches from E-Waste", value: "Growing 40%" },
        { label: "Cost of Identity Theft", value: "$52B/year" },
        { label: "Devices with Recoverable Data", value: "67%" },
        { label: "Companies Offering Secure Recycling", value: "Limited" }
      ],
      actionItems: [
        "Use certified data destruction services",
        "Encrypt devices before disposal",
        "Remove and destroy storage media if possible",
        "Verify recycler's data security certifications"
      ],
      readTime: "7 min"
    },
    {
      id: 4,
      title: "The Circular Economy: Designing for Sustainability",
      excerpt: "Moving beyond 'take-make-dispose' to a model that emphasizes product longevity and recycling.",
      category: "Innovation",
      icon: <Leaf className="h-5 w-5" />,
      content: "The circular economy represents a fundamental shift from the traditional linear 'take-make-dispose' model. Companies are now designing products with modularity and repairability in mind, allowing components to be replaced rather than discarding entire devices. The 'Right to Repair' movement empowers consumers to extend device lifespans. This shift reduces waste, conserves resources, and creates new economic opportunities in repair and refurbishment sectors, potentially generating 700,000 jobs in the EU alone by 2030.",
      keyPoints: [
        "Products designed for disassembly and repair",
        "Right to Repair legislation gaining momentum globally",
        "Refurbishment market growing 15% annually",
        "Circular economy could create 700,000 EU jobs by 2030"
      ],
      stats: [
        { label: "Modular Phone Market Growth", value: "12% CAGR" },
        { label: "Refurb Market Value", value: "$65B" },
        { label: "Repair Cafe Locations", value: "2,500+" },
        { label: "Countries with R2R Laws", value: "30+" }
      ],
      actionItems: [
        "Support Right to Repair legislation",
        "Choose modular and repairable products",
        "Visit local repair cafes for DIY repairs",
        "Buy refurbished when possible"
      ],
      readTime: "9 min"
    },
    {
      id: 5,
      title: "Telangana's E-Waste Management Success Story",
      excerpt: "How Telangana is leading India's e-waste revolution with certified centers and community engagement.",
      category: "Local Impact",
      icon: <Globe className="h-5 w-5" />,
      content: "Telangana has emerged as a leader in India's e-waste management through an integrated approach combining government policy, industry partnerships, and citizen participation. The Telangana State Pollution Control Board (TSPCB) has certified numerous collection centers across all districts, ensuring safe and compliant recycling. Door-to-door pickup services, awareness campaigns in schools and colleges, and transparent tracking systems have achieved remarkable collection rates while setting a model for other states to follow.",
      keyPoints: [
        "TSPCB-certified centers in all 33 districts",
        "Door-to-door collection services available",
        "Digital tracking for transparency and accountability",
        "School and college awareness programs"
      ],
      stats: [
        { label: "Collection Centers", value: "150+" },
        { label: "Annual Collection", value: "25,000 tonnes" },
        { label: "Districts Covered", value: "33/33" },
        { label: "Citizens Reached", value: "2M+" }
      ],
      actionItems: [
        "Use TSPCB-certified recyclers only",
        "Schedule pickups through official channels",
        "Participate in community collection drives",
        "Spread awareness in your neighborhood"
      ],
      readTime: "5 min"
    },
    {
      id: 6,
      title: "Toxic Components in Electronics: Health Hazards",
      excerpt: "Understanding the hazardous materials in our devices and the importance of safe disposal.",
      category: "Health & Safety",
      icon: <AlertTriangle className="h-5 w-5" />,
      content: "Electronics contain a cocktail of hazardous materials including lead in solder, mercury in flat-panel displays, cadmium in rechargeable batteries, and brominated flame retardants in plastics. When e-waste is burned or dumped in landfills, these toxins contaminate air, soil, and water. Children and pregnant women are particularly vulnerable to these pollutants. Studies in informal recycling areas show elevated blood lead levels and increased rates of respiratory diseases among workers and nearby residents.",
      keyPoints: [
        "Lead causes neurological damage, especially in children",
        "Mercury accumulates in food chain",
        "Cadmium linked to kidney damage and cancer",
        "Flame retardants disrupt hormonal systems"
      ],
      stats: [
        { label: "Lead in CRT Monitor", value: "2-4 kg" },
        { label: "Mercury per LCD Display", value: "3-5 mg" },
        { label: "Cadmium per NiCd Battery", value: "15-25g" },
        { label: "Workers Exposed Globally", value: "18M+" }
      ],
      actionItems: [
        "Never burn or dump electronics",
        "Use only certified recyclers",
        "Support policies banning hazardous materials",
        "Choose electronics with green certifications"
      ],
      readTime: "7 min"
    },
    {
      id: 7,
      title: "The Hidden Value in Your Old Electronics",
      excerpt: "Discover the precious metals and valuable materials hiding in your unused devices.",
      category: "Economics",
      icon: <Cpu className="h-5 w-5" />,
      content: "Your drawer full of old phones and gadgets is essentially a mini goldmine. A single smartphone contains small amounts of gold, silver, platinum, palladium, copper, and rare earth elements. While individually small, these add up significantly at scale. The global value of raw materials in e-waste is estimated at $62.5 billion annually, yet most of this value is lost to landfills. Urban mining—extracting materials from e-waste—is becoming increasingly economically viable as ore grades decline.",
      keyPoints: [
        "Smartphones contain ~0.034g gold each",
        "Urban mining more efficient than traditional mining",
        "Rare earth elements critical for green technology",
        "E-waste concentration higher than most ore deposits"
      ],
      stats: [
        { label: "Value Lost to Landfills", value: "$50B/year" },
        { label: "Gold in 1 Tonne of Phones", value: "300g" },
        { label: "Platinum Group Metals", value: "High Conc." },
        { label: "Rare Earth Recovery Rate", value: "<1%" }
      ],
      actionItems: [
        "Collect old devices for proper recycling",
        "Research buy-back programs from manufacturers",
        "Support certified urban mining facilities",
        "Educate others about the value of e-waste"
      ],
      readTime: "6 min"
    },
    {
      id: 8,
      title: "E-Waste and Climate Change Connection",
      excerpt: "How proper e-waste management contributes to fighting climate change.",
      category: "Climate",
      icon: <Leaf className="h-5 w-5" />,
      content: "E-waste management has significant implications for climate change. Manufacturing new electronics from virgin materials is extremely energy-intensive, contributing substantially to greenhouse gas emissions. Recycling reduces the need for mining and processing raw materials, saving enormous amounts of energy. Additionally, improper disposal of refrigerators and air conditioners releases potent greenhouse gases like CFCs and HCFCs. Proper e-waste management could prevent 50 million tonnes of CO2 equivalent emissions annually.",
      keyPoints: [
        "Manufacturing electronics is carbon-intensive",
        "Recycling uses 70-95% less energy than virgin production",
        "Refrigerants are potent greenhouse gases",
        "Proper disposal prevents methane from landfills"
      ],
      stats: [
        { label: "CO2 Savings Potential", value: "50M tonnes/yr" },
        { label: "Energy Savings (Copper)", value: "85%" },
        { label: "GWP of Some Refrigerants", value: "2000x CO2" },
        { label: "Carbon Footprint of iPhone", value: "70 kg CO2" }
      ],
      actionItems: [
        "Extend device lifespan to reduce manufacturing demand",
        "Ensure proper disposal of cooling appliances",
        "Choose energy-efficient electronics",
        "Support renewable-powered recycling facilities"
      ],
      readTime: "8 min"
    }
  ];

  const facts: Fact[] = [
    {
      id: 1,
      fact: "Only 17.4% of global e-waste is properly recycled",
      detail: "This means over 40 million tons of valuable materials are lost annually, and toxic substances pollute our environment.",
      source: "Global E-waste Monitor 2020, United Nations",
      relatedFacts: [
        "Africa recycles only 0.9% of its e-waste",
        "Europe leads with 42.5% recycling rate",
        "Americas recycle about 9.4% of e-waste"
      ],
      impact: "If recycling rates doubled, we could recover $28 billion in materials annually and prevent significant environmental contamination.",
      icon: <Recycle className="h-6 w-6" />
    },
    {
      id: 2,
      fact: "1 million cell phones contain 24kg of gold and 250kg of silver",
      detail: "The concentration of precious metals in e-waste is significantly higher than in natural ore deposits.",
      source: "EPA & USGS Research",
      relatedFacts: [
        "One ton of e-waste contains 100x more gold than a ton of gold ore",
        "Smartphones also contain palladium, platinum, and rare earth elements",
        "Recovery of these metals from e-waste is called urban mining"
      ],
      impact: "Proper recycling could recover $7 billion worth of gold annually from discarded electronics alone.",
      icon: <Smartphone className="h-6 w-6" />
    },
    {
      id: 3,
      fact: "E-waste contains over 1,000 toxic substances",
      detail: "Including lead, mercury, cadmium, arsenic, and brominated flame retardants that can cause severe health problems.",
      source: "World Health Organization",
      relatedFacts: [
        "A single CRT monitor contains 2-4 kg of lead",
        "Mercury in flat screens can contaminate 500,000 liters of water",
        "Cadmium from one battery can pollute 600,000 liters of water"
      ],
      impact: "Improper disposal affects 18 million informal workers and millions living near dumpsites, causing cancer, respiratory issues, and developmental problems.",
      icon: <AlertTriangle className="h-6 w-6" />
    },
    {
      id: 4,
      fact: "Recycling 1 million laptops saves energy equivalent to powering 3,657 homes for a year",
      detail: "The energy saved through recycling can significantly reduce carbon emissions and combat climate change.",
      source: "EPA Energy Star Program",
      relatedFacts: [
        "Recycling aluminum saves 95% of manufacturing energy",
        "Copper recycling saves 85% of production energy",
        "Steel recycling saves 60-74% of energy"
      ],
      impact: "If all e-waste were properly recycled, we could prevent 50 million tonnes of CO2 emissions annually.",
      icon: <Battery className="h-6 w-6" />
    },
    {
      id: 5,
      fact: "India generates 3.2 million tons of e-waste annually",
      detail: "Making it the third-largest e-waste generator globally, yet only 10% is currently recycled through formal channels.",
      source: "Central Pollution Control Board, India",
      relatedFacts: [
        "95% of Indian e-waste is handled by informal sector",
        "E-waste in India growing at 30% annually",
        "Mumbai and Delhi are the largest contributors"
      ],
      impact: "Informal recycling exposes workers to toxic fumes and chemicals, causing serious health issues in communities.",
      icon: <Globe className="h-6 w-6" />
    },
    {
      id: 6,
      fact: "The average smartphone contains over 60 elements from the periodic table",
      detail: "Including rare earth metals that are finite resources and energy-intensive to mine.",
      source: "American Chemical Society",
      relatedFacts: [
        "17 rare earth elements are used in smartphones",
        "Some elements have only a few decades of reserves left",
        "Mining rare earths generates toxic waste"
      ],
      impact: "Recycling smartphones could significantly reduce the need for environmentally destructive rare earth mining.",
      icon: <Cpu className="h-6 w-6" />
    },
    {
      id: 7,
      fact: "E-waste recycling creates 50 times more jobs than landfilling",
      detail: "The recycling industry provides employment in collection, sorting, processing, and refurbishment sectors.",
      source: "International Labour Organization",
      relatedFacts: [
        "Recycling creates 6-10 jobs per 1,000 tons vs. 1 job for landfilling",
        "Repair sector employment growing 15% annually",
        "Circular economy could create 700,000 EU jobs by 2030"
      ],
      impact: "Investing in e-waste recycling infrastructure could create millions of green jobs globally while protecting the environment.",
      icon: <Leaf className="h-6 w-6" />
    },
    {
      id: 8,
      fact: "A single laptop can take 1,000 years to decompose in a landfill",
      detail: "During this time, it releases toxic chemicals that contaminate soil and groundwater.",
      source: "Environmental Protection Agency",
      relatedFacts: [
        "Batteries can take 100+ years to decompose",
        "Plastics in electronics persist for centuries",
        "Heavy metals never truly break down"
      ],
      impact: "Landfilled e-waste creates long-term environmental liabilities that future generations will have to address.",
      icon: <Monitor className="h-6 w-6" />
    },
    {
      id: 9,
      fact: "80% of e-waste is shipped to developing countries illegally",
      detail: "Despite international regulations like the Basel Convention, illegal e-waste dumping continues on a massive scale.",
      source: "Basel Action Network",
      relatedFacts: [
        "Ghana, Nigeria, and India are major destinations",
        "Much is falsely labeled as 'second-hand goods'",
        "Workers dismantle waste without protection"
      ],
      impact: "Communities in receiving countries face severe health and environmental consequences from this toxic trade.",
      icon: <Globe className="h-6 w-6" />
    },
    {
      id: 10,
      fact: "The average American household has 24 electronic devices",
      detail: "With an average lifespan of just 2-3 years for smartphones and tablets, e-waste generation is accelerating.",
      source: "Consumer Technology Association",
      relatedFacts: [
        "Only 15-20% of household e-waste is recycled",
        "Americans discard 416,000 cell phones daily",
        "9 out of 10 homes have unused electronics"
      ],
      impact: "If every household recycled their unused devices, millions of tons could be diverted from landfills.",
      icon: <Smartphone className="h-6 w-6" />
    }
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
    {
      question: "How many elements from the periodic table are found in a smartphone?",
      options: ["20 elements", "40 elements", "60+ elements", "100 elements"],
      correct: 2,
      explanation: "A typical smartphone contains over 60 different elements, including rare earth metals, precious metals, and various other materials."
    },
    {
      question: "Which country generates the most e-waste globally?",
      options: ["India", "United States", "China", "Germany"],
      correct: 2,
      explanation: "China generates the most e-waste at about 10.1 million tonnes annually, followed by the United States."
    },
    {
      question: "What is 'urban mining' in the context of e-waste?",
      options: [
        "Mining in urban areas",
        "Extracting valuable materials from discarded electronics",
        "Building mines near cities",
        "Using electronics in mining operations"
      ],
      correct: 1,
      explanation: "Urban mining refers to the process of recovering valuable materials like gold, silver, and rare earth elements from e-waste."
    },
    {
      question: "How many times more jobs does e-waste recycling create compared to landfilling?",
      options: ["5 times more", "20 times more", "50 times more", "100 times more"],
      correct: 2,
      explanation: "E-waste recycling creates approximately 50 times more jobs than landfilling, making it economically beneficial as well as environmentally sound."
    },
    {
      question: "What percentage of energy is saved by recycling aluminum compared to mining new aluminum?",
      options: ["50%", "75%", "85%", "95%"],
      correct: 3,
      explanation: "Recycling aluminum saves 95% of the energy required to produce aluminum from raw bauxite ore, making it highly efficient."
    }
  ];

  const repairGuides: RepairGuide[] = [
    { 
      id: 1,
      device: "Smartphone Screen Replacement", 
      difficulty: "Medium", 
      time: "30-45 min",
      steps: [
        "Power off the device completely and remove SIM card",
        "Apply heat to loosen adhesive (use heat gun at low setting)",
        "Use suction cup and plastic pry tool to separate screen",
        "Carefully disconnect display cables from motherboard",
        "Remove any remaining adhesive and clean the frame",
        "Connect new screen cables and test before sealing",
        "Apply new adhesive strips and press screen firmly",
        "Power on and test touch response across entire screen"
      ],
      tools: ["Precision screwdriver set (Pentalobe, Phillips, Torx)", "Suction cup", "Plastic pry tools and spudger", "Heat gun or hair dryer", "Tweezers", "New adhesive strips", "Isopropyl alcohol 90%+"],
      tips: [
        "Watch video tutorials for your specific phone model",
        "Work on a clean, well-lit surface with a magnetic mat",
        "Take photos before disconnecting anything",
        "Keep screws organized by location and size"
      ],
      warnings: [
        "Disconnect battery before any internal work",
        "Do not apply excessive heat to avoid damaging components",
        "Be gentle with ribbon cables - they tear easily",
        "Some phones have waterproofing that will be compromised"
      ],
      videoPlaceholder: "Search YouTube for '[Your Phone Model] screen replacement guide'",
      icon: <Smartphone className="h-6 w-6" />
    },
    { 
      id: 2,
      device: "Laptop Battery Replacement", 
      difficulty: "Easy", 
      time: "15-30 min",
      steps: [
        "Shut down laptop and unplug all cables",
        "Flip laptop over on soft surface",
        "Remove back panel screws (note different sizes)",
        "Carefully pry off back panel with plastic tool",
        "Locate battery and disconnect cable from motherboard",
        "Remove battery screws or release adhesive tabs",
        "Insert new battery and secure with screws",
        "Reconnect battery cable and replace back panel"
      ],
      tools: ["Phillips head screwdriver", "Plastic pry tools", "Anti-static wrist strap", "Spudger for cables", "Small container for screws"],
      tips: [
        "Use only batteries from reputable sources",
        "Check battery health before replacing - might be software issue",
        "Fully charge new battery before first use",
        "Calibrate by draining to 0% then fully charging"
      ],
      warnings: [
        "Never puncture or bend lithium batteries",
        "If battery is swollen, handle with extreme care",
        "Do not force - if stuck, there may be hidden screws",
        "Ground yourself before touching internal components"
      ],
      videoPlaceholder: "Search YouTube for '[Your Laptop Model] battery replacement'",
      icon: <Battery className="h-6 w-6" />
    },
    { 
      id: 3,
      device: "Desktop RAM Upgrade", 
      difficulty: "Easy", 
      time: "10-15 min",
      steps: [
        "Shut down computer and unplug power cable",
        "Press power button to discharge residual power",
        "Remove side panel (usually thumb screws)",
        "Ground yourself by touching metal case",
        "Locate RAM slots on motherboard",
        "Release retention clips on sides of RAM slot",
        "Remove old RAM by pulling straight up",
        "Align notch on new RAM with slot and press firmly until clips click"
      ],
      tools: ["Phillips screwdriver", "Anti-static wrist strap", "Compressed air (optional)", "Flashlight"],
      tips: [
        "Check motherboard manual for supported RAM speeds",
        "Match RAM pairs for dual-channel performance",
        "Clean dust while case is open",
        "Verify RAM is detected in BIOS after installation"
      ],
      warnings: [
        "Never touch gold contacts on RAM modules",
        "Ensure notch alignment before applying pressure",
        "RAM requires significant force - don't be afraid to push",
        "Static electricity can destroy components instantly"
      ],
      videoPlaceholder: "Search YouTube for 'How to install desktop RAM'",
      icon: <Cpu className="h-6 w-6" />
    },
    { 
      id: 4,
      device: "Monitor Cable Repair", 
      difficulty: "Hard", 
      time: "45-60 min",
      steps: [
        "Identify the damaged section of cable",
        "Cut cable cleanly on both sides of damage",
        "Strip outer insulation about 2cm on each end",
        "Identify and separate individual wires by color",
        "Strip each wire about 5mm",
        "Twist matching colored wires together",
        "Solder each connection for reliability",
        "Apply heat shrink tubing to each wire, then outer sleeve"
      ],
      tools: ["Wire cutters", "Wire strippers", "Soldering iron and solder", "Heat shrink tubing (various sizes)", "Heat gun", "Multimeter for testing", "Helping hands tool"],
      tips: [
        "Test continuity after each solder joint",
        "Use flux for cleaner solder joints",
        "Consider replacing cable if multiple damage points",
        "Document wire colors before cutting"
      ],
      warnings: [
        "Soldering iron can cause serious burns",
        "Work in ventilated area - solder fumes are harmful",
        "Ensure proper insulation to prevent shorts",
        "Test thoroughly before connecting to expensive equipment"
      ],
      videoPlaceholder: "Search YouTube for 'How to solder and repair cables'",
      icon: <Monitor className="h-6 w-6" />
    },
    { 
      id: 5,
      device: "Keyboard Key Replacement", 
      difficulty: "Easy", 
      time: "5-10 min",
      steps: [
        "Identify the damaged key and its mechanism type",
        "Gently pry off key cap using plastic tool from bottom edge",
        "Note orientation of scissor mechanism or rubber dome",
        "Clean underneath with compressed air and alcohol",
        "If mechanism is broken, replace it first",
        "Align new key cap over mechanism",
        "Press firmly in center until it clicks into place",
        "Test key for proper response and feel"
      ],
      tools: ["Plastic pry tool or flathead screwdriver", "Compressed air", "Isopropyl alcohol", "Cotton swabs", "Tweezers"],
      tips: [
        "Buy replacement keys from keyboard manufacturer",
        "Laptop keys vary by model - ensure compatibility",
        "Clean surrounding keys while working",
        "Some keys have wire stabilizers - note their position"
      ],
      warnings: [
        "Do not use excessive force when prying",
        "Scissor mechanisms are fragile and easy to break",
        "Spacebar and Enter keys are more complex",
        "Avoid touching rubber dome if exposed"
      ],
      videoPlaceholder: "Search YouTube for '[Your Keyboard Model] key replacement'",
      icon: <Cpu className="h-6 w-6" />
    },
    { 
      id: 6,
      device: "Tablet Charging Port Cleaning", 
      difficulty: "Easy", 
      time: "10-15 min",
      steps: [
        "Power off the tablet completely",
        "Shine flashlight into port to assess debris",
        "Use compressed air at angle to dislodge loose debris",
        "Gently scrape edges with wooden toothpick",
        "For stubborn debris, lightly dampen toothpick with alcohol",
        "Allow to dry completely (5 minutes minimum)",
        "Test with charging cable",
        "If still not working, port may need professional repair"
      ],
      tools: ["Compressed air can", "Wooden toothpicks (not metal!)", "Isopropyl alcohol 90%+", "Flashlight", "Magnifying glass (optional)"],
      tips: [
        "Regular cleaning prevents buildup",
        "Check cable for damage too",
        "Use a case with port covers for prevention",
        "Wireless charging can extend port life"
      ],
      warnings: [
        "Never use metal objects in charging port",
        "Do not blow directly with mouth (moisture damage)",
        "Be gentle - pins can bend or break",
        "If you see corrosion, seek professional help"
      ],
      videoPlaceholder: "Search YouTube for 'How to clean tablet charging port safely'",
      icon: <Smartphone className="h-6 w-6" />
    },
    {
      id: 7,
      device: "SSD/Hard Drive Replacement",
      difficulty: "Medium",
      time: "30-45 min",
      steps: [
        "Back up all important data before starting",
        "Shut down and unplug the computer",
        "Remove case panel or laptop bottom cover",
        "Locate the drive bay and disconnect cables",
        "Remove mounting screws or release mechanism",
        "Install new drive and secure with screws",
        "Reconnect SATA and power cables (desktop) or slot in M.2",
        "Boot from installation media to install OS"
      ],
      tools: ["Phillips screwdriver", "SATA cables (if desktop)", "Anti-static wrist strap", "External enclosure for old drive"],
      tips: [
        "Consider cloning old drive to new one",
        "SSDs dramatically improve performance",
        "Check interface compatibility (SATA, NVMe, etc.)",
        "Keep old drive as backup until verified"
      ],
      warnings: [
        "Always backup data - drives can fail during transfer",
        "Match interface type (SATA III, M.2, etc.)",
        "Do not force M.2 drives - they have a notch for alignment",
        "Handle drives by edges, not circuit board"
      ],
      videoPlaceholder: "Search YouTube for '[Your Computer Model] SSD upgrade'",
      icon: <Cpu className="h-6 w-6" />
    },
    {
      id: 8,
      device: "Laptop Fan Cleaning",
      difficulty: "Medium",
      time: "30-45 min",
      steps: [
        "Shut down laptop and disconnect power",
        "Remove back panel screws and carefully pry off",
        "Locate fan and heat sink assembly",
        "Use compressed air to blow out dust from fan",
        "If accessible, remove fan for thorough cleaning",
        "Clean heat sink fins with compressed air",
        "Check thermal paste condition on CPU/GPU",
        "Reassemble and test temperatures"
      ],
      tools: ["Phillips screwdriver set", "Compressed air", "Soft brush", "Thermal paste (if reapplying)", "Anti-static wrist strap"],
      tips: [
        "Hold fan blade when using compressed air to prevent damage",
        "Clean in well-ventilated area",
        "Consider replacing thermal paste every 2-3 years",
        "Monitor temperatures before and after"
      ],
      warnings: [
        "Spinning fan with compressed air can generate electricity",
        "Do not touch thermal paste or CPU surface",
        "Note screw locations - they may vary in size",
        "Some laptops require extensive disassembly"
      ],
      videoPlaceholder: "Search YouTube for '[Your Laptop Model] fan cleaning'",
      icon: <Monitor className="h-6 w-6" />
    }
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

      {/* Fullscreen Article View */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
          <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                  {selectedArticle.icon}
                </div>
                <span className="text-sm font-medium text-primary">{selectedArticle.category}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setSelectedArticle(null)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
          </div>
          
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Clock className="h-4 w-4" />
              <span>{selectedArticle.readTime} read</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-6">{selectedArticle.title}</h1>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {selectedArticle.content}
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {selectedArticle.stats.map((stat, index) => (
                <Card key={index} className="p-4 bg-primary/5 border-primary/20">
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </Card>
              ))}
            </div>

            <Card className="p-6 mb-8">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                Key Points
              </h3>
              <ul className="space-y-3">
                {selectedArticle.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6 bg-accent/10 border-accent/20">
              <h3 className="font-semibold text-lg mb-4">Take Action</h3>
              <ul className="space-y-3">
                {selectedArticle.actionItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <ChevronRight className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      )}

      {/* Fullscreen Fact View */}
      {selectedFact && (
        <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
          <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                  {selectedFact.icon}
                </div>
                <span className="text-sm font-medium text-primary">Fact #{selectedFact.id}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setSelectedFact(null)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
          </div>
          
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="text-center mb-12">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                {selectedFact.icon}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-6">{selectedFact.fact}</h1>
              <p className="text-lg text-muted-foreground">{selectedFact.detail}</p>
            </div>

            <Card className="p-6 mb-8 bg-accent/10 border-accent/20">
              <h3 className="font-semibold text-lg mb-4">Why This Matters</h3>
              <p className="text-muted-foreground">{selectedFact.impact}</p>
            </Card>

            <Card className="p-6 mb-8">
              <h3 className="font-semibold text-lg mb-4">Related Facts</h3>
              <ul className="space-y-3">
                {selectedFact.relatedFacts.map((fact, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Lightbulb className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <p className="text-sm text-muted-foreground text-center">
              Source: {selectedFact.source}
            </p>
          </div>
        </div>
      )}

      {/* Fullscreen Repair Guide View */}
      {selectedRepair && (
        <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
          <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                  {selectedRepair.icon}
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    selectedRepair.difficulty === 'Easy' ? 'bg-green-500/20 text-green-500' : 
                    selectedRepair.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-red-500/20 text-red-500'
                  }`}>
                    {selectedRepair.difficulty}
                  </span>
                  <span className="text-sm text-muted-foreground">⏱️ {selectedRepair.time}</span>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setSelectedRepair(null)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
          </div>
          
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">{selectedRepair.device}</h1>

            <Card className="p-6 mb-8 bg-primary/5 border-primary/20">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Wrench className="h-5 w-5 text-primary" />
                Tools Required
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedRepair.tools.map((tool, index) => (
                  <span key={index} className="px-3 py-1 bg-background rounded-full text-sm border">
                    {tool}
                  </span>
                ))}
              </div>
            </Card>

            <Card className="p-6 mb-8">
              <h3 className="font-semibold text-lg mb-6">Step-by-Step Instructions</h3>
              <ol className="space-y-4">
                {selectedRepair.steps.map((step, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                      {index + 1}
                    </span>
                    <span className="pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </Card>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6 bg-green-500/10 border-green-500/20">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-green-600">
                  <Lightbulb className="h-5 w-5" />
                  Pro Tips
                </h3>
                <ul className="space-y-2">
                  {selectedRepair.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-6 bg-red-500/10 border-red-500/20">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-red-600">
                  <AlertTriangle className="h-5 w-5" />
                  Warnings
                </h3>
                <ul className="space-y-2">
                  {selectedRepair.warnings.map((warning, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <X className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>{warning}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            <Card className="p-6 bg-secondary/50">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <ExternalLink className="h-5 w-5 text-primary" />
                Video Tutorial
              </h3>
              <p className="text-muted-foreground mb-4">{selectedRepair.videoPlaceholder}</p>
              <Button variant="outline" className="gap-2" onClick={() => window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(selectedRepair.device + ' repair guide')}`, '_blank')}>
                <ExternalLink className="h-4 w-4" />
                Search YouTube Tutorials
              </Button>
            </Card>
          </div>
        </div>
      )}
      
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
              <span className="hidden sm:inline">Articles</span>
            </TabsTrigger>
            <TabsTrigger value="facts" className="gap-2">
              <Lightbulb className="h-4 w-4" />
              <span className="hidden sm:inline">Facts</span>
            </TabsTrigger>
            <TabsTrigger value="quiz" className="gap-2">
              <HelpCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Quiz</span>
            </TabsTrigger>
            <TabsTrigger value="repair" className="gap-2">
              <Wrench className="h-4 w-4" />
              <span className="hidden sm:inline">Repair</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="articles" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {articles.map((article, index) => (
                <Card 
                  key={article.id} 
                  className="p-6 hover:shadow-eco transition-all animate-fade-in cursor-pointer group" 
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setSelectedArticle(article)}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        {article.icon}
                      </div>
                      <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {article.category}
                      </span>
                      <span className="text-xs text-muted-foreground ml-auto">{article.readTime}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">{article.title}</h3>
                    <p className="text-muted-foreground mb-4 flex-grow">{article.excerpt}</p>
                    <div className="flex items-center text-primary text-sm font-medium">
                      Read More <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="facts" className="grid md:grid-cols-2 gap-6">
            {facts.map((item, index) => (
              <Card 
                key={item.id} 
                className="p-6 hover:shadow-eco transition-all animate-scale-in cursor-pointer group" 
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedFact(item)}
              >
                <div className="flex gap-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{item.fact}</p>
                    <p className="text-sm text-muted-foreground mb-3">{item.detail}</p>
                    <div className="flex items-center text-primary text-sm font-medium">
                      Learn More <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
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
                <Card 
                  key={guide.id} 
                  className="p-6 hover:shadow-eco transition-all animate-fade-in cursor-pointer group" 
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setSelectedRepair(guide)}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10 flex-shrink-0 group-hover:bg-primary transition-colors">
                      <div className="text-primary group-hover:text-primary-foreground transition-colors">
                        {guide.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{guide.device}</h4>
                      <div className="flex gap-4 text-sm text-muted-foreground mb-3">
                        <span className={`font-medium ${
                          guide.difficulty === 'Easy' ? 'text-green-500' : 
                          guide.difficulty === 'Medium' ? 'text-yellow-500' : 'text-red-500'
                        }`}>
                          {guide.difficulty}
                        </span>
                        <span>⏱️ {guide.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {guide.steps.length} steps • {guide.tools.length} tools required
                      </p>
                      <div className="flex items-center text-primary text-sm font-medium">
                        View Full Guide <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
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
