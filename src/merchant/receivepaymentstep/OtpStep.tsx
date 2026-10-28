import { FiShield, FiInfo } from "react-icons/fi";
import { CustomTextInput } from "../../components/CustomInput";
import { MdOutline123 } from "react-icons/md";
import type { InputEvent } from "../../types";

export type OtpStepProps = {
  code: string;
  otpError: boolean;
  loading: boolean;
  onChange: (e: InputEvent) => void;
  onValidate: () => void;
};

const OtpStep = ({
  code,
  otpError,
  loading,
  onChange,
  onValidate,
}: OtpStepProps) => (
  <div>
    <div className="flex items-center justify-center mb-5">
      <div className="w-[52px] h-[52px] rounded-xl bg-violet-100 flex items-center justify-center">
        <MdOutline123 size={56} className="text-violet-600" />
      </div>
    </div>

    <h2 className="text-[18px] font-semibold text-gray-900 text-center mb-2">
      Enter Customer Code
    </h2>
    <p className="text-[13px] text-gray-500 text-center leading-[1.6] mb-6 max-w-[300px] mx-auto">
      Ask the customer for their 6-digit Generated Reference and enter it below
      to validate the transaction.
    </p>

    <div className="mb-4">
      <CustomTextInput
        label="Customer code"
        id="code"
        type="text"
        placeholder="Enter 6-digit code"
        value={code}
        handleChange={onChange}
        borderColor={otpError ? "#F87171" : undefined}
        otherInputProps={{
          inputMode: "numeric",
          maxLength: 6,
          autoComplete: "off",
          autoFocus: true,
          disabled: loading,
        }}
      />
    </div>

    <div
      className={`flex items-center gap-2 justify-center text-[12.5px] rounded-lg px-3 py-2.5 mb-4 transition-colors ${
        otpError ? "bg-red-50 text-red-600" : "bg-orange-50 text-orange-600"
      }`}
    >
      <FiInfo size={14} className="flex-shrink-0" />
      <span>Enter the 6-digit code provided by the customer</span>
    </div>

    <button
      onClick={onValidate}
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 bg-primary-purple text-white py-3.5 rounded-full text-[14px] font-medium hover:opacity-90 transition-opacity mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      <FiShield size={16} />
      {loading ? "Validating..." : "Validate Code"}
    </button>
  </div>
);

export default OtpStep;