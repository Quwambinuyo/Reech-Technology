import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  createHolderAccount,
  fetchCountries,
  userAccountLogin,
  userAccountForgotPassword,
  updateUserPin,
  fetchUserPinStatus,
} from "./authActions";
import type { StateType } from "./authTypes";
import { getUserFromStorage } from "../../utils";

const initialState: StateType = {
  createAccountLoading: false,
  createAccountSuccess: null,
  createAccountError: "",
  countriesLoading: false,
  allCountries: [],
  countriesError: "",
  authNetworkError: "",
  currentUser: getUserFromStorage(),
  loginLoading: false,
  loginError: "",
  landingPageHamburgerToggle: false,
  toggleMobileSidebar: false,
  forgotPasswordLoading: false,
  forgotPasswordSuccess: null,
  forgotPasswordError: "",
  updatePinLoading: false,
  updatePinSuccess: null,
  updatePinError: "",
  pinStatusLoading: false,
  pinStatus: null,
  pinStatusError: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onClearAccountCreationSuccess: (state) => {
      state.createAccountSuccess = null;
    },
    onToggleLandingHamburger: (state) => {
      state.landingPageHamburgerToggle = !state.landingPageHamburgerToggle;
    },
    onToggleMobileSidebar: (state) => {
      state.toggleMobileSidebar = !state.toggleMobileSidebar;
    },
    onLogout: (state) => {
      state.currentUser = null;
      state.loginError = "";
      state.createAccountError = "";
      state.authNetworkError = "";
      state.loginLoading = false;

      state.forgotPasswordLoading = false;
      state.forgotPasswordError = "";
      state.forgotPasswordSuccess = null;

      state.updatePinLoading = false;
      state.updatePinSuccess = null;
      state.updatePinError = "";
      state.pinStatusLoading = false;
      state.pinStatus = null;
      state.pinStatusError = "";
    },
    onUpdateBusinessStatus: (state, action: PayloadAction<string>) => {
      if (state.currentUser?.business) {
        state.currentUser.business.status = action.payload;
      }
    },
    onClearUpdatePinSuccess: (state) => {
      state.updatePinSuccess = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createHolderAccount.pending, (state) => {
        state.createAccountLoading = true;
        state.createAccountError = "";
      })
      .addCase(createHolderAccount.fulfilled, (state, action) => {
        state.createAccountLoading = false;
        state.createAccountSuccess = action.payload;
      })
      .addCase(createHolderAccount.rejected, (state, action) => {
        state.createAccountLoading = false;
        state.createAccountError = (action.payload as string) || "Error";
      })

      .addCase(userAccountLogin.pending, (state) => {
        state.loginLoading = true;
        state.loginError = "";
      })
      .addCase(userAccountLogin.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(userAccountLogin.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = (action.payload as string) || "Login failed";
      })

      .addCase(userAccountForgotPassword.pending, (state) => {
        state.forgotPasswordLoading = true;
        state.forgotPasswordError = "";
        state.forgotPasswordSuccess = null;
      })
      .addCase(userAccountForgotPassword.fulfilled, (state, action) => {
        state.forgotPasswordLoading = false;
        state.forgotPasswordSuccess = action.payload;
      })
      .addCase(userAccountForgotPassword.rejected, (state, action) => {
        state.forgotPasswordLoading = false;
        state.forgotPasswordError =
          (action.payload as string) || "Failed to send reset email";
      })

      .addCase(fetchCountries.pending, (state) => {
        state.countriesLoading = true;
        state.countriesError = "";
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.countriesLoading = false;
        state.allCountries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.countriesLoading = false;

        const error = action.payload as string;

        state.authNetworkError = error?.includes("Network")
          ? "Network Error"
          : "";

        state.countriesError = error?.includes("Network") ? "" : error;
      })

      .addCase(updateUserPin.pending, (state) => {
        state.updatePinLoading = true;
        state.updatePinError = "";
      })
      .addCase(updateUserPin.fulfilled, (state, action) => {
        state.updatePinLoading = false;
        state.updatePinSuccess = action.payload;
      })
      .addCase(updateUserPin.rejected, (state, action) => {
        state.updatePinLoading = false;
        state.updatePinError =
          (action.payload as string) || "Failed to update PIN";
      })

      .addCase(fetchUserPinStatus.pending, (state) => {
        state.pinStatusLoading = true;
        state.pinStatusError = "";
      })
      .addCase(fetchUserPinStatus.fulfilled, (state, action) => {
        state.pinStatusLoading = false;
        state.pinStatus = action.payload;
      })
      .addCase(fetchUserPinStatus.rejected, (state, action) => {
        state.pinStatusLoading = false;
        state.pinStatusError =
          (action.payload as string) || "Failed to fetch PIN status";
      });
  },
});

export const {
  onClearAccountCreationSuccess,
  onToggleLandingHamburger,
  onToggleMobileSidebar,
  onLogout,
  onUpdateBusinessStatus,
  onClearUpdatePinSuccess,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
