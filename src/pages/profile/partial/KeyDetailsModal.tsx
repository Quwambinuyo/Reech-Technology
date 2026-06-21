import { IoCloseCircleOutline } from "react-icons/io5";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import { IoCopyOutline } from "react-icons/io5";
import Button from "../../../components/Button";

interface Props {
  apiKey: string;
  status: "active" | "inactive";
  createdBy: string;
  createdByInitials: string;
  createdDate: string;
  lastUsed: string;
  onClose: () => void;
  onRotate: () => void;
}

const KeyDetailsModal = ({
  apiKey,
  status,
  createdBy,
  createdByInitials,
  createdDate,
  lastUsed,
  onClose,
  onRotate,
}: Props) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
  };

  return (
    <div className="bg-white rounded-2xl w-full max-w-[506px] md:max-w-[606px] mx-auto shadow-xl p-6">
      <div className="flex justify-between items-center mb-5">
        <h3 className="font-bold text-[#1E293B] text-lg">Key Details</h3>
        <button
          onClick={onClose}
          className="text-2xl text-[#1E293B] hover:text-gray-500 transition-colors"
        >
          <IoCloseCircleOutline />
        </button>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-[#475569] font-medium">API Key</label>
          <div className="flex items-center justify-between bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3">
            <p className="text-sm font-mono text-[#1E293B] truncate pr-3">
              {apiKey}
            </p>
            <button
              onClick={handleCopy}
              className="text-primary-purple shrink-0 hover:opacity-70 transition-opacity"
            >
              <IoCopyOutline size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-[#94A3B8] font-medium uppercase tracking-wider mb-1.5">
              Status
            </p>
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                status === "active"
                  ? "bg-green-50 text-green-600"
                  : "bg-[#F1F5F9] text-[#94A3B8]"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${status === "active" ? "bg-green-500" : "bg-[#94A3B8]"}`}
              />
              {status.toUpperCase()}
            </span>
          </div>
          <div>
            <p className="text-xs text-[#94A3B8] font-medium uppercase tracking-wider mb-1.5">
              Created By
            </p>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary-purple flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                {createdByInitials}
              </div>
              <p className="text-sm text-[#1E293B] font-medium">{createdBy}</p>
            </div>
          </div>
          <div>
            <p className="text-xs text-[#94A3B8] font-medium uppercase tracking-wider mb-1.5">
              Created Date
            </p>
            <p className="text-sm text-[#1E293B] font-medium">{createdDate}</p>
          </div>
          <div>
            <p className="text-xs text-[#94A3B8] font-medium uppercase tracking-wider mb-1.5">
              Last Used
            </p>
            <p className="text-sm text-[#1E293B] font-medium">{lastUsed}</p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 bg-orange-50 border border-orange-100 rounded-xl px-3.5 py-3">
          <HiOutlineInformationCircle
            size={16}
            className="text-orange-400 mt-0.5 shrink-0"
          />
          <p className="text-[12px] text-orange-700 leading-relaxed">
            Rotating this key will immediately invalidate the existing one.
            Ensure your applications are updated with the new key to prevent
            service disruption.
          </p>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <Button text="Cancel" onClick={onClose} colorBg="white" />
        <Button text="Rotate key" onClick={onRotate} />
      </div>
    </div>
  );
};

export default KeyDetailsModal;
