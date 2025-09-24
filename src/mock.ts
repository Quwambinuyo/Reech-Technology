import mtn from "./assets/mtn.png";
import shoprite from "./assets/shoprite.png";
import bonusrank from "./assets/bonus-rank.png";
import oraimo from "./assets/oraimo.png";
import type { TransactionProps } from "./types";

export const customerTransactions: TransactionProps[] = [
	{
		id: 1,
		productType: "Purchase at Shoprite",
		pointsEarned: 200,
		type: "credit",
		status: "pending",
		date: "2025-09-03T10:39:45",
		company: shoprite,
	},
	{
		id: 2,
		productType: "Bonus Rank Upgrade",
		pointsEarned: 200,
		type: "credit",
		status: "pending",
		date: "2025-09-03T10:39:45",
		company: bonusrank,
	},
	{
		id: 3,
		productType: "Purchase at Oraimo Store",
		pointsEarned: 200,
		type: "credit",
		status: "successful",
		date: "2025-09-03T10:39:45",
		company: oraimo,
	},
	{
		id: 4,
		productType: "Purchase Data with point",
		pointsEarned: 200,
		type: "debit",
		status: "point deducted",
		date: "2025-09-03T10:39:45",
		company: mtn,
	},
	{
		id: 5,
		productType: "Purchase at Shoprite",
		pointsEarned: 200,
		type: "credit",
		status: "pending",
		date: "2025-09-03T10:39:45",
		company: shoprite,
	},
	{
		id: 6,
		productType: "Bonus Rank Upgrade",
		pointsEarned: 200,
		type: "credit",
		status: "pending",
		date: "2025-09-03T10:39:45",
		company: bonusrank,
	},
	{
		id: 7,
		productType: "Purchase at Oraimo Store",
		pointsEarned: 200,
		type: "credit",
		status: "successful",
		date: "2025-09-03T10:39:45",
		company: oraimo,
	},
	{
		id: 8,
		productType: "Purchase Data with point",
		pointsEarned: 200,
		type: "debit",
		status: "point deducted",
		date: "2025-09-03T10:39:45",
		company: mtn,
	},
	{
		id: 9,
		productType: "Purchase at Shoprite",
		pointsEarned: 200,
		type: "credit",
		status: "pending",
		date: "2025-09-03T10:39:45",
		company: shoprite,
	},
	{
		id: 10,
		productType: "Purchase Data with point",
		pointsEarned: 200,
		type: "debit",
		status: "point deducted",
		date: "2025-09-03T10:39:45",
		company: mtn,
	},
];

export const activityBasedPoints = [
	{
		id: 1,
		activity: "Fund Transfer",
		points: 10,
		description: "For every successful transaction",
	},
	{
		id: 2,
		activity: "Fund Transfer",
		points: 10,
		description: "For every successful transaction",
	},
	{
		id: 3,
		activity: "Fund Transfer",
		points: 10,
		description: "For every successful transaction",
	},
	{
		id: 4,
		activity: "Fund Transfer",
		points: 10,
		description: "For every successful transaction",
	},
	{
		id: 5,
		activity: "Fund Transfer",
		points: 10,
		description: "For every successful transaction",
	},
	{
		id: 6,
		activity: "Fund Transfer",
		points: 10,
		description: "For every successful transaction",
	},
	{
		id: 7,
		activity: "Fund Transfer",
		points: 10,
		description: "For every successful transaction",
	},
	{
		id: 8,
		activity: "Fund Transfer",
		points: 10,
		description: "For every successful transaction",
	},
	{
		id: 9,
		activity: "Fund Transfer",
		points: 10,
		description: "For every successful transaction",
	},
	{
		id: 10,
		activity: "Fund Transfer",
		points: 10,
		description: "For every successful transaction",
	},
];

export const pointToNaira = [
	{ id: 1, points: 10 },
	{ id: 2, points: 20 },
	{ id: 3, points: 30 },
	{ id: 4, points: 40 },
	{ id: 5, points: 10 },
	{ id: 6, points: 20 },
	{ id: 7, points: 30 },
	{ id: 9, points: 40 },
	{ id: 9, points: 10 },
	{ id: 10, points: 20 },
];
