import { LuDot } from "react-icons/lu";

export const StatusDisplay = ({ status }: { status: string }) => {
	return (
		<p
			className={`flex-center font-ibmplex w-[135px] py-2 font-normal pr-2 rounded capitalize ${
				status === "pending"
					? "bg-[#FEEACD] text-[#FFAA2D]"
					: status === "point deducted"
					? "bg-[#FCD9DB] text-[#C81119]"
					: "bg-[#E2F3E3] text-[#48B34C]"
			}`}
		>
			<span>
				<LuDot size={20} />
			</span>
			<span>{status}</span>
		</p>
	);
};
