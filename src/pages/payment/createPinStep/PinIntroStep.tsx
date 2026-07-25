import { IoClose } from "react-icons/io5";
import logo from "../../../assets/logo-s.png";

interface Props {
  onClose: () => void;
  onBack: () => void;
  onNext: () => void;
}

const infoItems = [
  {
    emoji: "🔒",
    title: "Secure Credits",
    description:
      "Your REECH Credits are protected with an extra layer of security before every transaction.",
  },
  {
    emoji: "✅",
    title: "Safe Transfers",
    description:
      "Every credit transfer requires your PIN, helping keep your wallet secure from unauthorized use.",
  },
  {
    emoji: "🛡️",
    title: "Wallet Protection",
    description:
      "Only you can access and spend the Credits you've earned from your purchases.",
  },
];

const PinIntroStep = ({ onClose, onBack, onNext }: Props) => {
  return (
    <div className="bg-white rounded-2xl h-[600px] max-h-[90vh] w-full max-w-[370px] sm:max-w-[500px] md:max-w-[606px] mx-auto shadow-xl border border-dashed border-[#D0D0F0] p-6 flex flex-col gap-5">
      <div className="flex items-start justify-between shrink-0">
        <div className="flex flex-col gap-1">
          <h3 className="text-[#030649] text-lg font-semibold">
            Create Transaction PIN
          </h3>
          <p className="text-[#797979] text-sm">
            Create a secure 6-digit PIN to authorize all payments.
          </p>
        </div>

        <button
          onClick={onClose}
          className="flex-center h-8 w-8 rounded-full border border-[#E5E6F5] text-[#797979] hover:bg-[#F5F6FF]"
        >
          <IoClose size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto  flex flex-col gap-3">
        {infoItems.map((item) => (
          <div
            key={item.title}
            className="bg-[#F5F6FF] rounded-xl px-4 py-3.5 flex flex-col gap-1"
          >
            <p className="text-[#030649] text-sm font-semibold">
              {item.title} <span>{item.emoji}</span>
            </p>
            <p className="text-[#797979] text-[13px] leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 mt-1 flex-col md:flex-row shrink-0">
        <button
          onClick={onBack}
          className="flex-1 py-3 rounded-full border border-[#4A148C] text-[#4A148C] font-medium hover:bg-[#F5F3FF] transition-colors w-full"
        >
          Back
        </button>

        <button
          onClick={onNext}
          className="flex-1 py-3 rounded-full w-full bg-[#4A148C] text-white font-medium hover:bg-[#3A1070] transition-colors"
        >
          Continue
        </button>
      </div>

      <div className="flex justify-center items-center py-3 border-t border-gray-100 shrink-0">
        <div className="flex items-center">
          <img src={logo} alt="logo" className="w-[40px]" />
          <span className="font-poppins font-medium text-[#000000] -ml-1 text-sm">
            Reech
          </span>
        </div>
      </div>
    </div>
  );
};

export default PinIntroStep;
