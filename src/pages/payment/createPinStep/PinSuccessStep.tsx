import { FiCheck } from "react-icons/fi";
import logo from "../../../assets/logo-s.png";

interface Props {
  onComplete: () => void;
}

const PinSuccessStep = ({ onComplete }: Props) => {
  return (
    <div className="bg-white rounded-2xl  w-full max-w-[370px] sm:max-w-[500px] md:max-w-[606px] mx-auto p-6 flex flex-col items-center gap-5 text-center">
      <div className="flex-center h-16 w-16 rounded-full bg-[#E9F9EC]">
        <div className="flex-center h-10 w-10 rounded-full bg-[#1A932E]">
          <FiCheck size={22} color="#FFFFFF" />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-[#030649] text-lg font-semibold">
          PIN Created Successfully
        </h3>
        <p className="text-[#797979] text-sm leading-relaxed max-w-[320px]">
          Your Transaction PIN has been set successfully. Your REECH Credits are
          now secured, and you're ready to send, transfer, and withdraw Credits
          with confidence.
        </p>
      </div>

      <button
        onClick={onComplete}
        className="w-full py-3 rounded-full bg-[#4A148C] text-white font-medium hover:bg-[#3A1070] transition-colors"
      >
        Complete
      </button>

      <div className="flex-center gap-1.5 opacity-80">
        <img src={logo} alt="reech" className="w-4 h-4" />
        <span className="text-[#030649] text-sm font-semibold">reech</span>
      </div>
    </div>
  );
};

export default PinSuccessStep;
