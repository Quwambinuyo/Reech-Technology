import { createSlice } from "@reduxjs/toolkit";

interface CategoryReducerProps {
	toggleCreateProductCategory: boolean;
}
const initialState: CategoryReducerProps = {
	toggleCreateProductCategory: false,
};

const categorySlice = createSlice({
	name: "category",
	initialState,
	reducers: {
		onToggleCreateProductCategory: (state) => {
			state.toggleCreateProductCategory = !state.toggleCreateProductCategory;
		},
	},
});

export const { onToggleCreateProductCategory } = categorySlice.actions;

export const categoryReducer = categorySlice.reducer;
