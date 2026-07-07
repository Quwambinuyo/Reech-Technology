import { createSlice } from "@reduxjs/toolkit";
import {
  fetchDashboardOverview,
  fetchRewardPerformance,
  fetchRecentTransactions,
} from "./action";

interface MetricStat {
  value: number;
  previousValue: number;
  percentageChange: number;
  isIncrease: boolean;
}

interface DashboardOverview {
  startDate: string;
  endDate: string;
  totalCustomers: MetricStat;
  totalPointsIssued: MetricStat;
  totalRedemptions: MetricStat;
  totalSpent: MetricStat;
}

interface RewardPerformanceItem {
  periodStart: string;
  label: string;
  pointsEarned: number;
  pointsRedeemed: number;
}

interface RecentTransaction {
  id: string;
  userId: string;
  name: string;
  email: string;
  profilePicture: string;
  amount: number;
  points: number;
  isDebit: boolean;
  time: string;
}

interface RecentTransactionsData {
  result: RecentTransaction[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
}

interface DashboardState {
  overview: DashboardOverview | null;
  rewardPerformance: RewardPerformanceItem[];
  recentTransactions: RecentTransactionsData | null;
  loading: {
    overview: boolean;
    rewardPerformance: boolean;
    recentTransactions: boolean;
  };
  error: {
    overview: string | null;
    rewardPerformance: string | null;
    recentTransactions: string | null;
  };
}

const initialState: DashboardState = {
  overview: null,
  rewardPerformance: [],
  recentTransactions: null,
  loading: {
    overview: false,
    rewardPerformance: false,
    recentTransactions: false,
  },
  error: {
    overview: null,
    rewardPerformance: null,
    recentTransactions: null,
  },
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    resetDashboardState: () => initialState,
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchDashboardOverview.pending, (state) => {
        state.loading.overview = true;
        state.error.overview = null;
      })
      .addCase(fetchDashboardOverview.fulfilled, (state, action) => {
        state.loading.overview = false;
        state.overview = action.payload;
      })
      .addCase(fetchDashboardOverview.rejected, (state, action) => {
        state.loading.overview = false;
        state.error.overview = action.payload as string;
      })

      .addCase(fetchRewardPerformance.pending, (state) => {
        state.loading.rewardPerformance = true;
        state.error.rewardPerformance = null;
      })
      .addCase(fetchRewardPerformance.fulfilled, (state, action) => {
        state.loading.rewardPerformance = false;
        state.rewardPerformance = action.payload;
      })
      .addCase(fetchRewardPerformance.rejected, (state, action) => {
        state.loading.rewardPerformance = false;
        state.error.rewardPerformance = action.payload as string;
      })

      .addCase(fetchRecentTransactions.pending, (state) => {
        state.loading.recentTransactions = true;
        state.error.recentTransactions = null;
      })
      .addCase(fetchRecentTransactions.fulfilled, (state, action) => {
        state.loading.recentTransactions = false;
        state.recentTransactions = action.payload;
      })
      .addCase(fetchRecentTransactions.rejected, (state, action) => {
        state.loading.recentTransactions = false;
        state.error.recentTransactions = action.payload as string;
      });
  },
});

export const { resetDashboardState } = dashboardSlice.actions;
export const dashboardReducer = dashboardSlice.reducer;
