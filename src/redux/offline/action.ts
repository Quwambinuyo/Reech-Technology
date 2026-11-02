import { toast } from "react-toastify";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance, baseURL } from "../../components/api";
import { clearUserSession, getOrCreateTabId } from "../../utils";

const tabId = getOrCreateTabId();

const extractMessage = async (error: any): Promise<string | undefined> => {
  const data = error?.response?.data;

  if (typeof Blob !== "undefined" && data instanceof Blob) {
    try {
      const parsed = JSON.parse(await data.text());
      return parsed?.message || parsed?.error;
    } catch {
      return undefined;
    }
  }

  return data?.message || data?.error;
};

const handleError = async (
  error: any,
  rejectWithValue: (value: string) => any,
  fallback: string,
) => {
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

  if (error?.response?.status === 429) {
    const message = "Too many attempts. Please wait a minute and try again.";
    toast.error(message);
    return rejectWithValue(message);
  }

  const message = (await extractMessage(error)) || error?.message || fallback;
  toast.error(message);
  return rejectWithValue(message);
};

export const fetchOfflineActivities = createAsyncThunk(
  "offlinePoints/fetchOfflineActivities",
  async (
    params: { businessId: string; page?: number; pageSize?: number },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.get(
        `${baseURL}/admin/offline-points/activities`,
        {
          params: {
            businessId: params.businessId,
            page: params.page ?? 1,
            pageSize: params.pageSize ?? 25,
          },
        },
      );

      if (response.data?.isSuccess) {
        return response.data?.data;
      }

      throw new Error(response.data?.message || "Failed to fetch activities");
    } catch (error: any) {
      return handleError(error, rejectWithValue, "Failed to fetch activities");
    }
  },
);

export const createOfflineActivity = createAsyncThunk(
  "offlinePoints/createOfflineActivity",
  async (
    reqBody: {
      businessId: string;
      name: string;
      points: number;
      description?: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.post(
        `${baseURL}/admin/offline-points/activities`,
        reqBody,
      );

      if (response.data?.isSuccess) {
        toast.success("Activity has been created successfully");
        return response.data?.data;
      }

      throw new Error(response.data?.message || "Failed to create activity");
    } catch (error: any) {
      return handleError(error, rejectWithValue, "Failed to create activity");
    }
  },
);

export const updateOfflineActivity = createAsyncThunk(
  "offlinePoints/updateOfflineActivity",
  async (
    params: {
      id: string;
      businessId: string;
      name: string;
      points: number;
      description?: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const { id, ...reqBody } = params;
      const response = await axiosInstance.put(
        `${baseURL}/admin/offline-points/activities/${id}`,
        reqBody,
      );

      if (response.data?.isSuccess) {
        toast.success("Activity has been updated successfully");
        return response.data?.data;
      }

      throw new Error(response.data?.message || "Failed to update activity");
    } catch (error: any) {
      return handleError(error, rejectWithValue, "Failed to update activity");
    }
  },
);

export const deleteOfflineActivity = createAsyncThunk(
  "offlinePoints/deleteOfflineActivity",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `${baseURL}/admin/offline-points/activities/${id}`,
      );

      if (response.data?.isSuccess) {
        toast.success("Activity has been deleted successfully");
        return id;
      }

      throw new Error(response.data?.message || "Failed to delete activity");
    } catch (error: any) {
      return handleError(error, rejectWithValue, "Failed to delete activity");
    }
  },
);

export const fetchOfflineBatches = createAsyncThunk(
  "offlinePoints/fetchOfflineBatches",
  async (
    params: { businessId?: string; page?: number; pageSize?: number },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.get(
        `${baseURL}/admin/offline-points/batches`,
        {
          params: {
            businessId: params.businessId || undefined,
            page: params.page ?? 1,
            pageSize: params.pageSize ?? 25,
          },
        },
      );

      if (response.data?.isSuccess) {
        return response.data?.data;
      }

      throw new Error(response.data?.message || "Failed to fetch batches");
    } catch (error: any) {
      return handleError(error, rejectWithValue, "Failed to fetch batches");
    }
  },
);

export const fetchOfflineBatchDetail = createAsyncThunk(
  "offlinePoints/fetchOfflineBatchDetail",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${baseURL}/admin/offline-points/batches/${id}`,
      );

      if (response.data?.isSuccess) {
        return response.data?.data;
      }

      throw new Error(response.data?.message || "Failed to fetch batch");
    } catch (error: any) {
      return handleError(error, rejectWithValue, "Failed to fetch batch");
    }
  },
);

export const generateOfflineBatch = createAsyncThunk(
  "offlinePoints/generateOfflineBatch",
  async (
    reqBody: {
      businessId: string;
      reference: string;
      expiresAt: string;
      activities: { activityId: string; quantity: number }[];
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.post(
        `${baseURL}/admin/offline-points/batches`,
        reqBody,
      );

      if (response.data?.isSuccess) {
        toast.success("Batch has been generated successfully");
        return response.data?.data;
      }

      throw new Error(response.data?.message || "Failed to generate batch");
    } catch (error: any) {
      return handleError(error, rejectWithValue, "Failed to generate batch");
    }
  },
);

export const printOfflineBatch = createAsyncThunk(
  "offlinePoints/printOfflineBatch",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${baseURL}/admin/offline-points/batches/${id}/print`,
        undefined,
        { responseType: "blob" },
      );

      const blob: Blob = response.data;

      if (!(blob instanceof Blob) || blob.size === 0) {
        throw new Error("Failed to print batch");
      }

      return URL.createObjectURL(
        new Blob([blob], { type: blob.type || "text/html" }),
      );
    } catch (error: any) {
      return handleError(error, rejectWithValue, "Failed to print batch");
    }
  },
);

export const distributeOfflineBatch = createAsyncThunk(
  "offlinePoints/distributeOfflineBatch",
  async (
    params: { id: string; recipient: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.post(
        `${baseURL}/admin/offline-points/batches/${params.id}/distribute`,
        { recipient: params.recipient.trim() },
      );

      if (response.data?.isSuccess) {
        toast.success("Hand-over has been recorded successfully");
        return response.data?.data ?? true;
      }

      throw new Error(response.data?.message || "Failed to record hand-over");
    } catch (error: any) {
      return handleError(error, rejectWithValue, "Failed to record hand-over");
    }
  },
);

export const cancelOfflineBatch = createAsyncThunk(
  "offlinePoints/cancelOfflineBatch",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${baseURL}/admin/offline-points/batches/${id}/cancel`,
      );

      if (response.data?.isSuccess) {
        const message =
          response.data?.message ||
          "Unused codes cancelled. Completed credits are unchanged";
        toast.success(message);
        return message;
      }

      throw new Error(response.data?.message || "Failed to cancel batch");
    } catch (error: any) {
      return handleError(error, rejectWithValue, "Failed to cancel batch");
    }
  },
);

export const redeemOfflineCode = createAsyncThunk(
  "offlinePoints/redeemOfflineCode",
  async (code: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${baseURL}/offline-points/redeem`,
        { code: code.trim() },
      );

      if (response.data?.isSuccess) {
        return response.data?.data;
      }

      throw new Error(response.data?.message || "Failed to redeem code");
    } catch (error: any) {
      return handleError(error, rejectWithValue, "Failed to redeem code");
    }
  },
);