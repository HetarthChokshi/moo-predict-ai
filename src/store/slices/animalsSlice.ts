import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Animal, MilkRecord } from '../../types';
import { APIService } from '../../services/api';
import { mockAnimals, mockMilkRecords } from '../../data/mockData';

export interface AnimalsState {
  animals: Animal[];
  selectedAnimal: Animal | null;
  milkRecords: MilkRecord[];
  loading: boolean;
  error: string | null;
}

const initialState: AnimalsState = {
  animals: [],
  selectedAnimal: null,
  milkRecords: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchAnimals = createAsyncThunk(
  'animals/fetchAnimals',
  async (_, { rejectWithValue }) => {
    try {
      // Use mock data for development
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
      return mockAnimals;
      // return await APIService.getAnimals(); // Uncomment for real API
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch animals');
    }
  }
);

export const fetchAnimal = createAsyncThunk(
  'animals/fetchAnimal',
  async (id: string, { rejectWithValue }) => {
    try {
      return await APIService.getAnimal(id);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch animal');
    }
  }
);

export const createAnimal = createAsyncThunk(
  'animals/createAnimal',
  async (animalData: Omit<Animal, 'id'>, { rejectWithValue }) => {
    try {
      return await APIService.createAnimal(animalData);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create animal');
    }
  }
);

export const updateAnimal = createAsyncThunk(
  'animals/updateAnimal',
  async ({ id, data }: { id: string; data: Partial<Animal> }, { rejectWithValue }) => {
    try {
      return await APIService.updateAnimal(id, data);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update animal');
    }
  }
);

export const deleteAnimal = createAsyncThunk(
  'animals/deleteAnimal',
  async (id: string, { rejectWithValue }) => {
    try {
      await APIService.deleteAnimal(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete animal');
    }
  }
);

export const fetchMilkRecords = createAsyncThunk(
  'animals/fetchMilkRecords',
  async (animalId: string | undefined, { rejectWithValue }) => {
    try {
      // Use mock data for development
      await new Promise(resolve => setTimeout(resolve, 500));
      return animalId 
        ? mockMilkRecords.filter(record => record.animalId === animalId)
        : mockMilkRecords;
      // return await APIService.getMilkRecords(animalId); // Uncomment for real API
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch milk records');
    }
  }
);

export const addMilkRecord = createAsyncThunk(
  'animals/addMilkRecord',
  async (recordData: Omit<MilkRecord, 'id'>, { rejectWithValue }) => {
    try {
      return await APIService.addMilkRecord(recordData);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add milk record');
    }
  }
);

const animalsSlice = createSlice({
  name: 'animals',
  initialState,
  reducers: {
    setSelectedAnimal: (state, action: PayloadAction<Animal | null>) => {
      state.selectedAnimal = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    // Optimistic updates for better UX
    updateAnimalOptimistic: (state, action: PayloadAction<{ id: string; data: Partial<Animal> }>) => {
      const index = state.animals.findIndex(animal => animal.id === action.payload.id);
      if (index !== -1) {
        state.animals[index] = { ...state.animals[index], ...action.payload.data };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch animals
      .addCase(fetchAnimals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnimals.fulfilled, (state, action) => {
        state.loading = false;
        state.animals = action.payload;
      })
      .addCase(fetchAnimals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch single animal
      .addCase(fetchAnimal.fulfilled, (state, action) => {
        state.selectedAnimal = action.payload;
        // Update in animals array if exists
        const index = state.animals.findIndex(animal => animal.id === action.payload.id);
        if (index !== -1) {
          state.animals[index] = action.payload;
        }
      })
      
      // Create animal
      .addCase(createAnimal.fulfilled, (state, action) => {
        state.animals.push(action.payload);
      })
      
      // Update animal
      .addCase(updateAnimal.fulfilled, (state, action) => {
        const index = state.animals.findIndex(animal => animal.id === action.payload.id);
        if (index !== -1) {
          state.animals[index] = action.payload;
        }
        if (state.selectedAnimal?.id === action.payload.id) {
          state.selectedAnimal = action.payload;
        }
      })
      
      // Delete animal
      .addCase(deleteAnimal.fulfilled, (state, action) => {
        state.animals = state.animals.filter(animal => animal.id !== action.payload);
        if (state.selectedAnimal?.id === action.payload) {
          state.selectedAnimal = null;
        }
      })
      
      // Fetch milk records
      .addCase(fetchMilkRecords.fulfilled, (state, action) => {
        state.milkRecords = action.payload;
      })
      
      // Add milk record
      .addCase(addMilkRecord.fulfilled, (state, action) => {
        state.milkRecords.push(action.payload);
      });
  },
});

export const { setSelectedAnimal, clearError, updateAnimalOptimistic } = animalsSlice.actions;
export default animalsSlice.reducer;