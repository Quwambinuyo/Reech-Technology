import { FaQuestion } from "react-icons/fa6";
import { usersRank } from "../mock";
import UserRankCard from "./partial/UserRankCard";

const AllUserRanks = () => {
	return (
		<div className="bg-[#FFFFFFCC] rounded-2xl py-4 lg:py-5 px-3 lg:px-4">
			<section className="flex-between gap-3">
				<h4 className="text-light-black sm:text-lg flex items-center gap-1">
					User Ranks <FaQuestion color="#4A148C" size={15} />
				</h4>
			</section>

			<section className="mt-5 lg:mt-6 overflow-x-auto">
				<div className="px-4 sm:px-5 md:px-6 lg:px-8 gap-5 font-montserrat font-semibold text-sm min-w-[800px] grid grid-cols-8">
					<p className="col-span-3">Name</p>
					<p className="col-span-2">Rank</p>
					<p className="col-span-2">Total Points</p>
					<p className="col-span-1">Action</p>
				</div>
				<div className="mt-4">
					{usersRank.map((user) => (
						<UserRankCard user={user} key={user.id} />
					))}
				</div>
			</section>
		</div>
	);
};

export default AllUserRanks;
