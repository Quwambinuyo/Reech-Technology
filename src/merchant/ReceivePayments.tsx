import { useState, useRef } from "react";
import type { KeyboardEvent, ClipboardEvent } from "react";
import OtpStep from "./receivepaymentstep/OtpStep";
import ValidateStep from "./receivepaymentstep/ValidateStep";
import ReceiptStep from "./receivepaymentstep/ReceiptStep";

type Step = "otp" | "validate" | "receipt";

const ReceivePayments = () => {
  const [step, setStep] = useState<Step>("otp");
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [otpError, setOtpError] = useState(false);
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

  const handleValidate = () => {
    if (otpValue.length < 6) {
      setOtpError(true);
      return;
    }
    setStep("validate");
  };

  const handleNewTransaction = () => {
    setOtp(Array(6).fill(""));
    setOtpError(false);
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
            inputRefs={inputRefs}
            onChange={handleOtpChange}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onValidate={handleValidate}
          />
        )}
        {step === "validate" && (
          <ValidateStep
            formattedCode={formattedCode}
            onCancel={() => setStep("otp")}
            onConfirm={() => setStep("receipt")}
          />
        )}
        {step === "receipt" && (
          <ReceiptStep onNewTransaction={handleNewTransaction} />
        )}
      </div>
    </div>
  );
};

export default ReceivePayments;
