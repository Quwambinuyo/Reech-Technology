import { useState } from "react";
import OtpStep from "./receivepaymentstep/OtpStep";
import ValidateStep from "./receivepaymentstep/ValidateStep";
import type { ValidatedPayment } from "./receivepaymentstep/ValidateStep";
import ReceiptStep from "./receivepaymentstep/ReceiptStep";
import type { RedeemedPayment } from "./receivepaymentstep/ReceiptStep";
import { useAppDispatch } from "../redux/hooks";
import { redeemToken, validateToken } from "../redux/wallet/action";
import { sanitizeDigits } from "../utils";
import type { InputEvent } from "../types";

type Step = "otp" | "validate" | "receipt";

const ReceivePayments = () => {
  const dispatch = useAppDispatch();

  const [step, setStep] = useState<Step>("otp");
  const [code, setCode] = useState("");
  const [otpError, setOtpError] = useState(false);
  const [validating, setValidating] = useState(false);
  const [redeeming, setRedeeming] = useState(false);
  const [validated, setValidated] = useState<ValidatedPayment | null>(null);
  const [receipt, setReceipt] = useState<RedeemedPayment | null>(null);

  const handleCodeChange = (e: InputEvent) => {
    setCode(sanitizeDigits(e.target.value).slice(0, 6));
    setOtpError(false);
  };

  const handleValidate = async () => {
    if (validating) return;

    if (code.length < 6) {
      setOtpError(true);
      return;
    }

    setValidating(true);

    try {
      const result = await dispatch(validateToken({ code })).unwrap();
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
      const result = await dispatch(redeemToken({ code })).unwrap();
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
    setCode("");
    setOtpError(false);
    setValidated(null);
    setReceipt(null);
    setStep("otp");
  };

  const formattedCode = `${code.slice(0, 3)} ${code.slice(3)}`;

  return (
    <div className="flex items-center justify-center h-full">
      <div className="bg-white rounded-2xl shadow-sm w-full max-w-[506px] p-8">
        {step === "otp" && (
          <OtpStep
            code={code}
            otpError={otpError}
            loading={validating}
            onChange={handleCodeChange}
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