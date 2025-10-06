import { LuDot } from "react-icons/lu";

export const StatusDisplay = ({ status }: { status: string }) => {
	return (
		<p
			className={`flex-center font-ibmplex min-w-[135px] py-2 font-normal pr-2 rounded capitalize ${
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

export const SeeAllBtn = ({ onClick }: { onClick: () => void }) => (
	<button className="text-sm text-[#4A148C]" onClick={onClick}>
		See All
	</button>
);

export const MiniCreateButton = ({
	text,
	onClick,
}: {
	text: string;
	onClick: () => void;
}) => (
	<button
		className="bg-[#4A148C] text-sm font-semibold text-[#D9D9D9] rounded-xl p-3.5 capitalize"
		onClick={onClick}
	>
		{text}
	</button>
);
