import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL } from "../../components/api";
import { toast } from "react-toastify";
import type { SigninDataType, SignupDataType } from "./authTypes";
import { getOrCreateTabId, saveUserToStorage } from "../../utils";

const tabId = getOrCreateTabId();

export const createHolderAccount = createAsyncThunk(
  "auth/createAccount",
  async (reqBody: SignupDataType, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseURL}/${reqBody?.url}`,
        reqBody?.data,
      );

      if (response.data?.statusCode === 200) {
        toast.success("Account has been created. Login with your credentials.");
        return response.data;
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
      if (error?.message === "Network Error") {
        toast.error("You are not connected to the internet.");
        return rejectWithValue("Network error");
      } else if (error?.response?.data?.error?.includes("User not found")) {
        toast.error("No account with this email exists on the platform.");
        return rejectWithValue("No account found");
      } else if (
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
