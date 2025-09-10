import { useState } from "react";
import { TbSend } from "react-icons/tb";
import { LuUpload } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { HiArrowUpRight } from "react-icons/hi2";

import TransactionCard from "../../customer/partials/TransactionCard";
import TabSelector from "../../components/TabSelector";
import { customerTransactions } from "../../mock";
import { billLine, wallet } from "../../assets";
import { tabs } from "../../customer/partials";

const MakePayment = () => {
	const navigate = useNavigate();

	const [activeTab, setActiveTab] = useState("All");

	const selectedTransactions = customerTransactions.slice(0, 8).filter((a) => {
		if (activeTab === "All") {
			return customerTransactions.slice(0, 8);
		}
		return activeTab.toLowerCase().includes(a.type);
	});

	return (
		<>
			<section className="flex gap-5">
				<div className="bg-[#FFFFFFCC] flex items-center gap-4 rounded-xl px-4 lg:px-5 py-10 md:py-12 xl:w-[38%]">
					<div className="rounded-full bg-[#F0F1FE] flex-center h-[50px] w-[50px]">
						<img src={wallet} alt="wallet" />
					</div>
					<div className="flex flex-col gap-3">
						<p className="text-[#797979] capitalize text-[15px]">
							point balance
						</p>
						<div className="flex gap-1.5">
							<h4 className="text-[#030649] font-semibold uppercase text-xl lg:text-2xl xl:text-3xl">
								78,000.12
							</h4>
							<p className="text-sm font-normal">Points</p>
						</div>
						<div className="flex items-center gap-1">
							<HiArrowUpRight color="#1A932E" />

							<p className="text-[#060606] text-xs">
								12% increase from last month
							</p>
						</div>
					</div>
				</div>

				<div className="xl:w-[62%] bg-[#FCFCFF] rounded-xl flex items-center px-4 xl:justify-around text-[#4A148C]">
					<div className="payment-action flex-center gap-3 flex-col w-[130px] py-2.5 lg:py-3 rounded-lg">
						<TbSend size={24} />
						<p className="text-[15px] lg:text-base">Send Points</p>
					</div>
					<div className="payment-action flex-center gap-3 flex-col w-[130px] py-2.5 lg:py-3 rounded-lg">
						<img src={billLine} alt="bill" />
						<p className="text-[15px] lg:text-base">Pay Bill</p>
					</div>
					<div className="payment-action flex-center gap-3 flex-col w-[130px] py-2.5 lg:py-3 rounded-lg">
						<LuUpload size={24} />
						<p className="text-[15px] lg:text-base">Withdraw</p>
					</div>
				</div>
			</section>

			<section className="rounded-xl bg-white p-3 lg:p-4 mt-7 flex flex-col gap-4">
				<div className="flex-between">
					<h5 className="text-light-black font-medium lg:text-lg">
						Recent Transactions
					</h5>
					<button
						className="text-sm text-[#4A148C]"
						onClick={() => navigate("/transactions/all")}
					>
						See All
					</button>
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
		</>
	);
};

export default MakePayment;
