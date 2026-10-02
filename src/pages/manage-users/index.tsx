import { FaQuestion } from "react-icons/fa6";
import { pointBalance, pointSpent, rank, redeemedPoint } from "../../assets";
import { MiniDropDown } from "../../components/CustomSelect";
import { DashboardCard } from "../dashboard/partials";
import { usersRank } from "../../mock";
import UserRankCard from "../../merchant/partial/UserRankCard";

const ManageUsers = () => {
	return (
		<>
			<section className="flex-between">
				<h4 className="text-xl text-[#060606] font-medium">Overview</h4>
				<MiniDropDown />
			</section>

			<section className="overflow-x-auto hide-scroll mt-7">
				<div className="grid grid-cols-4 gap-4 min-w-[1000px]">
					<DashboardCard
						icon={pointBalance}
						title="total customers"
						value={2300}
						context="user"
						info={{ percentage: 12 }}
					/>
					<DashboardCard
						icon={redeemedPoint}
						title="total transactions"
						value={1200}
						context="user"
						info={{ percentage: -10 }}
					/>
					<DashboardCard
						icon={rank}
						title="total spent rewards"
						value={25}
						context="point"
						info={{ percentage: 8 }}
					/>
					<DashboardCard
						icon={pointSpent}
						title="total points"
						value={120000}
						context="point"
						info={{ percentage: 2 }}
					/>
				</div>
			</section>

			<section className="rounded-xl bg-white p-3 lg:p-4 mt-7 flex flex-col gap-4">
				<h4 className="text-light-black sm:text-lg flex items-center gap-1">
					User Ranks <FaQuestion color="#4A148C" size={15} />
				</h4>

				<div className="mt-5 lg:mt-6 overflow-x-auto">
					<div className="px-4 sm:px-5 md:px-6 lg:px-8 gap-5 font-montserrat font-semibold text-sm min-w-[800px] grid grid-cols-8">
						<p className="col-span-3">Name</p>
						<p className="col-span-2">Rank</p>
						<p className="col-span-2">Total Points</p>
						<p className="col-span-1">Action</p>
					</div>
					<div className="mt-4">
						{usersRank.slice(0, 6).map((user) => (
							<UserRankCard user={user} key={user.id} />
						))}
					</div>
				</div>
			</section>
		</>
	);
};

export default ManageUsers;