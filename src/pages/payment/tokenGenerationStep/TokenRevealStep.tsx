import { useEffect, useState } from "react";
import { IoClose, IoCopyOutline, IoCheckmark } from "react-icons/io5";
import Logo from "../../../assets/logo-s.png";

interface Props {
  onClose: () => void;
  token: string;
  expiresAt: string;
}

const getRemainingSeconds = (expiresAt: string) =>
  Math.max(0, Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000));

const formatRemaining = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const rest = String(seconds % 60).padStart(2, "0");
  return `${minutes}:${rest}`;
};

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
    <div className="bg-white rounded-2xl w-full max-w-[370px] sm:max-w-[500px] md:max-w-[606px] mx-auto shadow-xl overflow-hidden border border-dashed border-[#D0D0F0]">
      <div className="px-5 pt-5 pb-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-montserrat font-bold text-[#0D0D0D] text-lg">
              Token Generated
            </h3>
            <p className="text-gray-400 text-[12px] font-ibmplex mt-0.5">
              Share this token with the merchant to complete the transaction.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-2xl text-black hover:text-gray-600 transition-colors"
          >
            <IoClose />
          </button>
        </div>

        <div className="flex flex-col items-center gap-4 py-6">
          <div className="flex items-center gap-3">
            <p
              className={`text-3xl font-montserrat font-bold tracking-[0.3em] ${
                expired ? "text-gray-400 line-through" : "text-[#030649]"
              }`}
            >
              {token}
            </p>
            <button
              onClick={handleCopy}
              disabled={expired}
              className="flex-center h-9 w-9 rounded-full border border-[#E5E6F5] text-[#4A148C] hover:bg-[#F5F3FF] disabled:opacity-40"
            >
              {copied ? <IoCheckmark size={16} /> : <IoCopyOutline size={16} />}
            </button>
          </div>

          <p
            className={`text-[13px] font-ibmplex ${
              expired ? "text-red-500" : "text-[#6B6B8A]"
            }`}
          >
            {expired
              ? "Token expired. Generate a new one."
              : `Expires in ${formatRemaining(remaining)}`}
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-[#4A148C] text-white font-montserrat font-semibold rounded-4xl py-3.5 text-[16px]"
        >
          Done
        </button>
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

export default TokenRevealStep;