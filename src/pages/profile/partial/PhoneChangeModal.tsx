import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Button from "../../../components/Button";
import { CustomTextInput } from "../../../components/CustomInput";
import {
  requestPhoneChangeCode,
  verifyPhoneChange,
} from "../../../redux/auth/authActions";
import { onClearPhoneChange } from "../../../redux/auth/authReducer";

const COUNTRY_PREFIX = "+234";
const LOCAL_DIGITS = 10;
const CODE_LENGTH = 6;
const RESEND_SECONDS = 60;

export const toE164 = (value: string | null | undefined) => {
  const raw = (value ?? "").trim();
  if (!raw) return "";
  if (raw.startsWith("+")) return raw;
  if (raw.startsWith("234")) return `+${raw}`;
  if (raw.startsWith("0")) return `${COUNTRY_PREFIX}${raw.slice(1)}`;
  return raw;
};

const parseLocalDigits = (raw: string) => {
  if (raw.startsWith("+") && !raw.startsWith(COUNTRY_PREFIX)) return "";

  let digits = raw.startsWith(COUNTRY_PREFIX)
    ? raw.slice(COUNTRY_PREFIX.length)
    : raw;

  const startedWithPrefix = raw.startsWith(COUNTRY_PREFIX);
  digits = digits.replace(/\D/g, "");

  if (!startedWithPrefix && digits.startsWith("234")) {
    digits = digits.slice(3);
  }

  return digits.replace(/^0+/, "").slice(0, LOCAL_DIGITS);
};

const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

interface PhoneChangeModalProps {
  onClose: () => void;
}

const PhoneChangeModal = ({ onClose }: PhoneChangeModalProps) => {
  const dispatch = useAppDispatch();
  const { phoneChange, phoneCodeLoading, verifyPhoneLoading, currentUser } =
    useAppSelector((state) => state.auth);

  const [localDigits, setLocalDigits] = useState("");
  const [code, setCode] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

  const expiresAt = phoneChange?.expiresAt;
  const fullNumber = `${COUNTRY_PREFIX}${localDigits}`;

  useEffect(() => {
    if (!expiresAt) {
      setSecondsLeft(null);
      return;
    }

    const tick = () => {
      const diff = Math.floor(
        (new Date(expiresAt).getTime() - Date.now()) / 1000,
      );
      setSecondsLeft(Math.max(0, diff));
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [expiresAt]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setTimeout(() => setCooldown((prev) => prev - 1), 1000);
    return () => clearTimeout(id);
  }, [cooldown]);

  const sendCode = (phoneNumber: string) => {
    dispatch(requestPhoneChangeCode(phoneNumber))
      .unwrap()
      .then(() => {
        setCooldown(RESEND_SECONDS);
        setCode("");
      })
      .catch(() => {});
  };

  const handleSend = () => {
    if (localDigits.length !== LOCAL_DIGITS) {
      toast.error(`Enter the ${LOCAL_DIGITS} digits after ${COUNTRY_PREFIX}.`);
      return;
    }

    if (fullNumber === toE164(currentUser?.phoneNumber)) {
      toast.error("This is already your phone number.");
      return;
    }

    sendCode(fullNumber);
  };

  const handleResend = () => {
    if (!phoneChange || cooldown > 0 || phoneCodeLoading) return;
    sendCode(phoneChange.phoneNumber);
  };

  const handleVerify = () => {
    if (!phoneChange) return;

    if (code.length !== CODE_LENGTH) {
      toast.error(`Enter the ${CODE_LENGTH}-digit code.`);
      return;
    }

    dispatch(
      verifyPhoneChange({
        challengeId: phoneChange.challengeId,
        code,
        phoneNumber: phoneChange.phoneNumber,
      }),
    )
      .unwrap()
      .then(() => {
        dispatch(onClearPhoneChange());
        onClose();
      })
      .catch(() => setCode(""));
  };

  const handleBack = () => {
    dispatch(onClearPhoneChange());
    setCode("");
    setCooldown(0);
  };

  const isExpired = secondsLeft === 0;

  return (
    <div className="bg-white rounded-2xl p-6 w-[90vw] max-w-[420px] flex flex-col gap-4">
      <h3 className="text-[18px] font-semibold text-[#1E293B]">
        Change phone number
      </h3>

      {!phoneChange ? (
        <>
          <p className="text-sm text-[#475569]">
            Enter your new phone number. We'll send a confirmation code to{" "}
            <span className="font-medium break-all">
              {currentUser?.email || "your email address"}
            </span>
            .
          </p>
          <CustomTextInput
            label="New phone number"
            id="new-phone-number"
            type="tel"
            placeholder="+2348012345678"
            value={fullNumber}
            handleChange={(e) => setLocalDigits(parseLocalDigits(e.target.value))}
            otherInputProps={{
              maxLength: COUNTRY_PREFIX.length + LOCAL_DIGITS,
              inputMode: "tel",
            }}
          />
          <Button
            text={phoneCodeLoading ? "Sending code..." : "Send code"}
            onClick={handleSend}
            isDisabled={phoneCodeLoading || localDigits.length !== LOCAL_DIGITS}
            isLoading={phoneCodeLoading}
          />
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-[#64748B] underline self-center"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <p className="text-sm text-[#475569]">
            Enter the {CODE_LENGTH}-digit code sent to{" "}
            <span className="font-medium break-all">
              {currentUser?.email || "your email address"}
            </span>{" "}
            to change your number to{" "}
            <span className="font-medium">{phoneChange.phoneNumber}</span>.
          </p>
          <CustomTextInput
            label="Confirmation code"
            id="phone-change-code"
            placeholder="Enter the 6-digit code"
            value={code}
            handleChange={(e) =>
              setCode(e.target.value.replace(/\D/g, "").slice(0, CODE_LENGTH))
            }
            otherInputProps={{
              maxLength: CODE_LENGTH,
              inputMode: "numeric",
              autoComplete: "one-time-code",
            }}
          />
          <p
            className={`text-sm ${isExpired ? "text-red-600" : "text-[#64748B]"}`}
          >
            {secondsLeft === null
              ? ""
              : isExpired
                ? "This code has expired. Request a new one."
                : `Code expires in ${formatTime(secondsLeft)}`}
          </p>
          <Button
            text={verifyPhoneLoading ? "Verifying..." : "Verify and update"}
            onClick={handleVerify}
            isDisabled={
              verifyPhoneLoading || code.length !== CODE_LENGTH || isExpired
            }
            isLoading={verifyPhoneLoading}
          />
          <div className="flex flex-col items-center gap-2 text-sm">
            <p>
              Didn't get the code?{" "}
              <button
                type="button"
                onClick={handleResend}
                disabled={cooldown > 0 || phoneCodeLoading}
                className="text-[#4A148C] font-medium disabled:text-[#A8A8A8] disabled:cursor-not-allowed"
              >
                {phoneCodeLoading
                  ? "Sending..."
                  : cooldown > 0
                    ? `Resend in ${cooldown}s`
                    : "Resend code"}
              </button>
            </p>
            <button
              type="button"
              onClick={handleBack}
              className="text-[#64748B] underline"
            >
              Use a different number
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PhoneChangeModal;