// Core TypeScript interfaces for the cattle management platform

export interface Animal {
  id: string;
  name: string;
  tagNumber: string;
  breed: string;
  birthDate: string;
  weight: number;
  currentMilkYield: number;
  averageMilkYield: number;
  healthScore: number;
  pregnancyStatus: 'pregnant' | 'not_pregnant' | 'recently_calved';
  lastHealthCheck: string;
  imageUrl?: string;
  notes?: string;
}

export interface MilkRecord {
  id: string;
  animalId: string;
  date: string;
  morningYield: number;
  afternoonYield: number;
  totalYield: number;
  quality: 'excellent' | 'good' | 'fair' | 'poor';
  fat: number;
  protein: number;
  somaticCellCount: number;
}

export interface PredictionInput {
  animalId?: string;
  animalData?: Partial<Animal>;
  feed: {
    type: string;
    quantity: number;
    nutritionScore: number;
  };
  activity: {
    steps: number;
    restingTime: number;
    feedingTime: number;
  };
  environment: {
    temperature: number;
    humidity: number;
    season: 'spring' | 'summer' | 'autumn' | 'winter';
  };
}

export interface PredictionResult {
  predictedLiters: number;
  confidence: number;
  breakdown: {
    feedImpact: number;
    activityImpact: number;
    environmentImpact: number;
    animalFactors: number;
  };
  recommendations: string[];
  timestamp: string;
}

export interface DiseaseRisk {
  id: string;
  animalId: string;
  diseaseName: string;
  probability: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  symptoms: string[];
  suggestedActions: string[];
  detectedAt: string;
  status: 'active' | 'monitoring' | 'resolved';
}

export interface FeedProfile {
  id: string;
  name: string;
  type: 'hay' | 'silage' | 'grain' | 'concentrate' | 'pasture';
  nutritionFacts: {
    protein: number;
    fiber: number;
    energy: number;
    minerals: Record<string, number>;
  };
  costPerKg: number;
  supplier?: string;
  notes?: string;
}

export interface DashboardStats {
  totalAnimals: number;
  todayMilkYield: number;
  averageHealthScore: number;
  activeAlerts: number;
  weeklyTrend: number;
  monthlyRevenue: number;
}

export interface APIResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface APIError {
  message: string;
  code?: string;
  details?: any;
}

export interface User {
  id: string;
  username: string;
  email: string;
  farmName: string;
  role: 'owner' | 'manager' | 'worker';
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

// Chart data types
export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface ExportOptions {
  format: 'csv' | 'excel' | 'pdf';
  dateRange: {
    from: string;
    to: string;
  };
  includeFields: string[];
}