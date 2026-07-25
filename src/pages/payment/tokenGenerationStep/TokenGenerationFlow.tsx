import { useState } from "react";
import type { Step } from "../sendCreditSteps/types";
import AmountStep from "./AmountStep";
import ReviewStep from "./ReviewStep";
import PinStep from "../sendCreditSteps/ConfirmPinStep";
import TokenRevealStep from "./TokenRevealStep";

interface Props {
  onClose: () => void;
}

const TokenGenerationFlow = ({ onClose }: Props) => {
  const [step, setStep] = useState<Step>(0);
  const [points, setPoints] = useState(0);
  const [token, setToken] = useState("");

  if (step === 0) {
    return (
      <AmountStep
        onClose={onClose}
        points={points}
        onChange={setPoints}
        onNext={() => setStep(1)}
      />
    );
  }

  if (step === 1) {
    return (
      <ReviewStep
        onClose={onClose}
        points={points}
        onBack={() => setStep(0)}
        onConfirm={() => setStep(2)}
      />
    );
  }

  if (step === 2) {
    return (
      <PinStep
        onClose={onClose}
        onBack={() => setStep(1)}
        onConfirm={(pin) => {
          console.log("Confirm token generation:", { points, pin });
          setToken("482913");
          setStep(3);
        }}
      />
    );
  }

  if (step === 3) {
    return <TokenRevealStep onClose={onClose} token={token} />;
  }

  return null;
};

export default TokenGenerationFlow;
