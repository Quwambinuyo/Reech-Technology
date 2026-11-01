import { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoCheckmarkCircle } from "react-icons/io5";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { awardActivityPoints } from "../../redux/point/action";
import { onToggleAwardActivityPoint } from "../../redux/point/reducer";
import { getRewardText } from "../partial/rewardText";
import { CustomTextInput } from "../../components/CustomInput";
import type { InputEvent } from "../../types";
import Button from "../../components/Button";

type AwardResult = {
  pointsAwarded: number;
  activityName: string;
  reference: string;
  email: string;
};

const AwardActivityPointForm = () => {
  const dispatch = useAppDispatch();
  const {
    toggleAwardActivityPoint: act,
    awardActivityPointLoading,
    allPointConversions,
  } = useAppSelector((state) => state.point);

  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState(() => crypto.randomUUID());
  const [result, setResult] = useState<AwardResult | null>(null);

  if (!act) return null;

  const isPercentage = act.rewardType === 1;
  const noConversionRate = allPointConversions?.result?.length === 0;
  const canSubmit =
    !awardActivityPointLoading &&
    email.trim() !== "" &&
    (!isPercentage || Number(amount) > 0);

  const onClose = () => dispatch(onToggleAwardActivityPoint(null));

  const onSubmit = async () => {
    if (!canSubmit) return;
    const info: { email: string; amount?: number; reference: string } = {
      email: email.trim(),
      reference,
    };
    if (amount !== "") info.amount = Number(amount);

    try {
      const data = await dispatch(
        awardActivityPoints({ id: act.id, info }),
      ).unwrap();
      setResult({
        pointsAwarded: data.pointsAwarded,
        activityName: data.activityName,
        reference: data.reference,
        email: email.trim(),
      });
      setEmail("");
      setAmount("");
      setReference(crypto.randomUUID());
    } catch {
      return;
    }
  };

  return (
    <div className="bg-white w-11/12 max-w-[500px] rounded-xl relative flex flex-col max-h-[90vh]">
      <div className="shrink-0 px-5 lg:px-6 pt-5 lg:pt-6 pb-4 text-center">
        <h3 className="text-[#0D0D0D] font-semibold lg:text-lg">
          Award "{act.name}"
        </h3>
        <p className="text-sm text-gray-500 mt-1">{getRewardText(act)}</p>
        <button
          type="button"
          className="absolute text-2xl lg:text-3xl top-4 lg:top-5 right-5"
          onClick={onClose}
        >
          <IoCloseCircleOutline />
        </button>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-5 lg:px-6 py-1 grid gap-4 lg:gap-5 content-start">
        {result && (
          <div className="flex items-start gap-3 rounded-xl border border-[#D9EFE2] bg-[#F3FBF6] p-4">
            <IoCheckmarkCircle className="text-[#1B7F4B] text-2xl shrink-0" />
            <div className="min-w-0">
              <p className="text-base font-semibold text-[#1B7F4B]">
                {result.pointsAwarded} points awarded
              </p>
              <p className="text-sm text-gray-600 mt-0.5 break-words">
                to {result.email} for "{result.activityName}"
              </p>
              <p className="text-xs text-gray-500 mt-1.5">
                Reference: {result.reference.slice(0, 8)}…
              </p>
            </div>
          </div>
        )}

        <div>
          <CustomTextInput
            label="Customer Email"
            placeholder="ada@example.com"
            id="email"
            value={email}
            handleChange={(e: InputEvent) => setEmail(e.target.value)}
            type="email"
          />
          <p className="text-xs text-gray-500 mt-2">
            If they don't have a Reech account, we create one and email them to
            set a password.
          </p>
        </div>

        {isPercentage && (
          <div>
            <CustomTextInput
              label="Amount Spent (₦)"
              placeholder="e.g. 5000"
              id="amount"
              value={amount}
              handleChange={(e: InputEvent) => setAmount(e.target.value)}
              type="number"
              min={0}
            />
            {noConversionRate && (
              <p className="text-xs text-[#B45309] mt-2">
                Set your point conversion rate under Point-to-Naira Conversion
                before awarding percentage activities.
              </p>
            )}
          </div>
        )}
      </div>

      <div className="shrink-0 px-5 lg:px-6 pt-4 pb-5 lg:pb-6 border-t border-gray-100 mt-4">
        <Button
          text={awardActivityPointLoading ? "Awarding..." : "Award points"}
          onClick={onSubmit}
          isDisabled={!canSubmit}
          isLoading={awardActivityPointLoading}
        />
      </div>
    </div>
  );
};

export default AwardActivityPointForm;