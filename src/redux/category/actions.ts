import { toast } from "react-toastify";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance, baseURL } from "../../components/api";
import { clearUserSession, getOrCreateTabId } from "../../utils";

const tabId = getOrCreateTabId();

export const fetchAdminCategories = createAsyncThunk(
	"category/fetchCategories",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get(`${baseURL}/admin/categories`);

			if (response.data?.isSuccess) {
				return response.data?.data;
			} else {
				throw new Error("Failed to fetch categories");
			}
		} catch (error: any) {
			// console.log(error);
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
	}
);

export const createAdminCategories = createAsyncThunk(
	"category/createCategories",
	async (
		reqBody: { name: string; description: string },
		{ rejectWithValue }
	) => {
		try {
			const response = await axiosInstance.post(
				`${baseURL}/admin/categories`,
				reqBody
			);

			if (response.data?.isSuccess) {
				toast.success("Category has been created successfully");
				return response.data?.data;
			} else {
				throw new Error("Failed to create categories");
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
				toast.error(error?.response?.data?.error || error?.message);
				return rejectWithValue(error?.message || error?.response?.data?.error);
			}
		}
	}
);

export const editAdminCategories = createAsyncThunk(
	"category/editCategories",
	async (reqBody: { info: any; id: string }, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.patch(
				`${baseURL}/admin/categories/${reqBody?.id}`,
				reqBody.info
			);

			if (response.data?.isSuccess) {
				toast.success("Category has been updated successfully");
				return response.data?.data;
			} else {
				throw new Error("Failed to edit category");
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
				toast.error(error?.response?.data?.error || error?.message);
				return rejectWithValue(error?.message || error?.response?.data?.error);
			}
		}
	}
);
