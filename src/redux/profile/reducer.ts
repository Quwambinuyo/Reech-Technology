import { createSlice } from "@reduxjs/toolkit";
import {
  fetchApiKeys,
  createApiKeys,
  rotateApiKeys,
  revokeApiKeys,
} from "./action";

type ApiKeyResponse = {
  pageNumber: number;
  result: ApiKeyProps[];
  totalCount: number;
  totalPages: number;
};

type ApiKeyProps = {
  id: string;
  name: string;
  maskedKey: string;
  status: string;
  createdAt: string;
};

interface ApiKeyReducerProps {
  fetchApiKeysLoading: boolean;
  allApiKeys: ApiKeyResponse;
  fetchApiKeysError: string;
  apiKeysNetworkError: string;
  createApiKeyLoading: boolean;
  createApiKeySuccess: any;
  createApiKeyError: string;
  rotateApiKeyLoading: boolean;
  rotateApiKeySuccess: any;
  rotateApiKeyError: string;
  revokeApiKeyLoading: boolean;
  revokeApiKeySuccess: any;
  revokeApiKeyError: string;
}

const initialState: ApiKeyReducerProps = {
  fetchApiKeysLoading: false,
  allApiKeys: {
    pageNumber: 1,
    result: [],
    totalCount: 0,
    totalPages: 0,
  },
  fetchApiKeysError: "",
  apiKeysNetworkError: "",
  createApiKeyLoading: false,
  createApiKeySuccess: null,
  createApiKeyError: "",
  rotateApiKeyLoading: false,
  rotateApiKeySuccess: null,
  rotateApiKeyError: "",
  revokeApiKeyLoading: false,
  revokeApiKeySuccess: null,
  revokeApiKeyError: "",
};

const apiKeySlice = createSlice({
  name: "apiKey",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchApiKeys.pending, (state) => {
        state.fetchApiKeysLoading = true;
        state.apiKeysNetworkError = "";
        state.createApiKeySuccess = null;
        state.rotateApiKeySuccess = null;
        state.revokeApiKeySuccess = null;
      })
      .addCase(fetchApiKeys.fulfilled, (state, action) => {
        state.fetchApiKeysLoading = false;
        state.allApiKeys = action.payload;
      })
      .addCase(fetchApiKeys.rejected, (state, action) => {
        state.fetchApiKeysLoading = false;
        const error = action.payload as string;
        state.apiKeysNetworkError = error?.includes("Network")
          ? "Network Error"
          : "";
        state.fetchApiKeysError = error?.includes("Network") ? "" : error;
      })
      .addCase(createApiKeys.pending, (state) => {
        state.createApiKeyLoading = true;
        state.createApiKeyError = "";
      })
      .addCase(createApiKeys.fulfilled, (state, action) => {
        state.createApiKeyLoading = false;
        state.createApiKeySuccess = action.payload;
      })
      .addCase(createApiKeys.rejected, (state, action) => {
        state.createApiKeyLoading = false;
        const error = action.payload as string;
        state.createApiKeyError = error;
      })
      .addCase(rotateApiKeys.pending, (state) => {
        state.rotateApiKeyLoading = true;
        state.rotateApiKeyError = "";
      })
      .addCase(rotateApiKeys.fulfilled, (state, action) => {
        state.rotateApiKeyLoading = false;
        state.rotateApiKeySuccess = action.payload;
      })
      .addCase(rotateApiKeys.rejected, (state, action) => {
        state.rotateApiKeyLoading = false;
        const error = action.payload as string;
        state.rotateApiKeyError = error;
      })
      .addCase(revokeApiKeys.pending, (state) => {
        state.revokeApiKeyLoading = true;
        state.revokeApiKeyError = "";
      })
      .addCase(revokeApiKeys.fulfilled, (state, action) => {
        state.revokeApiKeyLoading = false;
        state.revokeApiKeySuccess = action.payload;
      })
      .addCase(revokeApiKeys.rejected, (state, action) => {
        state.revokeApiKeyLoading = false;
        const error = action.payload as string;
        state.revokeApiKeyError = error;
      });
  },
});

export const apiKeyReducer = apiKeySlice.reducer;
