import { useEffect, useRef, useState } from "react";
import { FaInfoCircle, FaRegCopy } from "react-icons/fa";
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
  const rewardText = getRewardText(act);

  const pillRef = useRef<HTMLSpanElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  // Only show the info icon when the pill text is actually cut off
  useEffect(() => {
    const check = () => {
      const el = pillRef.current;
      if (el) setIsTruncated(el.scrollWidth > el.clientWidth);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [rewardText]);

  const onCopyId = () => {
    navigator.clipboard
      .writeText(act.id)
      .then(() => toast.success("Activity ID copied"))
      .catch(() => toast.error("Could not copy the activity ID"));
  };

  return (
    <div className="grid gap-5 grid-cols-12 items-center font-ibmplex font-semibold text-sm lg:text-[14.5px] py-5 odd:bg-[#F5F6FF] px-5 md:px-6 xl:px-8 min-w-[1000px]">
      <p className="col-span-2 break-words">{act.name}</p>

      <div className="col-span-2 min-w-0 flex items-center gap-1.5">
        <span
          ref={pillRef}
          className="block min-w-0 truncate rounded-full bg-primary-purple/10 text-primary-purple px-3 py-1 text-xs lg:text-[13px]"
        >
          {rewardText}
        </span>

        {isTruncated && (
          <span className="relative group shrink-0">
            <button
              type="button"
              aria-label="Show full reward"
              className="flex items-center text-primary-purple hover:opacity-80 focus:outline-none"
            >
              <FaInfoCircle size={14} />
            </button>

         <span
  role="tooltip"
  className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-max max-w-[220px] -translate-x-1/2 rounded-lg bg-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
>
  <span className="relative block rounded-lg bg-primary-purple/10 px-3 py-2 text-xs font-medium leading-snug text-primary-purple">
    {rewardText}
  </span>

  {/* arrow */}
  <span className="absolute left-1/2 top-full -mt-1 h-2 w-2 -translate-x-1/2 rotate-45 bg-white">
    <span className="absolute inset-0 bg-primary-purple/10" />
  </span>
</span>
          </span>
        )}
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