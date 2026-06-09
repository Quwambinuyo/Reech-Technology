import { IoCloseCircleOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import type { UserProps } from "../../types";
import RankPill from "./RankPill";
import Logo from "../../assets/logo-s.png";

interface RankProps {
  id: number;
  customer: UserProps;
  rank: string;
  totalPoints: number;
}

interface RankDetailCardProps {
  user: RankProps;
  onClose: () => void;
}

const rankConfig: Record<
  string,
  {
    nextRank: string;
    currentRankMin: number;
    nextRankMin: number;
    privileges: string[];
  }
> = {
  bronze: {
    nextRank: "Silver",
    currentRankMin: 0,
    nextRankMin: 100,
    privileges: [
      "5% more points on all transfers",
      "Standard customer support",
      "Access to basic Fintech tools",
      "Monthly activity summary",
    ],
  },
  silver: {
    nextRank: "Gold",
    currentRankMin: 100,
    nextRankMin: 200,
    privileges: [
      "8% more points on all transfers",
      "Priority customer support",
      "Reduced withdrawal fees (save 1%)",
      "Early access to select Fintech tools",
    ],
  },
  gold: {
    nextRank: "Platinum",
    currentRankMin: 0,
    nextRankMin: 400,
    privileges: [
      "10% more points on all transfers",
      "Priority 24/7 customer support",
      "Reduced withdrawal fees (save 2.5%)",
      "Exclusive early access to Fintech tools",
    ],
  },
  platinum: {
    nextRank: "Diamond",
    currentRankMin: 400,
    nextRankMin: 700,
    privileges: [
      "15% more points on all transfers",
      "Dedicated account manager",
      "Zero withdrawal fees",
      "VIP access to all Fintech tools",
    ],
  },
  diamond: {
    nextRank: "Legend",
    currentRankMin: 700,
    nextRankMin: 1200,
    privileges: [
      "20% more points on all transfers",
      "Concierge 24/7 support",
      "Zero withdrawal & transaction fees",
      "First access to all new products",
    ],
  },
};

const RankDetailCard = ({ user, onClose }: RankDetailCardProps) => {
  const rankKey = user.rank.toLowerCase();
  const config = rankConfig[rankKey] ?? rankConfig["gold"];

  const earned = Math.max(user.totalPoints - config.currentRankMin, 0);
  const rangeSize = config.nextRankMin - config.currentRankMin;
  const progressPercent = Math.min(Math.round((earned / rangeSize) * 100), 100);
  const pointsToNextRank = Math.max(config.nextRankMin - user.totalPoints, 0);

  return (
    <div className="bg-white rounded-2xl w-full max-w-[460px] md:max-w-[600px] lg:max-w-[650px] mx-auto overflow-hidden shadow-xl border border-dashed border-[#D0D0F0]">
      <div className="flex justify-between items-center px-4 sm:px-5 lg:px-6 xl:px-7 pt-4 pb-3">
        <p className="font-montserrat font-semibold text-sm text-light-black">
          User Rank Details
        </p>
        <button className="text-2xl lg:text-3xl" onClick={onClose}>
          <IoCloseCircleOutline />
        </button>
      </div>

      <div className="flex flex-col items-center px-4 sm:px-5 lg:px-6 xl:px-7 pt-5 pb-4">
        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#E8E8FF] mb-3">
          {user.customer.avatarUrl ? (
            <img
              src={user.customer.avatarUrl}
              alt={user.customer.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-xl">
              {user.customer.name.charAt(0)}
            </div>
          )}
        </div>

        <h3 className="font-montserrat font-bold text-light-black text-base leading-tight">
          {user.customer.name}
        </h3>
        <p className="text-gray-400 text-xs font-ibmplex mt-0.5">
          {user.customer.email}
        </p>

        <div className="flex items-center gap-2.5 mt-3">
          <RankPill rank={user.rank} size="lg" />
          <span className="text-gray-300 font-light text-lg select-none">
            |
          </span>
          <span className="font-ibmplex font-bold text-2xl text-light-black">
            {user.totalPoints}
            <span className="text-xs font-semibold text-gray-400 ml-1">
              points
            </span>
          </span>
        </div>
      </div>

      <div className="border-t border-dashed border-[#E0E0FF] mx-4 sm:mx-5 lg:mx-6 xl:mx-7" />

      <div className="px-4 sm:px-5 lg:px-6 xl:px-7 py-4">
        <div className="flex justify-between items-center mb-2">
          <p className="font-montserrat font-semibold text-xs text-light-black">
            Rank Progress
          </p>
          <p className="text-xs font-ibmplex font-semibold text-[#4A148C]">
            {progressPercent}% to {config.nextRank}
          </p>
        </div>

        <div className="h-2 bg-[#F0F0FF] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 bg-[#7542BB]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <p className="text-xs text-gray-400 font-ibmplex mt-2">
          Points to Next Rank:{" "}
          <span className="font-semibold text-light-black">
            {pointsToNextRank}
          </span>
        </p>
      </div>

      <div className="border-t border-dashed border-[#E0E0FF] mx-4 sm:mx-5 lg:mx-6 xl:mx-7" />

      <div className="px-4 sm:px-5 lg:px-6 xl:px-7 py-4">
        <p className="font-montserrat font-bold text-xs text-light-black uppercase tracking-wide mb-3">
          {user.rank.toUpperCase()} RANK PRIVILEGES
        </p>

        <ul className="space-y-2.5">
          {config.privileges.map((privilege, index) => (
            <li key={index} className="flex items-start gap-2.5">
              <span className="mt-0.5 flex-shrink-0 w-3.5 h-3.5 rounded-full bg-[#4A148C] flex items-center justify-center">
                <FaCheck size={7} color="white" />
              </span>
              <span className="text-xs font-ibmplex text-[#3D3D3D] leading-relaxed">
                {privilege}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-center items-center py-3">
        <div className="flex items-center">
          <img src={Logo} alt="logo" className="w-[40px]" />
          <span className="font-poppins font-medium text-[#000000] -ml-1">
            reech
          </span>
        </div>
      </div>
    </div>
  );
};

export default RankDetailCard;
