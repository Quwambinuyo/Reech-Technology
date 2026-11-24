import { FiShield, FiInfo } from "react-icons/fi";
import { CustomTextInput } from "../../components/CustomInput";
import { MdOutline123 } from "react-icons/md";
import Button from "../../components/Button";
import type { InputEvent } from "../../types";
import { CODE_LENGTH } from "./constants";

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
      <div className="w-[56px] h-[56px] rounded-2xl bg-primary-purple/10 flex items-center justify-center">
        <MdOutline123 size={34} className="text-primary-purple" />
      </div>
    </div>

    <h2 className="font-montserrat text-[18px] font-bold text-light-black text-center mb-2">
      Enter Customer Code
    </h2>
    <p className="font-ibmplex text-[13px] text-gray-500 text-center leading-[1.6] mb-6 max-w-[320px] mx-auto">
      Ask the customer for their {CODE_LENGTH}-digit Generated Reference and
      enter it below to validate the transaction.
    </p>

    <div className="mb-4">
      <CustomTextInput
        label="Customer code"
        id="code"
        type="text"
        placeholder="e.g. 482 913 5570"
        value={code}
        handleChange={onChange}
        borderColor={otpError ? "#F87171" : undefined}
        otherInputProps={{
          inputMode: "numeric",
          maxLength: CODE_LENGTH,
          autoComplete: "off",
          autoFocus: true,
          disabled: loading,
        }}
      />
    </div>

    <div
      className={`flex items-center gap-2 text-[12.5px] font-ibmplex rounded-xl px-3.5 py-3 mb-5 transition-colors ${
        otpError
          ? "bg-default-red/10 text-default-red"
          : "bg-primary-purple/5 text-gray-700"
      }`}
    >
      <FiInfo
        size={15}
        className={`shrink-0 ${otpError ? "" : "text-primary-purple"}`}
      />
      <span>Enter the {CODE_LENGTH}-digit code provided by the customer</span>
    </div>

    <Button
      text={loading ? "Validating..." : "Validate Code"}
      onClick={onValidate}
      isDisabled={loading}
      isLoading={loading}
      icon={<FiShield size={16} />}
    />
  </div>
);

export default OtpStep;