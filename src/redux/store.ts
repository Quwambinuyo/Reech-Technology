import { configureStore } from "@reduxjs/toolkit";
import { transactionReducer } from "./transaction/reducer";
import { pointReducer } from "./point/reducer";
import { rewardReducer } from "./reward/reducer";
import { authReducer } from "./auth/authReducer";
import { categoryReducer } from "./category/reducer";
import { merchantReducer } from "./merchant/reducer";
import { apiKeyReducer } from "./profile/reducer";
import { dashboardReducer } from "./dashboard/reducer";
import { currencyReducer } from "./currency/reducer";
import { walletReducer } from "./wallet/reducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transaction: transactionReducer,
    point: pointReducer,
    reward: rewardReducer,
    category: categoryReducer,
    merchant: merchantReducer,
    apiKey: apiKeyReducer,
    dashboard: dashboardReducer,
    currency: currencyReducer,
    wallet: walletReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
