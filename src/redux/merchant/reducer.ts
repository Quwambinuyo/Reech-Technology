import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  submitMerchantVerification,
  fetchBusinesses,
  type Business,
} from "./action";

type DirectorProps = {
  fullName: string;
  idType: string;
  idCard: File | null;
  emailAddress: string;
  phoneNumber: string;
};

type MerchantVerificationState = {
  categoryId: string;
  address: string;
  landmark: string;
  companyName: string;
  companyCategory: string;
  cacDocuments: File | null;
  utilityBill: File | null;
  directors: DirectorProps[];
  isSubmitting: boolean;
  submitError: string;
  networkError: string;
  isSuccess: boolean;
  businesses: Business[];
  businessesPageNumber: number;
  businessesTotalPages: number;
  businessesTotalCount: number;
  isFetchingBusinesses: boolean;
  fetchBusinessesError: string;
};

const createEmptyDirector = (): DirectorProps => ({
  fullName: "",
  idType: "",
  idCard: null,
  emailAddress: "",
  phoneNumber: "",
});

const initialState: MerchantVerificationState = {
  categoryId: "",
  address: "",
  landmark: "",
  companyName: "",
  companyCategory: "",
  cacDocuments: null,
  utilityBill: null,
  directors: [createEmptyDirector()],
  isSubmitting: false,
  submitError: "",
  networkError: "",
  isSuccess: false,
  businesses: [],
  businessesPageNumber: 0,
  businessesTotalPages: 0,
  businessesTotalCount: 0,
  isFetchingBusinesses: false,
  fetchBusinessesError: "",
};

const merchantSlice = createSlice({
  name: "merchantVerification",
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<string>) => {
      state.categoryId = action.payload;
    },
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    setLandmark: (state, action: PayloadAction<string>) => {
      state.landmark = action.payload;
    },
    setCompanyName: (state, action: PayloadAction<string>) => {
      state.companyName = action.payload;
    },
    setCompanyCategory: (state, action: PayloadAction<string>) => {
      state.companyCategory = action.payload;
    },
    setCacDocuments: (state, action: PayloadAction<File | null>) => {
      state.cacDocuments = action.payload;
    },
    setUtilityBill: (state, action: PayloadAction<File | null>) => {
      state.utilityBill = action.payload;
    },
    addDirector: (state) => {
      state.directors.push(createEmptyDirector());
    },
    removeDirector: (state, action: PayloadAction<number>) => {
      if (state.directors.length === 1) return;
      state.directors.splice(action.payload, 1);
    },
    updateDirectorField: {
      reducer: (
        state,
        action: PayloadAction<{
          index: number;
          field: keyof Omit<DirectorProps, "idCard">;
          value: string;
        }>,
      ) => {
        const { index, field, value } = action.payload;
        const director = state.directors[index];
        if (!director) return;
        director[field] = value;
      },
      prepare: (
        index: number,
        field: keyof Omit<DirectorProps, "idCard">,
        value: string,
      ) => ({
        payload: { index, field, value },
      }),
    },
    setDirectorIdCard: {
      reducer: (
        state,
        action: PayloadAction<{ index: number; file: File | null }>,
      ) => {
        const { index, file } = action.payload;
        const director = state.directors[index];
        if (!director) return;
        director.idCard = file;
      },
      prepare: (index: number, file: File | null) => ({
        payload: { index, file },
      }),
    },
    resetMerchantVerification: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitMerchantVerification.pending, (state) => {
        state.isSubmitting = true;
        state.submitError = "";
        state.networkError = "";
        state.isSuccess = false;
      })
      .addCase(submitMerchantVerification.fulfilled, (state) => {
        state.isSubmitting = false;
        state.isSuccess = true;
      })
      .addCase(submitMerchantVerification.rejected, (state, action) => {
        state.isSubmitting = false;
        state.isSuccess = false;
        const error = action.payload as string;
        state.networkError = error?.includes("Network") ? "Network Error" : "";
        state.submitError = error?.includes("Network") ? "" : error;
      })
      .addCase(fetchBusinesses.pending, (state) => {
        state.isFetchingBusinesses = true;
        state.fetchBusinessesError = "";
      })
      .addCase(fetchBusinesses.fulfilled, (state, action) => {
        state.isFetchingBusinesses = false;
        state.businesses = action.payload.result;
        state.businessesPageNumber = action.payload.pageNumber;
        state.businessesTotalPages = action.payload.totalPages;
        state.businessesTotalCount = action.payload.totalCount;
      })
      .addCase(fetchBusinesses.rejected, (state, action) => {
        state.isFetchingBusinesses = false;
        state.fetchBusinessesError = action.payload as string;
      });
  },
});

export const {
  setCategoryId,
  setAddress,
  setLandmark,
  setCompanyName,
  setCompanyCategory,
  setCacDocuments,
  setUtilityBill,
  addDirector,
  removeDirector,
  updateDirectorField,
  setDirectorIdCard,
  resetMerchantVerification,
} = merchantSlice.actions;

export const merchantReducer = merchantSlice.reducer;
