export type TransactionProps = {
	id: number;
	company: string;
	status: "pending" | "successful" | "point deducted";
	type: string;
	productType: string;
	pointsEarned: number;
	date: string;
};
