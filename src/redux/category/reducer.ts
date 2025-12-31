import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
	createAdminCategories,
	editAdminCategories,
	fetchAdminCategories,
} from "./actions";
import type { AdminCategoryListProps } from "../../types";

interface CategoryReducerProps {
	toggleCreateProductCategory: boolean;
	fetchCategoriesLoading: boolean;
	fetchCategoriesError: string;
	categoryNetworkError: string;
	allCategories: AdminCategoryListProps[];
	createCategoryLoading: boolean;
	createCategorySuccess: any;
	createCategoryError: string;
	toggleEditProductCategory: AdminCategoryListProps | null;
	updateCategoryLoading: boolean;
	updateCategorySuccess: any;
	updateCategoryError: string;
}
const initialState: CategoryReducerProps = {
	toggleCreateProductCategory: false,
	fetchCategoriesLoading: false,
	categoryNetworkError: "",
	fetchCategoriesError: "",
	allCategories: [],
	createCategoryLoading: false,
	createCategorySuccess: null,
	createCategoryError: "",
	toggleEditProductCategory: null,
	updateCategoryLoading: false,
	updateCategorySuccess: null,
	updateCategoryError: "",
};

const categorySlice = createSlice({
	name: "category",
	initialState,
	reducers: {
		onToggleCreateProductCategory: (state) => {
			state.toggleCreateProductCategory = !state.toggleCreateProductCategory;
		},
		onToggleEditProductCategory: {
			reducer: (
				state,
				action: PayloadAction<AdminCategoryListProps | null | undefined>
			) => {
				state.toggleEditProductCategory = action.payload ?? null;
			},
			prepare: (
				categoryInfo?: AdminCategoryListProps | null
			): { payload: AdminCategoryListProps | null | undefined } => {
				return { payload: categoryInfo };
			},
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchAdminCategories.pending, (state) => {
				state.fetchCategoriesLoading = true;
				state.fetchCategoriesError = "";
				state.createCategorySuccess = null;
				state.updateCategorySuccess = null;
			})
			.addCase(fetchAdminCategories.fulfilled, (state, action) => {
				state.fetchCategoriesLoading = false;
				state.allCategories = action.payload;
			})
			.addCase(fetchAdminCategories.rejected, (state, action) => {
				state.fetchCategoriesLoading = false;

				const error = action.payload as string;

				state.categoryNetworkError = error?.includes("Network")
					? "Network Error"
					: "";
				state.fetchCategoriesError = error?.includes("Network") ? "" : error;
			})
			.addCase(createAdminCategories.pending, (state) => {
				state.createCategoryLoading = true;
				state.createCategoryError = "";
			})
			.addCase(createAdminCategories.fulfilled, (state, action) => {
				state.createCategoryLoading = false;
				state.createCategorySuccess = action.payload;
				state.toggleCreateProductCategory = false;
			})
			.addCase(createAdminCategories.rejected, (state, action) => {
				state.createCategoryLoading = false;
				const error = action.payload as string;

				state.createCategoryError = error;
			})
			.addCase(editAdminCategories.pending, (state) => {
				state.updateCategoryLoading = true;
				state.updateCategoryError = "";
			})
			.addCase(editAdminCategories.fulfilled, (state, action) => {
				state.updateCategoryLoading = false;
				state.updateCategorySuccess = action.payload;
				state.toggleEditProductCategory = null;
			})
			.addCase(editAdminCategories.rejected, (state, action) => {
				state.updateCategoryLoading = false;
				const error = action.payload as string;

				state.updateCategoryError = error;
			});
	},
});

export const { onToggleCreateProductCategory, onToggleEditProductCategory } =
	categorySlice.actions;

export const categoryReducer = categorySlice.reducer;
