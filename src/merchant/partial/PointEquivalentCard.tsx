import { ActionButton } from ".";
import type { PointEquivalentProp } from "../../types";

const PointEquivalentCard = ({
	pointEqui,
}: {
	pointEqui: PointEquivalentProp;
}) => {
	const constant = 5;

	return (
		<div className="gap-5 font-ibmplex font-semibold text-sm lg:text-[14.5px] py-5 odd:bg-[#F5F6FF] px-8 grid grid-cols-12">
			<p className="col-span-3 flex items-center">{pointEqui.points}</p>
			<p className="col-span-2"></p>
			<p className="col-span-2 flex-center">{pointEqui.points / constant}</p>
			<p className="col-span-2"></p>
			<div className="col-span-3 flex gap-4">
				<ActionButton type="edit" />
				<ActionButton type="delete" />
			</div>
		</div>
	);
};

export default PointEquivalentCard;
