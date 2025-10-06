import { FaQuestion } from "react-icons/fa6";

import { onToggleCreatePointConversion } from "../redux/point/reducer";
import NewPointConversionForm from "./modal/NewPointConversionForm";
import PointEquivalentCard from "./partial/PointEquivalentCard";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { MiniCreateButton } from "../components/small";
import { pointToNaira } from "../mock";
import Modal from "../layout/Modal";

const AllConversionPoints = () => {
	const dispatch = useAppDispatch();

	const { toggleCreatePointConversion } = useAppSelector(
		(state) => state.point
	);

	const onCreateNewConversion = () => dispatch(onToggleCreatePointConversion());

	return (
		<>
			<Modal modal={toggleCreatePointConversion}>
				<NewPointConversionForm onClose={onCreateNewConversion} />
			</Modal>

			<div className="bg-[#FFFFFFCC] rounded-2xl py-4 lg:py-5 px-3 lg:px-4">
				<section className="flex-between gap-3">
					<h4 className="text-light-black sm:text-lg flex items-center gap-1">
						Point-to-Naira Conversion <FaQuestion color="#4A148C" size={15} />
					</h4>

					<MiniCreateButton text="create new" onClick={onCreateNewConversion} />
				</section>

				<section className="mt-5 lg:mt-6 overflow-x-auto">
					<div className="gap-5 font-montserrat font-semibold text-sm grid grid-cols-10 px-5 md:px-6 xl:px-8 min-w-[700px]">
						<p className="col-span-3">Points Required</p>
						<p className="col-span-4 flex-center">Equivalent in ₦</p>
						<p className="col-span-3 text-center">Action</p>
					</div>
					<div className="mt-4">
						{pointToNaira.map((act) => (
							<PointEquivalentCard pointEqui={act} key={act.id} />
						))}
					</div>
				</section>
			</div>
		</>
	);
};

export default AllConversionPoints;
