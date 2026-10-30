import { useEffect, useState } from "react";
import {
  IoCloseCircleOutline,
  IoCopyOutline,
  IoCheckmark,
} from "react-icons/io5";
import Logo from "../../../assets/logo-s.png";
import Button from "../../../components/Button";
import {
  formatCode,
  formatRemaining,
  getRemainingSeconds,
} from "../../../utils";

interface Props {
  onClose: () => void;
  token: string;
  expiresAt: string;
}

const TokenRevealStep = ({ onClose, token, expiresAt }: Props) => {
  const [copied, setCopied] = useState(false);
  const [remaining, setRemaining] = useState(() =>
    getRemainingSeconds(expiresAt),
  );

  useEffect(() => {
    setRemaining(getRemainingSeconds(expiresAt));

    const id = setInterval(() => {
      const next = getRemainingSeconds(expiresAt);
      setRemaining(next);

      if (next === 0) clearInterval(id);
    }, 1000);

    return () => clearInterval(id);
  }, [expiresAt]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(token);
    setCopied(true);
  };

  const expired = remaining === 0;

  return (
    <div className="bg-white rounded-2xl w-11/12 max-w-[500px] md:max-w-[560px] mx-auto shadow-xl overflow-hidden relative">
      <div className="px-5 lg:px-6 pt-5 lg:pt-6 pb-5">
        <div className="pr-8">
          <h3 className="font-montserrat font-bold text-light-black text-lg">
            Token Generated
          </h3>
          <p className="text-gray-500 text-[13px] font-ibmplex mt-0.5">
            Share this token with the merchant to complete the transaction.
            Valid for 1 hour.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="absolute text-2xl lg:text-3xl top-4 lg:top-5 right-5 text-black hover:opacity-70 transition-opacity"
        >
          <IoCloseCircleOutline />
        </button>

        <div className="mt-6 mb-6 flex flex-col items-center gap-4 rounded-xl bg-primary-purple/5 border border-primary-purple/15 px-4 py-7">
          <div className="flex items-center gap-3">
            <p
              className={`text-2xl sm:text-3xl font-montserrat font-bold tracking-[0.12em] ${
                expired ? "text-gray-400 line-through" : "text-primary-purple"
              }`}
            >
              {formatCode(token)}
            </p>
            <button
              type="button"
              onClick={handleCopy}
              disabled={expired}
              title="Copy code"
              className="flex-center h-9 w-9 shrink-0 rounded-full border border-primary-purple/20 bg-white text-primary-purple hover:bg-primary-purple/10 transition-colors disabled:opacity-40"
            >
              {copied ? <IoCheckmark size={16} /> : <IoCopyOutline size={16} />}
            </button>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-[12px] font-ibmplex font-semibold ${
              expired
                ? "bg-default-red/10 text-default-red"
                : "bg-white text-gray-600 border border-primary-purple/15"
            }`}
          >
            {expired
              ? "Token expired. Generate a new one."
              : `Expires in ${formatRemaining(remaining)}`}
          </span>
        </div>

        <Button text="Done" onClick={onClose} />
      </div>

      <div className="flex justify-center items-center py-3 border-t border-gray-100">
        <div className="flex items-center">
          <img src={Logo} alt="logo" className="w-[40px]" />
          <span className="font-poppins font-medium text-light-black -ml-1 text-sm">
            reech
          </span>
        </div>
      </div>
    </div>
  );
};

export default TokenRevealStep;