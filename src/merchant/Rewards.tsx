import { FaQuestion } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { onToggleCreateNewRank } from "../redux/reward/reducer";
import NewRankLevelForm from "./modal/NewRankLevelForm";
import { rankLevelsTable, usersRank } from "../mock";
import RankLevelCard from "./partial/RankLevelCard";
import UserRankCard from "./partial/UserRankCard";
import { SeeAllBtn } from "../components/small";
import Button from "../components/Button";
import Modal from "../layout/Modal";

const RewardsSetting = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const { toggleCreateNewRank } = useAppSelector((state) => state.reward);

	return (
		<>
			<Modal modal={toggleCreateNewRank}>
				<NewRankLevelForm onClose={() => dispatch(onToggleCreateNewRank())} />
			</Modal>

			<section className="bg-[#FFFFFFCC] rounded-2xl py-4 lg:py-5 px-3 lg:px-4">
				<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
					<h4 className="text-light-black text-lg flex items-center gap-1">
						Rank Levels Table <FaQuestion color="#4A148C" size={15} />
					</h4>

					<div className="flex justify-between items-center gap-6 xl:gap-8">
						{/* <SeeAllBtn
							onClick={() => navigate("/rewards-settings/rank-levels")}
						/> */}
						<button className="text-default-red border-1 border-default-red text-inter rounded-xl text-sm px-3 py-2">
							Deactivate all Ranks
						</button>
					</div>
				</div>

				<div className="mt-5 lg:mt-6 overflow-x-auto">
					<div className="sm:px-3 grid grid-cols-6 gap-5 font-montserrat font-semibold text-sm min-w-[800px]">
						<p>Rank Name</p>
						<p>Point Range</p>
						<p className="col-span-2">Benefit Summary</p>
						<p>Color Tag</p>
						<p>Action</p>
					</div>
					<div className="mt-4">
						{rankLevelsTable.slice(0, 5).map((rank) => (
							<RankLevelCard rank={rank} key={rank.id} />
						))}
					</div>
				</div>

				<div className="flex justify-center pt-6 lg:pt-7 lg:pb-2">
					<Button
						text="Create New Rank"
						width="auto"
						onClick={() => dispatch(onToggleCreateNewRank())}
					/>
				</div>
			</section>

			<section className="bg-[#FFFFFFCC] rounded-2xl py-4 lg:py-5 px-3 lg:px-4 mt-6">
				<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
					<h4 className="text-light-black text-lg flex items-center gap-1">
						User Ranks <FaQuestion color="#4A148C" size={15} />
					</h4>

					<SeeAllBtn onClick={() => navigate("/rewards-settings/user-ranks")} />
				</div>

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

export default RewardsSetting;
