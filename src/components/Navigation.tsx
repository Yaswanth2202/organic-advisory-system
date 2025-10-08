import { Home, Camera, Book, Users, Menu, Languages, MessageSquare } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { t, toggleLanguage, language } = useLanguage();

  const navItems = [
    { path: "/", label: t('nav.home'), icon: Home },
    { path: "/scan", label: t('nav.scan'), icon: Camera },
    { path: "/knowledge", label: t('nav.knowledge'), icon: Book },
    { path: "/community", label: t('nav.community'), icon: Users },
    { path: "/chat", label: t('nav.chat'), icon: MessageSquare },
  ];

  const NavLinks = ({ mobile = false }) => (
    <>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        
        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => mobile && setIsOpen(false)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              isActive
                ? "bg-primary text-primary-foreground font-medium"
                : "text-foreground hover:bg-muted"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-xl font-bold text-white">🌾</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline">Organic Advisory</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <NavLinks />
          </div>

          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleLanguage}
              className="hidden sm:flex gap-2"
            >
              <Languages className="w-4 h-4" />
              {language === 'en' ? 'తెలుగు' : 'English'}
            </Button>

            {/* Mobile Navigation */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col gap-4 mt-8">
                  <NavLinks mobile />
                  <div className="border-t pt-4">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => {
                        toggleLanguage();
                        setIsOpen(false);
                      }}
                    >
                      <Languages className="w-4 h-4 mr-2" />
                      {language === 'en' ? 'తెలుగు' : 'English'}
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
