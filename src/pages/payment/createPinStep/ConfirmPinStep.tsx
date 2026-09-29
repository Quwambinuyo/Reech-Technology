import { useEffect, useRef, useState } from "react";
import { IoClose, IoInformationCircleOutline } from "react-icons/io5";
import logo from "../../../assets/logo-s.png";
import { OtpInput } from "../../../components/CustomInput";
import { sanitizeDigits } from "../../../../src/utils";

interface Props {
  onClose: () => void;
  onBack: () => void;
  onConfirm: (pin: string) => void;
  originalPin: string;
  loading?: boolean;
}

const PIN_LENGTH = 4;

const ConfirmPinStep = ({
  onClose,
  onBack,
  onConfirm,
  originalPin,
  loading = false,
}: Props) => {
  const [digitsArr, setDigitsArr] = useState<string[]>(
    Array(PIN_LENGTH).fill(""),
  );
  const [error, setError] = useState("");
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, raw: string) => {
    const digit = sanitizeDigits(raw).slice(-1);
    const next = digitsArr.slice();
    next[index] = digit;
    setDigitsArr(next);

    if (error) {
      setError("");
    }

    if (digit && index < PIN_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleContinue = () => {
    if (loading) {
      return;
    }

    const pin = digitsArr.join("");
    if (pin.length !== PIN_LENGTH) {
      setError(`Enter all ${PIN_LENGTH} digits to continue`);
      return;
    }
    if (pin !== originalPin) {
      setError("PINs do not match, please try again");
      setDigitsArr(Array(PIN_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
      return;
    }
    setError("");
    onConfirm(pin);
  };

  return (
    <div className="bg-white rounded-2xl h-auto max-h-[70vh] md:h-[600px] md:max-h-[65vh] w-full max-w-[370px] sm:max-w-[500px] md:max-w-[606px] mx-auto shadow-xl border border-dashed border-[#D0D0F0] p-6 flex flex-col gap-5">
      <div className="flex items-start justify-between shrink-0">
        <div className="flex flex-col gap-1">
          <h3 className="text-[#030649] text-lg font-semibold">
            Confirm Transaction PIN
          </h3>
          <p className="text-[#797979] text-sm">Confirm Transaction PIN</p>
        </div>

        <button
          onClick={onClose}
          className="flex-center h-8 w-8 rounded-full border border-[#E5E6F5] text-[#797979] hover:bg-[#F5F6FF]"
        >
          <IoClose size={18} />
        </button>
      </div>

      <div className="flex-1 md:overflow-y-auto hide-scroll flex flex-col gap-4">
        <div className="flex items-center gap-2.5 md:gap-3 justify-center">
          {digitsArr.map((digit, index) => (
            <OtpInput
              key={index}
              index={index}
              digit={digit}
              hasError={!!error}
              inputRefs={inputRefs}
              onChange={handleChange}
            />
          ))}
        </div>

        {error && <p className="text-red-500 text-xs">{error}</p>}

        <div className="bg-[#FFF4E9] rounded-xl px-4 py-3 flex items-start gap-2">
          <IoInformationCircleOutline
            size={18}
            className="text-[#C77B26] mt-0.5 shrink-0"
          />
          <p className="text-[#8A5A1E] text-[13px] leading-relaxed">
            Re-enter your 6-digit PIN to confirm it and complete the setup.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-1 flex-col md:flex-row shrink-0">
        <button
          onClick={onBack}
          disabled={loading}
          className="flex-1 py-3 rounded-full border border-[#4A148C] text-[#4A148C] font-medium hover:bg-[#F5F3FF] transition-colors w-full disabled:opacity-60"
        >
          Back
        </button>

        <button
          onClick={handleContinue}
          disabled={loading}
          className="flex-1 py-3 rounded-full w-full bg-[#4A148C] text-white font-medium hover:bg-[#3A1070] transition-colors disabled:opacity-60"
        >
          {loading ? "Please wait..." : "Continue"}
        </button>
      </div>

      <div className="flex justify-center items-center py-3 border-t border-gray-100 shrink-0">
        <div className="flex items-center">
          <img src={logo} alt="logo" className="w-[40px]" />
          <span className="font-poppins font-medium text-[#000000] -ml-1 text-sm">
            Reech
          </span>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPinStep;
