import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance, baseURL } from "../../components/api";
import { toast } from "react-toastify";
import type { SigninDataType, SignupDataType } from "./authTypes";
import { getOrCreateTabId, saveUserToStorage } from "../../utils";

const tabId = getOrCreateTabId();

const extractErrorMessage = (error: any, fallback: string) =>
  error?.response?.data?.message ||
  error?.response?.data?.error ||
  error?.message ||
  fallback;

export const createHolderAccount = createAsyncThunk(
  "auth/createAccount",
  async (reqBody: SignupDataType, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseURL}/${reqBody?.url}`,
        reqBody?.data,
      );

      if (response.data?.statusCode === 200 || response.data?.isSuccess) {
        const data = response.data?.data ?? response.data;
        if (data?.signupVerificationRequired) {
          toast.success("Account created. Enter the code sent to your email.");
        } else {
          toast.success(
            "Account has been created. Login with your credentials.",
          );
        }
        return data;
      } else {
        throw new Error("Failed to create account");
      }
    } catch (error: any) {
      console.log(error);
      if (error?.message === "Network Error") {
        toast.error("You are not connected to the internet.");
        return rejectWithValue("Network error");
      } else {
        toast.error(error?.response?.data?.message || error?.message);
        return rejectWithValue(error?.message || error?.response?.data?.error);
      }
    }
  },
);

export const verifySignupOtp = createAsyncThunk(
  "auth/verifySignupOtp",
  async (
    reqBody: { challengeId: string; code: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.post(
        `${baseURL}/auth/signup-otp/verify`,
        reqBody,
      );

      if (response.data?.isSuccess || response.data?.statusCode === 200) {
        toast.success("Email verified. Login with your credentials.");
        return response.data?.data ?? true;
      } else {
        throw new Error(response.data?.message || "Verification failed");
      }
    } catch (error: any) {
      console.log(error);
      if (error?.message === "Network Error") {
        toast.error("You are not connected to the internet.");
        return rejectWithValue("Network error");
      }
      const message = extractErrorMessage(error, "Verification failed");
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

export const resendSignupOtp = createAsyncThunk(
  "auth/resendSignupOtp",
  async (challengeId: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/auth/signup-otp/resend`, {
        challengeId,
      });

      if (response.data?.isSuccess || response.data?.statusCode === 200) {
        toast.success("A new code has been sent to your email.");
        const data = response.data?.data;
        return { expiresAt: data?.expiresAt ?? data?.otpExpiresAt ?? null };
      } else {
        throw new Error(response.data?.message || "Failed to resend code");
      }
    } catch (error: any) {
      console.log(error);
      if (error?.message === "Network Error") {
        toast.error("You are not connected to the internet.");
        return rejectWithValue("Network error");
      }
      const message = extractErrorMessage(error, "Failed to resend code");
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

export const fetchCountries = createAsyncThunk(
  "auth/countries",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/countries`);

      if (response.data?.isSuccess) {
        return response.data?.data;
      } else {
        throw new Error("Failed to fetch countries");
      }
    } catch (error: any) {
      console.log(error);
      if (error?.message === "Network Error") {
        toast.error("You are not connected to the internet.");
        return rejectWithValue("Network error");
      } else {
        toast.error(error?.response?.data?.error || error?.message);
        return rejectWithValue(error?.message || error?.response?.data?.error);
      }
    }
  },
);

export const userAccountLogin = createAsyncThunk(
  "auth/accountLogin",
  async (reqBody: SigninDataType, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/auth/login`, reqBody.data);

      if (response.data?.isSuccess) {
        toast.success("You are now logged in to your account.");
        const userData = response.data?.data;

        saveUserToStorage(userData, tabId, reqBody.rememberMe);

        return userData;
      } else {
        throw new Error(response.data?.message || "Login failed");
      }
    } catch (error: any) {
      console.log(error);
      const responseBody = error?.response?.data;
      const payload = responseBody?.data ?? responseBody;

      if (
        error?.response?.status === 403 &&
        (payload?.signupVerificationRequired ||
          responseBody?.signupVerificationRequired) &&
        (payload?.challengeId || responseBody?.challengeId)
      ) {
        toast.info("Verify your email to continue.");
        return rejectWithValue({
          signupVerificationRequired: true,
          challengeId: payload?.challengeId ?? responseBody?.challengeId,
          expiresAt: payload?.otpExpiresAt ?? payload?.expiresAt ?? null,
          phoneNumber: payload?.phoneNumber ?? null,
          id: payload?.id ?? null,
        });
      }

      if (error?.message === "Network Error") {
        toast.error("You are not connected to the internet.");
        return rejectWithValue("Network error");
      } else if (error?.response?.data?.error?.includes("User not found")) {
        toast.error("No account with this email exists on the platform.");
        return rejectWithValue("No account found");
      } else if (
        error?.response?.status === 401 ||
        error?.response?.data?.message === "Invalid username/password."
      ) {
        toast.error("Your password is incorrect.");
        return rejectWithValue("Invalid password");
      } else if (
        error?.response?.data?.message?.includes(
          "Password is required and must contain",
        )
      ) {
        toast.error("The provided password is incorrect.");
        return rejectWithValue("Invalid password");
      } else {
        toast.error(error?.response?.data?.message || error?.message);
        return rejectWithValue(error?.message || error?.response?.data?.error);
      }
    }
  },
);

