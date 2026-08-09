import { toast } from "react-toastify";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance, baseURL } from "../../components/api";
import { clearUserSession, getOrCreateTabId } from "../../utils";

const tabId = getOrCreateTabId();

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
