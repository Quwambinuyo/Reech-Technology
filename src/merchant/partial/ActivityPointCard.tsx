import { ActionButton } from ".";
import type { ActivityBasedProp } from "../../types";

const ActivityPointCard = ({ act }: { act: ActivityBasedProp }) => {
	return (
		<div className="grid gap-5 grid-cols-10 font-ibmplex font-semibold text-sm lg:text-[14.5px] py-5 odd:bg-[#F5F6FF] px-5 md:px-6 xl:px-8 min-w-[800px]">
			<p className="col-span-3 flex items-center">{act.activity}</p>
			<p className="col-span-2 flex items-center">{act.points}</p>
			<p className="col-span-3 flex items-center">{act.description}</p>
			<div className="col-span-2 flex gap-3 lg:gap-4">
				<ActionButton type="edit" />
				<ActionButton type="delete" />
			</div>
		</div>
	);
};

export default ActivityPointCard;
