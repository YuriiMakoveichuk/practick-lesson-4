import { createSlice } from '@reduxjs/toolkit';
import { fetchBaseCurrency } from './operations';

const initialState = {
  baseCurrency: '',
};
const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setBaseCurrency: (state, { payload }) => {
      state.baseCurrency = payload;
    },
  },
  extraReducers: builder =>
    builder.addCase(fetchBaseCurrency.fulfilled, (state, { payload }) => {
      state.baseCurrency = payload;
    }),
});
export const { setBaseCurrency } = currencySlice.actions;
export const currencyReducer = currencySlice.reducer;
