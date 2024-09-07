import { createSlice } from '@reduxjs/toolkit';
import { getBaseCurrency, getExchangeCurrency } from 'reduxState/currencyOp';
const initialState = {
  baseCurrency: '',
  exchangeInfo: null,
  isLoading: false,
  error: null,
  rates: {},
};

const handlePending = state => {
  state.isLoading = true;
  state.error = null;
};

const sliceCurrency = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setBaseCurrency: (state, { payload }) => {
      state.baseCurrency = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(getBaseCurrency.pending, state => handlePending(state))
      .addCase(getBaseCurrency.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.baseCurrency = payload;
      })
      .addCase(getBaseCurrency.rejected, state => {
        state.baseCurrency = 'USD';
      })
      .addCase(getExchangeCurrency.pending, state => handlePending(state))
      .addCase(getExchangeCurrency.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.exchangeInfo = payload;
      })
      .addCase(getExchangeCurrency.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        state.exchangeInfo = null;
      }),
});

export const selectBaseCurrency = state => state.currency.baseCurrency;
export const selectIsError = state => state.currency.error;
export const selectExchangeInfo = state => state.currency.exchangeInfo;

export const { setBaseCurrency, setError } = sliceCurrency.actions;
export const currencyReducer = sliceCurrency.reducer;
