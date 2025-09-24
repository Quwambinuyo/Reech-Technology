import { HiArrowDownLeft, HiArrowUpRight } from "react-icons/hi2";

interface DashboardCard {
	icon: string;
	title: string;
	value: string;
	context?: "point" | "user" | "";
	info?: { percentage: number };
}

export const DashboardCard = ({
	icon,
	title,
	value,
	context,
	info,
}: DashboardCard) => {
	return (
		<div className="bg-[#FFFFFFCC] rounded-xl p-4 flex flex-col gap-2 xl:gap-3 min-w-[220px] xl:min-w-[230px]">
			<img src={icon} alt={title} className="w-[38px] xl:w-[40px]" />
			<p className="text-[#797979] capitalize text-[15px] xl:text-base">
				{title}
			</p>
			<div className="flex gap-1.5">
				<h4 className="text-[#030649] font-semibold uppercase text-[17px] md:text-lg xl:text-xl">
					{value}
				</h4>
				<p className="text-sm font-normal">
					{context === "point" ? "Points" : context === "user" ? "Users" : ""}
				</p>
			</div>
			{info?.percentage && (
				<div className="flex items-center gap-1">
					{info.percentage > 0 ? (
						<HiArrowUpRight color="#1A932E" />
					) : (
						<HiArrowDownLeft color="red" />
					)}

					<p className="text-[#060606] text-xs">
						{info?.percentage}% {info?.percentage > 0 ? "increase" : "decrease"}{" "}
						from last month
					</p>
				</div>
			)}
		</div>
	);
};
