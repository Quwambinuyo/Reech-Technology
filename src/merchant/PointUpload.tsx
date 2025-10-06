import { FaQuestion } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import {
	onToggleCreateActivityPoint,
	onToggleCreatePointConversion,
} from "../redux/point/reducer";
import { MiniCreateButton, SeeAllBtn } from "../components/small";
import PointEquivalentCard from "./partial/PointEquivalentCard";
import { activityBasedPoints, pointToNaira } from "../mock";
import ActivityPointCard from "./partial/ActivityPointCard";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Modal from "../layout/Modal";
import NewActivityPointForm from "./modal/NewActivityPointForm";
import NewPointConversionForm from "./modal/NewPointConversionForm";

const PointUpload = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { toggleCreateActivityPoint, toggleCreatePointConversion } =
		useAppSelector((state) => state.point);

	const onCreateNewActivity = () => dispatch(onToggleCreateActivityPoint());
	const onCreateNewConversion = () => dispatch(onToggleCreatePointConversion());

	return (
		<>
			<Modal modal={toggleCreateActivityPoint}>
				<NewActivityPointForm onClose={onCreateNewActivity} />
			</Modal>

			<Modal modal={toggleCreatePointConversion}>
				<NewPointConversionForm onClose={onCreateNewConversion} />
			</Modal>

			<section className="bg-[#FFFFFFCC] rounded-2xl py-4 lg:py-5 px-3 lg:px-4">
				<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
					<h4 className="text-light-black text-lg flex items-center gap-1">
						Activity Based Points <FaQuestion color="#4A148C" size={15} />
					</h4>

					<div className="flex justify-between items-center gap-6 xl:gap-8">
						<SeeAllBtn
							onClick={() => navigate("/upload-points/activity-based")}
						/>
						<MiniCreateButton text="create new" onClick={onCreateNewActivity} />
					</div>
				</div>

				<div className="mt-5 lg:mt-6 overflow-x-auto">
					<div className="grid grid-cols-10 gap-5 font-montserrat font-semibold text-sm min-w-[800px]">
						<p className="col-span-3">Activity Name</p>
						<p className="col-span-2">Points</p>
						<p className="col-span-3">Description</p>
						<p className="col-span-2">Action</p>
					</div>
					<div className="mt-4">
						{activityBasedPoints.slice(0, 6).map((act) => (
							<ActivityPointCard act={act} key={act.id} />
						))}
					</div>
				</div>
			</section>

			<section className="bg-[#FFFFFFCC] rounded-2xl py-4 lg:py-5 px-3 lg:px-4 mt-6">
				<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
					<h4 className="text-light-black text-lg flex items-center gap-1">
						Point-to-Naira Conversion <FaQuestion color="#4A148C" size={15} />
					</h4>
					<div className="flex justify-between items-center gap-6 xl:gap-8">
						<SeeAllBtn
							onClick={() => navigate("/upload-points/point-conversion")}
						/>
						<MiniCreateButton
							text="create new"
							onClick={onCreateNewConversion}
						/>
					</div>
				</div>

				<div className="mt-5 lg:mt-6 overflow-x-auto">
					<div className="gap-5 font-montserrat font-semibold text-sm grid grid-cols-10 px-5 md:px-6 xl:px-8 min-w-[700px]">
						<p className="col-span-3">Points Required</p>
						<p className="col-span-4 flex-center">Equivalent in ₦</p>
						<p className="col-span-3 text-center">Action</p>
					</div>
					<div className="mt-4">
						{pointToNaira.slice(0, 6).map((act) => (
							<PointEquivalentCard pointEqui={act} key={act.id} />
						))}
					</div>
				</div>
			</section>
		</>
	);
};

export default PointUpload;
