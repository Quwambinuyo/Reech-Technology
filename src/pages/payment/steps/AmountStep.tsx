import { IoCloseCircleOutline } from "react-icons/io5";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import Logo from "../../../assets/logo-s.png";
import StepBar from "./StepBar";
import type { Merchant, Step } from "./types";
import { CURRENT_BALANCE, EXCHANGE_RATE } from "./types";
import { formatNumber } from "../../../../src/utils";

interface Props {
  onClose: () => void;
  merchant: Merchant;
  points: number;
  onBack: () => void;
  onNext: (points: number) => void;
}

const AmountStep = ({ onClose, merchant, points, onBack, onNext }: Props) => {
  const equivalent = points * EXCHANGE_RATE;
  const remaining = CURRENT_BALANCE - points;
  const isValid = points > 0 && points <= CURRENT_BALANCE;

  return (
    <div className="bg-white rounded-2xl w-full max-w-[370px] sm:max-w-[500px] md:max-w-[606px] mx-auto shadow-xl overflow-hidden border border-dashed border-[#D0D0F0]">
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

        <div className="flex items-center justify-between bg-[#F7F6FF] border border-[#E8E0FF] rounded-xl px-5 py-5">
          <span className="text-[#35303d]  font-bold text-[24px] shrink-0">
            pts
          </span>
          <span className="text-right text-[#0D0D0D] font-montserrat font-bold text-2xl">
            {formatNumber(points)}
          </span>
        </div>

        <div className="mt-4 bg-[#F7F6FF] border border-[#E8E0FF] rounded-xl px-4 py-3.5">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] font-ibmplex text-[#4A454F] font-semibold uppercase tracking-wider mb-1">
                Equivalent Value
              </p>
              <p className="text-[22px] font-montserrat font-bold text-[#7542BB]">
                ₦{formatNumber(equivalent)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-semibold text-[#4A454F] uppercase tracking-wider mb-1">
                Current Rate
              </p>
              <p className="text-xs font-ibmplex text-[#4A148C] font-semibold">
                1 pt = ₦1
              </p>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-start gap-2.5 bg-[#EEF0FF] rounded-xl px-4 py-3.5">
          <HiOutlineInformationCircle
            size={16}
            className="text-[#4A148C] mt-0.5 shrink-0"
          />
          <p className="text-[12px] font-ibmplex text-[#3D3D6B] leading-relaxed">
            Your current balance is{" "}
            <span className="font-bold">
              {formatNumber(CURRENT_BALANCE)} pts
            </span>
            .{" "}
            {points > 0 && (
              <>
                Remaining balance after transfer:{" "}
                <span
                  className={
                    remaining < 0 ? "text-red-500 font-bold" : "font-bold"
                  }
                >
                  {formatNumber(remaining)} pts
                </span>
              </>
            )}
          </p>
        </div>

        {points > CURRENT_BALANCE && (
          <p className="mt-2 text-xs text-red-500 font-ibmplex">
            Insufficient balance.
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button
            onClick={onBack}
            className="flex-1 border border-[#4A148C] text-[#4A148C] font-montserrat font-semibold rounded-4xl py-3.5 text-[16px] shadow-sm"
          >
            Back
          </button>
          <button
            onClick={() => isValid && onNext(points)}
            disabled={!isValid}
            className="flex-1 max- bg-[#5617A2]  disabled:opacity-40 disabled:cursor-not-allowed shadow-md text-white font-montserrat font-semibold rounded-4xl py-3.5 text-[16px]"
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
