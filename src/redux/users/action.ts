import { toast } from "react-toastify";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance, baseURL } from "../../components/api";
import { clearUserSession, getOrCreateTabId } from "../../utils";

const tabId = getOrCreateTabId();

export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (
    reqParams: {
      PageNumber?: number;
      PageSize?: number;
      Search?: string;
      Status?: "active" | "deleted" | "all";
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.get(`${baseURL}/admin/users`, {
        params: {
          PageNumber: reqParams?.PageNumber ?? 1,
          PageSize: reqParams?.PageSize ?? 20,
          Search: reqParams?.Search ?? "",
          Status: reqParams?.Status ?? "active",
        },
      });

      if (response.data?.isSuccess) {
        return response.data?.data;
      } else {
        throw new Error(response.data?.message || "Failed to fetch users");
      }
    } catch (error: any) {
      console.log(error, error?.response?.status);

      if (error?.message === "Network Error") {
        toast.error("You are not connected to the internet.");
        return rejectWithValue("Network error");
      }

      if (error?.response?.status === 401) {
        toast.error("Authorization failed. Please login again.");
        clearUserSession(tabId);

        setTimeout(() => {
          window.location.href = "/sign-in";
        }, 1000);

        return rejectWithValue("Unauthorized");
      }

      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong";

      toast.error(errorMessage);

      return rejectWithValue(errorMessage);
    }
  },
);

export const fetchUserById = createAsyncThunk(
  "user/fetchUserById",
  async (reqId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${baseURL}/admin/users/${reqId}`,
      );

      if (response.data?.isSuccess) {
        return response.data?.data;
      } else {
        throw new Error(response.data?.message || "Failed to fetch user");
      }
    } catch (error: any) {
      console.log(error, error?.response?.status);

      if (error?.message === "Network Error") {
        toast.error("You are not connected to the internet.");
        return rejectWithValue("Network error");
      }

      if (error?.response?.status === 401) {
        toast.error("Authorization failed. Please login again.");
        clearUserSession(tabId);

        setTimeout(() => {
          window.location.href = "/sign-in";
        }, 1000);

        return rejectWithValue("Unauthorized");
      }

      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong";

      toast.error(errorMessage);

      return rejectWithValue(errorMessage);
    }
  },
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (reqId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `${baseURL}/admin/users/${reqId}`,
      );

      if (response.data?.isSuccess) {
        toast.success("User has been deleted successfully");
        return response.data?.data ?? { id: reqId };
      } else {
        throw new Error(response.data?.message || "Failed to delete user");
      }
    } catch (error: any) {
      console.log(error, error?.response?.status);

      if (error?.message === "Network Error") {
        toast.error("You are not connected to the internet.");
        return rejectWithValue("Network error");
      }

      if (error?.response?.status === 401) {
        toast.error("Authorization failed. Please login again.");
        clearUserSession(tabId);

        setTimeout(() => {
          window.location.href = "/sign-in";
        }, 1000);

        return rejectWithValue("Unauthorized");
      }

      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong";

      toast.error(errorMessage);

      return rejectWithValue(errorMessage);
    }
  },
);