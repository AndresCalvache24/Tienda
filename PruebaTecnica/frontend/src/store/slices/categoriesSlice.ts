import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Category {
  id: number;
  name: string;
  description: string;
}

interface CategoriesState {
  items: Category[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CategoriesState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:3000/api/categories', {
        timeout: 5000, // 5 segundos de timeout
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED') {
          return rejectWithValue('La conexión al servidor ha expirado. Por favor, intente nuevamente.');
        }
        if (error.response) {
          return rejectWithValue(error.response.data.message || 'Error al cargar las categorías');
        }
        if (error.request) {
          return rejectWithValue('No se pudo conectar con el servidor. Por favor, verifique su conexión.');
        }
      }
      return rejectWithValue('Error inesperado al cargar las categorías');
    }
  }
);

export const addCategory = createAsyncThunk(
  'categories/addCategory',
  async (category: Omit<Category, 'id'>, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/api/categories', category);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Error al crear la categoría');
      }
      return rejectWithValue('Error inesperado al crear la categoría');
    }
  }
);

export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async (category: Category, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/categories/${category.id}`, category);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Error al actualizar la categoría');
      }
      return rejectWithValue('Error inesperado al actualizar la categoría');
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (id: number, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:3000/api/categories/${id}`);
      return id;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Error al eliminar la categoría');
      }
      return rejectWithValue('Error inesperado al eliminar la categoría');
    }
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || 'Error al cargar las categorías';
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.items.findIndex((category) => category.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.items = state.items.filter((category) => category.id !== action.payload);
      });
  },
});

export const { clearError } = categoriesSlice.actions;
export default categoriesSlice.reducer; 