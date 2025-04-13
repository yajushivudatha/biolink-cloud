
import { useState, useEffect, useRef } from 'react';
import { Disease } from '../lib/types';

interface GlobeContainerProps {
  selectedDisease: Disease;
  showPredictions: boolean;
}

const GlobeContainer = ({ selectedDisease, showPredictions }: GlobeContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // This would be where we'd integrate a real globe library
  // For now we'll create a simulated globe with CSS

  return (
    <div className="w-full h-[500px] relative rounded-xl overflow-hidden bg-gradient-to-b from-slate-900 to-medical-darkPurple border border-medical-purple/20 shadow-xl" ref={containerRef}>
      {/* Simulated Globe */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-96 h-96 rounded-full bg-slate-800 border border-slate-700 relative overflow-hidden animate-rotate-globe">
          {/* Simulated continents */}
          <div className="absolute w-20 h-12 bg-slate-600 rounded-full left-[30%] top-[20%] transform rotate-12"></div>
          <div className="absolute w-32 h-16 bg-slate-600 rounded-full left-[50%] top-[30%] transform rotate-45"></div>
          <div className="absolute w-24 h-32 bg-slate-600 rounded-full left-[25%] top-[50%] transform rotate-25"></div>
          <div className="absolute w-40 h-16 bg-slate-600 rounded-full left-[45%] top-[65%] transform rotate-12"></div>
          <div className="absolute w-16 h-20 bg-slate-600 rounded-full right-[20%] top-[40%] transform rotate-20"></div>
        </div>
      </div>

      {/* Hotspots */}
      {selectedDisease.hotspots.map((hotspot) => {
        // Convert lat/lng to position in the container
        // This is a simplistic conversion - would use proper projection in real implementation
        const posX = 50 + (hotspot.lng / 180) * 30;
        const posY = 50 - (hotspot.lat / 90) * 30;

        const severityColor = 
          hotspot.severity === 'mild' ? 'bg-hotspot-mild' :
          hotspot.severity === 'moderate' ? 'bg-hotspot-moderate' : 
          'bg-hotspot-severe';

        const severitySize = 
          hotspot.severity === 'mild' ? 'w-3 h-3' :
          hotspot.severity === 'moderate' ? 'w-4 h-4' : 
          'w-5 h-5';

        return (
          <div 
            key={hotspot.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full animate-pulse-hotspot z-10"
            style={{ 
              left: `${posX}%`, 
              top: `${posY}%`,
            }}
          >
            <div className={`${severityColor} ${severitySize} rounded-full shadow-lg shadow-hotspot-severe/30`}></div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-black/70 text-white text-xs px-2 py-0.5 rounded whitespace-nowrap">
              {hotspot.name}: {hotspot.cases.toLocaleString()}
            </div>
          </div>
        );
      })}

      {/* Predictions */}
      {showPredictions && selectedDisease.predictions.map((prediction) => {
        // Convert lat/lng to position in the container
        const posX = 50 + (prediction.lng / 180) * 30;
        const posY = 50 - (prediction.lat / 90) * 30;

        const probabilityColor = 
          prediction.probability === 'low' ? 'border-prediction-low' :
          prediction.probability === 'medium' ? 'border-prediction-medium' : 
          'border-prediction-high';

        const probabilitySize = 
          prediction.probability === 'low' ? 'w-4 h-4' :
          prediction.probability === 'medium' ? 'w-5 h-5' : 
          'w-6 h-6';

        return (
          <div 
            key={prediction.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
            style={{ 
              left: `${posX}%`, 
              top: `${posY}%`,
            }}
          >
            <div className={`${probabilityColor} ${probabilitySize} rounded-full border-2 border-dashed animate-pulse opacity-80`}></div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-black/70 text-white text-xs px-2 py-0.5 rounded whitespace-nowrap">
              {prediction.name} (Predicted): ~{prediction.estimatedCases.toLocaleString()}
            </div>
          </div>
        );
      })}

      <div className="absolute bottom-4 left-4 bg-black/60 rounded-lg p-2 text-white text-sm">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-3 h-3 rounded-full bg-hotspot-mild"></span>
          <span>Mild Outbreak</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-3 h-3 rounded-full bg-hotspot-moderate"></span>
          <span>Moderate Outbreak</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-3 h-3 rounded-full bg-hotspot-severe"></span>
          <span>Severe Outbreak</span>
        </div>
        {showPredictions && (
          <>
            <hr className="border-t border-white/20 my-2" />
            <div className="flex items-center gap-2 mb-1">
              <span className="w-3 h-3 rounded-full border-2 border-dashed border-prediction-low"></span>
              <span>Low Probability</span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-3 h-3 rounded-full border-2 border-dashed border-prediction-medium"></span>
              <span>Medium Probability</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full border-2 border-dashed border-prediction-high"></span>
              <span>High Probability</span>
            </div>
          </>
        )}
      </div>
      
      <div className="absolute top-4 right-4 bg-black/60 rounded-lg p-3 text-white">
        <h3 className="font-bold text-lg">{selectedDisease.name}</h3>
        <p className="text-xs text-gray-300 mt-1">{selectedDisease.description}</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2 text-sm">
          <div>R0 Value:</div>
          <div className="text-right font-semibold">{selectedDisease.r0}</div>
          <div>Incubation:</div>
          <div className="text-right font-semibold">{selectedDisease.incubationPeriod}</div>
        </div>
      </div>
    </div>
  );
};

export default GlobeContainer;
