import { toast } from "react-toastify";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance, baseURL } from "../../components/api";
import { clearUserSession, getOrCreateTabId } from "../../utils";

const tabId = getOrCreateTabId();

export const fetchApiKeys = createAsyncThunk(
  "apiKey/fetchApiKeys",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${baseURL}/api-keys`);
      if (response.data?.isSuccess) {
        return response.data?.data;
      } else {
        throw new Error("Failed to fetch api keys");
      }
    } catch (error: any) {
      console.log(error, error?.response?.status);
      if (error?.message === "Network Error") {
        toast.error("You are not connected to the internet.");
        return rejectWithValue("Network error");
      } else if (error?.response?.status === 401) {
        toast.error("Authorization failed. Please login again,");
        clearUserSession(tabId);
        setTimeout(() => {
          window.location.href = "/sign-in";
        }, 1000);
        return rejectWithValue("Unauthorized");
      } else {
        toast.error(error?.response?.data?.error || error?.message);
        return rejectWithValue(error?.message || error?.response?.data?.error);
      }
    }
  },
);

export const createApiKeys = createAsyncThunk(
  "apiKey/createApiKeys",
  async (
    reqBody: { name: string; description?: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.post(`${baseURL}/api-keys`, reqBody);
      if (response.data?.isSuccess) {
        toast.success("API Key has been created successfully");
        return response.data?.data;
      } else {
        throw new Error("Failed to create api key");
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
        return rejectWithValue("Unauthorized");
      } else {
        toast.error(error?.response?.data?.error || error?.message);
        return rejectWithValue(error?.message || error?.response?.data?.error);
      }
    }
  },
);

export const rotateApiKeys = createAsyncThunk(
  "apiKey/rotateApiKeys",
  async (reqId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`${baseURL}/api-keys/rotate`, {
        id: reqId,
      });
      if (response.data?.isSuccess) {
        toast.success("API Key has been rotated successfully");
        return response.data?.data;
      } else {
        throw new Error("Failed to rotate api key");
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
        return rejectWithValue("Unauthorized");
      } else {
        toast.error(error?.response?.data?.error || error?.message);
        return rejectWithValue(error?.message || error?.response?.data?.error);
      }
    }
  },
);

export const revokeApiKeys = createAsyncThunk(
  "apiKey/revokeApiKeys",
  async (reqId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`${baseURL}/api-keys/revoke`, {
        id: reqId,
      });
      if (response.data?.isSuccess) {
        toast.success("API Key has been revoked successfully");
        return response.data?.data;
      } else {
        throw new Error("Failed to revoke api key");
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
        return rejectWithValue("Unauthorized");
      } else {
        toast.error(error?.response?.data?.error || error?.message);
        return rejectWithValue(error?.message || error?.response?.data?.error);
      }
    }
  },
);
