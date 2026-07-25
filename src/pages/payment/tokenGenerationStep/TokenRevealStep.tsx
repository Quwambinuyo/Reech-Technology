import { useState } from "react";
import { IoClose, IoCopyOutline, IoCheckmark } from "react-icons/io5";
import Logo from "../../../assets/logo-s.png";

interface Props {
  onClose: () => void;
  token: string;
}

const TokenRevealStep = ({ onClose, token }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(token);
    setCopied(true);
  };

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
            <p className="text-[#030649] text-3xl font-montserrat font-bold tracking-[0.3em]">
              {token}
            </p>
            <button
              onClick={handleCopy}
              className="flex-center h-9 w-9 rounded-full border border-[#E5E6F5] text-[#4A148C] hover:bg-[#F5F3FF]"
            >
              {copied ? <IoCheckmark size={16} /> : <IoCopyOutline size={16} />}
            </button>
          </div>
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
