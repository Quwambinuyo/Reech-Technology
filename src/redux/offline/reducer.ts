import { createSlice } from "@reduxjs/toolkit";
import {
  fetchOfflineActivities,
  createOfflineActivity,
  updateOfflineActivity,
  deleteOfflineActivity,
  fetchOfflineProducts,
  fetchOfflineProductDetail,
  createOfflineProduct,
  updateOfflineProduct,
  deleteOfflineProduct,
  uploadOfflineProductImage,
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

export type OfflineProductSpec = {
  label: string;
  value: string;
};

export type OfflineProductVariant = {
  id: string;
  name: string;
  sku: string | null;
  imageUrl: string | null;
  specifications: OfflineProductSpec[];
};

export type OfflineProduct = {
  id: string;
  businessId: string;
  name: string;
  brand: string | null;
  description: string | null;
  imageUrl: string | null;
  manufacturer: string | null;
  countryOfOrigin: string | null;
  registrationNumber: string | null;
  specifications: OfflineProductSpec[];
  variants: OfflineProductVariant[];
};

export type OfflineProductImage = {
  url: string;
};

export type OfflineBatch = {
  id: string;
  businessId: string;
  kind: 0 | 1 | 2;
  reference: string;
  createdAt: string;
  expiresAt: string | null;
  codeCount: number;
  redeemedCount: number;
  distributedTo: string | null;
  distributedAt: string | null;
  cancelledAt: string | null;
};

export type OfflineBatchCode = {
  id: string;
  serial: string;
  checkCount: number;
  activityId: string | null;
  activityName: string | null;
  variantId: string | null;
  lotNumber: string | null;
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

export type OfflineVerifyProduct = {
  name: string;
  variantName: string;
  brand: string | null;
  description: string | null;
  imageUrl: string | null;
  manufacturer: string | null;
  countryOfOrigin: string | null;
  registrationNumber: string | null;
  sku: string | null;
  specifications: OfflineProductSpec[];
  lotNumber: string | null;
  manufacturedOn: string | null;
  expiresOn: string | null;
};

export type OfflineVerifyResult = {
  kind: 0 | 1 | 2;
  status: number;
  points: number;
  expiresAt: string | null;
  product: OfflineVerifyProduct | null;
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
  fetchProductsLoading: boolean;
  allProducts: OfflinePage<OfflineProduct>;
  fetchProductsError: string;
  fetchProductDetailLoading: boolean;
  productDetail: OfflineProduct | null;
  fetchProductDetailError: string;
  createProductLoading: boolean;
  createProductSuccess: OfflineProduct | null;
  createProductError: string;
  updateProductLoading: boolean;
  updateProductSuccess: OfflineProduct | null;
  updateProductError: string;
  deleteProductLoading: boolean;
  deleteProductSuccess: string | null;
  deleteProductError: string;
  uploadProductImageLoading: boolean;
  uploadProductImageSuccess: OfflineProductImage | null;
  uploadProductImageError: string;
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
  fetchProductsLoading: false,
  allProducts: emptyPage,
  fetchProductsError: "",
  fetchProductDetailLoading: false,
  productDetail: null,
  fetchProductDetailError: "",
  createProductLoading: false,
  createProductSuccess: null,
  createProductError: "",
  updateProductLoading: false,
  updateProductSuccess: null,
  updateProductError: "",
  deleteProductLoading: false,
  deleteProductSuccess: null,
  deleteProductError: "",
  uploadProductImageLoading: false,
  uploadProductImageSuccess: null,
  uploadProductImageError: "",
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
      state.createProductSuccess = null;
      state.createProductError = "";
      state.updateProductSuccess = null;
      state.updateProductError = "";
      state.deleteProductSuccess = null;
      state.deleteProductError = "";
      state.uploadProductImageSuccess = null;
      state.uploadProductImageError = "";
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
    clearProductDetail: (state) => {
      state.productDetail = null;
      state.fetchProductDetailError = "";
    },
    resetUploadProductImage: (state) => {
      state.uploadProductImageLoading = false;
      state.uploadProductImageSuccess = null;
      state.uploadProductImageError = "";
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

      .addCase(fetchOfflineProducts.pending, (state) => {
        state.fetchProductsLoading = true;
        state.fetchProductsError = "";
        state.offlineNetworkError = "";
      })
      .addCase(fetchOfflineProducts.fulfilled, (state, action) => {
        state.fetchProductsLoading = false;
        state.allProducts = action.payload ?? emptyPage;
      })
      .addCase(fetchOfflineProducts.rejected, (state, action) => {
        state.fetchProductsLoading = false;
        const error = action.payload as string;
        state.offlineNetworkError = isNetwork(error) ? "Network Error" : "";
        state.fetchProductsError = isNetwork(error) ? "" : error;
      })

      .addCase(fetchOfflineProductDetail.pending, (state) => {
        state.fetchProductDetailLoading = true;
        state.fetchProductDetailError = "";
        state.offlineNetworkError = "";
      })
      .addCase(fetchOfflineProductDetail.fulfilled, (state, action) => {
        state.fetchProductDetailLoading = false;
        state.productDetail = action.payload ?? null;
      })
      .addCase(fetchOfflineProductDetail.rejected, (state, action) => {
        state.fetchProductDetailLoading = false;
        const error = action.payload as string;
        state.offlineNetworkError = isNetwork(error) ? "Network Error" : "";
        state.fetchProductDetailError = isNetwork(error) ? "" : error;
      })

      .addCase(createOfflineProduct.pending, (state) => {
        state.createProductLoading = true;
        state.createProductError = "";
        state.createProductSuccess = null;
      })
      .addCase(createOfflineProduct.fulfilled, (state, action) => {
        state.createProductLoading = false;
        state.createProductSuccess = action.payload;
      })
      .addCase(createOfflineProduct.rejected, (state, action) => {
        state.createProductLoading = false;
        state.createProductError = action.payload as string;
      })

      .addCase(updateOfflineProduct.pending, (state) => {
        state.updateProductLoading = true;
        state.updateProductError = "";
        state.updateProductSuccess = null;
      })
      .addCase(updateOfflineProduct.fulfilled, (state, action) => {
        state.updateProductLoading = false;
        state.updateProductSuccess = action.payload;
      })
      .addCase(updateOfflineProduct.rejected, (state, action) => {
        state.updateProductLoading = false;
        state.updateProductError = action.payload as string;
      })

      .addCase(deleteOfflineProduct.pending, (state) => {
        state.deleteProductLoading = true;
        state.deleteProductError = "";
        state.deleteProductSuccess = null;
      })
      .addCase(deleteOfflineProduct.fulfilled, (state, action) => {
        state.deleteProductLoading = false;
        state.deleteProductSuccess = action.payload;
      })
      .addCase(deleteOfflineProduct.rejected, (state, action) => {
        state.deleteProductLoading = false;
        state.deleteProductError = action.payload as string;
      })

      .addCase(uploadOfflineProductImage.pending, (state) => {
        state.uploadProductImageLoading = true;
        state.uploadProductImageError = "";
        state.uploadProductImageSuccess = null;
      })
      .addCase(uploadOfflineProductImage.fulfilled, (state, action) => {
        state.uploadProductImageLoading = false;
        state.uploadProductImageSuccess = action.payload;
      })
      .addCase(uploadOfflineProductImage.rejected, (state, action) => {
        state.uploadProductImageLoading = false;
        state.uploadProductImageError = action.payload as string;
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

export const {
  resetOfflineMutations,
  resetRedeemCode,
  clearBatchDetail,
  clearProductDetail,
  resetUploadProductImage,
} = offlinePointsSlice.actions;
export const offlinePointsReducer = offlinePointsSlice.reducer;