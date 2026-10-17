import { useState, useRef } from "react";
import type { KeyboardEvent, ClipboardEvent } from "react";
import OtpStep from "./receivepaymentstep/OtpStep";
import ValidateStep from "./receivepaymentstep/ValidateStep";
import type { ValidatedPayment } from "./receivepaymentstep/ValidateStep";
import ReceiptStep from "./receivepaymentstep/ReceiptStep";
import type { RedeemedPayment } from "./receivepaymentstep/ReceiptStep";
import { useAppDispatch } from "../redux/hooks";
import { redeemToken, validateToken } from "../redux/wallet/action";

type Step = "otp" | "validate" | "receipt";

const ReceivePayments = () => {
  const dispatch = useAppDispatch();

  const [step, setStep] = useState<Step>("otp");
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [otpError, setOtpError] = useState(false);
  const [validating, setValidating] = useState(false);
  const [redeeming, setRedeeming] = useState(false);
  const [validated, setValidated] = useState<ValidatedPayment | null>(null);
  const [receipt, setReceipt] = useState<RedeemedPayment | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const otpValue = otp.join("");

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const updated = [...otp];
    updated[index] = value.slice(-1);
    setOtp(updated);
    setOtpError(false);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 5)
      inputRefs.current[index + 1]?.focus();
    if (e.key === "ArrowLeft" && index > 0)
      inputRefs.current[index - 1]?.focus();
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    const updated = [...otp];
    pasted.split("").forEach((ch, i) => {
      updated[i] = ch;
    });
    setOtp(updated);
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleValidate = async () => {
    if (validating) return;

    if (otpValue.length < 6) {
      setOtpError(true);
      return;
    }

    setValidating(true);

    try {
      const result = await dispatch(validateToken({ code: otpValue })).unwrap();
      setValidated(result);
      setStep("validate");
    } catch {
      setOtpError(true);
    } finally {
      setValidating(false);
    }
  };

  const handleRedeem = async () => {
    if (redeeming) return;

    setRedeeming(true);

    try {
      const result = await dispatch(redeemToken({ code: otpValue })).unwrap();
      setReceipt(result);
      setStep("receipt");
    } catch {
      return;
    } finally {
      setRedeeming(false);
    }
  };

  const handleCancel = () => {
    setValidated(null);
    setStep("otp");
  };

  const handleNewTransaction = () => {
    setOtp(Array(6).fill(""));
    setOtpError(false);
    setValidated(null);
    setReceipt(null);
    setStep("otp");
    setTimeout(() => inputRefs.current[0]?.focus(), 50);
  };

  const formattedCode = `${otpValue.slice(0, 3)} ${otpValue.slice(3)}`;

  return (
    <div className="flex items-center justify-center h-full">
      <div className="bg-white rounded-2xl shadow-sm w-full max-w-[506px] p-8">
        {step === "otp" && (
          <OtpStep
            otp={otp}
            otpError={otpError}
            loading={validating}
            inputRefs={inputRefs}
            onChange={handleOtpChange}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onValidate={handleValidate}
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