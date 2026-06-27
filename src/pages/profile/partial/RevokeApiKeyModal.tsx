import { IoCloseCircleOutline } from "react-icons/io5";
import { PiWarningBold } from "react-icons/pi";
import Button from "../../../components/Button";
import { RiErrorWarningFill } from "react-icons/ri";

interface Props {
  secretValue: string;
  onClose: () => void;
  onRevoke: () => void;
}

const RevokeApiKeyModal = ({ secretValue, onClose, onRevoke }: Props) => {
  return (
    <div className="bg-white rounded-2xl w-full max-w-[370px] sm:max-w-[500px] mx-auto md:max-w-[606px] shadow-xl p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <PiWarningBold size={22} className="text-red-500" />
          <h3 className="font-bold text-[#93000A] text-lg">Revoke API key?</h3>
        </div>
        <button
          onClick={onClose}
          className="text-2xl text-[#1E293B] hover:text-gray-500 transition-colors ml-3 shrink-0"
        >
          <IoCloseCircleOutline />
        </button>
      </div>

      <p className="text-sm text-[#475569] font-mono mb-4">{secretValue}</p>

      <div className="flex items-start gap-2.5 bg-red-50 border border-red-100 rounded-xl px-3.5 py-3 mb-6">
        <RiErrorWarningFill
          size={26}
          className="text-[#93000A] mt-0.5 shrink-0"
        />
        <p className=" text-[#93000A] text-[13px] sm:text-[15px] font-bold  leading-relaxed">
          Warning: This action is permanent and cannot be undone.{" "}
          <span className=" sm:text-[14px] text-[12px]">
            All active integrations using this key will break immediately
          </span>
        </p>
      </div>

      <div className="flex gap-3 flex-col sm:flex-row">
        <Button
          text="Cancel"
          onClick={onClose}
          colorBg="white"
          fontSize="16px"
          height="h-[50px]"
        />
        <Button
          text="Permanently revoke"
          onClick={onRevoke}
          height="h-[50px]"
          colorBg="red"
          fontSize="16px"
        />
      </div>
    </div>
  );
};

export default RevokeApiKeyModal;
