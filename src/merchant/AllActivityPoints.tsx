import { FaQuestion } from "react-icons/fa6";

import { onToggleCreateActivityPoint } from "../redux/point/reducer";
import NewActivityPointForm from "./modal/NewActivityPointForm";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import ActivityPointCard from "./partial/ActivityPointCard";
import { MiniCreateButton } from "../components/small";
import { activityBasedPoints } from "../mock";
import Modal from "../layout/Modal";

const AllActivityPoints = () => {
	const dispatch = useAppDispatch();

	const { toggleCreateActivityPoint } = useAppSelector((state) => state.point);

	const onCreateNewActivity = () => dispatch(onToggleCreateActivityPoint());

	return (
		<>
			<Modal modal={toggleCreateActivityPoint}>
				<NewActivityPointForm onClose={onCreateNewActivity} />
			</Modal>

			<div className="bg-[#FFFFFFCC] rounded-2xl py-4 lg:py-5 px-3 lg:px-4">
				<section className="flex-between gap-3">
					<h4 className="text-light-black sm:text-lg flex items-center gap-1">
						Activity Based Points <FaQuestion color="#4A148C" size={15} />
					</h4>

					<MiniCreateButton text="create new" onClick={onCreateNewActivity} />
				</section>

				<section className="mt-5 lg:mt-6 overflow-x-auto">
					<div className="grid grid-cols-10 gap-5 font-montserrat font-semibold text-sm min-w-[800px]">
						<p className="col-span-3">Activity Name</p>
						<p className="col-span-2">Points</p>
						<p className="col-span-3">Description</p>
						<p className="col-span-2">Action</p>
					</div>
					<div className="mt-4">
						{activityBasedPoints.map((act) => (
							<ActivityPointCard act={act} key={act.id} />
						))}
					</div>
				</section>
			</div>
		</>
	);
};

export default AllActivityPoints;
