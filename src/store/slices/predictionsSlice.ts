import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { PredictionInput, PredictionResult, DashboardStats } from '../../types';
import { APIService } from '../../services/api';
import { mockDashboardStats } from '../../data/mockData';

export interface PredictionsState {
  currentPrediction: PredictionResult | null;
  predictionHistory: PredictionResult[];
  dashboardStats: DashboardStats | null;
  loading: boolean;
  error: string | null;
}

const initialState: PredictionsState = {
  currentPrediction: null,
  predictionHistory: [],
  dashboardStats: null,
  loading: false,
  error: null,
};

// Async thunks
export const predictMilkYield = createAsyncThunk(
  'predictions/predictMilkYield',
  async (input: PredictionInput, { rejectWithValue }) => {
    try {
      // Simulate AI prediction with mock data
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate processing time
      
      // Generate mock prediction based on inputs
      const baseLiters = 25;
      const feedBonus = input.feed.nutritionScore > 8 ? 3 : input.feed.nutritionScore > 6 ? 1.5 : 0;
      const activityBonus = input.activity.steps > 8000 ? 2 : input.activity.steps > 5000 ? 1 : -1;
      const tempPenalty = input.environment.temperature > 30 ? -2 : input.environment.temperature < 5 ? -1 : 0;
      
      const predictedLiters = baseLiters + feedBonus + activityBonus + tempPenalty + (Math.random() * 3 - 1.5);
      const confidence = 0.75 + (Math.random() * 0.2);
      
      const result: PredictionResult = {
        predictedLiters: Math.max(10, predictedLiters),
        confidence,
        breakdown: {
          feedImpact: feedBonus / predictedLiters,
          activityImpact: activityBonus / predictedLiters,
          environmentImpact: tempPenalty / predictedLiters,
          animalFactors: 0.1 + (Math.random() * 0.1),
        },
        recommendations: [
          predictedLiters < 20 ? 'Consider increasing high-energy feed' : 'Current feed regimen is optimal',
          input.activity.steps < 6000 ? 'Encourage more movement and exercise' : 'Activity levels are healthy',
          input.environment.temperature > 25 ? 'Provide cooling measures during hot weather' : 'Environmental conditions are suitable',
        ],
        timestamp: new Date().toISOString(),
      };
      
      return result;
      // return await APIService.predictMilkYield(input); // Uncomment for real API
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to predict milk yield');
    }
  }
);

export const fetchDashboardStats = createAsyncThunk(
  'predictions/fetchDashboardStats',
  async (_, { rejectWithValue }) => {
    try {
      // Use mock data for development
      await new Promise(resolve => setTimeout(resolve, 600));
      return mockDashboardStats;
      // return await APIService.getDashboardStats(); // Uncomment for real API
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch dashboard stats');
    }
  }
);

const predictionsSlice = createSlice({
  name: 'predictions',
  initialState,
  reducers: {
    clearCurrentPrediction: (state) => {
      state.currentPrediction = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    // Add to history when prediction is made
    savePredictionToHistory: (state, action: PayloadAction<PredictionResult>) => {
      state.predictionHistory.unshift(action.payload);
      // Keep only last 10 predictions
      if (state.predictionHistory.length > 10) {
        state.predictionHistory = state.predictionHistory.slice(0, 10);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Predict milk yield
      .addCase(predictMilkYield.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(predictMilkYield.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPrediction = action.payload;
        // Automatically save to history
        state.predictionHistory.unshift(action.payload);
        if (state.predictionHistory.length > 10) {
          state.predictionHistory = state.predictionHistory.slice(0, 10);
        }
      })
      .addCase(predictMilkYield.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch dashboard stats
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboardStats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentPrediction, clearError, savePredictionToHistory } = predictionsSlice.actions;
export default predictionsSlice.reducer;
