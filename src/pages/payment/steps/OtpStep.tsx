import { useState, useEffect, useRef } from "react";
import { IoCloseCircleOutline, IoCheckmarkCircle } from "react-icons/io5";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import { FaClock } from "react-icons/fa";
import Logo from "../../../assets/logo-s.png";
import StepBar from "./StepBar";
import { OtpInput } from "../../../components/CustomInput";
import type { Merchant, Step } from "./types";
import { EXCHANGE_RATE, OTP_EXPIRY_SECONDS } from "./types";

interface Props {
  onClose: () => void;
  merchant: Merchant;
  points: number;
  onInvalidate: () => void;
}

const OtpStep = ({ onClose, merchant, points, onInvalidate }: Props) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(OTP_EXPIRY_SECONDS);
  const [invalidated, setInvalidated] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(intervalRef.current!);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current!);
  }, []);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const isExpired = timeLeft === 0;
  const isDisabled = invalidated || isExpired;
  const isFilled = otp.every((d) => d !== "");

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (!pasted) return;
    const next = [...otp];
    pasted.split("").forEach((char, i) => {
      next[i] = char;
    });
    setOtp(next);
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleInvalidate = () => {
    setInvalidated(true);
    clearInterval(intervalRef.current!);
    onInvalidate();
  };

  return (
    <div className="bg-white rounded-2xl w-full max-w-[506px] md:max-w-[606px] mx-auto shadow-xl overflow-hidden border border-dashed border-[#D0D0F0]">
      <div className="px-5 pt-5 pb-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-montserrat font-bold text-[#0D0D0D] text-lg">
              Send Points
            </h3>
            <p className="text-gray-400 text-[12px] font-ibmplex mt-0.5">
              Show or read this code to the merchant at checkout.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-2xl text-black hover:text-gray-600 transition-colors"
          >
            <IoCloseCircleOutline />
          </button>
        </div>

        <StepBar current={4 as Step} />

        <div className="flex items-center justify-between bg-[#F7F6FF] border border-[#E8E0FF] rounded-xl px-4 py-3 mb-5">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
              style={{ background: merchant.color }}
            >
              {merchant.initials}
            </div>
            <div>
              <p className="text-[11px] font-ibmplex text-[#9E9EB8]">
                For {merchant.name}
              </p>
              <p className="text-[12px] font-ibmplex font-bold text-[#0D0D0D]">
                {points.toLocaleString()} pts · ₦
                {(points * EXCHANGE_RATE).toLocaleString("en-NG", {
                  minimumFractionDigits: 0,
                })}
              </p>
            </div>
          </div>
          <IoCheckmarkCircle size={22} className="text-[#4A148C]" />
        </div>

        <div
          className={`flex items-center justify-center gap-2.5 transition-opacity ${isDisabled ? "opacity-30" : ""}`}
        >
          {otp.map((digit, i) => (
            <>
              {i === 3 && (
                <span
                  key="dot"
                  className="text-[#4A148C] font-bold text-2xl mx-0.5"
                >
                  ·
                </span>
              )}
              <OtpInput
                key={i}
                index={i}
                digit={digit}
                hasError={false}
                inputRefs={inputRefs}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onPaste={handlePaste}
                disabled={isDisabled}
              />
            </>
          ))}
        </div>

        <div className="flex items-center justify-center gap-1.5 mt-3 mb-4">
          {isExpired ? (
            <p className="text-xs font-ibmplex text-red-500 font-semibold">
              Code expired
            </p>
          ) : (
            <>
              <FaClock size={12} className="text-[#4A148C]" />
              <p className="text-[12px] font-ibmplex text-[#4A148C] font-semibold">
                Expires in {mins}:{secs.toString().padStart(2, "0")}
              </p>
            </>
          )}
        </div>

        <div className="flex items-start gap-2.5 bg-[#F5F5F5] rounded-lg px-3.5 py-3">
          <HiOutlineInformationCircle
            size={16}
            className="text-[#6B6B8A] mt-0.5 shrink-0"
          />
          <p className="text-[12px] font-ibmplex text-[#6B6B8A] leading-relaxed">
            This code is for one-time use only. Present it to the merchant's
            terminal to complete your transaction. Do not share this code with
            anyone other than the official merchant.
          </p>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleInvalidate}
            disabled={isDisabled}
            className="flex-1 border border-red-400 text-red-500 font-montserrat font-semibold rounded-4xl py-3.5 text-sm disabled:opacity-40"
          >
            Invalidate this code
          </button>
          <button
            onClick={onClose}
            disabled={!isFilled}
            className="flex-1 bg-[#4A148C] text-white font-montserrat font-semibold rounded-4xl py-3.5 text-sm disabled:opacity-40"
          >
            Done
          </button>
        </div>
      </div>

      <div className="flex justify-center items-center py-3 border-t border-gray-100">
        <div className="flex items-center">
          <img src={Logo} alt="logo" className="w-[40px]" />
          <span className="font-poppins font-medium text-[#000000] -ml-1 text-sm">
            reech
          </span>
        </div>
      </div>
    </div>
  );
};

export default OtpStep;
