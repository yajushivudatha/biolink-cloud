
import { Activity, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useEffect, useState } from "react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center h-16 px-4">
        <div className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-medical-purple" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-medical-purple to-medical-blue bg-clip-text text-transparent">
            Biolink Cloud
          </h1>
        </div>
        <nav>
          <ul className="flex items-center gap-8">
            <li className="hidden md:block">
              <Button variant="ghost" className="text-white/90 hover:text-white">
                Features
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </li>
            <li className="hidden md:block">
              <Button variant="ghost" className="text-white/90 hover:text-white">
                Research
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </li>
            <li>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:text-medical-purple">
                    <Activity className="h-5 w-5" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="glass-panel text-white w-80 border-0">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">About Biolink Cloud</h4>
                      <p className="text-sm text-white/70">
                        This visualization shows current disease hotspots and predicts potential future outbreaks based on pattern recognition and epidemiological modeling.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">How to use</h4>
                      <p className="text-sm text-white/70">
                        Select a disease from the dropdown menu, toggle predictions on/off, and hover over hotspots for detailed information.
                      </p>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </li>
            <li>
              <span className="text-xs bg-medical-purple/20 text-medical-purple py-1 px-2 rounded-full">Beta</span>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
