import { createSlice } from "@reduxjs/toolkit";
import {
  generateToken,
  redeemToken,
  transferFunds,
  validateToken,
} from "./action";

interface GeneratedToken {
  code: string;
  points: number;
  expiresAt: string;
}

interface ValidatedToken {
  customerName: string;
  phoneNumber: string;
  points: number;
  amount: number;
  currencySymbol: string;
  expiresAt: string;
}

interface RedeemedToken {
  transactionId: string;
  reference: string;
  customerName: string;
  points: number;
  amount: number;
  currencySymbol: string;
  time: string;
}

interface WalletReducerProps {
  toggleTransferFunds: boolean;
  transferFundsLoading: boolean;
  transferFundsSuccess: any;
  transferFundsError: string;
  transferFundsNetworkError: string;
  generateTokenLoading: boolean;
  generateTokenSuccess: GeneratedToken | null;
  generateTokenError: string;
  generateTokenNetworkError: string;
  validateTokenLoading: boolean;
  validateTokenSuccess: ValidatedToken | null;
  validateTokenError: string;
  validateTokenNetworkError: string;
  redeemTokenLoading: boolean;
  redeemTokenSuccess: RedeemedToken | null;
  redeemTokenError: string;
  redeemTokenNetworkError: string;
}

const initialState: WalletReducerProps = {
  toggleTransferFunds: false,
  transferFundsLoading: false,
  transferFundsSuccess: null,
  transferFundsError: "",
  transferFundsNetworkError: "",
  generateTokenLoading: false,
  generateTokenSuccess: null,
  generateTokenError: "",
  generateTokenNetworkError: "",
  validateTokenLoading: false,
  validateTokenSuccess: null,
  validateTokenError: "",
  validateTokenNetworkError: "",
  redeemTokenLoading: false,
  redeemTokenSuccess: null,
  redeemTokenError: "",
  redeemTokenNetworkError: "",
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    onToggleTransferFunds: (state) => {
      state.toggleTransferFunds = !state.toggleTransferFunds;
    },
    onResetGenerateToken: (state) => {
      state.generateTokenLoading = false;
      state.generateTokenSuccess = null;
      state.generateTokenError = "";
      state.generateTokenNetworkError = "";
    },
    onResetValidateToken: (state) => {
      state.validateTokenLoading = false;
      state.validateTokenSuccess = null;
      state.validateTokenError = "";
      state.validateTokenNetworkError = "";
    },
    onResetRedeemToken: (state) => {
      state.redeemTokenLoading = false;
      state.redeemTokenSuccess = null;
      state.redeemTokenError = "";
      state.redeemTokenNetworkError = "";
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
      })
      .addCase(generateToken.pending, (state) => {
        state.generateTokenLoading = true;
        state.generateTokenError = "";
        state.generateTokenNetworkError = "";
        state.generateTokenSuccess = null;
      })
      .addCase(generateToken.fulfilled, (state, action) => {
        state.generateTokenLoading = false;
        state.generateTokenSuccess = action.payload;
      })
      .addCase(generateToken.rejected, (state, action) => {
        state.generateTokenLoading = false;
        const error = action.payload as string;
        state.generateTokenNetworkError = error?.includes("Network")
          ? "Network Error"
          : "";
        state.generateTokenError = error?.includes("Network") ? "" : error;
      })
      .addCase(validateToken.pending, (state) => {
        state.validateTokenLoading = true;
        state.validateTokenError = "";
        state.validateTokenNetworkError = "";
        state.validateTokenSuccess = null;
      })
      .addCase(validateToken.fulfilled, (state, action) => {
        state.validateTokenLoading = false;
        state.validateTokenSuccess = action.payload;
      })
      .addCase(validateToken.rejected, (state, action) => {
        state.validateTokenLoading = false;
        const error = action.payload as string;
        state.validateTokenNetworkError = error?.includes("Network")
          ? "Network Error"
          : "";
        state.validateTokenError = error?.includes("Network") ? "" : error;
      })
      .addCase(redeemToken.pending, (state) => {
        state.redeemTokenLoading = true;
        state.redeemTokenError = "";
        state.redeemTokenNetworkError = "";
        state.redeemTokenSuccess = null;
      })
      .addCase(redeemToken.fulfilled, (state, action) => {
        state.redeemTokenLoading = false;
        state.redeemTokenSuccess = action.payload;
      })
      .addCase(redeemToken.rejected, (state, action) => {
        state.redeemTokenLoading = false;
        const error = action.payload as string;
        state.redeemTokenNetworkError = error?.includes("Network")
          ? "Network Error"
          : "";
        state.redeemTokenError = error?.includes("Network") ? "" : error;
      });
  },
});

export const {
  onToggleTransferFunds,
  onResetGenerateToken,
  onResetValidateToken,
  onResetRedeemToken,
} = walletSlice.actions;

export const walletReducer = walletSlice.reducer;