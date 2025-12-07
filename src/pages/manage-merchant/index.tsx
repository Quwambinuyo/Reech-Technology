import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TabSelector from "../../components/TabSelector";
import { MiniCreateButton } from "../../components/small";
import { MerchantStatusSelect } from "../../admin/partial";
import { mockMerchantLists } from "../../mock";
import MerchantList from "./MerchantList";
import { FaQuestion } from "react-icons/fa6";

const ManageMerchants = () => {
	const navigate = useNavigate();

	const [filterMerchants, setFilterMerchants] = useState({
		value: "All",
		toggle: false,
	});

	const onSelectClick = (value: string) => {
		setFilterMerchants((prev) => ({
			...prev,
			value,
			toggle: !filterMerchants.toggle,
		}));
	};

	const selectedMerchants = mockMerchantLists.filter((a) => {
		if (filterMerchants.value === "All") {
			return mockMerchantLists.slice(0, 8);
		}

		return filterMerchants.value.toLowerCase().includes(a.status);
	});

	return (
		<>
			<section className="rounded-xl bg-white p-4 lg:p-5 mt-2 flex flex-col gap-4">
				<div className="flex-between">
					<MerchantStatusSelect
						selectedText={`${filterMerchants.value} Merchants`}
						isOpen={filterMerchants.toggle}
						onToggle={() =>
							setFilterMerchants((prev) => ({
								...prev,
								toggle: !filterMerchants.toggle,
							}))
						}
						handleSelect={onSelectClick}
					/>

					<div className="flex gap-5 items-center">
						<button
							className="text-sm text-[#4A148C]"
							onClick={() => navigate("")}
						>
							See All
						</button>
						<MiniCreateButton text="create new" onClick={() => {}} />
					</div>
				</div>

				<div className="mt-5 lg:mt-6 overflow-x-auto">
					<div
						className="gap-6 font-montserrat font-semibold text-sm grid px-1 min-w-[1000px]"
						style={{ gridTemplateColumns: "repeat(12,1fr)" }}
					>
						<p className="col-span-3">Merchant Name</p>
						<p className="col-span-2">Total Users</p>
						<p className="col-span-2">Total Points</p>
						<p className="col-span-2">Status</p>
						<p className="col-span-3 text-center">Action</p>
					</div>
					<div className="mt-4">
						{selectedMerchants.slice(0, 6).map((act) => (
							<MerchantList merchant={act} key={act.id} />
						))}
					</div>
				</div>
			</section>

			<section className="rounded-xl bg-white p-4 lg:p-5 mt-6 flex flex-col gap-4">
				<div className="flex-between">
					<h4 className="text-light-black sm:text-lg flex items-center gap-1">
						Redemption Merchants <FaQuestion color="#4A148C" size={15} />
					</h4>

					<div className="flex gap-5 items-center">
						<button
							className="text-sm text-[#4A148C]"
							onClick={() => navigate("")}
						>
							See All
						</button>
						<MiniCreateButton text="create new" onClick={() => {}} />
					</div>
				</div>

				<div className="mt-5 lg:mt-6 overflow-x-auto">
					<div
						className="gap-6 font-montserrat font-semibold text-sm grid px-1 min-w-[1000px]"
						style={{ gridTemplateColumns: "repeat(12,1fr)" }}
					>
						<p className="col-span-3">Merchant Name</p>
						<p className="col-span-2">Total Users</p>
						<p className="col-span-2">Total Points</p>
						<p className="col-span-2">Status</p>
						<p className="col-span-3 text-center">Action</p>
					</div>
					<div className="mt-4">
						{mockMerchantLists.slice(0, 6).map((act) => (
							<MerchantList merchant={act} key={act.id} />
						))}
					</div>
				</div>
			</section>
		</>
	);
};

export default ManageMerchants;
