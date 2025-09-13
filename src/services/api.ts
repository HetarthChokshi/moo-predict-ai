import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Animal, MilkRecord, PredictionInput, PredictionResult, DiseaseRisk, FeedProfile, DashboardStats, APIResponse, ExportOptions } from '../types';

// Create axios instance with base configuration
const createAPIClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor to add auth token
  client.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor for error handling
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('auth_token');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  return client;
};

const apiClient = createAPIClient();

// API service class with typed methods
export class APIService {
  // Animals
  static async getAnimals(): Promise<Animal[]> {
    const response: AxiosResponse<APIResponse<Animal[]>> = await apiClient.get('/animals');
    return response.data.data;
  }

  static async getAnimal(id: string): Promise<Animal> {
    const response: AxiosResponse<APIResponse<Animal>> = await apiClient.get(`/animals/${id}`);
    return response.data.data;
  }

  static async createAnimal(animal: Omit<Animal, 'id'>): Promise<Animal> {
    const response: AxiosResponse<APIResponse<Animal>> = await apiClient.post('/animals', animal);
    return response.data.data;
  }

  static async updateAnimal(id: string, animal: Partial<Animal>): Promise<Animal> {
    const response: AxiosResponse<APIResponse<Animal>> = await apiClient.put(`/animals/${id}`, animal);
    return response.data.data;
  }

  static async deleteAnimal(id: string): Promise<void> {
    await apiClient.delete(`/animals/${id}`);
  }

  // Milk Records
  static async getMilkRecords(animalId?: string): Promise<MilkRecord[]> {
    const params = animalId ? { animalId } : {};
    const response: AxiosResponse<APIResponse<MilkRecord[]>> = await apiClient.get('/milk-records', { params });
    return response.data.data;
  }

  static async addMilkRecord(record: Omit<MilkRecord, 'id'>): Promise<MilkRecord> {
    const response: AxiosResponse<APIResponse<MilkRecord>> = await apiClient.post('/milk-records', record);
    return response.data.data;
  }

  // Predictions
  static async predictMilkYield(input: PredictionInput): Promise<PredictionResult> {
    const response: AxiosResponse<APIResponse<PredictionResult>> = await apiClient.post('/predict/milk', input);
    return response.data.data;
  }

  static async predictDiseaseRisk(animalId: string): Promise<DiseaseRisk[]> {
    const response: AxiosResponse<APIResponse<DiseaseRisk[]>> = await apiClient.post('/predict/disease', { animalId });
    return response.data.data;
  }

  // Disease Management
  static async getDiseaseAlerts(): Promise<DiseaseRisk[]> {
    const response: AxiosResponse<APIResponse<DiseaseRisk[]>> = await apiClient.get('/diseases/alerts');
    return response.data.data;
  }

  static async updateDiseaseStatus(id: string, status: DiseaseRisk['status']): Promise<DiseaseRisk> {
    const response: AxiosResponse<APIResponse<DiseaseRisk>> = await apiClient.patch(`/diseases/${id}`, { status });
    return response.data.data;
  }

  // Feed Profiles
  static async getFeedProfiles(): Promise<FeedProfile[]> {
    const response: AxiosResponse<APIResponse<FeedProfile[]>> = await apiClient.get('/feed-profiles');
    return response.data.data;
  }

  static async createFeedProfile(profile: Omit<FeedProfile, 'id'>): Promise<FeedProfile> {
    const response: AxiosResponse<APIResponse<FeedProfile>> = await apiClient.post('/feed-profiles', profile);
    return response.data.data;
  }

  static async updateFeedProfile(id: string, profile: Partial<FeedProfile>): Promise<FeedProfile> {
    const response: AxiosResponse<APIResponse<FeedProfile>> = await apiClient.put(`/feed-profiles/${id}`, profile);
    return response.data.data;
  }

  static async deleteFeedProfile(id: string): Promise<void> {
    await apiClient.delete(`/feed-profiles/${id}`);
  }

  // Dashboard
  static async getDashboardStats(): Promise<DashboardStats> {
    const response: AxiosResponse<APIResponse<DashboardStats>> = await apiClient.get('/dashboard/stats');
    return response.data.data;
  }

  // Reports & Export
  static async exportData(options: ExportOptions): Promise<Blob> {
    const response = await apiClient.post('/reports/export', options, {
      responseType: 'blob',
    });
    return response.data;
  }

  // Authentication
  static async login(username: string, password: string): Promise<{ token: string; user: any }> {
    const response: AxiosResponse<APIResponse<{ token: string; user: any }>> = await apiClient.post('/auth/login', {
      username,
      password,
    });
    return response.data.data;
  }

  static async register(userData: any): Promise<{ token: string; user: any }> {
    const response: AxiosResponse<APIResponse<{ token: string; user: any }>> = await apiClient.post('/auth/register', userData);
    return response.data.data;
  }

  static async refreshToken(): Promise<{ token: string }> {
    const response: AxiosResponse<APIResponse<{ token: string }>> = await apiClient.post('/auth/refresh');
    return response.data.data;
  }
}

export default apiClient;