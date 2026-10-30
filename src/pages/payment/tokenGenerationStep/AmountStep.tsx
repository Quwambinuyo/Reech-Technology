import { IoCloseCircleOutline } from "react-icons/io5";
import { RiErrorWarningFill } from "react-icons/ri";
import Logo from "../../../assets/logo-s.png";
import { reechCurrency } from "../../../assets";
import { formatNumber } from "../../../utils";
import Button from "../../../components/Button";
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
    <div className="bg-white rounded-2xl w-11/12 max-w-[500px] md:max-w-[560px] mx-auto shadow-xl overflow-hidden relative">
      <div className="px-5 lg:px-6 pt-5 lg:pt-6 pb-5">
        <div className="pr-8">
          <h3 className="font-montserrat font-bold text-light-black text-lg">
            Generate Token
          </h3>
          <p className="text-gray-500 text-[13px] font-ibmplex mt-0.5">
            How many points do you want to convert into a token?
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="absolute text-2xl lg:text-3xl top-4 lg:top-5 right-5 text-black hover:opacity-70 transition-opacity"
        >
          <IoCloseCircleOutline />
        </button>

        <StepBar current={0 as Step} />

        <div className="flex items-center justify-between gap-3 bg-primary-purple/5 border border-primary-purple/15 focus-within:border-primary-purple transition-colors rounded-xl px-5 py-5">
          <img src={reechCurrency} alt="currency" className="shrink-0" />
          <input
            type="number"
            min={1}
            step={1}
            value={points || ""}
            onChange={(e) => onChange(Number(e.target.value))}
            placeholder="0"
            className="text-right bg-transparent outline-none text-light-black font-montserrat font-bold text-2xl w-full min-w-0"
          />
        </div>

        <div className="mt-4 flex items-start gap-2.5 bg-primary-purple/5 rounded-xl px-4 py-3.5">
          <RiErrorWarningFill
            size={20}
            className="text-primary-purple mt-0.5 shrink-0"
          />
          <p className="text-[12px] font-ibmplex text-gray-700 leading-relaxed">
            Your current balance is{" "}
            <span className="font-bold text-light-black">
              {formatNumber(balance)} credits
            </span>
            .
          </p>
        </div>

        {points > balance && (
          <p className="mt-2 px-1 text-xs text-default-red font-ibmplex">
            Insufficient balance.
          </p>
        )}

        {points > 0 && !Number.isInteger(points) && (
          <p className="mt-2 px-1 text-xs text-default-red font-ibmplex">
            Enter a whole number of points.
          </p>
        )}

        <div className="mt-6">
          <Button
            text="Continue"
            onClick={() => isValid && onNext()}
            isDisabled={!isValid}
          />
        </div>
      </div>

      <div className="flex justify-center items-center py-3 border-t border-gray-100">
        <div className="flex items-center">
          <img src={Logo} alt="logo" className="w-[40px]" />
          <span className="font-poppins font-medium text-light-black -ml-1 text-sm">
            reech
          </span>
        </div>
      </div>
    </div>
  );
};

export default AmountStep;