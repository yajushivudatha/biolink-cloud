
import { Disease } from './types';

export const diseaseData: Disease[] = [
  {
    id: "covid19",
    name: "COVID-19",
    description: "Coronavirus disease (COVID-19) is an infectious disease caused by the SARS-CoV-2 virus.",
    r0: 2.5,
    incubationPeriod: "2-14 days",
    hotspots: [
      { 
        id: "hs1", 
        name: "New York", 
        lat: 40.7128, 
        lng: -74.0060, 
        severity: "severe", 
        cases: 2500, 
        date: "2025-04-10" 
      },
      { 
        id: "hs2", 
        name: "London", 
        lat: 51.5074, 
        lng: -0.1278, 
        severity: "moderate", 
        cases: 1200, 
        date: "2025-04-12" 
      },
      { 
        id: "hs3", 
        name: "Mumbai", 
        lat: 19.0760, 
        lng: 72.8777, 
        severity: "severe", 
        cases: 3100, 
        date: "2025-04-11" 
      },
      { 
        id: "hs4", 
        name: "Rio de Janeiro", 
        lat: -22.9068, 
        lng: -43.1729, 
        severity: "mild", 
        cases: 500, 
        date: "2025-04-09" 
      },
      { 
        id: "hs5", 
        name: "Tokyo", 
        lat: 35.6762, 
        lng: 139.6503, 
        severity: "moderate", 
        cases: 1800, 
        date: "2025-04-08" 
      },
    ],
    predictions: [
      { 
        id: "pr1", 
        name: "Toronto", 
        lat: 43.6532, 
        lng: -79.3832, 
        probability: "high", 
        estimatedCases: 980,
        date: "2025-04-20" 
      },
      { 
        id: "pr2", 
        name: "Paris", 
        lat: 48.8566, 
        lng: 2.3522, 
        probability: "medium", 
        estimatedCases: 650,
        date: "2025-04-22" 
      },
      { 
        id: "pr3", 
        name: "Seoul", 
        lat: 37.5665, 
        lng: 126.9780, 
        probability: "low", 
        estimatedCases: 420,
        date: "2025-04-25" 
      }
    ]
  },
  {
    id: "malaria",
    name: "Malaria",
    description: "Malaria is a disease caused by a parasite that is transmitted to people through the bites of infected female Anopheles mosquitoes.",
    r0: 5.5,
    incubationPeriod: "10-15 days",
    hotspots: [
      { 
        id: "hs1", 
        name: "Lagos", 
        lat: 6.5244, 
        lng: 3.3792, 
        severity: "severe", 
        cases: 4200, 
        date: "2025-04-05" 
      },
      { 
        id: "hs2", 
        name: "Mumbai", 
        lat: 19.0760, 
        lng: 72.8777, 
        severity: "moderate", 
        cases: 1800, 
        date: "2025-04-08" 
      },
      { 
        id: "hs3", 
        name: "Jakarta", 
        lat: -6.2088, 
        lng: 106.8456, 
        severity: "severe", 
        cases: 3500, 
        date: "2025-04-06" 
      }
    ],
    predictions: [
      { 
        id: "pr1", 
        name: "Bangkok", 
        lat: 13.7563, 
        lng: 100.5018, 
        probability: "high", 
        estimatedCases: 2100,
        date: "2025-04-18" 
      },
      { 
        id: "pr2", 
        name: "Manila", 
        lat: 14.5995, 
        lng: 120.9842, 
        probability: "medium", 
        estimatedCases: 1500,
        date: "2025-04-21" 
      }
    ]
  },
  {
    id: "influenza",
    name: "Influenza",
    description: "Influenza (flu) is a contagious respiratory illness caused by influenza viruses that infect the nose, throat, and sometimes the lungs.",
    r0: 1.5,
    incubationPeriod: "1-4 days",
    hotspots: [
      { 
        id: "hs1", 
        name: "Chicago", 
        lat: 41.8781, 
        lng: -87.6298, 
        severity: "moderate", 
        cases: 1300, 
        date: "2025-04-07" 
      },
      { 
        id: "hs2", 
        name: "Berlin", 
        lat: 52.5200, 
        lng: 13.4050, 
        severity: "mild", 
        cases: 800, 
        date: "2025-04-09" 
      },
      { 
        id: "hs3", 
        name: "Moscow", 
        lat: 55.7558, 
        lng: 37.6173, 
        severity: "severe", 
        cases: 2200, 
        date: "2025-04-11" 
      }
    ],
    predictions: [
      { 
        id: "pr1", 
        name: "Stockholm", 
        lat: 59.3293, 
        lng: 18.0686, 
        probability: "medium", 
        estimatedCases: 720,
        date: "2025-04-19" 
      },
      { 
        id: "pr2", 
        name: "Vienna", 
        lat: 48.2082, 
        lng: 16.3738, 
        probability: "high", 
        estimatedCases: 950,
        date: "2025-04-23" 
      }
    ]
  }
];

export const getDiseaseSummary = (diseaseId: string) => {
  const disease = diseaseData.find(d => d.id === diseaseId);
  if (!disease) return null;
  
  const totalCases = disease.hotspots.reduce((sum, hotspot) => sum + hotspot.cases, 0);
  const severeCases = disease.hotspots.filter(h => h.severity === "severe").reduce((sum, h) => sum + h.cases, 0);
  const predictedCases = disease.predictions.reduce((sum, p) => sum + p.estimatedCases, 0);
  
  return {
    totalCases,
    severeCases,
    predictedCases,
    hotspotCount: disease.hotspots.length,
    predictionCount: disease.predictions.length
  };
};
