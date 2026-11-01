import { OtpInput } from "../../../components/CustomInput";
import type { DigitInputs } from "./useDigitInputs";

interface Props {
  input: DigitInputs;
  hasError: boolean;
  compact?: boolean;
}

const PinDigitRow = ({ input, hasError, compact = false }: Props) => (
  <div
    className={`flex items-center justify-center shrink-0 md:gap-3 ${
      compact ? "gap-2" : "gap-2.5"
    }`}
  >
    {input.digits.map((digit, index) => (
      <OtpInput
        key={index}
        index={index}
        digit={digit}
        hasError={hasError}
        inputRefs={input.refs}
        onChange={input.handleChange}
        onKeyDown={input.handleKeyDown}
      />
    ))}
  </div>
);

export default PinDigitRow;