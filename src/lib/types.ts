
export interface DiseaseHotspot {
  id: string;
  name: string;
  lat: number;
  lng: number;
  severity: 'mild' | 'moderate' | 'severe';
  cases: number;
  date: string;
}

export interface DiseasePrediction {
  id: string;
  name: string;
  lat: number;
  lng: number;
  probability: 'low' | 'medium' | 'high';
  estimatedCases: number;
  date: string;
}

export interface Disease {
  id: string;
  name: string;
  description: string;
  r0: number; // Basic reproduction number
  incubationPeriod: string;
  hotspots: DiseaseHotspot[];
  predictions: DiseasePrediction[];
}

export interface Region {
  id: string;
  name: string;
  population: number;
  cases: number;
}
