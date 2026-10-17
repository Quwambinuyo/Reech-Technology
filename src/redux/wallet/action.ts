import { toast } from "react-toastify";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance, baseURL } from "../../components/api";
import { clearUserSession, getOrCreateTabId } from "../../utils";

const tabId = getOrCreateTabId();

const handleRedemptionError = (error: any, rejectWithValue: (value: string) => any) => {
  if (error?.message === "Network Error") {
    toast.error("You are not connected to the internet.");
    return rejectWithValue("Network error");
  } else if (error?.response?.status === 401) {
    toast.error("Authorization failed. Please login again,");
    clearUserSession(tabId);
    setTimeout(() => {
      window.location.href = "/sign-in";
    }, 1000);
    return rejectWithValue("Authorization failed");
  } else if (error?.response?.status === 404) {
    const errorMessage = "Code not found. Check the digits.";
    toast.error(errorMessage);
    return rejectWithValue(errorMessage);
  } else if (error?.response?.status === 429) {
    const errorMessage = "Too many attempts. Wait a minute.";
    toast.error(errorMessage);
    return rejectWithValue(errorMessage);
  } else {
    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message;
    toast.error(errorMessage);
    return rejectWithValue(errorMessage);
  }
};

export const transferFunds = createAsyncThunk(
  "wallet/transferFunds",
  async (
    reqBody: {
      recipientEmail: string;
      points: number;
      note: string;
      pin: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.post(
        `${baseURL}/wallet/transfer`,
        reqBody,
      );
      if (response.data?.isSuccess) {
        toast.success("Transfer has been completed successfully");
        return response.data?.data;
      } else {
        throw new Error(response.data?.message || "Failed to transfer funds");
      }
    } catch (error: any) {
      console.log(error);
      if (error?.message === "Network Error") {
        toast.error("You are not connected to the internet.");
        return rejectWithValue("Network error");
      } else if (error?.response?.status === 401) {
        toast.error("Authorization failed. Please login again,");
        clearUserSession(tabId);
        setTimeout(() => {
          window.location.href = "/sign-in";
        }, 1000);
      } else {
        const errorMessage =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.message;
        toast.error(errorMessage);
        return rejectWithValue(errorMessage);
      }
    }
  },
);

export const generateToken = createAsyncThunk(
  "wallet/generateToken",
  async (reqBody: { points: number; pin: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${baseURL}/redemptions/generate`,
        reqBody,
      );
      if (response.data?.isSuccess) {
        return response.data?.data;
      } else {
        throw new Error(response.data?.message || "Failed to generate token");
      }
    } catch (error: any) {
      if (error?.message === "Network Error") {
        toast.error("You are not connected to the internet.");
        return rejectWithValue("Network error");
      } else if (error?.response?.status === 401) {
        toast.error("Authorization failed. Please login again,");
        clearUserSession(tabId);
        setTimeout(() => {
          window.location.href = "/sign-in";
        }, 1000);
        return rejectWithValue("Authorization failed");
      } else if (error?.response?.status === 429) {
        const errorMessage = "Too many attempts. Wait a minute.";
        toast.error(errorMessage);
        return rejectWithValue(errorMessage);
      } else {
        const errorMessage =
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.message;
        toast.error(errorMessage);
        return rejectWithValue(errorMessage);
      }
    }
  },
);

export const validateToken = createAsyncThunk(
  "wallet/validateToken",
  async (reqBody: { code: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${baseURL}/redemptions/validate`,
        reqBody,
      );
      if (response.data?.isSuccess) {
        return response.data?.data;
      } else {
        throw new Error(response.data?.message || "Failed to validate code");
      }
    } catch (error: any) {
      return handleRedemptionError(error, rejectWithValue);
    }
  },
);

export const redeemToken = createAsyncThunk(
  "wallet/redeemToken",
  async (reqBody: { code: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${baseURL}/redemptions/redeem`,
        reqBody,
      );
      if (response.data?.isSuccess) {
        return response.data?.data;
      } else {
        throw new Error(response.data?.message || "Failed to redeem code");
      }
    } catch (error: any) {
      return handleRedemptionError(error, rejectWithValue);
    }
  },
);