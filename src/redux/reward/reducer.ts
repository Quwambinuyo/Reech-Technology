import { createSlice } from "@reduxjs/toolkit";

interface RewardReducerProps {
	toggleCreateNewRank: boolean;
}
const initialState: RewardReducerProps = {
	toggleCreateNewRank: false,
};

const rewardSlice = createSlice({
	name: "reward",
	initialState,
	reducers: {
		onToggleCreateNewRank: (state) => {
			state.toggleCreateNewRank = !state.toggleCreateNewRank;
		},
	},
});

export const { onToggleCreateNewRank } = rewardSlice.actions;

export const rewardReducer = rewardSlice.reducer;
