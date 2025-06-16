import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface CartItem {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  product?: {
    name: string;
    price: number;
    imageUrl?: string;
  };
}

interface CartState {
  items: CartItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CartState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (userId: number) => {
    const response = await axios.get(`http://localhost:3000/api/cart/${userId}`);
    return response.data;
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ userId, productId, quantity }: { userId: number; productId: number; quantity: number }) => {
    const response = await axios.post(`http://localhost:3000/api/cart/${userId}`, {
      productId,
      quantity,
    });
    return response.data;
  }
);

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ userId, productId, quantity }: { userId: number; productId: number; quantity: number }) => {
    const response = await axios.put(`http://localhost:3000/api/cart/${userId}/products/${productId}`, {
      quantity,
    });
    return response.data;
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async ({ userId, productId }: { userId: number; productId: number }) => {
    await axios.delete(`http://localhost:3000/api/cart/${userId}/products/${productId}`);
    return productId;
  }
);

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (userId: number) => {
    await axios.delete(`http://localhost:3000/api/cart/${userId}`);
    return userId;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Error al cargar el carrito';
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const existingItem = state.items.find(
          (item) => item.productId === action.payload.productId
        );
        if (existingItem) {
          existingItem.quantity += action.payload.quantity;
        } else {
          state.items.push(action.payload);
        }
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.productId === action.payload.productId
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.productId !== action.payload);
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export default cartSlice.reducer; 