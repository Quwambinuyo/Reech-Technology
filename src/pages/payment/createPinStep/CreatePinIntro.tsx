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
    <div className="bg-white rounded-2xl w-full max-w-md p-6 flex flex-col gap-5">
      <div className="flex items-start justify-between">
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

      <div className="flex flex-col gap-3">
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

      <div className="flex items-center gap-3 mt-1">
        <button
          onClick={onBack}
          className="flex-1 py-3 rounded-full border border-[#4A148C] text-[#4A148C] font-medium hover:bg-[#F5F3FF] transition-colors"
        >
          Back
        </button>

        <button
          onClick={onNext}
          className="flex-1 py-3 rounded-full bg-[#4A148C] text-white font-medium hover:bg-[#3A1070] transition-colors"
        >
          Continue
        </button>
      </div>

      <div className="flex-center gap-1.5 opacity-80">
        <img src={logo} alt="reech" className="w-4 h-4" />
        <span className="text-[#030649] text-sm font-semibold">reech</span>
      </div>
    </div>
  );
};

export default PinIntroStep;
