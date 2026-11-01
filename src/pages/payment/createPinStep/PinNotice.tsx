import type { ReactNode } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";

interface Props {
  children: ReactNode;
}

const PinNotice = ({ children }: Props) => (
  <div className="bg-[#FFF4E9] rounded-xl px-4 py-3 flex items-start gap-2 shrink-0">
    <IoInformationCircleOutline
      size={18}
      className="text-[#C77B26] mt-0.5 shrink-0"
    />
    <p className="text-[#8A5A1E] text-[13px] leading-relaxed">{children}</p>
  </div>
);

export default PinNotice;