import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance, baseURL } from "../../components/api";
import { toast } from "react-toastify";
import {
  clearUserSession,
  getOrCreateTabId,
  saveUserToStorage,
} from "../../utils";
import { onUpdateBusinessStatus } from "../auth/authReducer";
import type { RootState } from "../store";

const tabId = getOrCreateTabId();

export type Business = {
  id: string;
  name: string;
  address: string;
  landmark: string;
};

type FetchBusinessesResponse = {
  result: Business[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
};

type FetchBusinessesParams = {
  pageNumber?: number;
  pageSize?: number;
  search?: string;
};

export const fetchBusinesses = createAsyncThunk(
  "businesses/fetchBusinesses",
  async (params: FetchBusinessesParams, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${baseURL}/businesses`, {
        params,
      });

      if (response.data?.isSuccess) {
        return response.data?.data as FetchBusinessesResponse;
      } else {
        throw new Error("Failed to fetch businesses");
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
        return rejectWithValue("Unauthorized");
      } else {
        toast.error(error?.response?.data?.error || error?.message);
        return rejectWithValue(error?.response?.data?.error || error?.message);
      }
    }
  },
);

export const submitMerchantVerification = createAsyncThunk(
  "verify/businesses/info",
  async (info: any, { dispatch, getState, rejectWithValue }) => {
    try {
      const formData = new FormData();

      formData.append("CategoryId", info.categoryId);
      formData.append("Address", info.address);
      formData.append("Landmark", info.landmark);
      formData.append("CompanyName", info.companyName);
      formData.append("CompanyCategory", info.companyCategory);

      if (info.cacDocuments) {
        formData.append(
          "CACDocuments",
          info.cacDocuments,
          info.cacDocuments.name,
        );
      }

      if (info.utilityBill) {
        formData.append("UtilityBill", info.utilityBill, info.utilityBill.name);
      }

      info.directors.forEach((director: any, index: number) => {
        formData.append(`Directors[${index}].FullName`, director.fullName);
        formData.append(`Directors[${index}].IdType`, director.idType);
        formData.append(
          `Directors[${index}].EmailAddress`,
          director.emailAddress,
        );
        formData.append(
          `Directors[${index}].PhoneNumber`,
          director.phoneNumber,
        );

        if (director.idCard) {
          formData.append(
            `Directors[${index}].IdCard`,
            director.idCard,
            director.idCard.name,
          );
        }
      });

      const response = await axiosInstance.post(
        `${baseURL}/businesses/info`,
        formData,
      );

      if (response.data?.isSuccess) {
        toast.success("Business verification submitted successfully");

        dispatch(onUpdateBusinessStatus("Pending"));

        const state = getState() as RootState;
        const currentUser = state.auth.currentUser;

        if (currentUser) {
          const updatedUser = {
            ...currentUser,
            business: {
              id: currentUser.business?.id ?? "",
              name: currentUser.business?.name ?? "",
              status: "Pending",
            },
          };
          saveUserToStorage(updatedUser, tabId, true);
        }

        return response.data?.data;
      } else {
        throw new Error("Failed to submit business verification");
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
        return rejectWithValue(error?.response?.data?.error || error?.message);
      }
    }
  },
);
