import { Link, useLocation } from "react-router-dom";
import { Leaf, MapPin, Calendar, TrendingUp, BookOpen, Award, FileText, MessageSquare, Menu, Calculator, Shield, Users, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { to: "/", label: "Home", icon: Leaf },
    { to: "/calculator", label: "E-Waste Calculator", icon: Calculator },
    { to: "/pickup", label: "Schedule Pickup", icon: Calendar },
    { to: "/tracker", label: "Track Pickup", icon: Package },
    { to: "/dropoff", label: "Drop-off Locator", icon: MapPin },
    { to: "/security", label: "Data Security", icon: Shield },
    { to: "/events", label: "Community Events", icon: Users },
    { to: "/impact", label: "Impact", icon: TrendingUp },
    { to: "/learn", label: "Learn", icon: BookOpen },
    { to: "/rewards", label: "Rewards", icon: Award },
    { to: "/transparency", label: "Transparency", icon: FileText },
    { to: "/pledge", label: "Pledge Wall", icon: MessageSquare },
  ];

  const isActive = (path: string) => location.pathname === path;

  const NavLinks = () => (
    <>
      {navItems.map((item) => (
        <Link key={item.to} to={item.to}>
          <Button
            variant={isActive(item.to) ? "default" : "ghost"}
            className="gap-2"
          >
            <item.icon className="h-4 w-4" />
            <span className="hidden lg:inline">{item.label}</span>
          </Button>
        </Link>
      ))}
    </>
  );

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
      <nav className="max-w-7xl w-full mx-auto rounded-2xl border border-border/50 bg-background/80 backdrop-blur-xl shadow-eco supports-[backdrop-filter]:bg-background/60">
        <div className="px-6">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="rounded-full bg-primary p-2">
                <Leaf className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                EcoRecycle
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              <NavLinks />
            </div>

            {/* Mobile Navigation */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-background/95 backdrop-blur-xl">
                <div className="flex flex-col gap-4 mt-8">
                  <NavLinks />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
