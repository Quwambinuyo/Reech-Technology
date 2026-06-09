import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface RankLevel {
  id: number;
  rankName: string;
  colorTag: string;
  pointRange: { min: number; max: number };
  benfitSummary: string;
}

interface RewardReducerProps {
  toggleCreateNewRank: boolean;
  editingRank: RankLevel | null;
}

const initialState: RewardReducerProps = {
  toggleCreateNewRank: false,
  editingRank: null,
};

const rewardSlice = createSlice({
  name: "reward",
  initialState,
  reducers: {
    onToggleCreateNewRank: (state) => {
      state.toggleCreateNewRank = !state.toggleCreateNewRank;
      if (!state.toggleCreateNewRank) {
        state.editingRank = null;
      }
    },
    onOpenEditRank: (state, action: PayloadAction<RankLevel>) => {
      state.editingRank = action.payload;
      state.toggleCreateNewRank = true;
    },
  },
});

export const { onToggleCreateNewRank, onOpenEditRank } = rewardSlice.actions;

export const rewardReducer = rewardSlice.reducer;
