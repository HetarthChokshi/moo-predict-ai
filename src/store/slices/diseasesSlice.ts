import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { DiseaseRisk } from '../../types';
import { APIService } from '../../services/api';
import { mockDiseaseAlerts } from '../../data/mockData';

export interface DiseasesState {
  alerts: DiseaseRisk[];
  animalRisks: Record<string, DiseaseRisk[]>;
  loading: boolean;
  error: string | null;
}

const initialState: DiseasesState = {
  alerts: [],
  animalRisks: {},
  loading: false,
  error: null,
};

// Async thunks
export const fetchDiseaseAlerts = createAsyncThunk(
  'diseases/fetchAlerts',
  async (_, { rejectWithValue }) => {
    try {
      // Use mock data for development
      await new Promise(resolve => setTimeout(resolve, 400));
      return mockDiseaseAlerts;
      // return await APIService.getDiseaseAlerts(); // Uncomment for real API
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch disease alerts');
    }
  }
);

export const predictDiseaseRisk = createAsyncThunk(
  'diseases/predictRisk',
  async (animalId: string, { rejectWithValue }) => {
    try {
      const risks = await APIService.predictDiseaseRisk(animalId);
      return { animalId, risks };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to predict disease risk');
    }
  }
);

export const updateDiseaseStatus = createAsyncThunk(
  'diseases/updateStatus',
  async ({ id, status }: { id: string; status: DiseaseRisk['status'] }, { rejectWithValue }) => {
    try {
      return await APIService.updateDiseaseStatus(id, status);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update disease status');
    }
  }
);

const diseasesSlice = createSlice({
  name: 'diseases',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    // Optimistic status update
    updateAlertStatusOptimistic: (state, action: PayloadAction<{ id: string; status: DiseaseRisk['status'] }>) => {
      const alert = state.alerts.find(alert => alert.id === action.payload.id);
      if (alert) {
        alert.status = action.payload.status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch disease alerts
      .addCase(fetchDiseaseAlerts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDiseaseAlerts.fulfilled, (state, action) => {
        state.loading = false;
        state.alerts = action.payload;
      })
      .addCase(fetchDiseaseAlerts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Predict disease risk
      .addCase(predictDiseaseRisk.fulfilled, (state, action) => {
        const { animalId, risks } = action.payload;
        state.animalRisks[animalId] = risks;
      })
      
      // Update disease status
      .addCase(updateDiseaseStatus.fulfilled, (state, action) => {
        const updatedRisk = action.payload;
        const index = state.alerts.findIndex(alert => alert.id === updatedRisk.id);
        if (index !== -1) {
          state.alerts[index] = updatedRisk;
        }
      });
  },
});

export const { clearError, updateAlertStatusOptimistic } = diseasesSlice.actions;
export default diseasesSlice.reducer;