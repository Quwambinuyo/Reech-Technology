import { useState } from "react";
import OtpStep from "./receivepaymentstep/OtpStep";
import PinStep from "./receivepaymentstep/PinStep";
import ValidateStep from "./receivepaymentstep/ValidateStep";
import type { ValidatedPayment } from "./receivepaymentstep/ValidateStep";
import ReceiptStep from "./receivepaymentstep/ReceiptStep";
import type { RedeemedPayment } from "./receivepaymentstep/ReceiptStep";
import { CODE_LENGTH, PIN_LENGTH } from "./receivepaymentstep/constants";
import { useAppDispatch } from "../redux/hooks";
import { redeemToken, validateToken } from "../redux/wallet/action";
import { sanitizeDigits } from "../utils";
import type { InputEvent } from "../types";

type Step = "otp" | "pin" | "validate" | "receipt";

const ReceivePayments = () => {
  const dispatch = useAppDispatch();

  const [step, setStep] = useState<Step>("otp");
  const [code, setCode] = useState("");
  const [pin, setPin] = useState("");
  const [otpError, setOtpError] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [validating, setValidating] = useState(false);
  const [redeeming, setRedeeming] = useState(false);
  const [validated, setValidated] = useState<ValidatedPayment | null>(null);
  const [receipt, setReceipt] = useState<RedeemedPayment | null>(null);

  const handleCodeChange = (e: InputEvent) => {
    setCode(sanitizeDigits(e.target.value).slice(0, CODE_LENGTH));
    setOtpError(false);
  };

  const handlePinChange = (e: InputEvent) => {
    setPin(sanitizeDigits(e.target.value).slice(0, PIN_LENGTH));
    setPinError(false);
  };

  const handleValidate = async () => {
    if (validating) return;

    if (code.length < CODE_LENGTH) {
      setOtpError(true);
      return;
    }

    setValidating(true);

    try {
      const result = await dispatch(validateToken({ code })).unwrap();
      setValidated(result);
      setStep("pin");
    } catch {
      setOtpError(true);
    } finally {
      setValidating(false);
    }
  };

  const handlePinContinue = () => {
    if (pin.length < PIN_LENGTH) {
      setPinError(true);
      return;
    }

    setStep("validate");
  };

  const handlePinBack = () => {
    setPin("");
    setPinError(false);
    setValidated(null);
    setStep("otp");
  };

  const handleRedeem = async () => {
    if (redeeming) return;

    setRedeeming(true);

    try {
      const result = await dispatch(redeemToken({ code, pin })).unwrap();
      setReceipt(result);
      setStep("receipt");
    } catch {
      return;
    } finally {
      setRedeeming(false);
    }
  };

  const handleCancel = () => {
    setPin("");
    setPinError(false);
    setValidated(null);
    setStep("otp");
  };

  const handleNewTransaction = () => {
    setCode("");
    setPin("");
    setOtpError(false);
    setPinError(false);
    setValidated(null);
    setReceipt(null);
    setStep("otp");
  };

  const formattedCode = `${code.slice(0, 3)} ${code.slice(3, 6)} ${code.slice(6)}`;

  return (
    <div className="flex items-center justify-center h-full">
      <div className="bg-white rounded-2xl shadow-sm w-full max-w-[506px] p-5 sm:p-8">
        {step === "otp" && (
          <OtpStep
            code={code}
            otpError={otpError}
            loading={validating}
            onChange={handleCodeChange}
            onValidate={handleValidate}
          />
        )}
        {step === "pin" && (
          <PinStep
            pin={pin}
            pinError={pinError}
            onChange={handlePinChange}
            onContinue={handlePinContinue}
            onBack={handlePinBack}
          />
        )}
        {step === "validate" && validated && (
          <ValidateStep
            formattedCode={formattedCode}
            data={validated}
            loading={redeeming}
            onCancel={handleCancel}
            onConfirm={handleRedeem}
          />
        )}
        {step === "receipt" && receipt && (
          <ReceiptStep
            data={receipt}
            onNewTransaction={handleNewTransaction}
          />
        )}
      </div>
    </div>
  );
};

export default ReceivePayments;