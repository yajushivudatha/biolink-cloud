
import { Virus, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-medical-darkPurple to-medical-purple p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Virus className="h-6 w-6" />
          <h1 className="text-2xl font-bold">EpiWatch Globe</h1>
        </div>
        <div className="flex items-center gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Info className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">About EpiWatch Globe</h4>
                  <p className="text-sm text-muted-foreground">
                    This visualization shows current disease hotspots and predicts potential future outbreaks based on pattern recognition and epidemiological modeling.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">How to use</h4>
                  <p className="text-sm text-muted-foreground">
                    Select a disease from the dropdown menu, toggle predictions on/off, and hover over hotspots for detailed information.
                  </p>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <span className="text-xs bg-white/20 py-1 px-2 rounded-full">Beta</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
