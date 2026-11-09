import { createSlice } from "@reduxjs/toolkit";
import {
  fetchOfflineActivities,
  createOfflineActivity,
  updateOfflineActivity,
  deleteOfflineActivity,
  fetchOfflineBatches,
  fetchOfflineBatchDetail,
  generateOfflineBatch,
  printOfflineBatch,
  distributeOfflineBatch,
  cancelOfflineBatch,
  redeemOfflineCode,
} from "./action";

export type OfflineActivity = {
  id: string;
  businessId: string;
  name: string;
  points: number;
  description: string | null;
};

export type OfflineBatch = {
  id: string;
  businessId: string;
  reference: string;
  createdAt: string;
  expiresAt: string;
  codeCount: number;
  redeemedCount: number;
  distributedTo: string | null;
  distributedAt: string | null;
  cancelledAt: string | null;
};

export type OfflineBatchCode = {
  id: string;
  activityId: string;
  activityName: string;
  points: number;
  redeemedBy: string | null;
  redeemedAt: string | null;
  transactionId: string | null;
};

export type OfflineBatchEvent = {
  actorId: string;
  createdAt: string;
  action: string;
  note: string | null;
};

export type OfflineBatchDetail = {
  batch: OfflineBatch;
  codes: OfflineBatchCode[];
  events: OfflineBatchEvent[];
};

export type OfflineRedeemResult = {
  transactionId: string;
  pointsAwarded: number;
  balanceAfter: number;
  activityName: string;
};

type OfflinePage<T> = {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
};

interface OfflinePointsReducerProps {
  fetchActivitiesLoading: boolean;
  allActivities: OfflinePage<OfflineActivity>;
  fetchActivitiesError: string;
  offlineNetworkError: string;
  createActivityLoading: boolean;
  createActivitySuccess: OfflineActivity | null;
  createActivityError: string;
  updateActivityLoading: boolean;
  updateActivitySuccess: OfflineActivity | null;
  updateActivityError: string;
  deleteActivityLoading: boolean;
  deleteActivitySuccess: string | null;
  deleteActivityError: string;
  fetchBatchesLoading: boolean;
  allBatches: OfflinePage<OfflineBatch>;
  fetchBatchesError: string;
  fetchBatchDetailLoading: boolean;
  batchDetail: OfflineBatchDetail | null;
  fetchBatchDetailError: string;
  generateBatchLoading: boolean;
  generateBatchSuccess: OfflineBatch | null;
  generateBatchError: string;
  printBatchLoading: boolean;
  printBatchSuccess: string | null;
  printBatchError: string;
  distributeBatchLoading: boolean;
  distributeBatchSuccess: any;
  distributeBatchError: string;
  cancelBatchLoading: boolean;
  cancelBatchSuccess: string | null;
  cancelBatchError: string;
  redeemCodeLoading: boolean;
  redeemCodeSuccess: OfflineRedeemResult | null;
  redeemCodeError: string;
}

const emptyPage = { items: [], page: 1, pageSize: 25, totalCount: 0 };

const initialState: OfflinePointsReducerProps = {
  fetchActivitiesLoading: false,
  allActivities: emptyPage,
  fetchActivitiesError: "",
  offlineNetworkError: "",
  createActivityLoading: false,
  createActivitySuccess: null,
  createActivityError: "",
  updateActivityLoading: false,
  updateActivitySuccess: null,
  updateActivityError: "",
  deleteActivityLoading: false,
  deleteActivitySuccess: null,
  deleteActivityError: "",
  fetchBatchesLoading: false,
  allBatches: emptyPage,
  fetchBatchesError: "",
  fetchBatchDetailLoading: false,
  batchDetail: null,
  fetchBatchDetailError: "",
  generateBatchLoading: false,
  generateBatchSuccess: null,
  generateBatchError: "",
  printBatchLoading: false,
  printBatchSuccess: null,
  printBatchError: "",
  distributeBatchLoading: false,
  distributeBatchSuccess: null,
  distributeBatchError: "",
  cancelBatchLoading: false,
  cancelBatchSuccess: null,
  cancelBatchError: "",
  redeemCodeLoading: false,
  redeemCodeSuccess: null,
  redeemCodeError: "",
};

