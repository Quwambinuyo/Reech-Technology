import { IoCloseCircleOutline } from "react-icons/io5";
import { RiErrorWarningFill } from "react-icons/ri";
import Logo from "../../../assets/logo-s.png";
import { reechCurrency } from "../../../assets";
import { formatNumber } from "../../../../src/utils";
import StepBar from "./StepBar";
import type { Step } from "../types";

interface Props {
  onClose: () => void;
  points: number;
  balance: number;
  onChange: (points: number) => void;
  onNext: () => void;
}

const AmountStep = ({ onClose, points, balance, onChange, onNext }: Props) => {
  const isValid = Number.isInteger(points) && points > 0 && points <= balance;

  return (
    <div className="bg-white rounded-2xl w-full max-w-[370px] sm:max-w-[500px] md:max-w-[606px] mx-auto shadow-xl overflow-hidden border border-dashed border-[#D0D0F0]">
      <div className="px-5 pt-5 pb-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-montserrat font-bold text-[#0D0D0D] text-lg">
              Generate Token
            </h3>
            <p className="text-gray-400 text-[12px] font-ibmplex mt-0.5">
              How many points do you want to convert into a token?
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-2xl text-black hover:text-gray-600 transition-colors"
          >
            <IoCloseCircleOutline />
          </button>
        </div>

        <StepBar current={0 as Step} />

        <div className="flex items-center justify-between bg-[#F7F6FF] border border-[#E8E0FF] rounded-xl px-5 py-5">
          <img src={reechCurrency} alt="currency" />
          <input
            type="number"
            min={1}
            step={1}
            value={points || ""}
            onChange={(e) => onChange(Number(e.target.value))}
            placeholder="0"
            className="text-right bg-transparent outline-none text-[#0D0D0D] font-montserrat font-bold text-2xl w-1/2"
          />
        </div>

        <div className="mt-4 flex items-start gap-2.5 bg-[#EEF0FF] rounded-xl px-4 py-3.5">
          <RiErrorWarningFill
            size={20}
            className="text-[#7f669d] mt-0.5 shrink-0"
          />
          <p className="text-[12px] font-ibmplex text-[#3D3D6B] leading-relaxed">
            Your current balance is{" "}
            <span className="font-bold">{formatNumber(balance)} credits</span>.
          </p>
        </div>

        {points > balance && (
          <p className="mt-2 text-xs text-red-500 font-ibmplex">
            Insufficient balance.
          </p>
        )}

        {points > 0 && !Number.isInteger(points) && (
          <p className="mt-2 text-xs text-red-500 font-ibmplex">
            Enter a whole number of points.
          </p>
        )}

        <button
          onClick={() => isValid && onNext()}
          disabled={!isValid}
          className="w-full mt-6 bg-[#5617A2] disabled:opacity-40 disabled:cursor-not-allowed shadow-md text-white font-montserrat font-semibold rounded-4xl py-3.5 text-[16px]"
        >
          Continue
        </button>
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