
import { useState } from 'react';
import Header from '@/components/Header';
import GlobeContainer from '@/components/GlobeContainer';
import StatisticsPanel from '@/components/StatisticsPanel';
import { diseaseData } from '@/lib/mock-data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Index = () => {
  const [selectedDiseaseId, setSelectedDiseaseId] = useState(diseaseData[0].id);
  const [showPredictions, setShowPredictions] = useState(true);

  const selectedDisease = diseaseData.find(d => d.id === selectedDiseaseId) || diseaseData[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <Header />
      
      <main className="flex-1 container mx-auto p-4 md:p-6">
        <div className="flex flex-col space-y-4 md:space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-800">Disease Surveillance Dashboard</h2>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="w-full md:w-auto">
                <Select value={selectedDiseaseId} onValueChange={setSelectedDiseaseId}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Disease" />
                  </SelectTrigger>
                  <SelectContent>
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
                <Label htmlFor="show-predictions">Show Predictions</Label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <GlobeContainer 
                selectedDisease={selectedDisease} 
                showPredictions={showPredictions} 
              />
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
              <StatisticsPanel selectedDisease={selectedDisease} />
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
            <h3 className="font-bold text-lg mb-2">About {selectedDisease.name}</h3>
            <p className="text-gray-700">{selectedDisease.description}</p>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500">R₀ Value</div>
                <div className="text-lg font-semibold">{selectedDisease.r0}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500">Incubation Period</div>
                <div className="text-lg font-semibold">{selectedDisease.incubationPeriod}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500">Current Hotspots</div>
                <div className="text-lg font-semibold">{selectedDisease.hotspots.length}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500">Predicted Outbreaks</div>
                <div className="text-lg font-semibold">{selectedDisease.predictions.length}</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-slate-800 text-white/70 p-4 text-center text-sm">
        <p>Biolink Cloud - Disease Surveillance and Prediction Platform</p>
        <p className="text-xs mt-1">© 2025 • Data is simulated for demonstration purposes</p>
      </footer>
    </div>
  );
};

export default Index;
