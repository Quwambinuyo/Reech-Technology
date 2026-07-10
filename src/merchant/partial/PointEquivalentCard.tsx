import { ActionButton } from ".";
import { useAppDispatch } from "../../redux/hooks";
import type { PointEquivalentProp } from "../../types";
import { onToggleEditPointConversion } from "../../redux/point/reducer";

const PointEquivalentCard = ({
  pointEqui,
}: {
  pointEqui: PointEquivalentProp;
}) => {
  const dispatch = useAppDispatch();
  // const constant = 5;

  return (
    <div className="gap-5 font-ibmplex font-semibold text-sm lg:text-[14.5px] py-5 odd:bg-[#F5F6FF] px-8 grid grid-cols-10 min-w-[700px]">
      <p className="col-span-3 flex items-center">{pointEqui?.amount}</p>
      <p className="col-span-4 flex-center">{pointEqui.points}</p>
      <div className="col-span-3 flex justify-end gap-3 lg:gap-4">
        <ActionButton
          type="edit"
          width="w-[140px]"
          onClick={() => dispatch(onToggleEditPointConversion(pointEqui))}
        />
        {/* <ActionButton type="delete" /> */}
      </div>
    </div>
  );
};

export default PointEquivalentCard;
