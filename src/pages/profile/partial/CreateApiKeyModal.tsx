import { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import Button from "../../../components/Button";

interface Props {
  onClose: () => void;
  onGenerate: (name: string, permission: string) => void;
}

const permissions = ["Read & Write", "Read Only", "Write Only"];

const CreateApiKeyModal = ({ onClose, onGenerate }: Props) => {
  const [keyName, setKeyName] = useState("");
  const [permission, setPermission] = useState("Read & Write");

  return (
    <div className="bg-white rounded-2xl w-full max-w-[370px] sm:max-w-[500px] mx-auto md:max-w-[606px] shadow-xl p-6">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-[#1E293B] text-lg">Create API Key</h3>
          <p className="text-[#475569] text-[13px] mt-1 max-w-[300px] leading-relaxed">
            Set a descriptive name for your key and define its scope. You will
            only be able to see the full secret key once after generation.
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-2xl text-[#1E293B] hover:text-gray-500 transition-colors ml-3 shrink-0"
        >
          <IoCloseCircleOutline />
        </button>
      </div>

      <div className="flex flex-col gap-4 mt-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-[#1E293B] font-medium">Key name</label>
          <input
            type="text"
            placeholder="e.g., Mobile App - Staging"
            value={keyName}
            onChange={(e) => setKeyName(e.target.value)}
            className="border border-[#E2E8F0] rounded-xl px-4 py-2.5 text-sm text-[#1E293B] placeholder:text-[#CBD5E1] outline-none focus:border-primary-purple transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm text-[#1E293B] font-medium">
            Permissions
          </label>
          <div className="relative">
            <select
              value={permission}
              onChange={(e) => setPermission(e.target.value)}
              className="w-full border border-[#E2E8F0] rounded-xl px-4 py-2.5 text-sm text-[#1E293B] outline-none focus:border-primary-purple appearance-none bg-white transition-colors cursor-pointer"
            >
              {permissions.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8]">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2.5 bg-[#EEF0FF] rounded-xl px-3.5 py-3">
          <HiOutlineInformationCircle
            size={16}
            className="text-primary-purple mt-0.5 shrink-0"
          />
          <p className="text-[12px] text-[#3D3D6B] leading-relaxed">
            This key will provide access to sensitive transaction data. Ensure
            it is stored securely.
          </p>
        </div>
      </div>

      <div className="flex flex-col  sm:flex-row gap-3 mt-6">
        <Button
          text="Cancel"
          onClick={onClose}
          colorBg="white"
          fontSize="16px"
          height="h-[50px]"
        />
        <Button
          text="Generate Key"
          onClick={() => keyName.trim() && onGenerate(keyName, permission)}
          isDisabled={!keyName.trim()}
          fontSize="16px"
          height="h-[50px]"
        />
      </div>
    </div>
  );
};

export default CreateApiKeyModal;
