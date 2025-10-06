import { useNavigate } from "react-router-dom";
import { pointBalance, pointSpent, rank, redeemedPoint } from "../assets";
import TabSelector from "../components/TabSelector";
import { DashboardCard } from "../pages/dashboard/partials";
import { useState } from "react";
import { merchantTrxTabs } from "../customer/partials";
import { SeeAllBtn } from "../components/small";
import { FaQuestion } from "react-icons/fa6";
import { merchantTransactions1, merchantTransactions2 } from "../mock";
import TransactionCard from "./partial/TransactionCard";

const MerchantTransactions = () => {
	const navigate = useNavigate();

	const [activeTab, setActiveTab] = useState("All");

	const selectedTransactions = () => {
		if (activeTab === "All") {
			const smallAllTrx = [
				...merchantTransactions1.slice(0, 4),
				...[...merchantTransactions2.slice(0, 4)],
			];
			return smallAllTrx.slice(0, 8);
		}
		if (activeTab === "Points") {
			return merchantTransactions1.slice(0, 8);
		}
		return merchantTransactions2.slice(0, 8);
	};

	return (
		<div className="mt-7">
			<section className="overflow-x-auto hide-scroll">
				<div className="grid grid-cols-4 gap-4 min-w-[1000px]">
					<DashboardCard
						icon={pointBalance}
						title="total customers"
						value="2,300"
						context="user"
						info={{ percentage: 12 }}
					/>
					<DashboardCard
						icon={redeemedPoint}
						title="total transactions"
						value="1200"
						context="point"
						info={{ percentage: -10 }}
					/>
					<DashboardCard
						icon={pointSpent}
						title="total points"
						value="120,000"
						context="point"
						info={{ percentage: 2 }}
					/>
					<DashboardCard
						icon={rank}
						title="total spent rewards"
						value="25"
						context="point"
						info={{ percentage: 8 }}
					/>
				</div>
			</section>

			<section className="rounded-xl bg-white p-3 lg:p-4 mt-7 flex flex-col gap-4">
				<div className="flex-between">
					<h4 className="text-light-black text-lg flex items-center gap-1">
						Recent Transactions <FaQuestion color="#4A148C" size={15} />
					</h4>
					<SeeAllBtn
						onClick={() =>
							navigate("/transactions/all", { state: { filter: activeTab } })
						}
					/>
				</div>
				<TabSelector
					options={merchantTrxTabs}
					activeTab={activeTab}
					onSelect={setActiveTab}
				/>

				<div className="overflow-x-auto mt-4">
					<div
						className="font-montserrat grid gap-3 font-semibold text-sm px-2 min-w-[1000px]"
						style={{ gridTemplateColumns: "repeat(19, 1fr)" }}
					>
						<p className="col-span-4 ml-5">Name</p>
						<p className="col-span-3">Merchants</p>
						<p className="col-span-4 text-center">Date/Time</p>
						<p className="col-span-3 text-center">Point Earned</p>
						<p className={`col-span-3 ${activeTab === "All" ? "" : "pl-5"}`}>
							{activeTab === "Points"
								? "Status"
								: activeTab === "Rewards"
								? "Redeemed"
								: "Status | Redeemed"}
						</p>
						<p className="col-span-2">Action</p>
					</div>
					<div className="px-2 py-4 lg:py-5 lg:px-3 min-h-[250px] min-w-[1000px]">
						<div className="grid gap-2">
							{selectedTransactions().map((transaction, i) => (
								<TransactionCard
									transaction={transaction}
									type={activeTab.toLowerCase()}
									key={i}
								/>
							))}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default MerchantTransactions;
