import { IoCloseCircleOutline } from "react-icons/io5";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import Logo from "../../../assets/logo-s.png";
import Button from "../../../components/Button";
import StepBar from "./StepBar";
import type { Step } from "../types";

interface Props {
  onClose: () => void;
  points: number;
  onBack: () => void;
  onConfirm: () => void;
}

const ReviewStep = ({ onClose, points, onBack, onConfirm }: Props) => {
  const rows = [
    { label: "Points converting", value: `${points.toLocaleString()} credits` },
    {
      label: "Deduction from balance",
      value: `-${points.toLocaleString()} credits`,
      red: true,
    },
  ];

  return (
    <div className="bg-white rounded-2xl w-11/12 max-w-[500px] md:max-w-[560px] mx-auto shadow-xl overflow-hidden relative">
      <div className="px-5 lg:px-6 pt-5 lg:pt-6 pb-5">
        <div className="pr-8">
          <h3 className="font-montserrat font-bold text-light-black text-lg">
            Review Token
          </h3>
          <p className="text-gray-500 text-[13px] font-ibmplex mt-0.5">
            Review the details before generating your token.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="absolute text-2xl lg:text-3xl top-4 lg:top-5 right-5 text-black hover:opacity-70 transition-opacity"
        >
          <IoCloseCircleOutline />
        </button>

        <StepBar current={1 as Step} />

        <div className="flex flex-col divide-y divide-primary-purple/10 border border-primary-purple/15 bg-primary-purple/5 rounded-xl overflow-hidden">
          {rows.map((r) => (
            <div
              key={r.label}
              className="flex items-center justify-between gap-3 px-4 py-3.5"
            >
              <p className="text-[13px] font-ibmplex text-gray-600">
                {r.label}
              </p>
              <p
                className={`text-[14px] font-montserrat font-bold ${
                  r.red ? "text-default-red" : "text-light-black"
                }`}
              >
                {r.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-start gap-2.5 bg-primary-purple/5 rounded-xl px-4 py-3.5">
          <HiOutlineInformationCircle
            size={18}
            className="text-primary-purple mt-0.5 shrink-0"
          />
          <p className="text-[12px] font-ibmplex text-gray-700 leading-relaxed">
            A token will be generated upon confirmation. Deducted when the
            merchant confirms.
          </p>
        </div>

        <div className="flex flex-col-reverse sm:flex-row gap-3 mt-6">
          <div className="flex-1">
            <Button text="Back" onClick={onBack} colorBg="white" />
          </div>
          <div className="flex-1">
            <Button text="Confirm" onClick={onConfirm} />
          </div>
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

export default ReviewStep;