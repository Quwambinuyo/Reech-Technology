import { IoCloseCircleOutline } from "react-icons/io5";
import { PiWarningBold } from "react-icons/pi";
import Button from "../../../components/Button";

interface Props {
  secretValue: string;
  onClose: () => void;
  onRevoke: () => void;
}

const RevokeApiKeyModal = ({ secretValue, onClose, onRevoke }: Props) => {
  return (
    <div className="bg-white rounded-2xl w-full max-w-[506px] mx-auto md:max-w-[606px] shadow-xl p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <PiWarningBold size={22} className="text-red-500" />
          <h3 className="font-bold text-[#1E293B] text-lg">Revoke API key?</h3>
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
        <PiWarningBold size={16} className="text-red-500 mt-0.5 shrink-0" />
        <p className="text-[12px] text-red-600 leading-relaxed">
          Warning: This action is permanent and cannot be undone.{" "}
          <span className="font-bold">
            All active integrations using this key will break immediately
          </span>
        </p>
      </div>

      <div className="flex gap-3">
        <Button text="Cancel" onClick={onClose} colorBg="white" />
        <Button text="Permanently revoke" onClick={onRevoke} colorBg="red" />
      </div>
    </div>
  );
};

export default RevokeApiKeyModal;
