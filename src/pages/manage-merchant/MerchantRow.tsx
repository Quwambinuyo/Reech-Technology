import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa6";
import type { AdminMerchant } from "../../redux/merchant/action";
import { MerchantStatusBadge, formatMerchantDate } from "./MerchantHelpers";

const MerchantRow = ({ merchant }: { merchant: AdminMerchant }) => {
	const navigate = useNavigate();

	const view = () => navigate(`/merchants/${merchant.id}`);

	return (
		<div
			className="font-ibmplex font-semibold text-sm lg:text-[14.5px] py-5 odd:bg-[#F5F6FF] min-w-[1000px] px-4 sm:px-5 md:px-6 grid gap-6 items-center"
			style={{ gridTemplateColumns: "repeat(12,1fr)" }}
		>
			<div className="col-span-4 flex items-center gap-3">
				{merchant.logo ? (
					<img
						src={merchant.logo}
						alt={merchant.name}
						className="w-[30px] h-[30px] rounded-full object-cover shrink-0"
					/>
				) : (
					<div className="w-[30px] h-[30px] rounded-full bg-white text-primary-purple flex-center uppercase shrink-0">
						{merchant.name?.charAt(0)}
					</div>
				)}
				<p className="">{merchant.name}</p>
			</div>
			<p className="col-span-3">{formatMerchantDate(merchant.createdAt)}</p>
			<div className="col-span-2">
				<MerchantStatusBadge status={merchant.status} />
			</div>
			<div className="col-span-3 flex justify-end">
				<button
					type="button"
					onClick={view}
					className="px-4 py-1.5 rounded border border-[#4A148C] text-[#4A148C] text-xs font-semibold flex items-center gap-2 transition-colors hover:bg-[#4A148C] hover:text-white"
				>
					<FaEye />
					View
				</button>
			</div>
		</div>
	);
};

export default MerchantRow;