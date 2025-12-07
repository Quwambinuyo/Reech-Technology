import { LuDot } from "react-icons/lu";
import { range } from "../utils";

export const StatusDisplay = ({ status }: { status: string }) => {
	return (
		<p
			className={`flex-center font-ibmplex min-w-[135px] py-2 font-normal pr-2 rounded capitalize ${
				status === "pending"
					? "bg-[#FEEACD] text-[#FFAA2D]"
					: status === "point deducted"
					? "bg-[#FCD9DB] text-default-red"
					: status === "declined"
					? "bg-[#FCD9DB] text-default-red"
					: "bg-[#E2F3E3] text-[#48B34C]"
			}`}
		>
			<span>
				<LuDot size={20} />
			</span>
			<span>{status}</span>
		</p>
	);
};

export const SeeAllBtn = ({ onClick }: { onClick: () => void }) => (
	<button className="text-sm text-[#4A148C]" onClick={onClick}>
		See All
	</button>
);

export const MiniCreateButton = ({
	text,
	onClick,
}: {
	text: string;
	onClick: () => void;
}) => (
	<button
		className="bg-[#4A148C] text-sm font-semibold text-[#D9D9D9] rounded-xl p-3.5 capitalize"
		onClick={onClick}
	>
		{text}
	</button>
);

interface ChartLabelProps {
	text: string;
	color: string;
	value?: string | number;
}
export const ChartLabel = ({ text, color }: ChartLabelProps) => (
	<div className="flex items-center gap-1 sm:gap-1.5">
		<p style={{ background: color }} className="w-2.5 h-2.5 rounded-full"></p>
		<p className="text-xs text-black capitalize font-medium">{text}</p>
	</div>
);

export const DoughnutChartLabel = ({ text, color, value }: ChartLabelProps) => (
	<div className="flex flex-col gap-0.5">
		<h5 className="font-semibold text-lg" style={{ color }}>
			{value}
		</h5>
		<p className="text-xs text-[#797979] capitalize font-medium">{text}</p>
	</div>
);

function Separator(props: any) {
	return (
		<div
			style={{
				position: "absolute",
				height: "120%",
				transform: `rotate(${props.startOffset + props.turns}turn)`,
			}}
			className={`top-11 ${
				props.isNumber === 100
					? "left-[46%]"
					: props.isNumber === "0"
					? "left-[49%]"
					: props.isNumber === 25
					? "left-[47%]"
					: "left-[50%]"
			}`}
		>
			{props.isNumber ? (
				<p
					className={`text-[12.5px] ${
						props.isNumber > 51
							? "rotate-[-90deg]"
							: props.isNumber === "0"
							? "rotate-[-180deg]"
							: "rotate-[90deg]"
					}`}
				>
					{String(props.isNumber)}
				</p>
			) : (
				<div style={props.style} />
			)}
		</div>
	);
}

export function RadialSeparators(props: any) {
	const specialIndices = [0, 12, 25, 38, 49]; // your special ticks
	const turns = 0.51 / props.count;

	return range(0, props.count).map((index) => {
		let label: string | number | false = false;

		// Case 1: first separator → "0"
		if (index === 0) {
			label = "0";
		}
		// Case 2: separator index is in your array
		else if (specialIndices.includes(index)) {
			label =
				index * 2 === 24
					? 25
					: index * 2 === 76
					? 75
					: index * 2 === 98
					? 100
					: index * 2; // your scaling logic
		}

		return (
			<Separator
				key={index}
				turns={index * turns}
				style={props.style}
				startOffset={0.75}
				isNumber={label}
				index={index}
			/>
		);
	});
}
