import { useState } from "react";
import type { Step } from "../types";
import AmountStep from "./AmountStep";
import ReviewStep from "./ReviewStep";
import PinStep from "../sendCreditSteps/ConfirmPinStep";
import TokenRevealStep from "./TokenRevealStep";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { generateToken } from "../../../redux/wallet/action";

interface Props {
  onClose: () => void;
}

const TokenGenerationFlow = ({ onClose }: Props) => {
  const dispatch = useAppDispatch();
  const { customerOverview } = useAppSelector((state) => state.dashboard);
  const balance = customerOverview?.pointBalance.value ?? 0;

  const [step, setStep] = useState<Step>(0);
  const [points, setPoints] = useState(0);
  const [token, setToken] = useState<{ code: string; expiresAt: string } | null>(
    null,
  );
  const [submitting, setSubmitting] = useState(false);

  const handleConfirmPin = async (pin: string) => {
    if (submitting) return;

    setSubmitting(true);

    try {
      const result = await dispatch(generateToken({ points, pin })).unwrap();
      setToken({ code: result.code, expiresAt: result.expiresAt });
      setStep(3);
    } catch {
      return;
    } finally {
      setSubmitting(false);
    }
  };

  if (step === 0) {
    return (
      <AmountStep
        onClose={onClose}
        points={points}
        balance={balance}
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
        onConfirm={handleConfirmPin}
      />
    );
  }

  if (step === 3 && token) {
    return (
      <TokenRevealStep
        onClose={onClose}
        token={token.code}
        expiresAt={token.expiresAt}
      />
    );
  }

  return null;
};

export default TokenGenerationFlow;