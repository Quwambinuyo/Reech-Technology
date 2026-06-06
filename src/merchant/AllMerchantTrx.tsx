import { useState } from "react";
import { FaQuestion } from "react-icons/fa6";
import { useLocation } from "react-router-dom";

import { merchantTrxTabs } from "../customer/partials";
import TabSelector from "../components/TabSelector";
import { merchantTransactions1, merchantTransactions2 } from "../mock";
import TransactionCard from "./partial/TransactionCard";

const AllMerchantTrx = () => {
	const { state } = useLocation();

	const [activeTab, setActiveTab] = useState(state.filter || "All");

	const selectedTransactions = () => {
		if (activeTab === "All") {
			const allTrx = [...merchantTransactions1, ...[...merchantTransactions2]];
			return allTrx;
		}
		if (activeTab === "Points") {
			return merchantTransactions1;
		}
		return merchantTransactions2;
	};

	return (
		<section className="rounded-xl bg-white p-3 lg:p-4 flex flex-col gap-4">
			<h4 className="text-light-black text-lg flex items-center gap-1">
				Recent Transactions <FaQuestion color="#4A148C" size={15} />
			</h4>

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
							<TransactionCard transaction={transaction} key={i} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default AllMerchantTrx;
