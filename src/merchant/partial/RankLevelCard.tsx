import { ActionButton } from ".";

interface RankProps {
	id: number;
	rankName: string;
	colorTag: string;
	pointRange: { min: number; max: number };
	benfitSummary: string;
}

const RankLevelCard = ({ rank }: { rank: RankProps }) => {
	return (
		<div className="grid gap-5 grid-cols-6 font-ibmplex font-semibold text-sm lg:text-[14.5px] py-5 odd:bg-[#F5F6FF] px-5 md:px-6 xl:px-8 min-w-[800px]">
			<p className="capitalize flex items-center">{rank.rankName}</p>
			<p className="flex items-center">
				{rank.pointRange.min} - {rank.pointRange.max}
			</p>
			<p className="col-span-2 flex items-center">{rank.benfitSummary}</p>
			<div className="pl-6 flex items-center">
				<div
					className="w-5 h-5 rounded-full"
					style={{ background: rank.colorTag }}
				></div>
			</div>
			<div className="flex gap-3 lg:gap-4">
				<ActionButton type="edit" />
				<ActionButton type="delete" />
			</div>
		</div>
	);
};

export default RankLevelCard;
