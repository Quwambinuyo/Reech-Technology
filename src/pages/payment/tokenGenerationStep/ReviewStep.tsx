import { IoCloseCircleOutline } from "react-icons/io5";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import Logo from "../../../assets/logo-s.png";
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
    <div className="bg-white rounded-2xl w-full max-w-[370px] sm:max-w-[500px] md:max-w-[606px] mx-auto shadow-xl overflow-hidden border border-dashed border-[#D0D0F0]">
      <div className="px-5 pt-5 pb-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-montserrat font-bold text-[#0D0D0D] text-lg">
              Review Token
            </h3>
            <p className="text-gray-400 text-[12px] font-ibmplex mt-0.5">
              Review the details before generating your token.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-2xl text-black hover:text-gray-600 transition-colors"
          >
            <IoCloseCircleOutline />
          </button>
        </div>

        <StepBar current={1 as Step} />

        <div className="flex flex-col divide-y divide-gray-100 border border-[#EFEFFF] rounded-xl overflow-hidden">
          {rows.map((r) => (
            <div
              key={r.label}
              className="flex items-center justify-between px-4 py-3.5"
            >
              <p className="text-[13px] font-ibmplex text-[#6B6B8A]">
                {r.label}
              </p>
              <p
                className={`text-[13px] font-ibmplex font-semibold ${
                  r.red ? "text-[#C62828]" : "text-[#0D0D0D]"
                }`}
              >
                {r.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-start gap-2.5 bg-[#EEF0FF] rounded-lg px-3.5 py-3">
          <HiOutlineInformationCircle
            size={16}
            className="text-[#4A148C] mt-0.5 shrink-0"
          />
          <p className="text-[12px] font-ibmplex text-[#3D3D6B] leading-relaxed">
            A token will be generated upon confirmation. Deducted when the
            merchant confirms.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button
            onClick={onBack}
            className="flex-1 border border-[#4A148C] text-[#4A148C] font-montserrat font-semibold rounded-4xl py-3.5 text-[16px]"
          >
            Back
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-[#4A148C] text-white font-montserrat font-semibold rounded-4xl py-3.5 text-[16px]"
          >
            Confirm
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

export default ReviewStep;