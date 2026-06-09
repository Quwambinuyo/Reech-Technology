import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  createActivityPoints,
  deleteActivityPoints,
  editActivityPoints,
  fetchActivityPoints,
  fetchPointConversions,
  createPointConversions,
  editPointConversions,
  deletePointConversions,
} from "./action";
import type { ActivityPointProps, PointEquivalentProp } from "../../types";

type ActivityPointResponse = {
  pageNumber: number;
  result: ActivityPointProps[];
  totalCount: number;
  totalPages: number;
};

type PointConversionResponse = {
  pageNumber: number;
  result: PointEquivalentProp[];
  totalCount: number;
  totalPages: number;
};

interface PointReducerProps {
  toggleCreateActivityPoint: boolean;
  toggleCreatePointConversion: boolean;
  fetchActivityPointsLoading: boolean;
  fetchPointConversionsLoading: boolean;
  allActivityPoints: ActivityPointResponse;
  allPointConversions: PointConversionResponse;
  fetchActivityPointsError: string;
  pointsNetworkError: string;
  creatActivityPointLoading: boolean;
  createActivityPointSuccesss: any;
  creatActivityPointError: string;
  toggleEditActivityPoint: ActivityPointProps | null;
  editActivityPointLoading: boolean;
  editActivityPointSuccess: any;
  editActivityPointError: string;
  toggleDeleteActivityPoint: string;
  deleteActivityPointLoading: boolean;
  deleteActivityPointSuccess: any;
  deleteActivityPointError: string;
  toggleEditPointConversion: PointEquivalentProp | null;
  toggleDeletePointConversion: string;
  createPointConversionLoading: boolean;
  createPointConversionSuccess: any;
  createPointConversionError: string;
  editPointConversionLoading: boolean;
  editPointConversionSuccess: any;
  editPointConversionError: string;
  deletePointConversionLoading: boolean;
  deletePointConversionSuccess: any;
  deletePointConversionError: string;
}

