import { createSlice } from "@reduxjs/toolkit";

interface PointReducerProps {
	toggleCreateActivityPoint: boolean;
	toggleCreatePointConversion: boolean;
}
const initialState: PointReducerProps = {
	toggleCreateActivityPoint: false,
	toggleCreatePointConversion: false,
};

const pointSlice = createSlice({
	name: "point",
	initialState,
	reducers: {
		onToggleCreateActivityPoint: (state) => {
			state.toggleCreateActivityPoint = !state.toggleCreateActivityPoint;
		},
		onToggleCreatePointConversion: (state) => {
			state.toggleCreatePointConversion = !state.toggleCreatePointConversion;
		},
	},
});

export const { onToggleCreateActivityPoint, onToggleCreatePointConversion } =
	pointSlice.actions;

export const pointReducer = pointSlice.reducer;
