import { FiLock, FiInfo } from "react-icons/fi";
import { CustomTextInput } from "../../components/CustomInput";
import Button from "../../components/Button";
import type { InputEvent } from "../../types";
import { PIN_LENGTH } from "./constants";

type PinStepProps = {
  pin: string;
  pinError: boolean;
  onChange: (e: InputEvent) => void;
  onContinue: () => void;
  onBack: () => void;
};

const PinStep = ({
  pin,
  pinError,
  onChange,
  onContinue,
  onBack,
}: PinStepProps) => (
  <div>
    <div className="flex items-center justify-center mb-5">
      <div className="w-[56px] h-[56px] rounded-2xl bg-primary-purple/10 flex items-center justify-center">
        <FiLock size={24} className="text-primary-purple" />
      </div>
    </div>

    <h2 className="font-montserrat text-[18px] font-bold text-light-black text-center mb-2">
      Customer PIN
    </h2>
    <p className="font-ibmplex text-[13px] text-gray-500 text-center leading-[1.6] mb-6 max-w-[320px] mx-auto">
      Ask the customer to enter their {PIN_LENGTH}-digit transaction PIN to
      confirm this payment.
    </p>

    <div className="mb-4">
      <CustomTextInput
        label="Transaction PIN"
        id="pin"
        type="password"
        placeholder={`Enter ${PIN_LENGTH}-digit PIN`}
        value={pin}
        handleChange={onChange}
        borderColor={pinError ? "#F87171" : undefined}
        otherInputProps={{
          inputMode: "numeric",
          maxLength: PIN_LENGTH,
          autoComplete: "off",
          autoFocus: true,
        }}
      />
    </div>

    <div
      className={`flex items-center gap-2 text-[12.5px] font-ibmplex rounded-xl px-3.5 py-3 mb-5 transition-colors ${
        pinError
          ? "bg-default-red/10 text-default-red"
          : "bg-primary-purple/5 text-gray-700"
      }`}
    >
      <FiInfo
        size={15}
        className={`shrink-0 ${pinError ? "" : "text-primary-purple"}`}
      />
      <span>The PIN is never shown or stored on this screen</span>
    </div>

    <div className="flex flex-col-reverse sm:flex-row gap-3">
      <div className="sm:flex-1">
        <Button text="Back" onClick={onBack} colorBg="white" />
      </div>
      <div className="sm:flex-[2]">
        <Button
          text="Confirm PIN"
          onClick={onContinue}
          icon={<FiLock size={15} />}
        />
      </div>
    </div>
  </div>
);

export default PinStep;