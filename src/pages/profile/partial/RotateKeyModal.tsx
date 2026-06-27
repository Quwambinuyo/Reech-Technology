import { IoCloseCircleOutline } from "react-icons/io5";
import { PiWarningBold } from "react-icons/pi";
import Button from "../../../components/Button";

type ApiKey = {
  id: string;
  keyName: string;
  secretValue: string;
  fullKey: string;
  created: string;
  status: "active" | "inactive";
  createdBy: string;
  createdByInitials: string;
  lastUsed: string;
};

interface Props {
  apiKey: ApiKey;
  onClose: () => void;
  onRotate: () => void;
}

const RotateKeyModal = ({ apiKey, onClose, onRotate }: Props) => {
  return (
    <div className="bg-white rounded-2xl w-full sm:max-w-[500px] max-w-[370px] mx-auto md:max-w-[606px] shadow-xl p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-[#1E293B] text-lg">Rotate Key</h3>
          <p className="text-[#94A3B8] text-xs mt-0.5">
            Update your secret API key to maintain security standards.
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-2xl text-[#1E293B] hover:text-gray-500 transition-colors ml-3 shrink-0"
        >
          <IoCloseCircleOutline />
        </button>
      </div>

      <div
        className="flex items-start h-[121px] gap-2.5 border border-amber-100 rounded-xl px-3.5 py-3.5 mb-6"
        style={{
          background: "linear-gradient(to right, #FFDCC1, #FFDCC5)",
        }}
      >
        <PiWarningBold size={26} className="text-[#623F1D] mt-0.5 shrink-0" />
        <div>
          <p className="text-[13px] sm:text-[15px] text-[#623F1D] font-semibold mb-1">
            Critical Action
          </p>
          <p className="sm:text-[14px] text-[12px] text-[#623F1D] leading-relaxed">
            Rotating your key will invalidate the old key immediately. Any
            integrations currently using the old key will stop working until
            updated.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-[12px] text-[#94A3B8]">Current key</span>
          <span className="text-[12px] font-mono text-[#1E293B] bg-[#F1F5F9] px-3 py-1 rounded-lg">
            {apiKey.secretValue}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[12px] text-[#94A3B8]">Created</span>
          <span className="text-[12px] text-[#1E293B]">{apiKey.created}</span>
        </div>
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
          text="Rotate now"
          onClick={onRotate}
          fontSize="16px"
          height="h-[50px]"
        />
      </div>
    </div>
  );
};

export default RotateKeyModal;
