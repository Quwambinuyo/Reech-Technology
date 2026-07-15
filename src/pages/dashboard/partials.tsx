import CountUp from "react-countup";
import { HiArrowDownLeft, HiArrowUpRight } from "react-icons/hi2";

interface DashboardCardProps {
  icon: string;
  title: string;
  value: number;
  context?: "point" | "user" | "merchant";
  info?: { percentage: number };
}

export const DashboardCard = ({
  icon,
  title,
  value,
  context,
  info,
}: DashboardCardProps) => {
  return (
    <div className="bg-[#FFFFFFCC] rounded-xl p-4 flex flex-col gap-2 xl:gap-3 min-w-[220px] xl:min-w-[230px]">
      <img src={icon} alt={title} className="w-[38px] xl:w-[40px]" />

      <p className="text-[#797979] capitalize text-sm xl:text-[15px]">
        {title}
      </p>

      <div className="flex gap-1.5 items-end">
        <h4 className="text-[#030649] font-semibold uppercase text-[17px] md:text-lg xl:text-xl">
          <CountUp end={value} duration={2} separator="," preserveValue />
        </h4>

        <p className="text-sm font-normal">
          {context === "point"
            ? "Points"
            : context === "user"
              ? "Users"
              : context === "merchant"
                ? "Merchants"
                : ""}
        </p>
      </div>

      {info && (
        <div className="flex items-center gap-1">
          {info.percentage > 0 ? (
            <HiArrowUpRight color="#1A932E" />
          ) : (
            <HiArrowDownLeft color="red" />
          )}

          <p className="text-[#060606] text-xs">
            {Math.abs(info.percentage)}%{" "}
            {info.percentage > 0 ? "increase" : "decrease"} from last month
          </p>
        </div>
      )}
    </div>
  );
};