const isNetwork = (error: string) => error?.includes("Network");

const offlinePointsSlice = createSlice({
  name: "offlinePoints",
  initialState,
  reducers: {
    resetOfflineMutations: (state) => {
      state.createActivitySuccess = null;
      state.createActivityError = "";
      state.updateActivitySuccess = null;
      state.updateActivityError = "";
      state.deleteActivitySuccess = null;
      state.deleteActivityError = "";
      state.generateBatchSuccess = null;
      state.generateBatchError = "";
      state.printBatchSuccess = null;
      state.printBatchError = "";
      state.distributeBatchSuccess = null;
      state.distributeBatchError = "";
      state.cancelBatchSuccess = null;
      state.cancelBatchError = "";
    },
    resetRedeemCode: (state) => {
      state.redeemCodeLoading = false;
      state.redeemCodeSuccess = null;
      state.redeemCodeError = "";
    },
    clearBatchDetail: (state) => {
      state.batchDetail = null;
      state.fetchBatchDetailError = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOfflineActivities.pending, (state) => {
        state.fetchActivitiesLoading = true;
        state.fetchActivitiesError = "";
        state.offlineNetworkError = "";
      })
      .addCase(fetchOfflineActivities.fulfilled, (state, action) => {
        state.fetchActivitiesLoading = false;
        state.allActivities = action.payload ?? emptyPage;
      })
      .addCase(fetchOfflineActivities.rejected, (state, action) => {
        state.fetchActivitiesLoading = false;
        const error = action.payload as string;
        state.offlineNetworkError = isNetwork(error) ? "Network Error" : "";
        state.fetchActivitiesError = isNetwork(error) ? "" : error;
      })

      .addCase(createOfflineActivity.pending, (state) => {
        state.createActivityLoading = true;
        state.createActivityError = "";
        state.createActivitySuccess = null;
      })
      .addCase(createOfflineActivity.fulfilled, (state, action) => {
        state.createActivityLoading = false;
        state.createActivitySuccess = action.payload;
      })
      .addCase(createOfflineActivity.rejected, (state, action) => {
        state.createActivityLoading = false;
        state.createActivityError = action.payload as string;
      })

      .addCase(updateOfflineActivity.pending, (state) => {
        state.updateActivityLoading = true;
        state.updateActivityError = "";
        state.updateActivitySuccess = null;
      })
      .addCase(updateOfflineActivity.fulfilled, (state, action) => {
        state.updateActivityLoading = false;
        state.updateActivitySuccess = action.payload;
      })
      .addCase(updateOfflineActivity.rejected, (state, action) => {
        state.updateActivityLoading = false;
        state.updateActivityError = action.payload as string;
      })

      .addCase(deleteOfflineActivity.pending, (state) => {
        state.deleteActivityLoading = true;
        state.deleteActivityError = "";
        state.deleteActivitySuccess = null;
      })
      .addCase(deleteOfflineActivity.fulfilled, (state, action) => {
        state.deleteActivityLoading = false;
        state.deleteActivitySuccess = action.payload;
      })
      .addCase(deleteOfflineActivity.rejected, (state, action) => {
        state.deleteActivityLoading = false;
        state.deleteActivityError = action.payload as string;
      })

      .addCase(fetchOfflineBatches.pending, (state) => {
        state.fetchBatchesLoading = true;
        state.fetchBatchesError = "";
        state.offlineNetworkError = "";
      })
      .addCase(fetchOfflineBatches.fulfilled, (state, action) => {
        state.fetchBatchesLoading = false;
        state.allBatches = action.payload ?? emptyPage;
      })
      .addCase(fetchOfflineBatches.rejected, (state, action) => {
        state.fetchBatchesLoading = false;
        const error = action.payload as string;
        state.offlineNetworkError = isNetwork(error) ? "Network Error" : "";
        state.fetchBatchesError = isNetwork(error) ? "" : error;
      })

      .addCase(fetchOfflineBatchDetail.pending, (state) => {
        state.fetchBatchDetailLoading = true;
        state.fetchBatchDetailError = "";
        state.offlineNetworkError = "";
      })
      .addCase(fetchOfflineBatchDetail.fulfilled, (state, action) => {
        state.fetchBatchDetailLoading = false;
        state.batchDetail = action.payload ?? null;
      })
      .addCase(fetchOfflineBatchDetail.rejected, (state, action) => {
        state.fetchBatchDetailLoading = false;
        const error = action.payload as string;
        state.offlineNetworkError = isNetwork(error) ? "Network Error" : "";
        state.fetchBatchDetailError = isNetwork(error) ? "" : error;
      })

      .addCase(generateOfflineBatch.pending, (state) => {
        state.generateBatchLoading = true;
        state.generateBatchError = "";
        state.generateBatchSuccess = null;
      })
      .addCase(generateOfflineBatch.fulfilled, (state, action) => {
        state.generateBatchLoading = false;
        state.generateBatchSuccess = action.payload;
      })
      .addCase(generateOfflineBatch.rejected, (state, action) => {
        state.generateBatchLoading = false;
        state.generateBatchError = action.payload as string;
      })

      .addCase(printOfflineBatch.pending, (state) => {
        state.printBatchLoading = true;
        state.printBatchError = "";
        state.printBatchSuccess = null;
      })
      .addCase(printOfflineBatch.fulfilled, (state, action) => {
        state.printBatchLoading = false;
        state.printBatchSuccess = action.payload;
      })
      .addCase(printOfflineBatch.rejected, (state, action) => {
        state.printBatchLoading = false;
        state.printBatchError = action.payload as string;
      })

      .addCase(distributeOfflineBatch.pending, (state) => {
        state.distributeBatchLoading = true;
        state.distributeBatchError = "";
        state.distributeBatchSuccess = null;
      })
      .addCase(distributeOfflineBatch.fulfilled, (state, action) => {
        state.distributeBatchLoading = false;
        state.distributeBatchSuccess = action.payload;
      })
      .addCase(distributeOfflineBatch.rejected, (state, action) => {
        state.distributeBatchLoading = false;
        state.distributeBatchError = action.payload as string;
      })

      .addCase(cancelOfflineBatch.pending, (state) => {
        state.cancelBatchLoading = true;
        state.cancelBatchError = "";
        state.cancelBatchSuccess = null;
      })
      .addCase(cancelOfflineBatch.fulfilled, (state, action) => {
        state.cancelBatchLoading = false;
        state.cancelBatchSuccess = action.payload;
      })
      .addCase(cancelOfflineBatch.rejected, (state, action) => {
        state.cancelBatchLoading = false;
        state.cancelBatchError = action.payload as string;
      })

      .addCase(redeemOfflineCode.pending, (state) => {
        state.redeemCodeLoading = true;
        state.redeemCodeError = "";
        state.redeemCodeSuccess = null;
      })
      .addCase(redeemOfflineCode.fulfilled, (state, action) => {
        state.redeemCodeLoading = false;
        state.redeemCodeSuccess = action.payload;
      })
      .addCase(redeemOfflineCode.rejected, (state, action) => {
        state.redeemCodeLoading = false;
        state.redeemCodeError = action.payload as string;
      });
  },
});

export const { resetOfflineMutations, resetRedeemCode, clearBatchDetail } =
  offlinePointsSlice.actions;
export const offlinePointsReducer = offlinePointsSlice.reducer;