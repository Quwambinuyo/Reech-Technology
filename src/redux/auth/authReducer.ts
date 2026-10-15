import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  createHolderAccount,
  verifySignupOtp,
  resendSignupOtp,
  fetchCountries,
  userAccountLogin,
  googleLogin,
  userAccountForgotPassword,
  requestPhoneChangeCode,
  verifyPhoneChange,
  updateUserPin,
  fetchUserPinStatus,
} from "./authActions";
import type { StateType } from "./authTypes";
import { getUserFromStorage } from "../../utils";

const initialState: StateType = {
  createAccountLoading: false,
  createAccountSuccess: null,
  createAccountError: "",
  signupChallenge: null,
  verifySignupLoading: false,
  verifySignupSuccess: false,
  verifySignupError: "",
  resendSignupLoading: false,
  resendSignupError: "",
  countriesLoading: false,
  allCountries: [],
  countriesError: "",
  authNetworkError: "",
  currentUser: getUserFromStorage(),
  loginLoading: false,
  loginError: "",
  googleLoginLoading: false,
  googleLoginError: "",
  landingPageHamburgerToggle: false,
  toggleMobileSidebar: false,
  forgotPasswordLoading: false,
  forgotPasswordSuccess: null,
  forgotPasswordError: "",
  phoneChange: null,
  phoneCodeLoading: false,
  phoneCodeError: "",
  verifyPhoneLoading: false,
  verifyPhoneSuccess: false,
  verifyPhoneError: "",
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
    onClearSignupChallenge: (state) => {
      state.signupChallenge = null;
      state.verifySignupLoading = false;
      state.verifySignupSuccess = false;
      state.verifySignupError = "";
      state.resendSignupLoading = false;
      state.resendSignupError = "";
    },
    onClearVerifySignupSuccess: (state) => {
      state.verifySignupSuccess = false;
    },
    onClearPhoneChange: (state) => {
      state.phoneChange = null;
      state.phoneCodeError = "";
      state.verifyPhoneError = "";
      state.verifyPhoneSuccess = false;
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
      state.googleLoginLoading = false;
      state.googleLoginError = "";

      state.signupChallenge = null;
      state.verifySignupLoading = false;
      state.verifySignupSuccess = false;
      state.verifySignupError = "";
      state.resendSignupLoading = false;
      state.resendSignupError = "";

      state.forgotPasswordLoading = false;
      state.forgotPasswordError = "";
      state.forgotPasswordSuccess = null;

      state.phoneChange = null;
      state.phoneCodeLoading = false;
      state.phoneCodeError = "";
      state.verifyPhoneLoading = false;
      state.verifyPhoneSuccess = false;
      state.verifyPhoneError = "";

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
        state.signupChallenge = null;
        state.verifySignupSuccess = false;
        state.verifySignupError = "";
      })
      .addCase(createHolderAccount.fulfilled, (state, action) => {
        state.createAccountLoading = false;
        state.createAccountSuccess = action.payload;

        if (action.payload?.signupVerificationRequired) {
          state.signupChallenge = {
            id: action.payload?.id ?? null,
            phoneNumber: action.payload?.phoneNumber ?? null,
            challengeId: action.payload?.challengeId,
            expiresAt: action.payload?.otpExpiresAt ?? null,
          };
        }
      })
      .addCase(createHolderAccount.rejected, (state, action) => {
        state.createAccountLoading = false;
        state.createAccountError = (action.payload as string) || "Error";
      })

      .addCase(verifySignupOtp.pending, (state) => {
        state.verifySignupLoading = true;
        state.verifySignupError = "";
        state.verifySignupSuccess = false;
      })
      .addCase(verifySignupOtp.fulfilled, (state) => {
        state.verifySignupLoading = false;
        state.verifySignupSuccess = true;
        state.signupChallenge = null;
      })
      .addCase(verifySignupOtp.rejected, (state, action) => {
        state.verifySignupLoading = false;
        state.verifySignupError =
          (action.payload as string) || "Verification failed";
      })

      .addCase(resendSignupOtp.pending, (state) => {
        state.resendSignupLoading = true;
        state.resendSignupError = "";
      })
      .addCase(resendSignupOtp.fulfilled, (state, action) => {
        state.resendSignupLoading = false;
        if (state.signupChallenge) {
          state.signupChallenge.expiresAt = action.payload?.expiresAt ?? null;
        }
      })
      .addCase(resendSignupOtp.rejected, (state, action) => {
        state.resendSignupLoading = false;
        state.resendSignupError =
          (action.payload as string) || "Failed to resend code";
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
        const payload = action.payload as any;

        if (payload && typeof payload === "object") {
          if (payload.signupVerificationRequired && payload.challengeId) {
            state.signupChallenge = {
              id: payload.id ?? null,
              phoneNumber: payload.phoneNumber ?? null,
              challengeId: payload.challengeId,
              expiresAt: payload.expiresAt ?? null,
            };
            state.loginError = "Email verification required";
            return;
          }
          state.loginError = "Login failed";
          return;
        }

        state.loginError = (payload as string) || "Login failed";
      })

      .addCase(googleLogin.pending, (state) => {
        state.googleLoginLoading = true;
        state.googleLoginError = "";
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.googleLoginLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.googleLoginLoading = false;
        state.googleLoginError =
          (action.payload as string) || "Google login failed";
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

      .addCase(requestPhoneChangeCode.pending, (state) => {
        state.phoneCodeLoading = true;
        state.phoneCodeError = "";
      })
      .addCase(requestPhoneChangeCode.fulfilled, (state, action) => {
        state.phoneCodeLoading = false;
        state.phoneChange = action.payload;
      })
      .addCase(requestPhoneChangeCode.rejected, (state, action) => {
        state.phoneCodeLoading = false;
        state.phoneCodeError =
          (action.payload as string) || "Failed to send code";
      })

      .addCase(verifyPhoneChange.pending, (state) => {
        state.verifyPhoneLoading = true;
        state.verifyPhoneError = "";
        state.verifyPhoneSuccess = false;
      })
      .addCase(verifyPhoneChange.fulfilled, (state, action) => {
        state.verifyPhoneLoading = false;
        state.verifyPhoneSuccess = true;
        state.phoneChange = null;
        if (state.currentUser) {
          state.currentUser.phoneNumber = action.payload.phoneNumber;
        }
      })
      .addCase(verifyPhoneChange.rejected, (state, action) => {
        state.verifyPhoneLoading = false;
        state.verifyPhoneError =
          (action.payload as string) || "Failed to update phone";
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
  onClearSignupChallenge,
  onClearVerifySignupSuccess,
  onClearPhoneChange,
  onToggleLandingHamburger,
  onToggleMobileSidebar,
  onLogout,
  onUpdateBusinessStatus,
  onClearUpdatePinSuccess,
} = authSlice.actions;

export const authReducer = authSlice.reducer;