export type TransactionProps = {
	id: number;
	company: string;
	status: "pending" | "successful" | "point deducted";
	type: string;
	productType: string;
	pointsEarned: number;
	date: string;
};

export type CountryProps = {
	code: string;
	currency: string;
	currency_code: string;
	currency_symbol: string;
	dial_code: string;
	flag: string;
	local_name: string;
	name: string;
};

export type UserRole = "customer" | "merchant";

export type ActivityBasedProp = {
	id: number;
	activity: string;
	points: number;
	description: string;
};

export type PointEquivalentProp = { id: number; points: number };
