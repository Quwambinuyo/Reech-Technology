import { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import Logo from "../../../assets/logo-s.png";
import StepBar from "./StepBar";
import { CustomTextInput } from "../../../components/CustomInput";
import type { Merchant, Step } from "./types";
import { CURRENT_BALANCE, EXCHANGE_RATE } from "./types";

interface Props {
  onClose: () => void;
  merchant: Merchant;
  onBack: () => void;
  onNext: (points: number) => void;
}

const AmountStep = ({ onClose, merchant, onBack, onNext }: Props) => {
  const [points, setPoints] = useState("");

  const ptsNum = points ? parseFloat(points) : 0;
  const equivalent = ptsNum * EXCHANGE_RATE;
  const remaining = CURRENT_BALANCE - ptsNum;
  const isValid = ptsNum > 0 && ptsNum <= CURRENT_BALANCE;

  return (
    <div className="bg-white rounded-2xl w-full max-w-[506px] md:max-w-[606px] mx-auto shadow-xl overflow-hidden border border-dashed border-[#D0D0F0]">
      <div className="px-5 pt-5 pb-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-montserrat font-bold text-[#0D0D0D] text-lg">
              Send Points
            </h3>
            <p className="text-gray-400 text-[12px] font-ibmplex mt-0.5">
              How many points do you want to send to{" "}
              <span className="font-semibold text-[#0D0D0D]">
                {merchant.name}
              </span>
              ?
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-2xl text-black hover:text-gray-600 transition-colors"
          >
            <IoCloseCircleOutline />
          </button>
        </div>

        <StepBar current={2 as Step} />

        <CustomTextInput
          id="points"
          label="Amount in Points"
          type="number"
          placeholder="0"
          value={points}
          handleChange={(e) => setPoints(e.target.value)}
          otherInputProps={{ min: 0, max: CURRENT_BALANCE }}
        />

        <div className="mt-4 flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-ibmplex text-gray-400 uppercase tracking-wider">
              Equivalent Value
            </p>
            <p className="text-[11px] font-ibmplex text-gray-400 uppercase tracking-wider">
              Current Rate
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[22px] font-montserrat font-bold text-[#0D0D0D]">
              ₦
              {equivalent.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
            </p>
            <p className="text-xs font-ibmplex text-[#4A148C] font-semibold">
              1 pt = ₦1
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-start gap-2.5 bg-[#EEF0FF] rounded-lg px-3.5 py-3">
          <HiOutlineInformationCircle
            size={16}
            className="text-[#4A148C] mt-0.5 shrink-0"
          />
          <p className="text-[12px] font-ibmplex text-[#3D3D6B] leading-relaxed">
            Your current balance is{" "}
            <span className="font-bold">
              {CURRENT_BALANCE.toLocaleString()} pts
            </span>
            {ptsNum > 0 && (
              <>
                . Remaining balance after transfer:{" "}
                <span
                  className={
                    remaining < 0 ? "text-red-500 font-bold" : "font-bold"
                  }
                >
                  {remaining.toLocaleString()} pts
                </span>
              </>
            )}
            {ptsNum === 0 && "."}
          </p>
        </div>

        {ptsNum > CURRENT_BALANCE && (
          <p className="mt-2 text-xs text-red-500 font-ibmplex">
            Insufficient balance.
          </p>
        )}

        <div className="flex gap-3 mt-6">
          <button
            onClick={onBack}
            className="flex-1 border border-[#4A148C] text-[#4A148C] font-montserrat font-semibold rounded-4xl py-3.5 text-sm"
          >
            Back
          </button>
          <button
            onClick={() => isValid && onNext(ptsNum)}
            disabled={!isValid}
            className="flex-1 bg-[#4A148C] disabled:opacity-40 disabled:cursor-not-allowed text-white font-montserrat font-semibold rounded-4xl py-3.5 text-sm"
          >
            Review & Confirm
          </button>
        </div>
      </div>

      <div className="flex justify-center items-center py-3 border-t border-gray-100">
        <div className="flex items-center">
          <img src={Logo} alt="logo" className="w-[40px]" />
          <span className="font-poppins font-medium text-[#000000] -ml-1 text-sm">
            reech
          </span>
        </div>
      </div>
    </div>
  );
};

export default AmountStep;
