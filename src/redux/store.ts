import { configureStore } from "@reduxjs/toolkit";
import { transactionReducer } from "./transaction/reducer";
import { pointReducer } from "./point/reducer";

export const store = configureStore({
	reducer: {
		transaction: transactionReducer,
		point: pointReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
