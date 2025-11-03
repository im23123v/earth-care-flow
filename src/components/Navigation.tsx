import { Link, useLocation } from "react-router-dom";
import { Leaf, MapPin, Calendar, TrendingUp, BookOpen, Award, FileText, MessageSquare, Menu, Calculator, Shield, Users, Package, Bot, MoreHorizontal, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const location = useLocation();
  
  // Primary navigation items (visible in main menu)
  const primaryNavItems = [
    { to: "/jntuh-uces", label: "JNTUH UCES", icon: Building2 },
    { to: "/", label: "Home", icon: Leaf },
    { to: "/calculator", label: "Calculator", icon: Calculator },
    { to: "/learn", label: "Learn", icon: BookOpen },
    { to: "/pickup", label: "Pickup", icon: Calendar },
    { to: "/impact", label: "Impact", icon: TrendingUp },
    { to: "/tracker", label: "Tracker", icon: Package },
    { to: "/dropoff", label: "Dropoff", icon: MapPin },
  ];

  // Secondary navigation items (under "More" dropdown)
  const secondaryNavItems = [
    { to: "/events", label: "Events", icon: Users },
    { to: "/rewards", label: "Rewards", icon: Award },
    { to: "/security", label: "Security", icon: Shield },
    { to: "/transparency", label: "Transparency", icon: FileText },
    { to: "/pledge", label: "Pledge", icon: MessageSquare },
    { to: "/ecoai", label: "EcoAI", icon: Bot },
  ];

  const isActive = (path: string) => location.pathname === path;

  const NavLinks = () => (
    <>
      {primaryNavItems.map((item) => (
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
      
      {/* More Dropdown for Desktop */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="gap-2 hidden lg:inline-flex">
            <MoreHorizontal className="h-4 w-4" />
            <span>More</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 bg-background/95 backdrop-blur-xl border-border/50">
          {secondaryNavItems.map((item) => (
            <DropdownMenuItem key={item.to} asChild>
              <Link to={item.to} className="flex items-center gap-2 cursor-pointer">
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );

  const MobileNavLinks = () => (
    <>
      {primaryNavItems.map((item) => (
        <Link key={item.to} to={item.to}>
          <Button
            variant={isActive(item.to) ? "default" : "ghost"}
            className="gap-2 w-full justify-start"
          >
            <item.icon className="h-4 w-4" />
            <span>{item.label}</span>
          </Button>
        </Link>
      ))}
      <div className="border-t border-border/50 my-2 pt-2">
        <p className="text-xs text-muted-foreground px-4 mb-2">More</p>
        {secondaryNavItems.map((item) => (
          <Link key={item.to} to={item.to}>
            <Button
              variant={isActive(item.to) ? "default" : "ghost"}
              className="gap-2 w-full justify-start"
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Button>
          </Link>
        ))}
      </div>
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
                  <MobileNavLinks />
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
