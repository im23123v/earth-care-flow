import { Link, useLocation } from "react-router-dom";
import { Leaf, MapPin, Calendar, TrendingUp, BookOpen, Award, FileText, MessageSquare, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { to: "/", label: "Home", icon: Leaf },
    { to: "/pickup", label: "Schedule Pickup", icon: Calendar },
    { to: "/dropoff", label: "Drop-off Locator", icon: MapPin },
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
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
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
          <div className="hidden md:flex items-center gap-2">
            <NavLinks />
          </div>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-4 mt-8">
                <NavLinks />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
