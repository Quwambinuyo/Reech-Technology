import { toast } from "react-toastify";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance, baseURL } from "../../components/api";
import { clearUserSession, getOrCreateTabId } from "../../utils";

const tabId = getOrCreateTabId();

export type OfflineScope = "admin" | "merchant";

export type OfflineCodeKind = 0 | 1 | 2;

export type OfflineProductSpecBody = {
  label: string;
  value: string;
};

export type OfflineProductVariantBody = {
  id: string | null;
  name: string;
  sku?: string;
  imageUrl?: string | null;
  specifications: OfflineProductSpecBody[];
};

export type OfflineProductBody = {
  businessId: string;
  name: string;
  brand?: string;
  description?: string;
  imageUrl?: string | null;
  manufacturer?: string;
  countryOfOrigin?: string;
  registrationNumber?: string;
  specifications: OfflineProductSpecBody[];
  variants: OfflineProductVariantBody[];
};

export type OfflineBatchLine = {
  activityId?: string;
  variantId?: string;
  quantity: number;
  lotNumber?: string;
  manufacturedOn?: string;
  expiresOn?: string;
};

const MAX_PRODUCT_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_PRODUCT_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

let offlineScope: OfflineScope = "admin";

export const setOfflineScope = (scope: OfflineScope) => {
  offlineScope = scope;
};

export const getOfflineScope = () => offlineScope;

const offlineBase = () => `${baseURL}/${offlineScope}/offline-points`;

const withBusiness = <T extends { businessId: string }>(body: T) => ({
  ...body,
  businessId: body.businessId || undefined,
});

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
        `${offlineBase()}/activities`,
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
        `${offlineBase()}/activities`,
        withBusiness(reqBody),
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
        `${offlineBase()}/activities/${id}`,
        withBusiness(reqBody),
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
        `${offlineBase()}/activities/${id}`,
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

export const fetchOfflineProducts = createAsyncThunk(
  "offlinePoints/fetchOfflineProducts",
  async (
    params: {
      businessId?: string;
      search?: string;
      page?: number;
      pageSize?: number;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.get(`${offlineBase()}/products`, {
        params: {
          businessId: params.businessId || undefined,
          search: params.search || undefined,
          page: params.page ?? 1,
          pageSize: params.pageSize ?? 25,
        },
      });

      if (response.data?.isSuccess) {
        return response.data?.data;
      }

      throw new Error(response.data?.message || "Failed to fetch products");
    } catch (error: any) {
      return handleError(error, rejectWithValue, "Failed to fetch products");
    }
  },
);

export const fetchOfflineProductDetail = createAsyncThunk(
  "offlinePoints/fetchOfflineProductDetail",
  async (
    params: { id: string; businessId?: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.get(
        `${offlineBase()}/products/${params.id}`,
        { params: { businessId: params.businessId || undefined } },
      );

      if (response.data?.isSuccess) {
        return response.data?.data;
      }

      throw new Error(response.data?.message || "Failed to fetch product");
    } catch (error: any) {
      return handleError(error, rejectWithValue, "Failed to fetch product");
    }
  },
);

export const createOfflineProduct = createAsyncThunk(
  "offlinePoints/createOfflineProduct",
  async (reqBody: OfflineProductBody, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${offlineBase()}/products`,
        withBusiness(reqBody),
      );

      if (response.data?.isSuccess) {
        toast.success("Product has been created successfully");
        return response.data?.data;
      }

      throw new Error(response.data?.message || "Failed to create product");
    } catch (error: any) {
      return handleError(error, rejectWithValue, "Failed to create product");
    }
  },
);

export const updateOfflineProduct = createAsyncThunk(
  "offlinePoints/updateOfflineProduct",
  async (
    params: OfflineProductBody & { id: string },
    { rejectWithValue },
  ) => {
    try {
      const { id, ...reqBody } = params;
      const response = await axiosInstance.put(
        `${offlineBase()}/products/${id}`,
        withBusiness(reqBody),
      );

      if (response.data?.isSuccess) {
        toast.success("Product has been updated successfully");
        return response.data?.data;
      }

      throw new Error(response.data?.message || "Failed to update product");
    } catch (error: any) {
      return handleError(error, rejectWithValue, "Failed to update product");
    }
  },
);

export const deleteOfflineProduct = createAsyncThunk(
  "offlinePoints/deleteOfflineProduct",
  async (
    params: { id: string; businessId?: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.delete(
        `${offlineBase()}/products/${params.id}`,
        { params: { businessId: params.businessId || undefined } },
      );

      if (response.data?.isSuccess) {
        toast.success("Product has been deleted successfully");
        return params.id;
      }

      throw new Error(response.data?.message || "Failed to delete product");
    } catch (error: any) {
      return handleError(error, rejectWithValue, "Failed to delete product");
    }
  },
);

export const uploadOfflineProductImage = createAsyncThunk(
  "offlinePoints/uploadOfflineProductImage",
  async (
    params: { file: File; businessId?: string },
    { rejectWithValue },
  ) => {
    try {
      if (!ALLOWED_PRODUCT_IMAGE_TYPES.includes(params.file.type)) {
        throw new Error("Image must be a JPG, PNG or WebP file");
      }

      if (params.file.size > MAX_PRODUCT_IMAGE_SIZE) {
        throw new Error("Image must be 5 MB or smaller");
      }

      const formData = new FormData();
      formData.append("file", params.file);

      if (params.businessId) {
        formData.append("businessId", params.businessId);
      }

      const response = await axiosInstance.post(
        `${offlineBase()}/products/images`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      if (response.data?.isSuccess) {
        return response.data?.data;
      }

      throw new Error(response.data?.message || "Failed to upload image");
    } catch (error: any) {
      return handleError(error, rejectWithValue, "Failed to upload image");
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
        `${offlineBase()}/batches`,
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
        `${offlineBase()}/batches/${id}`,
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
      kind?: OfflineCodeKind;
      reference: string;
      expiresAt?: string;
      activities: OfflineBatchLine[];
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.post(
        `${offlineBase()}/batches`,
        withBusiness(reqBody),
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
  async (
    params: { id: string; page?: number; pageSize?: number },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.post(
        `${offlineBase()}/batches/${params.id}/print`,
        undefined,
        {
          params: {
            page: params.page ?? 1,
            pageSize: params.pageSize ?? 200,
          },
          responseType: "blob",
        },
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
        `${offlineBase()}/batches/${params.id}/distribute`,
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
        `${offlineBase()}/batches/${id}/cancel`,
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