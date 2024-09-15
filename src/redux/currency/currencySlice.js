import { createSlice } from '@reduxjs/toolkit';
import {
  fetchBaseCurrency,
  fetchExchangeCurrency,
  fetchLatestSymbols,
} from './operations';

const initialState = {
  baseCurrency: '',
  exchangeInfo: null,
  error: null,
  isLoading: false,
  rates: [],
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
    builder
      .addCase(fetchBaseCurrency.fulfilled, (state, { payload }) => {
        state.baseCurrency = payload;
      })
      .addCase(fetchExchangeCurrency.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchExchangeCurrency.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.exchangeInfo = payload;
      })
      .addCase(fetchExchangeCurrency.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        state.exchangeInfo = null;
      })
      .addCase(fetchLatestSymbols.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLatestSymbols.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.rates = payload;
      })
      .addCase(fetchLatestSymbols.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        state.rates = [];
      }),
});
export const { setBaseCurrency } = currencySlice.actions;
export const currencyReducer = currencySlice.reducer;
