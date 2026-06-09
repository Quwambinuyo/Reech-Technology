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
  viewingUserRank: number | null;
}

const initialState: RewardReducerProps = {
  toggleCreateNewRank: false,
  editingRank: null,
  viewingUserRank: null,
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
    onOpenUserRankDetail: (state, action: PayloadAction<number>) => {
      state.viewingUserRank = action.payload;
    },
    onCloseUserRankDetail: (state) => {
      state.viewingUserRank = null;
    },
  },
});

export const {
  onToggleCreateNewRank,
  onOpenEditRank,
  onOpenUserRankDetail,
  onCloseUserRankDetail,
} = rewardSlice.actions;

export const rewardReducer = rewardSlice.reducer;