const initialState: PointReducerProps = {
  toggleCreateActivityPoint: false,
  toggleCreatePointConversion: false,
  fetchActivityPointsLoading: false,
  fetchPointConversionsLoading: false,
  allActivityPoints: {
    pageNumber: 1,
    result: [],
    totalCount: 0,
    totalPages: 0,
  },
  allPointConversions: {
    pageNumber: 1,
    result: [],
    totalCount: 0,
    totalPages: 0,
  },
  fetchActivityPointsError: "",
  pointsNetworkError: "",
  creatActivityPointLoading: false,
  createActivityPointSuccesss: null,
  creatActivityPointError: "",
  toggleEditActivityPoint: null,
  editActivityPointLoading: false,
  editActivityPointSuccess: null,
  editActivityPointError: "",
  toggleDeleteActivityPoint: "",
  deleteActivityPointLoading: false,
  deleteActivityPointSuccess: null,
  deleteActivityPointError: "",
  toggleEditPointConversion: null,
  toggleDeletePointConversion: "",
  createPointConversionLoading: false,
  createPointConversionSuccess: null,
  createPointConversionError: "",
  editPointConversionLoading: false,
  editPointConversionSuccess: null,
  editPointConversionError: "",
  deletePointConversionLoading: false,
  deletePointConversionSuccess: null,
  deletePointConversionError: "",
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
    onToggleEditActivityPoint: {
      reducer: (
        state,
        action: PayloadAction<ActivityPointProps | null | undefined>,
      ) => {
        state.toggleEditActivityPoint = action.payload ?? null;
      },
      prepare: (
        categoryInfo?: ActivityPointProps | null,
      ): { payload: ActivityPointProps | null | undefined } => {
        return { payload: categoryInfo };
      },
    },
    onToggleDeleteActivityPoint: (state, action) => {
      state.toggleDeleteActivityPoint = action.payload || "";
    },
    onToggleEditPointConversion: {
      reducer: (
        state,
        action: PayloadAction<PointEquivalentProp | null | undefined>,
      ) => {
        state.toggleEditPointConversion = action.payload ?? null;
      },
      prepare: (
        info?: PointEquivalentProp | null,
      ): { payload: PointEquivalentProp | null | undefined } => {
        return { payload: info };
      },
    },
    onToggleDeletePointConversion: (state, action) => {
      state.toggleDeletePointConversion = action.payload || "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchActivityPoints.pending, (state) => {
        state.fetchActivityPointsLoading = true;
        state.pointsNetworkError = "";
        state.createActivityPointSuccesss = null;
        state.editActivityPointSuccess = null;
        state.deleteActivityPointSuccess = null;
      })
      .addCase(fetchActivityPoints.fulfilled, (state, action) => {
        state.fetchActivityPointsLoading = false;
        state.allActivityPoints = action.payload;
      })
      .addCase(fetchActivityPoints.rejected, (state, action) => {
        state.fetchActivityPointsLoading = false;
        const error = action.payload as string;
        state.pointsNetworkError = error?.includes("Network")
          ? "Network Error"
          : "";
        state.fetchActivityPointsError = error?.includes("Network")
          ? ""
          : error;
      })
      .addCase(createActivityPoints.pending, (state) => {
        state.creatActivityPointLoading = true;
        state.creatActivityPointError = "";
      })
      .addCase(createActivityPoints.fulfilled, (state, action) => {
        state.creatActivityPointLoading = false;
        state.createActivityPointSuccesss = action.payload;
        state.toggleCreateActivityPoint = false;
      })
      .addCase(createActivityPoints.rejected, (state, action) => {
        state.creatActivityPointLoading = false;
        const error = action.payload as string;
        state.creatActivityPointError = error;
      })
      .addCase(editActivityPoints.pending, (state) => {
        state.editActivityPointLoading = true;
        state.editActivityPointError = "";
      })
      .addCase(editActivityPoints.fulfilled, (state, action) => {
        state.editActivityPointLoading = false;
        state.editActivityPointSuccess = action.payload;
        state.toggleEditActivityPoint = null;
      })
      .addCase(editActivityPoints.rejected, (state, action) => {
        state.editActivityPointLoading = false;
        const error = action.payload as string;
        state.editActivityPointError = error;
      })
      .addCase(deleteActivityPoints.pending, (state) => {
        state.deleteActivityPointLoading = true;
        state.deleteActivityPointError = "";
      })
      .addCase(deleteActivityPoints.fulfilled, (state, action) => {
        state.deleteActivityPointLoading = false;
        state.deleteActivityPointSuccess = action.payload;
        state.toggleDeleteActivityPoint = "";
      })
      .addCase(deleteActivityPoints.rejected, (state, action) => {
        state.deleteActivityPointLoading = false;
        const error = action.payload as string;
        state.deleteActivityPointError = error;
      })
      .addCase(fetchPointConversions.pending, (state) => {
        state.fetchPointConversionsLoading = true;
        state.pointsNetworkError = "";
        state.createPointConversionSuccess = null;
        state.editPointConversionSuccess = null;
        state.deletePointConversionSuccess = null;
      })
      .addCase(fetchPointConversions.fulfilled, (state, action) => {
        state.fetchPointConversionsLoading = false;
        state.allPointConversions = action.payload;
      })
      .addCase(fetchPointConversions.rejected, (state, action) => {
        state.fetchPointConversionsLoading = false;
        const error = action.payload as string;
        state.pointsNetworkError = error?.includes("Network")
          ? "Network Error"
          : "";
      })
      .addCase(createPointConversions.pending, (state) => {
        state.createPointConversionLoading = true;
        state.createPointConversionError = "";
      })
      .addCase(createPointConversions.fulfilled, (state, action) => {
        state.createPointConversionLoading = false;
        state.createPointConversionSuccess = action.payload;
        state.toggleCreatePointConversion = false;
      })
      .addCase(createPointConversions.rejected, (state, action) => {
        state.createPointConversionLoading = false;
        const error = action.payload as string;
        state.createPointConversionError = error;
      })
      .addCase(editPointConversions.pending, (state) => {
        state.editPointConversionLoading = true;
        state.editPointConversionError = "";
      })
      .addCase(editPointConversions.fulfilled, (state, action) => {
        state.editPointConversionLoading = false;
        state.editPointConversionSuccess = action.payload;
        state.toggleEditPointConversion = null;
      })
      .addCase(editPointConversions.rejected, (state, action) => {
        state.editPointConversionLoading = false;
        const error = action.payload as string;
        state.editPointConversionError = error;
      })
      .addCase(deletePointConversions.pending, (state) => {
        state.deletePointConversionLoading = true;
        state.deletePointConversionError = "";
      })
      .addCase(deletePointConversions.fulfilled, (state, action) => {
        state.deletePointConversionLoading = false;
        state.deletePointConversionSuccess = action.payload;
        state.toggleDeletePointConversion = "";
      })
      .addCase(deletePointConversions.rejected, (state, action) => {
        state.deletePointConversionLoading = false;
        const error = action.payload as string;
        state.deletePointConversionError = error;
      });
  },
});

export const {
  onToggleCreateActivityPoint,
  onToggleCreatePointConversion,
  onToggleEditActivityPoint,
  onToggleDeleteActivityPoint,
  onToggleEditPointConversion,
  onToggleDeletePointConversion,
} = pointSlice.actions;

export const pointReducer = pointSlice.reducer;
