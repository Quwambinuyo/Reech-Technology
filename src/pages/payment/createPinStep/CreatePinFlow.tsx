import { useEffect, useState } from "react";
import type { PinFlowStep } from "../types";
import PinIntroStep from "./PinIntroStep";
import CreatePinStep from "./CreatePinStep";
import ConfirmPinStep from "./ConfirmPinStep";
import PinSuccessStep from "./PinSuccessStep";
import Spinner from "../../../components/Spinner";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  fetchUserPinStatus,
  updateUserPin,
} from "../../../redux/auth/authActions";

interface Props {
  onClose: () => void;
  onComplete: (pin: string) => void;
}

const CreatePinFlow = ({ onClose, onComplete }: Props) => {
  const dispatch = useAppDispatch();

  const { pinStatus, pinStatusLoading, updatePinLoading } = useAppSelector(
    (state) => state.auth,
  );

  const [step, setStep] = useState<PinFlowStep | "checking" | "currentPin">(
    "checking",
  );
  const [currentPin, setCurrentPin] = useState("");
  const [pin, setPin] = useState("");

  useEffect(() => {
    dispatch(fetchUserPinStatus());
  }, [dispatch]);

  const hasPin = pinStatus?.hasPin ?? false;

  useEffect(() => {
    if (pinStatusLoading || step !== "checking") {
      return;
    }
    setStep(hasPin ? "currentPin" : 0);
  }, [pinStatusLoading, step, hasPin]);

  const handleConfirmed = async () => {
    const payload = hasPin ? { pin, currentPin } : { pin };
    const result = await dispatch(updateUserPin(payload));

    if (updateUserPin.fulfilled.match(result)) {
      setStep(3);
    }
  };

  if (step === "checking") {
    return (
      <div className="bg-white rounded-2xl w-full max-w-[606px] mx-auto shadow-xl border border-dashed border-[#D0D0F0] p-6 flex items-center justify-center h-[300px]">
        <Spinner size="32px" borderWidth="4px" />
      </div>
    );
  }

  if (step === 0) {
    return (
      <PinIntroStep
        onClose={onClose}
        onBack={onClose}
        onNext={() => setStep(1)}
      />
    );
  }

  if (step === "currentPin") {
    return (
      <CreatePinStep
        key="currentPin"
        onClose={onClose}
        onBack={onClose}
        onNext={(enteredPin) => {
          setCurrentPin(enteredPin);
          setStep(1);
        }}
        title="Confirm Current PIN"
        noticeText="Enter your existing 4-digit transaction PIN to continue. You'll set your new PIN next."
        submitLabel="Continue"
      />
    );
  }

  if (step === 1) {
    return (
      <CreatePinStep
        key="newPin"
        onClose={onClose}
        onBack={() => setStep(hasPin ? "currentPin" : 0)}
        onNext={(newPin) => {
          setPin(newPin);
          setStep(2);
        }}
        title={hasPin ? "Create New Transaction PIN" : "Create Transaction PIN"}
      />
    );
  }

  if (step === 2) {
    return (
      <ConfirmPinStep
        onClose={onClose}
        onBack={() => setStep(1)}
        originalPin={pin}
        onConfirm={handleConfirmed}
        loading={updatePinLoading}
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
