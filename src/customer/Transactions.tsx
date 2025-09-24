import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { pointBalance, pointSpent, redeemedPoint, rank } from "../assets";
import { DashboardCard } from "../pages/dashboard/partials";
import TransactionCard from "./partials/TransactionCard";
import TabSelector from "../components/TabSelector";
import { customerTransactions } from "../mock";
import { tabs } from "./partials";
import { SeeAllBtn } from "../components/small";

const CustomerTransactions = () => {
	const navigate = useNavigate();

	const [activeTab, setActiveTab] = useState("All");

	const selectedTransactions = customerTransactions.slice(0, 8).filter((a) => {
		if (activeTab === "All") {
			return customerTransactions.slice(0, 8);
		}
		return activeTab.toLowerCase().includes(a.type);
	});

	return (
		<div className="mt-7">
			<section className="overflow-x-auto hide-scroll">
				<div className="grid grid-cols-4 gap-4 min-w-[1000px]">
					<DashboardCard
						icon={pointBalance}
						title="point balance"
						value="78,000.12"
						context="point"
						info={{ percentage: 12 }}
					/>
					<DashboardCard
						icon={pointSpent}
						title="total points spent"
						value="20,400"
						context="point"
						// info={{ percentage: 12 }}
					/>
					<DashboardCard
						icon={redeemedPoint}
						title="total transactions"
						value="207"
						info={{ percentage: 2 }}
					/>
					<DashboardCard icon={rank} title="pending transactions" value="12" />
				</div>
			</section>

			<section className="rounded-xl bg-white p-3 lg:p-4 mt-7 flex flex-col gap-4">
				<div className="flex-between">
					<h5 className="text-light-black font-medium lg:text-lg">
						Recent Transactions
					</h5>
					<SeeAllBtn onClick={() => navigate("/transactions/all")} />
				</div>
				<TabSelector
					options={tabs}
					activeTab={activeTab}
					onSelect={setActiveTab}
				/>
				<div className="overflow-x-auto">
					<div
						className="font-montserrat grid gap-3 font-semibold text-sm px-2 min-w-[1000px]"
						style={{ gridTemplateColumns: "repeat(15, 1fr)" }}
					>
						<p className="col-span-4 ml-5">Product</p>
						<p className="col-span-3">Point Earned</p>
						<p className="col-span-3">Status</p>
						<p className="col-span-3">Date/Time</p>
						<p className="col-span-2">Action</p>
					</div>
					<div className="bg-[#F5F6FF] mt-3 px-2 py-4 lg:py-5 lg:px-3 min-h-[250px] min-w-[1000px]">
						<div className="grid gap-8 ">
							{selectedTransactions.map((transaction, i) => (
								<TransactionCard transaction={transaction} key={i} />
							))}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default CustomerTransactions;
