import { configureStore } from "@reduxjs/toolkit";
import { transactionReducer } from "./transaction/reducer";
import { pointReducer } from "./point/reducer";
import { rewardReducer } from "./reward/reducer";
import { authReducer } from "./auth/authReducer";
import { categoryReducer } from "./category/reducer";
import { merchantVerificationReducer } from "./merchantVerification/reducer";
import { apiKeyReducer } from "./profile/reducer";
import { dashboardReducer } from "./dashboard/reducer";
import { currencyReducer } from "./currency/reducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transaction: transactionReducer,
    point: pointReducer,
    reward: rewardReducer,
    category: categoryReducer,
    merchantVerification: merchantVerificationReducer,
    apiKey: apiKeyReducer,
    dashboard: dashboardReducer,
    currency: currencyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
