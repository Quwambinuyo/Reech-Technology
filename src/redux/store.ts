import { configureStore } from "@reduxjs/toolkit";
import { transactionReducer } from "./transaction/reducer";
import { pointReducer } from "./point/reducer";
import { rewardReducer } from "./reward/reducer";

export const store = configureStore({
	reducer: {
		transaction: transactionReducer,
		point: pointReducer,
		reward: rewardReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
