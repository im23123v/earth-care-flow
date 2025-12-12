import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Recycle, 
  Leaf, 
  TrendingUp, 
  Users, 
  Calendar, 
  Award,
  Building2,
  Trash2,
  TreePine,
  Droplets,
  Zap,
  Download,
  Plus
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { toast } from "sonner";

const SPEC = () => {
  const [department, setDepartment] = useState("");
  const [wasteAmount, setWasteAmount] = useState("");
  const [wasteType, setWasteType] = useState("");

  // State for dynamic data
  const [totalEWaste, setTotalEWaste] = useState(4210);
  const [monthlyData, setMonthlyData] = useState([
    { month: "Jan", ewaste: 450, plastic: 1200, paper: 800, organic: 2500 },
    { month: "Feb", ewaste: 520, plastic: 1350, paper: 850, organic: 2600 },
    { month: "Mar", ewaste: 680, plastic: 1450, paper: 920, organic: 2800 },
    { month: "Apr", ewaste: 750, plastic: 1500, paper: 1000, organic: 3000 },
    { month: "May", ewaste: 890, plastic: 1600, paper: 1100, organic: 3200 },
    { month: "Jun", ewaste: 920, plastic: 1700, paper: 1200, organic: 3400 },
  ]);

  const [departmentStats, setDepartmentStats] = useState([
    { dept: "CSE", collected: 1250 },
    { dept: "ECE", collected: 980 },
    { dept: "EEE", collected: 720 },
    { dept: "Mech", collected: 650 },
    { dept: "Civil", collected: 610 },
  ]);

  // Waste category distribution
  const wasteDistribution = [
    { name: "E-Waste", value: totalEWaste, color: "#10b981" },
    { name: "Plastic", value: 8800, color: "#3b82f6" },
    { name: "Paper", value: 5870, color: "#f59e0b" },
    { name: "Organic", value: 17500, color: "#8b5cf6" },
  ];

  const impactStats = [
    { icon: Recycle, label: "Total E-Waste Collected", value: `${(totalEWaste / 1000).toFixed(1)} Tons`, color: "text-green-500" },
    { icon: TreePine, label: "Trees Saved", value: Math.floor(totalEWaste * 0.037).toString(), color: "text-emerald-500" },
    { icon: Droplets, label: "Water Saved", value: `${Math.floor(totalEWaste * 2.97).toLocaleString()} L`, color: "text-blue-500" },
    { icon: Zap, label: "Energy Saved", value: `${Math.floor(totalEWaste * 2.01).toLocaleString()} kWh`, color: "text-yellow-500" },
  ];

  const initiatives = [
    {
      title: "E-Waste Collection Drives",
      description: "Monthly drives across all departments",
      icon: Calendar,
      stat: "24 drives",
    },
    {
      title: "Student Participation",
      description: "Active student volunteers",
      icon: Users,
      stat: "450+ students",
    },
    {
      title: "TSPCB Certified",
      description: "Authorized recycling partner",
      icon: Award,
      stat: "100% compliant",
    },
    {
      title: "Waste Segregation",
      description: "4-bin system campus-wide",
      icon: Trash2,
      stat: "85% efficiency",
    },
  ];

  const handleAddWaste = () => {
    if (!department || !wasteAmount || !wasteType) {
      toast.error("Please fill all fields");
      return;
    }

    const amount = parseFloat(wasteAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    // Update total e-waste
    setTotalEWaste(prev => prev + amount);

    // Update department stats
    setDepartmentStats(prev => {
      const deptIndex = prev.findIndex(d => d.dept === department);
      if (deptIndex >= 0) {
        const updated = [...prev];
        updated[deptIndex] = { ...updated[deptIndex], collected: updated[deptIndex].collected + amount };
        return updated;
      } else {
        return [...prev, { dept: department, collected: amount }];
      }
    });

    // Update monthly data (add to current month - June)
    setMonthlyData(prev => {
      const updated = [...prev];
      updated[updated.length - 1] = {
        ...updated[updated.length - 1],
        ewaste: updated[updated.length - 1].ewaste + amount
      };
      return updated;
    });

    toast.success(`Successfully added ${amount}kg of ${wasteType} from ${department}`);
    
    // Reset form
    setDepartment("");
    setWasteAmount("");
    setWasteType("");
  };

  const handleDownloadReport = () => {
    toast.success("Downloading SPEC Waste Management Report...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Building2 className="h-5 w-5" />
            <span className="text-sm font-medium">St. Peter's Engineering College (SPEC)</span>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            Campus Waste Management Dashboard
          </h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Real-time tracking of SPEC's comprehensive waste management initiatives. 
            Leading the way in sustainable campus operations and environmental responsibility.
          </p>
        </div>

        {/* Add E-Waste Section */}
        <Card className="mb-12 shadow-eco animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-6 w-6 text-primary" />
              Report E-Waste Collection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="department">Department</Label>
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CSE">CSE</SelectItem>
                    <SelectItem value="ECE">ECE</SelectItem>
                    <SelectItem value="EEE">EEE</SelectItem>
                    <SelectItem value="Mech">Mechanical</SelectItem>
                    <SelectItem value="Civil">Civil</SelectItem>
                    <SelectItem value="Admin">Administration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="wasteType">Waste Type</Label>
                <Select value={wasteType} onValueChange={setWasteType}>
                  <SelectTrigger id="wasteType">
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="E-Waste">E-Waste</SelectItem>
                    <SelectItem value="Plastic">Plastic</SelectItem>
                    <SelectItem value="Paper">Paper</SelectItem>
                    <SelectItem value="Organic">Organic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="amount">Amount (kg)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter weight"
                  value={wasteAmount}
                  onChange={(e) => setWasteAmount(e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <Button onClick={handleAddWaste} className="w-full gap-2">
                  <Plus className="h-4 w-4" />
                  Add Entry
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {impactStats.map((stat, index) => (
            <Card key={index} className="p-6 shadow-eco animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full bg-primary/10 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Monthly Waste Collection Trend */}
          <Card className="p-6 shadow-eco animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Monthly Waste Collection (kg)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="ewaste" stackId="1" stroke="#10b981" fill="#10b981" />
                  <Area type="monotone" dataKey="plastic" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                  <Area type="monotone" dataKey="paper" stackId="1" stroke="#f59e0b" fill="#f59e0b" />
                  <Area type="monotone" dataKey="organic" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Waste Distribution */}
          <Card className="p-6 shadow-eco animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Recycle className="h-5 w-5 text-primary" />
                Waste Category Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={wasteDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {wasteDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Department-wise E-Waste Collection */}
          <Card className="p-6 shadow-eco animate-fade-in md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Department-wise E-Waste Collection (kg)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="dept" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="collected" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Initiatives Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Campus Sustainability Initiatives</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {initiatives.map((initiative, index) => (
              <Card key={index} className="p-6 hover:shadow-eco transition-all animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 rounded-full bg-primary/10 mb-4">
                    <initiative.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{initiative.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{initiative.description}</p>
                  <div className="text-2xl font-bold text-primary">{initiative.stat}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Key Achievements */}
        <Card className="p-8 mb-12 shadow-eco animate-fade-in">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            Key Achievements & Standards
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-lg">Environmental Compliance</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>TSPCB authorized e-waste collection center on campus</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>100% compliant with E-Waste Management Rules 2016</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>ISO 14001 certified environmental management system</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Zero waste to landfill initiative ongoing</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-lg">Campus Infrastructure</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>85 segregation bins across 40-acre campus</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Dedicated e-waste collection point in each building</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Composting facility processing 500kg organic waste daily</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Rainwater harvesting and greywater treatment plants</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Download Report */}
        <div className="text-center animate-fade-in">
          <Button onClick={handleDownloadReport} size="lg" className="gap-2">
            <Download className="h-5 w-5" />
            Download Full Sustainability Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SPEC;