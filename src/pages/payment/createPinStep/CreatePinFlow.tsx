import { useState } from "react";
import type { PinFlowStep } from "../steps/types";
import PinIntroStep from "./PinIntroStep";
import CreatePinStep from "./CreatePinStep";
import ConfirmPinStep from "./ConfirmPinStep";
import PinSuccessStep from "./PinSuccessStep";

interface Props {
  onClose: () => void;
  onComplete: (pin: string) => void;
}

const CreatePinFlow = ({ onClose, onComplete }: Props) => {
  const [step, setStep] = useState<PinFlowStep>(0);
  const [pin, setPin] = useState("");

  if (step === 0) {
    return (
      <PinIntroStep
        onClose={onClose}
        onBack={onClose}
        onNext={() => setStep(1)}
      />
    );
  }

  if (step === 1) {
    return (
      <CreatePinStep
        onClose={onClose}
        onBack={() => setStep(0)}
        onNext={(newPin) => {
          setPin(newPin);
          setStep(2);
        }}
      />
    );
  }

  if (step === 2) {
    return (
      <ConfirmPinStep
        onClose={onClose}
        onBack={() => setStep(1)}
        originalPin={pin}
        onConfirm={() => setStep(3)}
      />
    );
  }

  if (step === 3) {
    return (
      <PinSuccessStep
        onComplete={() => {
          onComplete(pin);
          onClose();
        }}
      />
    );
  }

  return null;
};

export default CreatePinFlow;
