export interface Doctor {
  id: string;
  name: string;
  hospital: string;
  department: string;
  specialty: string;
  credentials: string[];
  experience: string;
  awards: string[];
  publications: string[];
  mediaAppearances: string[];
  consultationFee: {
    initial: number;
    followUp: number;
  };
  tests: {
    name: string;
    cost: number;
    description: string;
  }[];
  location: {
    address: string;
    phone: string;
    website?: string;
  };
  image: string;
  rating: number;
  reviewCount: number;
}

export interface Symptom {
  id: string;
  name: string;
  description: string;
  category: string;
  severity: 'low' | 'medium' | 'high';
  relatedSymptoms: string[];
}

export interface Recommendation {
  doctor: Doctor;
  reasoning: string;
  estimatedTotalCost: number;
  recommendedTests: string[];
}

export interface User {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  symptoms: string[];
  preferences: {
    maxCost: number;
    location: string;
    insurance: boolean;
  };
} 