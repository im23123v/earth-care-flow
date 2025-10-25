import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, Leaf, Zap, Users } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const Impact = () => {
  const monthlyData = [
    { month: "Jan", ewaste: 4200, energy: 1500 },
    { month: "Feb", ewaste: 5100, energy: 1800 },
    { month: "Mar", ewaste: 6200, energy: 2200 },
    { month: "Apr", ewaste: 7100, energy: 2500 },
    { month: "May", ewaste: 8300, energy: 2900 },
    { month: "Jun", ewaste: 9200, energy: 3200 },
  ];

  const deviceData = [
    { name: "Mobile Phones", value: 35, color: "hsl(142, 76%, 36%)" },
    { name: "Laptops", value: 25, color: "hsl(200, 80%, 50%)" },
    { name: "TVs/Monitors", value: 20, color: "hsl(45, 90%, 60%)" },
    { name: "Appliances", value: 15, color: "hsl(30, 40%, 40%)" },
    { name: "Others", value: 5, color: "hsl(142, 40%, 70%)" },
  ];

  const handleDownload = () => {
    // Simulate report download
    const blob = new Blob(["Impact Report Data"], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "impact-report.txt";
    a.click();
  };

  return (
    <div className="min-h-screen bg-secondary/20">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">Your Environmental Impact</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Track your contribution to environmental sustainability and see the collective
            impact of our community.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="p-6 text-center shadow-card animate-scale-in">
            <Leaf className="h-10 w-10 mx-auto mb-3 text-primary" />
            <div className="text-3xl font-bold mb-1">42.5 kg</div>
            <div className="text-sm text-muted-foreground">E-Waste Recycled</div>
          </Card>

          <Card className="p-6 text-center shadow-card animate-scale-in" style={{ animationDelay: "100ms" }}>
            <Zap className="h-10 w-10 mx-auto mb-3 text-impact-yellow" />
            <div className="text-3xl font-bold mb-1">1,234 kWh</div>
            <div className="text-sm text-muted-foreground">Energy Saved</div>
          </Card>

          <Card className="p-6 text-center shadow-card animate-scale-in" style={{ animationDelay: "200ms" }}>
            <TrendingUp className="h-10 w-10 mx-auto mb-3 text-accent" />
            <div className="text-3xl font-bold mb-1">8.2 Tons</div>
            <div className="text-sm text-muted-foreground">CO₂ Prevented</div>
          </Card>

          <Card className="p-6 text-center shadow-card animate-scale-in" style={{ animationDelay: "300ms" }}>
            <Users className="h-10 w-10 mx-auto mb-3 text-eco-dark" />
            <div className="text-3xl font-bold mb-1">Top 15%</div>
            <div className="text-sm text-muted-foreground">Global Ranking</div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Trend */}
          <Card className="p-6 shadow-eco animate-fade-in" style={{ animationDelay: "400ms" }}>
            <h3 className="text-xl font-semibold mb-6">Monthly E-Waste & Energy Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="ewaste" stroke="hsl(142, 76%, 36%)" strokeWidth={2} name="E-Waste (kg)" />
                <Line type="monotone" dataKey="energy" stroke="hsl(45, 90%, 60%)" strokeWidth={2} name="Energy (kWh)" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Device Distribution */}
          <Card className="p-6 shadow-eco animate-fade-in" style={{ animationDelay: "500ms" }}>
            <h3 className="text-xl font-semibold mb-6">Device Type Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Download Report */}
        <Card className="p-8 text-center shadow-eco animate-scale-in" style={{ animationDelay: "600ms" }}>
          <h3 className="text-2xl font-semibold mb-4">Download Your Impact Report</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Get a detailed PDF report of your environmental contributions, certifications,
            and achievements to share with your community or organization.
          </p>
          <Button size="lg" className="gap-2" onClick={handleDownload}>
            <Download className="h-5 w-5" />
            Download Report
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Impact;
