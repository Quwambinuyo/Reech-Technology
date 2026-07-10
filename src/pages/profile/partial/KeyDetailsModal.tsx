import { IoCloseCircleOutline, IoCopyOutline } from "react-icons/io5";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import Button from "../../../components/Button";
import { formatDateTime } from "../../../utils";
import { toast } from "react-toastify";
import { useAppSelector } from "../../../redux/hooks";

interface Props {
  apiKey: string;
  plainKey?: string;
  status: string;
  createdBy?: string;
  createdByInitials?: string;
  createdDate: string;
  lastUsed?: string;
  onClose: () => void;
  onRotate: () => void;
}

const KeyDetailsModal = ({
  apiKey,
  plainKey,
  status,
  createdBy = "—",
  createdByInitials = "",
  createdDate,
  onClose,
  onRotate,
}: Props) => {
  const displayKey = plainKey || apiKey;

  const { currentUser } = useAppSelector((state) => state.auth);

  const creatorName =
    createdBy !== "—"
      ? createdBy
      : `${currentUser?.firstName || ""} ${currentUser?.lastName || ""}`.trim();

  const creatorInitials =
    createdByInitials ||
    `${currentUser?.firstName?.charAt(0) || ""}${currentUser?.lastName?.charAt(0) || ""}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(displayKey);
    toast.success("API key copied to clipboard");
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
              {displayKey}
            </p>

            <button
              onClick={handleCopy}
              className="text-primary-purple shrink-0 hover:opacity-70 transition-opacity"
            >
              <IoCopyOutline size={18} />
            </button>
          </div>

          {plainKey && (
            <p className="text-[11px] text-orange-500">
              This is the only time your full key will be shown. Copy and store
              it securely.
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-[#94A3B8] font-medium uppercase tracking-wider mb-1.5">
              Status
            </p>

            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                status === "Active"
                  ? "bg-green-50 text-green-600"
                  : "bg-[#F1F5F9] text-[#94A3B8]"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  status === "Active" ? "bg-green-500" : "bg-[#94A3B8]"
                }`}
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
                {creatorInitials || "—"}
              </div>

              <p className="text-sm text-[#1E293B] font-medium whitespace-nowrap">
                {creatorName || "—"}
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs text-[#94A3B8] font-medium uppercase tracking-wider mb-1.5">
              Created Date
            </p>

            <p className="text-sm text-[#1E293B] font-medium">
              {formatDateTime(createdDate)}
            </p>
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
