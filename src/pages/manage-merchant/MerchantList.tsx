import { ActionButton } from "../../merchant/partial";
import type { AdminMerchantListProps } from "../../types";
import { StatusDisplay } from "../../components/small";
import { useNavigate } from "react-router-dom";

const MerchantList = ({ merchant }: { merchant: AdminMerchantListProps }) => {
	const navigate = useNavigate();

	return (
		<div
			className="font-ibmplex font-semibold text-sm lg:text-[14.5px] py-5 odd:bg-[#F5F6FF] min-w-[1000px] px-4 sm:px-5 md:px-6 grid gap-6"
			style={{ gridTemplateColumns: "repeat(12,1fr)" }}
		>
			<div className="col-span-3 flex items-center gap-3">
				<img
					src={merchant.company.image}
					alt={merchant.company.name}
					className="w-[29px] xl:w-[30px]"
				/>
				<p className="">{merchant.company.name}</p>
			</div>
			<p className="col-span-2 capitalize">
				{merchant.totalUsers.toLocaleString()}
			</p>
			<p className="col-span-2">{merchant.totalPoints.toLocaleString()}</p>
			<div className="col-span-2">
				<StatusDisplay status={merchant.status} />
			</div>
			<div className="col-span-3 flex gap-3 lg:gap-4">
				<ActionButton
					type="edit"
					onClick={() => navigate(`/merchants/${merchant.id}`)}
				/>
				<ActionButton
					type={merchant.status === "active" ? "disable" : "approve"}
				/>
			</div>
		</div>
	);
};

export default MerchantList;
