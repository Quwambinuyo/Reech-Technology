import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  createActivityPoints,
  deleteActivityPoints,
  editActivityPoints,
  fetchActivityPoints,
} from "./action";
import type { ActivityPointProps, PointEquivalentProp } from "../../types";

type ActivityPointResponse = {
  pageNumber: number;
  result: ActivityPointProps[];
  totalCount: number;
  totalPages: number;
};

interface PointReducerProps {
  toggleCreateActivityPoint: boolean;
  toggleCreatePointConversion: boolean;
  fetchActivityPointsLoading: boolean;
  allActivityPoints: ActivityPointResponse;
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
}

const initialState: PointReducerProps = {
  toggleCreateActivityPoint: false,
  toggleCreatePointConversion: false,
  fetchActivityPointsLoading: false,
  allActivityPoints: {
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
      });
  },
});

export const {
  onToggleCreateActivityPoint,
  onToggleCreatePointConversion,
  onToggleEditActivityPoint,
  onToggleDeleteActivityPoint,
  onToggleEditPointConversion,
} = pointSlice.actions;

export const pointReducer = pointSlice.reducer;
