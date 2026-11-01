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
    const errorMessage =
      error?.response?.data?.message ||
      "Too many attempts. Please try again later.";
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

const handleMessageError = (error: any, rejectWithValue: (value: string) => any) => {
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
  } else {
    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message;
    toast.error(errorMessage);
    return rejectWithValue(errorMessage);
  }
};

export const lookupRecipient = createAsyncThunk(
  "wallet/lookupRecipient",
  async (username: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${baseURL}/wallet/recipient`, {
        params: { username },
      });
      if (response.data?.isSuccess) {
        return response.data?.data as { username: string; name: string };
      } else {
        throw new Error(response.data?.message || "Recipient not found");
      }
    } catch (error: any) {
      if (error?.message === "Network Error") {
        return rejectWithValue("You are not connected to the internet.");
      } else if (error?.response?.status === 401) {
        toast.error("Authorization failed. Please login again,");
        clearUserSession(tabId);
        setTimeout(() => {
          window.location.href = "/sign-in";
        }, 1000);
        return rejectWithValue("Authorization failed");
      }
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.message ||
          "Recipient not found",
      );
    }
  },
);

export const transferFunds = createAsyncThunk(
  "wallet/transferFunds",
  async (
    reqBody: {
      recipientEmail?: string;
      recipientUsername?: string;
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
      if (error?.response?.status === 409 && error.response.data?.data) {
        toast.info(error.response.data.message);
        return error.response.data.data;
      }
      return handleMessageError(error, rejectWithValue);
    }
  },
);

export const getActiveToken = createAsyncThunk(
  "wallet/getActiveToken",
  async (_: void, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${baseURL}/redemptions/active`,
      );
      if (response.data?.isSuccess) {
        return response.data?.data ?? null;
      } else {
        throw new Error(response.data?.message || "Failed to load active token");
      }
    } catch (error: any) {
      return handleMessageError(error, rejectWithValue);
    }
  },
);

export const revealActiveToken = createAsyncThunk(
  "wallet/revealActiveToken",
  async (reqBody: { pin: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${baseURL}/redemptions/active/reveal`,
        reqBody,
      );
      if (response.data?.isSuccess) {
        return response.data?.data;
      } else {
        throw new Error(response.data?.message || "Failed to show code");
      }
    } catch (error: any) {
      return handleMessageError(error, rejectWithValue);
    }
  },
);

export const cancelActiveToken = createAsyncThunk(
  "wallet/cancelActiveToken",
  async (_: void, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${baseURL}/redemptions/active/cancel`,
      );
      if (response.data?.isSuccess) {
        toast.success("Token cancelled");
        return true;
      } else {
        throw new Error(response.data?.message || "Failed to cancel token");
      }
    } catch (error: any) {
      return handleMessageError(error, rejectWithValue);
    }
  },
);

export const validateToken = createAsyncThunk(
  "wallet/validateToken",
  async (reqBody: { code: string; pin: string }, { rejectWithValue }) => {
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
  async (reqBody: { code: string; pin: string }, { rejectWithValue }) => {
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