import { createAsyncThunk } from '@reduxjs/toolkit';
import { exchangeCurrency } from 'service/exchangeAPI';
import { getUserInfo } from 'service/opencagedataApi';

export const getBaseCurrency = createAsyncThunk(
  'currency/getCurrency',
  async (coordinates, ThunkAPI) => {
    const state = ThunkAPI.getState();
    if (state.currency.baseCurrency) return state.currency.baseCurrency;

    try {
      const res = await getUserInfo(coordinates);
      return res.results[0]?.annotations?.currency?.iso_code;
    } catch (_) {
      return ThunkAPI.rejectWithValue(
        'Error occurred while getting base currency',
      );
    }
  },
);

export const getExchangeCurrency = createAsyncThunk(
  'currency/exchangeCurrency',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await exchangeCurrency(credentials);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

// export const latestRates = createAsyncThunk(
//   'currency/latestRates',
//   async baseCurrency => {
//     const res = await latestRates(baseCurrency);
//     return res;
//   },
// );

// export const setBaseCurrency = createAsyncThunk(
//   'currency/setBaseCurrency',
//   async (coordinates, ThunkAPI) => {
//     const state = ThunkAPI.getState();
//     if (state.currency.baseCurrency) return state.currency.baseCurrency;
//     const res = await getUserInfo(coordinates);
//     return res.results[0]?.annotations?.currency?.iso_code;
//   },
// );
