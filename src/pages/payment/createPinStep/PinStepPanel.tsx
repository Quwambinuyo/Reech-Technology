import type { ReactNode } from "react";

interface Props {
  title: string;
  subtitle: string;
  onBack: () => void;
  onSubmit: () => void;
  submitLabel?: string;
  backDisabled?: boolean;
  submitDisabled?: boolean;
  children: ReactNode;
}

const PinStepPanel = ({
  title,
  subtitle,
  onBack,
  onSubmit,
  submitLabel = "Continue",
  backDisabled = false,
  submitDisabled = false,
  children,
}: Props) => (
  <div className="flex flex-col gap-5">
    <div className="flex flex-col gap-1 pr-10 shrink-0">
      <h3 className="text-[#030649] text-lg font-semibold">{title}</h3>
      <p className="text-[#797979] text-sm">{subtitle}</p>
    </div>

    <div className="min-h-0 max-h-[calc(92vh-320px)] overflow-y-auto hide-scroll flex flex-col gap-4">
      {children}
    </div>

    <div className="flex items-center gap-3 mt-1 flex-col md:flex-row shrink-0">
      <button
        onClick={onBack}
        disabled={backDisabled}
        className="flex-1 py-3 rounded-full border border-[#4A148C] text-[#4A148C] font-medium hover:bg-[#F5F3FF] transition-colors w-full disabled:opacity-60"
      >
        Back
      </button>

      <button
        onClick={onSubmit}
        disabled={submitDisabled}
        className="flex-1 py-3 rounded-full w-full bg-[#4A148C] text-white font-medium hover:bg-[#3A1070] transition-colors disabled:opacity-60"
      >
        {submitLabel}
      </button>
    </div>
  </div>
);

export default PinStepPanel;