import { useEffect, useRef, useState } from "react";
import StepSwiper, { type SlideDirection } from "../../../components/StepSwiper";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  requestPinReset,
  resetUserPin,
} from "../../../redux/auth/authActions";
import { onClearPinReset } from "../../../redux/auth/authReducer";
import PinCardFrame from "./PinCardFrame";
import PinStepPanel from "./PinStepPanel";
import PinDigitRow from "./PinDigitRow";
import PinErrorAlert from "./PinErrorAlert";
import PinNotice from "./PinNotice";
import { CODE_LENGTH, PIN_LENGTH } from "./pinConstants";
import { getErrorMessage } from "./pinUtils";
import { useDigitInputs } from "./useDigitInputs";

interface Props {
  onClose: () => void;
  onBack: () => void;
  onComplete: () => void;
}

type Stage = "code" | "pin";

const ForgotPinStep = ({ onClose, onBack, onComplete }: Props) => {
  const dispatch = useAppDispatch();

  const {
    pinResetChallenge,
    requestPinResetLoading,
    requestPinResetError,
    resetPinLoading,
  } = useAppSelector((state) => state.auth);

  const [stage, setStage] = useState<Stage>("code");
  const [direction, setDirection] = useState<SlideDirection>("forward");
  const [error, setError] = useState("");
  const codeInput = useDigitInputs(CODE_LENGTH, () => setError(""));
  const pinInput = useDigitInputs(PIN_LENGTH, () => setError(""));
  const requested = useRef(false);

  useEffect(() => {
    if (requested.current) {
      return;
    }

    requested.current = true;
    dispatch(onClearPinReset());
    dispatch(requestPinReset());
  }, [dispatch]);

  useEffect(() => {
    if (stage === "code") {
      codeInput.focus(0);
      return;
    }

    pinInput.focus(0);
  }, [stage, codeInput.focus, pinInput.focus]);

  const goToStage = (next: Stage, nextDirection: SlideDirection) => {
    setDirection(nextDirection);
    setStage(next);
  };

  const displayedError =
    error || (stage === "code" ? requestPinResetError : "");
  const busy = requestPinResetLoading || resetPinLoading;

  const handleResend = () => {
    if (busy) {
      return;
    }

    codeInput.reset();
    setError("");
    dispatch(requestPinReset());
  };

  const handleCodeContinue = () => {
    if (busy) {
      return;
    }

    if (!pinResetChallenge?.challengeId) {
      setError("Request a new code to continue");
      return;
    }

    if (!codeInput.isComplete) {
      setError(`Enter the ${CODE_LENGTH}-digit code sent to your email`);
      return;
    }

    setError("");
    goToStage("pin", "forward");
  };

  const handleSubmit = async () => {
    if (busy || !pinResetChallenge?.challengeId) {
      return;
    }

    if (!pinInput.isComplete) {
      setError(`Enter all ${PIN_LENGTH} digits of your new PIN`);
      return;
    }

    setError("");

    const result = await dispatch(
      resetUserPin({
        challengeId: pinResetChallenge.challengeId,
        code: codeInput.value,
        pin: pinInput.value,
      }),
    );

    if (resetUserPin.fulfilled.match(result)) {
      onComplete();
      return;
    }

    const message = getErrorMessage(result.payload, "Failed to reset PIN");

    setError(message);

    if (/code|expired|challenge|otp/i.test(message)) {
      codeInput.reset();
      pinInput.reset();
      goToStage("code", "back");
    }
  };

  const handleBack = () => {
    if (stage === "pin") {
      setError("");
      pinInput.reset();
      goToStage("code", "back");
      return;
    }

    onBack();
  };

  return (
    <PinCardFrame onClose={onClose}>
      <StepSwiper stepKey={stage} direction={direction}>
        {stage === "code" ? (
          <PinStepPanel
            title="Forgot PIN?"
            subtitle="Enter the code we sent to your email"
            onBack={handleBack}
            onSubmit={handleCodeContinue}
            submitLabel="Continue"
            submitDisabled={busy}
          >
            <div className="flex flex-col gap-3 shrink-0">
              <p className="text-[#030649] text-sm font-medium text-center">
                Verification code
              </p>

              <PinDigitRow
                input={codeInput}
                hasError={!!displayedError}
                compact
              />

              <button
                onClick={handleResend}
                disabled={busy}
                className="self-center text-[13px] text-[#4A148C] font-medium hover:underline disabled:opacity-60"
              >
                {requestPinResetLoading ? "Sending code..." : "Resend code"}
              </button>
            </div>

            <PinErrorAlert message={displayedError} />

            <PinNotice>
              We sent a 6-digit code to your email. Enter it to continue.
            </PinNotice>
          </PinStepPanel>
        ) : (
          <PinStepPanel
            title="Create New PIN"
            subtitle="Choose a new 4-digit transaction PIN"
            onBack={handleBack}
            onSubmit={handleSubmit}
            submitLabel={resetPinLoading ? "Please wait..." : "Reset PIN"}
            backDisabled={resetPinLoading}
            submitDisabled={busy}
          >
            <div className="flex flex-col gap-3 shrink-0">
              <p className="text-[#030649] text-sm font-medium text-center">
                New PIN
              </p>

              <PinDigitRow input={pinInput} hasError={!!displayedError} />
            </div>

            <PinErrorAlert message={displayedError} />

            <PinNotice>
              Resetting your PIN also clears any lockout on your wallet.
            </PinNotice>
          </PinStepPanel>
        )}
      </StepSwiper>
    </PinCardFrame>
  );
};

export default ForgotPinStep;