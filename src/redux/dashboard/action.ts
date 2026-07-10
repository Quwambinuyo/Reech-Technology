import { toast } from "react-toastify";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance, baseURL } from "../../components/api";
import { clearUserSession, getOrCreateTabId } from "../../utils";

const tabId = getOrCreateTabId();

export const fetchDashboardOverview = createAsyncThunk(
  "dashboard/fetchDashboardOverview",
  async (
    reqBody: { startDate: string | null; endDate: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.get(
        `${baseURL}/businesses/dashboard/overview`,
        { params: reqBody },
      );
      if (response.data?.isSuccess) {
        return response.data?.data;
      } else {
        throw new Error("Failed to fetch dashboard overview");
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
      } else {
        toast.error(error?.response?.data?.error || error?.message);
        return rejectWithValue(error?.message || error?.response?.data?.error);
      }
    }
  },
);

export const fetchRewardPerformance = createAsyncThunk(
  "dashboard/fetchRewardPerformance",
  async (period: 0 | 1, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${baseURL}/businesses/dashboard/reward-performance`,
        { params: { period } },
      );
      if (response.data?.isSuccess) {
        return response.data?.data;
      } else {
        throw new Error("Failed to fetch reward performance");
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
      } else {
        toast.error(error?.response?.data?.error || error?.message);
        return rejectWithValue(error?.message || error?.response?.data?.error);
      }
    }
  },
);

export const fetchRecentTransactions = createAsyncThunk(
  "dashboard/fetchRecentTransactions",
  async (
    params: {
      pageNumber?: number;
      pageSize?: number;
      search?: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.get(
        `${baseURL}/businesses/dashboard/recent-transactions`,
        {
          params: {
            PageNumber: params.pageNumber ?? 1,
            PageSize: params.pageSize ?? 10,
            Search: params.search ?? "",
          },
        },
      );

      if (response.data?.isSuccess) {
        return response.data?.data;
      }

      throw new Error("Failed to fetch recent transactions");
    } catch (error: any) {
      console.log(error, error?.response?.status);

      if (error?.message === "Network Error") {
        toast.error("You are not connected to the internet.");
        return rejectWithValue("Network error");
      } else if (error?.response?.status === 401) {
        toast.error("Authorization failed. Please login again.");
        clearUserSession(tabId);

        setTimeout(() => {
          window.location.href = "/sign-in";
        }, 1000);
      } else {
        toast.error(error?.response?.data?.error || error?.message);
        return rejectWithValue(error?.message || error?.response?.data?.error);
      }
    }
  },
);
