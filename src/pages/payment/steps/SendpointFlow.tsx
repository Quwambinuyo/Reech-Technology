import { useState } from "react";
import type { Merchant, Recipient, Step } from "./types";
import SendPointStep from "./SendpointStep";
import SelectStep from "./SelectStep";
import AmountStep from "./AmountStep";
import ReviewStep from "./ReviewStep";
import OtpStep from "./OtpStep";

interface Props {
  onClose: () => void;
}

const SendPointFlow = ({ onClose }: Props) => {
  const [step, setStep] = useState<Step>(0);
  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const [points, setPoints] = useState(0);

  if (step === 0) {
    return (
      <SendPointStep
        onClose={onClose}
        onNext={(_recipient: Recipient, _pts: number, _note: string) => {
          setStep(1);
        }}
      />
    );
  }

  if (step === 1) {
    return (
      <SelectStep
        onClose={onClose}
        onContinue={(selected) => {
          setMerchant(selected);
          setStep(2);
        }}
      />
    );
  }

  if (step === 2 && merchant) {
    return (
      <AmountStep
        onClose={onClose}
        merchant={merchant}
        onBack={() => setStep(1)}
        onNext={(pts) => {
          setPoints(pts);
          setStep(3);
        }}
      />
    );
  }

  if (step === 3 && merchant) {
    return (
      <ReviewStep
        onClose={onClose}
        merchant={merchant}
        points={points}
        onBack={() => setStep(2)}
        onConfirm={() => setStep(4)}
      />
    );
  }

  if (step === 4 && merchant) {
    return (
      <OtpStep
        onClose={onClose}
        merchant={merchant}
        points={points}
        onInvalidate={onClose}
      />
    );
  }

  return null;
};

export default SendPointFlow;
