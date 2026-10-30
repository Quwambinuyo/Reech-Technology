import { FaRegCopy } from "react-icons/fa";
import { toast } from "react-toastify";
import { ActionButton } from ".";
import { useAppDispatch } from "../../redux/hooks";
import type { ActivityPointProps } from "../../types";
import { getRewardText } from "./rewardText";
import {
  onToggleAwardActivityPoint,
  onToggleDeleteActivityPoint,
  onToggleEditActivityPoint,
} from "../../redux/point/reducer";

const ActivityPointCard = ({ act }: { act: ActivityPointProps }) => {
  const dispatch = useAppDispatch();

  const onCopyId = () => {
    navigator.clipboard
      .writeText(act.id)
      .then(() => toast.success("Activity ID copied"))
      .catch(() => toast.error("Could not copy the activity ID"));
  };

  return (
    <div className="grid gap-5 grid-cols-12 items-center font-ibmplex font-semibold text-sm lg:text-[14.5px] py-5 odd:bg-[#F5F6FF] px-5 md:px-6 xl:px-8 min-w-[1000px]">
      <p className="col-span-2 break-words">{act.name}</p>
      <div className="col-span-2">
        <span className="inline-block rounded-full bg-primary-purple/10 text-primary-purple px-3 py-1 text-xs lg:text-[13px] whitespace-nowrap">
          {getRewardText(act)}
        </span>
      </div>
      <p className="col-span-3 break-words font-medium text-gray-700">
        {act.description}
      </p>
      <div className="col-span-2">
        <button
          type="button"
          onClick={onCopyId}
          title="Copy activity ID"
          className="flex items-center gap-1.5 text-primary-purple whitespace-nowrap hover:opacity-80"
        >
          <FaRegCopy size={14} /> Copy
        </button>
      </div>
      <div className="col-span-3 flex items-center gap-2 lg:gap-3">
        <button
          type="button"
          onClick={() => dispatch(onToggleAwardActivityPoint(act))}
          className="h-[34px] px-4 rounded-lg bg-primary-purple text-white text-sm font-medium hover:opacity-90"
        >
          Award
        </button>
        <ActionButton
          type="edit"
          onClick={() => dispatch(onToggleEditActivityPoint(act))}
        />
        <ActionButton
          type="delete"
          onClick={() => dispatch(onToggleDeleteActivityPoint(act.id))}
        />
      </div>
    </div>
  );
};

export default ActivityPointCard;