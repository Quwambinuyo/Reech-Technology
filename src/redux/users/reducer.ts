import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers, fetchUserById, deleteUser } from "./action";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  photo: string | null;
  createdAt: string;
  status: string;
  emailConfirmed: boolean;
  passwordSetupRequired: boolean;
};

export type AdminUserDetails = {
  profile: AdminUser;
  phoneNumber: string | null;
  deletedAt: string | null;
  deletedById: string | null;
  pointBalance: number;
  totalPointsReceived: number;
  totalPointsSpent: number;
  redeemedPoints: number;
  totalTransactions: number;
};

type UserResponse = {
  pageNumber: number;
  result: AdminUser[];
  totalCount: number;
  totalPages: number;
};

interface UserReducerProps {
  fetchUsersLoading: boolean;
  allUsers: UserResponse;
  fetchUsersError: string;
  usersNetworkError: string;
  fetchUserLoading: boolean;
  selectedUser: AdminUserDetails | null;
  fetchUserError: string;
  userNetworkError: string;
  deleteUserLoading: boolean;
  deleteUserSuccess: any;
  deleteUserError: string;
}

const initialState: UserReducerProps = {
  fetchUsersLoading: false,
  allUsers: {
    pageNumber: 1,
    result: [],
    totalCount: 0,
    totalPages: 0,
  },
  fetchUsersError: "",
  usersNetworkError: "",
  fetchUserLoading: false,
  selectedUser: null,
  fetchUserError: "",
  userNetworkError: "",
  deleteUserLoading: false,
  deleteUserSuccess: null,
  deleteUserError: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearSelectedUser(state) {
      state.selectedUser = null;
      state.fetchUserError = "";
      state.userNetworkError = "";
    },
    resetDeleteUserState(state) {
      state.deleteUserLoading = false;
      state.deleteUserSuccess = null;
      state.deleteUserError = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.fetchUsersLoading = true;
        state.usersNetworkError = "";
        state.fetchUsersError = "";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.fetchUsersLoading = false;
        state.allUsers = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.fetchUsersLoading = false;
        const error = action.payload as string;
        state.usersNetworkError = error?.includes("Network")
          ? "Network Error"
          : "";
        state.fetchUsersError = error?.includes("Network") ? "" : error;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.fetchUserLoading = true;
        state.userNetworkError = "";
        state.fetchUserError = "";
        state.selectedUser = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.fetchUserLoading = false;
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.fetchUserLoading = false;
        const error = action.payload as string;
        state.userNetworkError = error?.includes("Network")
          ? "Network Error"
          : "";
        state.fetchUserError = error?.includes("Network") ? "" : error;
      })
      .addCase(deleteUser.pending, (state) => {
        state.deleteUserLoading = true;
        state.deleteUserSuccess = null;
        state.deleteUserError = "";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.deleteUserLoading = false;
        state.deleteUserSuccess = action.payload;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.deleteUserLoading = false;
        const error = action.payload as string;
        state.deleteUserError = error;
      });
  },
});

export const { clearSelectedUser, resetDeleteUserState } = userSlice.actions;
export const userReducer = userSlice.reducer;