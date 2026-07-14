import { createSlice } from "@reduxjs/toolkit";
import {
  fetchDashboardOverview,
  fetchRewardPerformance,
  fetchRecentTransactions,
  fetchCustomerDashboardOverview,
  fetchCustomerRecentTransactions,
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

interface CustomerDashboardOverview {
  startDate: string;
  endDate: string;
  pointBalance: MetricStat;
  totalPointsSpent: MetricStat;
  totalTransactions: MetricStat;
  redeemedPoints: MetricStat;
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

interface CustomerRecentTransaction {
  id: string;
  businessId: string;
  businessName: string;
  businessLogo: string;
  amount: number;
  points: number;
  isDebit: boolean;
  status: string;
  time: string;
}

interface CustomerRecentTransactionsData {
  result: CustomerRecentTransaction[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
}

interface DashboardState {
  overview: DashboardOverview | null;
  rewardPerformance: RewardPerformanceItem[];
  recentTransactions: RecentTransactionsData | null;
  customerOverview: CustomerDashboardOverview | null;
  customerRecentTransactions: CustomerRecentTransactionsData | null;
  loading: {
    overview: boolean;
    rewardPerformance: boolean;
    recentTransactions: boolean;
    customerOverview: boolean;
    customerRecentTransactions: boolean;
  };
  error: {
    overview: string | null;
    rewardPerformance: string | null;
    recentTransactions: string | null;
    customerOverview: string | null;
    customerRecentTransactions: string | null;
  };
}

const initialState: DashboardState = {
  overview: null,
  rewardPerformance: [],
  recentTransactions: null,
  customerOverview: null,
  customerRecentTransactions: null,
  loading: {
    overview: false,
    rewardPerformance: false,
    recentTransactions: false,
    customerOverview: false,
    customerRecentTransactions: false,
  },
  error: {
    overview: null,
    rewardPerformance: null,
    recentTransactions: null,
    customerOverview: null,
    customerRecentTransactions: null,
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
      })

      .addCase(fetchCustomerDashboardOverview.pending, (state) => {
        state.loading.customerOverview = true;
        state.error.customerOverview = null;
      })
      .addCase(fetchCustomerDashboardOverview.fulfilled, (state, action) => {
        state.loading.customerOverview = false;
        state.customerOverview = action.payload;
      })
      .addCase(fetchCustomerDashboardOverview.rejected, (state, action) => {
        state.loading.customerOverview = false;
        state.error.customerOverview = action.payload as string;
      })

      .addCase(fetchCustomerRecentTransactions.pending, (state) => {
        state.loading.customerRecentTransactions = true;
        state.error.customerRecentTransactions = null;
      })
      .addCase(fetchCustomerRecentTransactions.fulfilled, (state, action) => {
        state.loading.customerRecentTransactions = false;
        state.customerRecentTransactions = action.payload;
      })
      .addCase(fetchCustomerRecentTransactions.rejected, (state, action) => {
        state.loading.customerRecentTransactions = false;
        state.error.customerRecentTransactions = action.payload as string;
      });
  },
});

export const { resetDashboardState } = dashboardSlice.actions;
export const dashboardReducer = dashboardSlice.reducer;
