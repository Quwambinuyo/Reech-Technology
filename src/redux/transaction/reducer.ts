import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TransactionProps, CustomerTransactionProps } from "../../types";

type AnyTransactionProps = TransactionProps | CustomerTransactionProps;

interface TransactionReducerProps {
  toggleTransactionDetails: AnyTransactionProps | null;
}
const initialState: TransactionReducerProps = {
  toggleTransactionDetails: null,
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
  },
});

export const { onToggleTransactionDetails } = transactionSlice.actions;

export const transactionReducer = transactionSlice.reducer;
