
import { useState, useEffect } from 'react';
import { Disease } from '../lib/types';
import { getDiseaseSummary } from '../lib/mock-data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Virus, Map, TrendingUp, RefreshCw, AlertTriangle, Building } from "lucide-react";

interface StatisticsPanelProps {
  selectedDisease: Disease;
}

const StatisticsPanel = ({ selectedDisease }: StatisticsPanelProps) => {
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    const data = getDiseaseSummary(selectedDisease.id);
    setSummary(data);
  }, [selectedDisease]);

  if (!summary) {
    return <div className="p-4">Loading statistics...</div>;
  }

  return (
    <div>
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="hotspots">Hotspots</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Virus className="h-5 w-5 text-medical-purple" />
                  Current Cases
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{summary.totalCases.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground">Across {summary.hotspotCount} hotspots</p>
              </CardContent>
              <CardFooter className="text-sm text-red-500">
                <div className="flex items-center gap-1">
                  <AlertTriangle className="h-4 w-4" />
                  {summary.severeCases.toLocaleString()} severe cases
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-medical-purple" />
                  Predicted Cases
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{summary.predictedCases.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground">
                  Across {summary.predictionCount} potential outbreaks
                </p>
              </CardContent>
              <CardFooter className="text-sm text-amber-500">
                <div className="flex items-center gap-1">
                  <RefreshCw className="h-4 w-4" />
                  Updated on {new Date().toLocaleDateString()}
                </div>
              </CardFooter>
            </Card>
          </div>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Building className="h-5 w-5 text-medical-purple" />
                Regional Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {selectedDisease.hotspots.map(hotspot => (
                  <div key={hotspot.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${
                        hotspot.severity === 'mild' ? 'bg-hotspot-mild' :
                        hotspot.severity === 'moderate' ? 'bg-hotspot-moderate' : 
                        'bg-hotspot-severe'
                      }`}></div>
                      <span>{hotspot.name}</span>
                    </div>
                    <div className="font-medium">{hotspot.cases.toLocaleString()} cases</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="hotspots">
          <Card>
            <CardHeader>
              <CardTitle>Current Hotspots</CardTitle>
              <CardDescription>
                Locations with active disease outbreaks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedDisease.hotspots.map(hotspot => (
                  <div key={hotspot.id} className="border-b pb-3 last:border-0">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-medium">{hotspot.name}</h4>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        hotspot.severity === 'mild' ? 'bg-hotspot-mild/20 text-hotspot-mild border border-hotspot-mild/30' :
                        hotspot.severity === 'moderate' ? 'bg-hotspot-moderate/20 text-hotspot-moderate border border-hotspot-moderate/30' : 
                        'bg-hotspot-severe/20 text-hotspot-severe border border-hotspot-severe/30'
                      }`}>
                        {hotspot.severity.charAt(0).toUpperCase() + hotspot.severity.slice(1)}
                      </span>
                    </div>
                    <div className="text-sm grid grid-cols-2 gap-2">
                      <div>Confirmed cases:</div>
                      <div className="font-semibold">{hotspot.cases.toLocaleString()}</div>
                      <div>Coordinates:</div>
                      <div className="font-semibold">{hotspot.lat.toFixed(2)}, {hotspot.lng.toFixed(2)}</div>
                      <div>Last updated:</div>
                      <div className="font-semibold">{new Date(hotspot.date).toLocaleDateString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions">
          <Card>
            <CardHeader>
              <CardTitle>Predicted Outbreaks</CardTitle>
              <CardDescription>
                Areas at risk of developing new outbreaks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedDisease.predictions.map(prediction => (
                  <div key={prediction.id} className="border-b pb-3 last:border-0">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-medium">{prediction.name}</h4>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        prediction.probability === 'low' ? 'bg-prediction-low/20 text-amber-700 border border-prediction-low/30' :
                        prediction.probability === 'medium' ? 'bg-prediction-medium/20 text-amber-600 border border-prediction-medium/30' : 
                        'bg-prediction-high/20 text-amber-500 border border-prediction-high/30'
                      }`}>
                        {prediction.probability.charAt(0).toUpperCase() + prediction.probability.slice(1)} Probability
                      </span>
                    </div>
                    <div className="text-sm grid grid-cols-2 gap-2">
                      <div>Estimated cases:</div>
                      <div className="font-semibold">~{prediction.estimatedCases.toLocaleString()}</div>
                      <div>Coordinates:</div>
                      <div className="font-semibold">{prediction.lat.toFixed(2)}, {prediction.lng.toFixed(2)}</div>
                      <div>Predicted by:</div>
                      <div className="font-semibold">{new Date(prediction.date).toLocaleDateString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StatisticsPanel;
