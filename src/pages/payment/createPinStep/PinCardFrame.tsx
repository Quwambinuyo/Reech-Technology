import type { ReactNode } from "react";
import { IoClose } from "react-icons/io5";
import logo from "../../../assets/logo-s.png";

interface Props {
  onClose: () => void;
  children: ReactNode;
}

const PinCardFrame = ({ onClose, children }: Props) => (
  <div className="relative bg-white rounded-2xl w-full max-w-[370px] sm:max-w-[500px] md:max-w-[606px] mx-auto shadow-xl border border-dashed border-[#D0D0F0] p-6 flex flex-col gap-5">
    <button
      onClick={onClose}
      className="absolute top-6 right-6 z-10 flex-center h-8 w-8 rounded-full border border-[#E5E6F5] text-[#797979] bg-white hover:bg-[#F5F6FF]"
    >
      <IoClose size={18} />
    </button>

    {children}

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

export default PinCardFrame;