export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (
    reqBody: { token: string; rememberMe?: boolean },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.post(`${baseURL}/auth/google-login`, {
        token: reqBody.token,
      });

      if (response.data?.isSuccess) {
        toast.success("You are now logged in to your account.");
        const userData = response.data?.data;

        saveUserToStorage(userData, tabId, reqBody.rememberMe ?? false);

        return userData;
      } else {
        throw new Error(response.data?.message || "Google login failed");
      }
    } catch (error: any) {
      console.log(error);
      if (error?.message === "Network Error") {
        toast.error("You are not connected to the internet.");
        return rejectWithValue("Network error");
      }
      const message = extractErrorMessage(error, "Google login failed");
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

export const userAccountForgotPassword = createAsyncThunk(
  "auth/accountForgotPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/auth/forgot-password`, {
        email,
      });

      if (response.data?.isSuccess) {
        toast.success("Password reset link has been sent to your email.");
        return response.data;
      }

      return rejectWithValue(
        response.data?.message || "Failed to send reset link",
      );
    } catch (error: any) {
      console.log(error);

      if (error?.message === "Network Error") {
        toast.error("You are not connected to the internet.");
        return rejectWithValue("Network error");
      }

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Failed to send reset link";

      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

export const requestPhoneChangeCode = createAsyncThunk(
  "auth/requestPhoneChangeCode",
  async (phoneNumber: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${baseURL}/users/me/phone/request-code`,
        { phoneNumber },
      );

      if (response.data?.isSuccess || response.data?.statusCode === 200) {
        toast.success("A confirmation code has been sent to your email.");
        const data = response.data?.data;
        return {
          challengeId: data?.challengeId,
          expiresAt: data?.expiresAt ?? data?.otpExpiresAt ?? null,
          phoneNumber,
        };
      } else {
        throw new Error(response.data?.message || "Failed to send code");
      }
    } catch (error: any) {
      console.log(error);
      if (error?.message === "Network Error") {
        toast.error("You are not connected to the internet.");
        return rejectWithValue("Network error");
      }
      const message = extractErrorMessage(error, "Failed to send code");
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

export const verifyPhoneChange = createAsyncThunk(
  "auth/verifyPhoneChange",
  async (
    reqBody: { challengeId: string; code: string; phoneNumber: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.post(
        `${baseURL}/users/me/phone/verify`,
        { challengeId: reqBody.challengeId, code: reqBody.code },
      );

      if (response.data?.isSuccess || response.data?.statusCode === 200) {
        toast.success("Your phone number has been updated.");
        return {
          phoneNumber:
            response.data?.data?.phoneNumber ?? reqBody.phoneNumber,
        };
      } else {
        throw new Error(response.data?.message || "Failed to update phone");
      }
    } catch (error: any) {
      console.log(error);
      if (error?.message === "Network Error") {
        toast.error("You are not connected to the internet.");
        return rejectWithValue("Network error");
      }
      const message = extractErrorMessage(error, "Failed to update phone");
      toast.error(message);
      return rejectWithValue(message);
    }
  },
);

export const updateUserPin = createAsyncThunk(
  "auth/updateUserPin",
  async (
    reqBody: { pin: string; currentPin?: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.put(`${baseURL}/users/pin`, reqBody);

      if (response.data?.isSuccess) {
        toast.success("Your PIN has been updated successfully.");
        return response.data?.data;
      } else {
        throw new Error(response.data?.message || "Failed to update PIN");
      }
    } catch (error: any) {
      console.log(error);
      if (error?.message === "Network Error") {
        toast.error("You are not connected to the internet.");
        return rejectWithValue("Network error");
      } else if (
        error?.response?.data?.message?.includes(
          "Password is required and must contain",
        )
      ) {
        toast.error("The provided current PIN is incorrect.");
        return rejectWithValue("Invalid current PIN");
      } else {
        toast.error(error?.response?.data?.message || error?.message);
        return rejectWithValue(error?.message || error?.response?.data?.error);
      }
    }
  },
);

export const fetchUserPinStatus = createAsyncThunk(
  "auth/fetchUserPinStatus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${baseURL}/users/pin`);

      if (response.data?.isSuccess) {
        return response.data?.data;
      } else {
        throw new Error(response.data?.message || "Failed to fetch PIN status");
      }
    } catch (error: any) {
      console.log(error);
      if (error?.message === "Network Error") {
        toast.error("You are not connected to the internet.");
        return rejectWithValue("Network error");
      } else {
        toast.error(error?.response?.data?.message || error?.message);
        return rejectWithValue(error?.message || error?.response?.data?.error);
      }
    }
  },
);