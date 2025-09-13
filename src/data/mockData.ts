import { Animal, DiseaseRisk, DashboardStats, PredictionResult, MilkRecord, FeedProfile } from '../types';

// Mock animal data
export const mockAnimals: Animal[] = [
  {
    id: 'A001',
    name: 'Bessie',
    tagNumber: 'A127',
    breed: 'Holstein',
    birthDate: '2020-03-15',
    weight: 680,
    currentMilkYield: 28.5,
    averageMilkYield: 26.8,
    healthScore: 8.7,
    pregnancyStatus: 'not_pregnant',
    lastHealthCheck: '2024-01-10',
    imageUrl: '/api/placeholder/200/200',
    notes: 'High-yielding cow with excellent health record',
  },
  {
    id: 'A002',
    name: 'Daisy',
    tagNumber: 'B203',
    breed: 'Jersey',
    birthDate: '2019-07-22',
    weight: 450,
    currentMilkYield: 22.3,
    averageMilkYield: 23.1,
    healthScore: 9.2,
    pregnancyStatus: 'pregnant',
    lastHealthCheck: '2024-01-08',
    notes: 'Pregnant, due in 3 months',
  },
  {
    id: 'A003',
    name: 'Molly',
    tagNumber: 'C156',
    breed: 'Holstein',
    birthDate: '2021-01-10',
    weight: 620,
    currentMilkYield: 18.9,
    averageMilkYield: 25.2,
    healthScore: 7.8,
    pregnancyStatus: 'recently_calved',
    lastHealthCheck: '2024-01-12',
    notes: 'Recently calved, milk yield recovering',
  },
  {
    id: 'A004',
    name: 'Luna',
    tagNumber: 'D089',
    breed: 'Guernsey',
    birthDate: '2020-11-05',
    weight: 550,
    currentMilkYield: 24.7,
    averageMilkYield: 24.3,
    healthScore: 8.9,
    pregnancyStatus: 'not_pregnant',
    lastHealthCheck: '2024-01-11',
    notes: 'Consistent performer with good health',
  },
  {
    id: 'A005',
    name: 'Rosie',
    tagNumber: 'E234',
    breed: 'Holstein',
    birthDate: '2019-09-18',
    weight: 705,
    currentMilkYield: 31.2,
    averageMilkYield: 29.8,
    healthScore: 8.5,
    pregnancyStatus: 'not_pregnant',
    lastHealthCheck: '2024-01-09',
    notes: 'Top performer in the herd',
  },
];

// Mock disease alerts
export const mockDiseaseAlerts: DiseaseRisk[] = [
  {
    id: 'D001',
    animalId: 'A003',
    diseaseName: 'Mastitis',
    probability: 0.78,
    severity: 'high',
    symptoms: ['Swollen udder', 'Reduced milk yield', 'Abnormal milk color'],
    suggestedActions: [
      'Immediate veterinary examination',
      'Milk culture testing',
      'Antibiotic treatment if confirmed',
      'Isolate from healthy animals',
    ],
    detectedAt: '2024-01-12T08:30:00Z',
    status: 'active',
  },
  {
    id: 'D002',
    animalId: 'A001',
    diseaseName: 'Lameness',
    probability: 0.45,
    severity: 'medium',
    symptoms: ['Altered gait', 'Reluctance to walk', 'Favoring one leg'],
    suggestedActions: [
      'Hoof examination',
      'Check for stones or injuries',
      'Monitor movement patterns',
      'Consider hoof trimming',
    ],
    detectedAt: '2024-01-11T14:15:00Z',
    status: 'monitoring',
  },
  {
    id: 'D003',
    animalId: 'A002',
    diseaseName: 'Pregnancy Toxemia',
    probability: 0.23,
    severity: 'low',
    symptoms: ['Decreased appetite', 'Lethargy'],
    suggestedActions: [
      'Monitor feed intake',
      'Check body condition score',
      'Nutritional assessment',
      'Regular veterinary check-ups',
    ],
    detectedAt: '2024-01-10T16:45:00Z',
    status: 'monitoring',
  },
];

// Mock dashboard stats
export const mockDashboardStats: DashboardStats = {
  totalAnimals: 95,
  todayMilkYield: 2450,
  averageHealthScore: 8.7,
  activeAlerts: 3,
  weeklyTrend: 4.2,
  monthlyRevenue: 18750,
};

// Mock milk records
export const mockMilkRecords: MilkRecord[] = [
  {
    id: 'M001',
    animalId: 'A001',
    date: '2024-01-12',
    morningYield: 14.2,
    afternoonYield: 14.3,
    totalYield: 28.5,
    quality: 'excellent',
    fat: 3.8,
    protein: 3.2,
    somaticCellCount: 180000,
  },
  {
    id: 'M002',
    animalId: 'A002',
    date: '2024-01-12',
    morningYield: 11.1,
    afternoonYield: 11.2,
    totalYield: 22.3,
    quality: 'good',
    fat: 4.2,
    protein: 3.5,
    somaticCellCount: 220000,
  },
  // ... more records
];

// Mock feed profiles
export const mockFeedProfiles: FeedProfile[] = [
  {
    id: 'F001',
    name: 'High Energy Concentrate',
    type: 'concentrate',
    nutritionFacts: {
      protein: 18.5,
      fiber: 12.3,
      energy: 2.8,
      minerals: {
        calcium: 0.85,
        phosphorus: 0.45,
        magnesium: 0.25,
      },
    },
    costPerKg: 0.45,
    supplier: 'Farm Feed Co.',
    notes: 'Premium concentrate for high-producing cows',
  },
  {
    id: 'F002',
    name: 'Alfalfa Hay Premium',
    type: 'hay',
    nutritionFacts: {
      protein: 19.2,
      fiber: 28.5,
      energy: 2.2,
      minerals: {
        calcium: 1.35,
        phosphorus: 0.25,
        magnesium: 0.30,
      },
    },
    costPerKg: 0.28,
    supplier: 'Green Valley Farms',
    notes: 'High-quality alfalfa for dairy cows',
  },
];

// Mock prediction results
export const mockPredictionResults: PredictionResult[] = [
  {
    predictedLiters: 26.8,
    confidence: 0.87,
    breakdown: {
      feedImpact: 0.15,
      activityImpact: 0.08,
      environmentImpact: -0.05,
      animalFactors: 0.12,
    },
    recommendations: [
      'Increase concentrate feed by 0.5kg for optimal yield',
      'Monitor for signs of heat stress in current weather',
      'Consider splitting feed into smaller, frequent meals',
    ],
    timestamp: '2024-01-12T10:30:00Z',
  },
];