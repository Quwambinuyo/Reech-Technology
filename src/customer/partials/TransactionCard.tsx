import moment from "moment";
import type { TransactionProps } from "../../types";
import { StatusDisplay } from "../../components/small";

const TransactionCard = ({
	transaction,
	page,
}: {
	transaction: TransactionProps;
	page?: string;
}) => {
	return (
		<div
			className="grid font-ibmplex font-semibold text-neutral-900 gap-3 text-sm xl:text-[14.5px]"
			style={{ gridTemplateColumns: "repeat(15,1fr)" }}
		>
			<div
				className={`col-span-4 flex items-center gap-3 ${
					page === "all" ? "" : "pl-4"
				}`}
			>
				<img
					src={transaction.company}
					alt={transaction.productType}
					className="w-[29px] xl:w-[30px]"
				/>
				<p className="">{transaction.productType}</p>
			</div>
			<p
				className={`col-span-3 flex items-center ${
					page === "all" ? "" : "pl-4"
				}`}
			>
				{transaction.type === "credit" ? "+" : "-"} {transaction.pointsEarned}{" "}
				Points
			</p>
			<div className={`col-span-3 ${page === "all" ? "" : "pl-4"}`}>
				<StatusDisplay status={transaction.status} />
			</div>
			<p
				className={`col-span-3 flex gap-2 items-center ${
					page === "all" ? "" : "pl-4"
				}`}
			>
				<span>{moment(transaction.date).format("DD/MM/YYYY")}</span>
				<span>{moment(transaction.date).format("h:mm A")}</span>
			</p>
			<button
				className={`text-[#4A148C] border border-[#4A148C] rounded-lg py-2 font-normal text-sm font-inter font-normal col-span-2 ${
					page === "all" ? "" : "mx-3"
				}`}
			>
				Details
			</button>
		</div>
	);
};

export default TransactionCard;
