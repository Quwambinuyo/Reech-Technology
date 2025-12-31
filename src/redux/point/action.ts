import { toast } from "react-toastify";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance, baseURL } from "../../components/api";
import { clearUserSession, getOrCreateTabId } from "../../utils";

const tabId = getOrCreateTabId();

export const fetchActivityPoints = createAsyncThunk(
	"point/fetchActivityPoints",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.get(`${baseURL}/activity-points`);

			if (response.data?.isSuccess) {
				return response.data?.data;
			} else {
				throw new Error("Failed to fetch activity points");
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
	}
);

export const createActivityPoints = createAsyncThunk(
	"point/createActivityPoints",
	async (
		reqBody: { name: string; description: string; points: number },
		{ rejectWithValue }
	) => {
		try {
			const response = await axiosInstance.post(
				`${baseURL}/activity-points`,
				reqBody
			);

			if (response.data?.isSuccess) {
				toast.success("Activity Points has been created successfully");
				return response.data?.data;
			} else {
				throw new Error("Failed to create activity point");
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
					window.location.href = "/login";
				}, 1000);
			} else {
				toast.error(error?.response?.data?.error || error?.message);
				return rejectWithValue(error?.message || error?.response?.data?.error);
			}
		}
	}
);

export const editActivityPoints = createAsyncThunk(
	"point/editActivityPoints",
	async (reqBody: { info: any; id: string }, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.put(
				`${baseURL}/activity-points/${reqBody?.id}`,
				reqBody.info
			);

			if (response.data?.isSuccess) {
				toast.success("Activity Points has been updated successfully");
				return response.data?.data;
			} else {
				throw new Error("Failed to create activity point");
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

export const deleteActivityPoints = createAsyncThunk(
	"point/deleteActivityPoints",
	async (reqId: string, { rejectWithValue }) => {
		try {
			const response = await axiosInstance.delete(
				`${baseURL}/activity-points/${reqId}`
			);

			if (response.data?.isSuccess) {
				toast.success("Activity Points has been deleted.");
				return "activity point deleted";
			} else {
				throw new Error("Failed to create activity point");
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
