import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import GlobeContainer from '@/components/GlobeContainer';
import StatisticsPanel from '@/components/StatisticsPanel';
import { diseaseData } from '@/lib/mock-data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Activity, ChevronDown } from 'lucide-react';

const Index = () => {
  const [selectedDiseaseId, setSelectedDiseaseId] = useState(diseaseData[0].id);
  const [showPredictions, setShowPredictions] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState({
    hero: true,
    globe: false,
    stats: false,
    about: false,
  });

  const selectedDisease = diseaseData.find(d => d.id === selectedDiseaseId) || diseaseData[0];

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
      
      // Dynamically set visibility based on scroll position
      setIsVisible({
        hero: position < 300,
        globe: position >= 200 && position < 800,
        stats: position >= 600 && position < 1200,
        about: position >= 900,
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-dark-background text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 animated-gradient opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-medical-purple to-medical-blue bg-clip-text text-transparent">
              Disease Surveillance Intelligence
            </h1>
            <p className="text-xl text-white/70 mb-8">
              Track, predict, and prevent outbreaks with advanced AI monitoring technology
            </p>
            <div className="animate-bounce mt-20 flex justify-center">
              <ChevronDown className="h-8 w-8 text-white/40" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Dashboard Section */}
      <main className="flex-1 container mx-auto p-4 md:p-6">
        <div className="flex flex-col space-y-8 md:space-y-16">
          {/* Controls Section */}
          <div 
            className={`transition-all duration-700 ${
              isVisible.globe 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                Disease Surveillance Dashboard
              </h2>
              
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="w-full md:w-auto">
                  <Select value={selectedDiseaseId} onValueChange={setSelectedDiseaseId}>
                    <SelectTrigger className="w-[180px] bg-dark-card border-gray-700 text-white">
                      <SelectValue placeholder="Select Disease" />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-card border-gray-700 text-white">
                      {diseaseData.map(disease => (
                        <SelectItem key={disease.id} value={disease.id}>{disease.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center gap-2">
                  <Switch 
                    checked={showPredictions} 
                    onCheckedChange={setShowPredictions}
                    id="show-predictions"
                  />
                  <Label htmlFor="show-predictions" className="text-white">Show Predictions</Label>
                </div>
              </div>
            </div>

            {/* Globe and Stats Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 glass-panel p-4 hover-scale animate-zoom-in">
                <GlobeContainer 
                  selectedDisease={selectedDisease} 
                  showPredictions={showPredictions} 
                />
              </div>
              
              <div className="glass-panel p-4 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                <StatisticsPanel selectedDisease={selectedDisease} />
              </div>
            </div>
          </div>
          
          {/* About Disease Section */}
          <div 
            className={`glass-panel p-6 transition-all duration-700 ${
              isVisible.about 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h3 className="font-bold text-2xl mb-4 bg-gradient-to-r from-medical-purple to-medical-blue bg-clip-text text-transparent">
              About {selectedDisease.name}
            </h3>
            <p className="text-white/80 mb-6">{selectedDisease.description}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-dark-card/50 p-4 rounded-lg hover:bg-dark-card transition-colors duration-300">
                <div className="text-sm text-white/60">R₀ Value</div>
                <div className="text-xl font-semibold">{selectedDisease.r0}</div>
              </div>
              <div className="bg-dark-card/50 p-4 rounded-lg hover:bg-dark-card transition-colors duration-300">
                <div className="text-sm text-white/60">Incubation Period</div>
                <div className="text-xl font-semibold">{selectedDisease.incubationPeriod}</div>
              </div>
              <div className="bg-dark-card/50 p-4 rounded-lg hover:bg-dark-card transition-colors duration-300">
                <div className="text-sm text-white/60">Current Hotspots</div>
                <div className="text-xl font-semibold">{selectedDisease.hotspots.length}</div>
              </div>
              <div className="bg-dark-card/50 p-4 rounded-lg hover:bg-dark-card transition-colors duration-300">
                <div className="text-sm text-white/60">Predicted Outbreaks</div>
                <div className="text-xl font-semibold">{selectedDisease.predictions.length}</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-black/40 text-white/60 p-8 text-center mt-20">
        <div className="container mx-auto">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="h-5 w-5 text-medical-purple" />
              <p className="text-lg font-medium text-white">Biolink Cloud</p>
            </div>
            <p className="mb-2">Disease Surveillance and Prediction Platform</p>
            <p className="text-xs">© 2025 • Data is simulated for demonstration purposes</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
