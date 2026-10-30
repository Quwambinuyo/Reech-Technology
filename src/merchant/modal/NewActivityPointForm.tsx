import { useState } from "react";
import { toast } from "react-toastify";
import { IoCloseCircleOutline } from "react-icons/io5";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { CustomTextInput } from "../../components/CustomInput";
import type { InputEvent } from "../../types";
import Button from "../../components/Button";
import {
  createActivityPoints,
  editActivityPoints,
} from "../../redux/point/action";

type FormProps = {
  onClose: () => void;
  context: "new" | "edit";
};

const NewActivityPointForm = ({ onClose, context }: FormProps) => {
  const dispatch = useAppDispatch();
  const {
    creatActivityPointLoading,
    toggleEditActivityPoint,
    editActivityPointLoading,
    allPointConversions,
    fetchPointConversionsLoading,
  } = useAppSelector((state) => state.point);

  const [rewardType, setRewardType] = useState<number>(
    context === "edit" ? (toggleEditActivityPoint?.rewardType ?? 0) : 0,
  );

  const [form, setForm] = useState({
    activityName:
      context === "edit" ? (toggleEditActivityPoint?.name ?? "") : "",
    numOfPoint:
      context === "edit" && (toggleEditActivityPoint?.rewardType ?? 0) === 0
        ? String(toggleEditActivityPoint?.points ?? "")
        : "",
    percentage:
      context === "edit" && toggleEditActivityPoint?.rewardType === 1
        ? String(toggleEditActivityPoint?.percentage ?? "")
        : "",
    maxPoints:
      context === "edit" && toggleEditActivityPoint?.rewardType === 1
        ? String(toggleEditActivityPoint?.maxPoints ?? "")
        : "",
    description:
      context === "edit" ? (toggleEditActivityPoint?.description ?? "") : "",
  });

  const { activityName, numOfPoint, percentage, maxPoints, description } = form;

  const handleChange = (e: InputEvent) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const isPercentage = rewardType === 1;

  const noConversionRate =
    !fetchPointConversionsLoading && allPointConversions?.result?.length === 0;

  const isOldName =
    toggleEditActivityPoint?.name === activityName &&
    toggleEditActivityPoint?.description === description &&
    (toggleEditActivityPoint?.rewardType ?? 0) === rewardType &&
    (isPercentage
      ? toggleEditActivityPoint?.percentage === Number(percentage) &&
        (toggleEditActivityPoint?.maxPoints ?? null) ===
          (maxPoints === "" ? null : Number(maxPoints))
      : toggleEditActivityPoint?.points === Number(numOfPoint));

  const getIsOldNameEqual = () => {
    if (context === "edit" && isOldName) {
      return true;
    }
    return false;
  };

  const handleCreatePoint = () => {
    if (!isPercentage && Number(numOfPoint) < 0) {
      toast.error("Number of points must not be less than '0' ");
      return;
    }

    const data = isPercentage
      ? {
          name: activityName as string,
          description: description as string,
          rewardType: 1,
          percentage: Number(percentage),
          ...(maxPoints !== "" && { maxPoints: Number(maxPoints) }),
        }
      : {
          name: activityName as string,
          description: description as string,
          rewardType: 0,
          points: Number(numOfPoint) as number,
        };

    if (context === "edit") {
      dispatch(
        editActivityPoints({
          info: data,
          id: toggleEditActivityPoint?.id as string,
        }),
      );
    } else {
      dispatch(createActivityPoints(data));
    }
  };

  const isLoading = creatActivityPointLoading || editActivityPointLoading;

  const toggleClass = (active: boolean) =>
    `flex-1 py-2 text-sm font-semibold transition-colors ${
      active ? "bg-primary-purple text-white" : "bg-white text-primary-purple"
    }`;

  return (
    <div className="bg-white w-11/12 max-w-[500px] lg:max-w-[600px] rounded-xl relative flex flex-col max-h-[90vh]">
      <div className="shrink-0 px-5 lg:px-6 pt-5 lg:pt-6 pb-4">
        <h3 className="text-[#0D0D0D] font-semibold lg:text-lg text-center">
          {context === "edit" ? "Edit" : "Create New"} Activity Based Point
        </h3>
        <button
          className="absolute text-2xl lg:text-3xl top-4 lg:top-5 right-5"
          onClick={onClose}
        >
          <IoCloseCircleOutline />
        </button>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-5 lg:px-6 py-1 grid gap-4 lg:gap-5 content-start">
        <CustomTextInput
          label="Activity Name"
          placeholder="Enter a name for this activity"
          id="activityName"
          value={activityName}
          handleChange={handleChange}
        />

        <div>
          <p className="text-sm font-semibold mb-2">Reward type</p>
          <div className="flex rounded-lg overflow-hidden border border-primary-purple">
            <button
              type="button"
              className={toggleClass(!isPercentage)}
              onClick={() => setRewardType(0)}
            >
              Fixed points
            </button>
            <button
              type="button"
              className={toggleClass(isPercentage)}
              onClick={() => setRewardType(1)}
            >
              % of amount spent
            </button>
          </div>
        </div>

        {isPercentage ? (
          <div className="grid gap-4 lg:gap-5 sm:grid-cols-2">
            <CustomTextInput
              label="Percentage (%)"
              placeholder="e.g. 2.5"
              id="percentage"
              value={percentage}
              handleChange={handleChange}
              type="number"
              min={0}
            />
            <CustomTextInput
              label="Max points (optional)"
              placeholder="e.g. 500"
              id="maxPoints"
              value={maxPoints}
              handleChange={handleChange}
              type="number"
              min={0}
            />
            {noConversionRate && (
              <p className="text-xs text-[#B45309] sm:col-span-2">
                Set your point conversion rate under Point-to-Naira Conversion
                before awarding percentage activities.
              </p>
            )}
          </div>
        ) : (
          <CustomTextInput
            label="Number of Point"
            placeholder="input the number of point for this activity"
            id="numOfPoint"
            value={numOfPoint}
            handleChange={handleChange}
            type="number"
            min={0}
          />
        )}

        <CustomTextInput
          label="Description"
          placeholder="Explain this activity briefly"
          id="description"
          value={description}
          handleChange={handleChange}
        />
      </div>

      <div className="shrink-0 px-5 lg:px-6 pt-4 pb-5 lg:pb-6 border-t border-gray-100">
        <Button
          text={isLoading ? "Submitting..." : "Submit"}
          onClick={handleCreatePoint}
          isDisabled={
            activityName === "" ||
            (isPercentage ? percentage === "" : numOfPoint === "") ||
            description === "" ||
            getIsOldNameEqual()
          }
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default NewActivityPointForm;