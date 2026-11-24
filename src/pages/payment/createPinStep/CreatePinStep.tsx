import { useEffect, useState } from "react";
import PinStepPanel from "./PinStepPanel";
import PinDigitRow from "./PinDigitRow";
import PinErrorAlert from "./PinErrorAlert";
import PinNotice from "./PinNotice";
import { PIN_LENGTH } from "./pinConstants";
import { useDigitInputs } from "./useDigitInputs";

interface Props {
  onBack: () => void;
  onNext: (pin: string) => void;
  onForgotPin?: () => void;
  title?: string;
  subtitle?: string;
  noticeText?: string;
  submitLabel?: string;
  externalError?: string;
}

const CreatePinStep = ({
  onBack,
  onNext,
  onForgotPin,
  title = "Create Transaction PIN",
  subtitle = "Secure Your REECH Wallet",
  noticeText = "Create a secure 4-digit PIN to protect your REECH Credits. This PIN will be required for every credit transfer and withdrawal.",
  submitLabel = "Continue",
  externalError = "",
}: Props) => {
  const [error, setError] = useState("");
  const input = useDigitInputs(PIN_LENGTH, () => setError(""));

  useEffect(() => {
    input.focus(0);
  }, [input.focus]);

  const displayedError = error || externalError;

  const handleContinue = () => {
    if (!input.isComplete) {
      setError(`Enter all ${PIN_LENGTH} digits to continue`);
      return;
    }

    setError("");
    onNext(input.value);
  };

  return (
    <PinStepPanel
      title={title}
      subtitle={subtitle}
      onBack={onBack}
      onSubmit={handleContinue}
      submitLabel={submitLabel}
    >
      <div className="mx-auto w-fit flex flex-col gap-2 shrink-0">
        <PinDigitRow input={input} hasError={!!displayedError} />

        {onForgotPin && (
          <button
            onClick={onForgotPin}
            className="self-end text-[13px] text-[#4A148C] font-medium hover:underline"
          >
            Forgot PIN?
          </button>
        )}
      </div>

      <PinErrorAlert message={displayedError} />

      <PinNotice>{noticeText}</PinNotice>
    </PinStepPanel>
  );
};

export default CreatePinStep;