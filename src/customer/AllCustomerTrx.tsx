import { useState } from "react";
import { customerTransactions } from "../mock";
import TabSelector from "../components/TabSelector";
import { tabs } from "./partials";
import TransactionCard from "./partials/TransactionCard";

const AllCustomerTrx = () => {
	const [activeTab, setActiveTab] = useState("All");

	const selectedTransactions = customerTransactions.filter((a) => {
		if (activeTab === "All") {
			return customerTransactions;
		}
		return activeTab.toLowerCase().includes(a.type);
	});

	return (
		<section className="rounded-xl bg-white p-3 lg:p-4 flex flex-col gap-4">
			<h5 className="text-light-black font-medium lg:text-lg">
				All Transactions
			</h5>

			<TabSelector
				options={tabs}
				activeTab={activeTab}
				onSelect={setActiveTab}
			/>
			<div className="overflow-x-auto">
				<div
					className="font-montserrat grid gap-3 font-semibold text-sm px-7 min-w-[1000px]"
					style={{ gridTemplateColumns: "repeat(15, 1fr)" }}
				>
					<p className="col-span-4 xl:pl-5">Product</p>
					<p className="col-span-3">Point Earned</p>
					<p className="col-span-3">Status</p>
					<p className="col-span-3">Date/Time</p>
					<p className="col-span-2">Action</p>
				</div>
				<div className="bg-[#F5F6FF] mt-3 p-4 lg:p-5 xl:px-7 min-h-[250px] min-w-[1000px]">
					<div className="grid gap-8 ">
						{selectedTransactions.map((transaction, i) => (
							<TransactionCard transaction={transaction} key={i} page="all" />
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default AllCustomerTrx;
