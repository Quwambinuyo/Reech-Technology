import moment from "moment";
import { customerImg } from "../../assets";
import { StatusDisplay } from "../../components/small";

type MerchantTrxProps = {
	customer: {
		name: string;
		email: string;
		avatarUrl: string;
	};
	merchant: string;
	date: string;
	pointsEarned: number;
	status?: string;
	redeemed?: string;
	id: number;
};

type TransactionCardProps = {
	type: string;
	transaction: MerchantTrxProps;
};

const TransactionCard = ({ type, transaction }: TransactionCardProps) => {
	return (
		<div
			className="grid grid font-ibmplex font-semibold text-neutral-900 gap-4 text-sm xl:text-[14.5px] odd:bg-[#F5F6FF] p-4"
			style={{ gridTemplateColumns: "repeat(19, 1fr)" }}
		>
			<div className="col-span-4 flex items-center gap-2">
				<img
					src={customerImg}
					alt="person"
					className="rounded-full w-[28px] h-[28px]"
				/>
				<div className="flex flex-col gap-0.5">
					<p className="font-semibold">{transaction.customer.name}</p>
					<p className="text-[#A3A3A3] text-xs">{transaction.customer.email}</p>
				</div>
			</div>
			<p className="col-span-3 flex items-center">{transaction.merchant}</p>
			<p className="col-span-4 flex-center gap-2 text-sm">
				<span>{moment(transaction.date).format("DD/MM/YYYY")}</span>
				<span>{moment(transaction.date).format("h:mm A")}</span>
			</p>
			<p className="col-span-3 flex-center">
				{transaction.pointsEarned} points
			</p>
			<p className="col-span-3 text-center">
				{transaction.status ? (
					<StatusDisplay status={transaction.status} />
				) : (
					transaction.redeemed
				)}
			</p>
			<div className="col-span-2">
				<button className="text-[#4A148C] border border-[#4A148C] rounded-lg py-2 font-normal text-sm font-inter font-normal w-full">
					Details
				</button>
			</div>
		</div>
	);
};

export default TransactionCard;
