import { createSlice } from "@reduxjs/toolkit";
import {
	createHolderAccount,
	fetchCountries,
	userAccountLogin,
} from "./authActions";
import type { StateType } from "./authTypes";
import { getUserFromStorage } from "../../utils";

const initialState: StateType = {
	createAccountLoading: false,
	createAccountSuccess: null,
	createAccountError: "",
	countriesLoading: false,
	allCountries: [],
	countriesError: "",
	authNetworkError: "",
	currentUser: getUserFromStorage(),
	loginLoading: false,
	loginError: "",
	landingPageHamburgerToggle: false,
	toggleMobileSidebar: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		onClearAccountCreationSuccess: (state) => {
			state.createAccountSuccess = null;
		},
		onToggleLandingHamburger: (state) => {
			state.landingPageHamburgerToggle = !state.landingPageHamburgerToggle;
		},
		onToggleMobileSidebar: (state) => {
			state.toggleMobileSidebar = !state.toggleMobileSidebar;
		},
	},
	extraReducers(builders) {
		builders
			.addCase(createHolderAccount.pending, (state) => {
				state.createAccountLoading = true;
				state.createAccountError = "";
			})
			.addCase(createHolderAccount.fulfilled, (state, action) => {
				state.createAccountLoading = false;
				state.createAccountSuccess = action.payload;
			})
			.addCase(createHolderAccount.rejected, (state, action) => {
				state.createAccountLoading = false;
				state.createAccountError = action.error as string;
			})
			.addCase(userAccountLogin.pending, (state) => {
				state.loginLoading = true;
				state.loginError = "";
			})
			.addCase(userAccountLogin.fulfilled, (state, action) => {
				state.loginLoading = false;
				state.currentUser = action.payload;
			})
			.addCase(userAccountLogin.rejected, (state, action) => {
				state.loginLoading = false;
				state.loginError = action.error as string;
			})
			.addCase(fetchCountries.pending, (state) => {
				state.countriesLoading = true;
				state.countriesError = "";
			})
			.addCase(fetchCountries.fulfilled, (state, action) => {
				state.countriesLoading = false;
				state.allCountries = action.payload;
			})
			.addCase(fetchCountries.rejected, (state, action) => {
				state.countriesLoading = false;
				const error = action.payload as string;

				state.authNetworkError = error?.includes("Network")
					? "Network Error"
					: "";
				state.countriesError = error?.includes("Network") ? "" : error;
			});
	},
});

export const {
	onClearAccountCreationSuccess,
	onToggleLandingHamburger,
	onToggleMobileSidebar,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
