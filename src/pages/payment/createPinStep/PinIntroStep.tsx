import PinStepPanel from "./PinStepPanel";

interface Props {
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

const PinIntroStep = ({ onBack, onNext }: Props) => (
  <PinStepPanel
    title="Create Transaction PIN"
    subtitle="Create a secure 6-digit PIN to authorize all payments."
    onBack={onBack}
    onSubmit={onNext}
  >
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
  </PinStepPanel>
);

export default PinIntroStep;