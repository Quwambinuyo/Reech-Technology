import { createSlice } from "@reduxjs/toolkit";
import { transferFunds } from "./action";

interface WalletReducerProps {
  toggleTransferFunds: boolean;
  transferFundsLoading: boolean;
  transferFundsSuccess: any;
  transferFundsError: string;
  transferFundsNetworkError: string;
}

const initialState: WalletReducerProps = {
  toggleTransferFunds: false,
  transferFundsLoading: false,
  transferFundsSuccess: null,
  transferFundsError: "",
  transferFundsNetworkError: "",
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    onToggleTransferFunds: (state) => {
      state.toggleTransferFunds = !state.toggleTransferFunds;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(transferFunds.pending, (state) => {
        state.transferFundsLoading = true;
        state.transferFundsError = "";
        state.transferFundsNetworkError = "";
        state.transferFundsSuccess = null;
      })
      .addCase(transferFunds.fulfilled, (state, action) => {
        state.transferFundsLoading = false;
        state.transferFundsSuccess = action.payload;
        state.toggleTransferFunds = false;
      })
      .addCase(transferFunds.rejected, (state, action) => {
        state.transferFundsLoading = false;
        const error = action.payload as string;
        state.transferFundsNetworkError = error?.includes("Network")
          ? "Network Error"
          : "";
        state.transferFundsError = error?.includes("Network") ? "" : error;
      });
  },
});

export const { onToggleTransferFunds } = walletSlice.actions;

export const walletReducer = walletSlice.reducer;
