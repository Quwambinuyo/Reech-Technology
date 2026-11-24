import { useEffect, useState } from "react";
import PinStepPanel from "./PinStepPanel";
import PinDigitRow from "./PinDigitRow";
import PinErrorAlert from "./PinErrorAlert";
import PinNotice from "./PinNotice";
import { PIN_LENGTH } from "./pinConstants";
import { useDigitInputs } from "./useDigitInputs";

interface Props {
  onBack: () => void;
  onConfirm: (pin: string) => void;
  originalPin: string;
  loading?: boolean;
  error?: string;
}

const ConfirmPinStep = ({
  onBack,
  onConfirm,
  originalPin,
  loading = false,
  error: externalError = "",
}: Props) => {
  const [error, setError] = useState("");
  const input = useDigitInputs(PIN_LENGTH, () => setError(""));

  useEffect(() => {
    input.focus(0);
  }, [input.focus]);

  const displayedError = error || externalError;

  const handleContinue = () => {
    if (loading) {
      return;
    }

    if (!input.isComplete) {
      setError(`Enter all ${PIN_LENGTH} digits to continue`);
      return;
    }

    if (input.value !== originalPin) {
      setError("PINs do not match, please try again");
      input.reset();
      return;
    }

    setError("");
    onConfirm(input.value);
  };

  return (
    <PinStepPanel
      title="Confirm Transaction PIN"
      subtitle="Confirm Transaction PIN"
      onBack={onBack}
      onSubmit={handleContinue}
      submitLabel={loading ? "Please wait..." : "Continue"}
      backDisabled={loading}
      submitDisabled={loading}
    >
      <PinDigitRow input={input} hasError={!!displayedError} />

      <PinErrorAlert message={displayedError} />

      <PinNotice>
        Re-enter your 4-digit PIN to confirm it and complete the setup.
      </PinNotice>
    </PinStepPanel>
  );
};

export default ConfirmPinStep;