import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  TransactionProps,
  CustomerTransactionProps,
  MerchantTransactionCardProps,
} from "../../types";

type AnyTransactionProps = TransactionProps | CustomerTransactionProps;

interface TransactionReducerProps {
  toggleTransactionDetails: AnyTransactionProps | null;
  toggleMerchantTransactionDetails: MerchantTransactionCardProps | null;
}

const initialState: TransactionReducerProps = {
  toggleTransactionDetails: null,
  toggleMerchantTransactionDetails: null,
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    onToggleTransactionDetails: {
      reducer: (
        state,
        action: PayloadAction<AnyTransactionProps | null | undefined>,
      ) => {
        state.toggleTransactionDetails = action.payload ?? null;
      },
      prepare: (
        transactionInfo?: AnyTransactionProps | null,
      ): { payload: AnyTransactionProps | null | undefined } => {
        return { payload: transactionInfo };
      },
    },
    onToggleMerchantTransactionDetails: {
      reducer: (
        state,
        action: PayloadAction<MerchantTransactionCardProps | null | undefined>,
      ) => {
        state.toggleMerchantTransactionDetails = action.payload ?? null;
      },
      prepare: (
        transactionInfo?: MerchantTransactionCardProps | null,
      ): { payload: MerchantTransactionCardProps | null | undefined } => {
        return { payload: transactionInfo };
      },
    },
  },
});

export const {
  onToggleTransactionDetails,
  onToggleMerchantTransactionDetails,
} = transactionSlice.actions;

export const transactionReducer = transactionSlice.reducer;