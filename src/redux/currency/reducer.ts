import { createSlice } from "@reduxjs/toolkit";
import { fetchCurrencies } from "./action";

type CurrencyProps = {
  id: string;
  code: string;
  name: string;
};

type CurrencyResponse = {
  pageNumber: number;
  result: CurrencyProps[];
  totalCount: number;
  totalPages: number;
};

interface CurrencyReducerProps {
  fetchCurrenciesLoading: boolean;
  allCurrencies: CurrencyResponse;
  fetchCurrenciesError: string;
  currencyNetworkError: string;
}

const initialState: CurrencyReducerProps = {
  fetchCurrenciesLoading: false,
  allCurrencies: {
    pageNumber: 1,
    result: [],
    totalCount: 0,
    totalPages: 0,
  },
  fetchCurrenciesError: "",
  currencyNetworkError: "",
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCurrencies.pending, (state) => {
        state.fetchCurrenciesLoading = true;
        state.currencyNetworkError = "";
        state.fetchCurrenciesError = "";
      })
      .addCase(fetchCurrencies.fulfilled, (state, action) => {
        state.fetchCurrenciesLoading = false;
        state.allCurrencies = action.payload;
      })
      .addCase(fetchCurrencies.rejected, (state, action) => {
        state.fetchCurrenciesLoading = false;
        const error = action.payload as string;
        state.currencyNetworkError = error?.includes("Network")
          ? "Network Error"
          : "";
        state.fetchCurrenciesError = error?.includes("Network") ? "" : error;
      });
  },
});

export const currencyReducer = currencySlice.reducer;
