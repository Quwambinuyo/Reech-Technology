import { useEffect, useState } from "react";
import type { PinFlowStep } from "../types";
import PinIntroStep from "./PinIntroStep";
import CreatePinStep from "./CreatePinStep";
import ConfirmPinStep from "./ConfirmPinStep";
import PinSuccessStep from "./PinSuccessStep";
import PinCardFrame from "./PinCardFrame";
import Spinner from "../../../components/Spinner";
import StepSwiper, { type SlideDirection } from "../../../components/StepSwiper";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  fetchUserPinStatus,
  updateUserPin,
} from "../../../redux/auth/authActions";
import { getErrorMessage } from "./pinUtils";

interface Props {
  onClose: () => void;
  onComplete: (pin: string) => void;
  onForgotPin?: () => void;
}

type Step = PinFlowStep | "checking" | "currentPin";

const CreatePinFlow = ({ onClose, onComplete, onForgotPin }: Props) => {
  const dispatch = useAppDispatch();

  const { pinStatus, pinStatusLoading, updatePinLoading } = useAppSelector(
    (state) => state.auth,
  );

  const [step, setStep] = useState<Step>("checking");
  const [direction, setDirection] = useState<SlideDirection>("forward");
  const [currentPin, setCurrentPin] = useState("");
  const [pin, setPin] = useState("");
  const [apiError, setApiError] = useState("");
  const [currentPinAttempt, setCurrentPinAttempt] = useState(0);

  useEffect(() => {
    dispatch(fetchUserPinStatus());
  }, [dispatch]);

  const hasPin = pinStatus?.hasPin ?? false;

  const goTo = (next: Step, nextDirection: SlideDirection = "forward") => {
    setApiError("");
    setDirection(nextDirection);
    setStep(next);
  };

  useEffect(() => {
    if (pinStatusLoading || step !== "checking") {
      return;
    }

    setStep(hasPin ? "currentPin" : 0);
  }, [pinStatusLoading, step, hasPin]);

  const handleConfirmed = async () => {
    setApiError("");

    const payload = hasPin ? { pin, currentPin } : { pin };
    const result = await dispatch(updateUserPin(payload));

    if (updateUserPin.fulfilled.match(result)) {
      goTo(3);
      return;
    }

    const message = getErrorMessage(
      result.payload ?? result.error.message,
      "Unable to update your PIN. Please try again.",
    );

    if (hasPin && /incorrect|attempt|locked/i.test(message)) {
      setCurrentPin("");
      setPin("");
      setCurrentPinAttempt((prev) => prev + 1);
      goTo("currentPin", "back");
      setApiError(message);
      return;
    }

    setApiError(message);
  };

  const renderStep = () => {
    if (step === "checking") {
      return (
        <div className="flex items-center justify-center h-[200px]">
          <Spinner size="32px" borderWidth="4px" />
        </div>
      );
    }

    if (step === 0) {
      return <PinIntroStep onBack={onClose} onNext={() => goTo(1)} />;
    }

    if (step === "currentPin") {
      return (
        <CreatePinStep
          key={`currentPin-${currentPinAttempt}`}
          onBack={onClose}
          onForgotPin={onForgotPin}
          externalError={apiError}
          onNext={(enteredPin) => {
            setCurrentPin(enteredPin);
            goTo(1);
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
          onBack={() => goTo(hasPin ? "currentPin" : 0, "back")}
          onNext={(newPin) => {
            setPin(newPin);
            goTo(2);
          }}
          title={
            hasPin ? "Create New Transaction PIN" : "Create Transaction PIN"
          }
        />
      );
    }

    if (step === 2) {
      return (
        <ConfirmPinStep
          onBack={() => goTo(1, "back")}
          originalPin={pin}
          onConfirm={handleConfirmed}
          loading={updatePinLoading}
          error={apiError}
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

  return (
    <PinCardFrame onClose={onClose}>
      <StepSwiper stepKey={step} direction={direction}>
        {renderStep()}
      </StepSwiper>
    </PinCardFrame>
  );
};

export default CreatePinFlow;