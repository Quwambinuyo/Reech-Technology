import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TransactionProps } from "../../types";

interface TransactionReducerProps {
	toggleTransactionDetails: TransactionProps | null;
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
				action: PayloadAction<TransactionProps | null | undefined>
			) => {
				state.toggleTransactionDetails = action.payload ?? null;
			},
			prepare: (
				transactionInfo?: TransactionProps | null
			): { payload: TransactionProps | null | undefined } => {
				return { payload: transactionInfo };
			},
		},
	},
});

export const { onToggleTransactionDetails } = transactionSlice.actions;

export const transactionReducer = transactionSlice.reducer;
