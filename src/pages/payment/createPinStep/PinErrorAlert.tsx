import { IoAlertCircleOutline } from "react-icons/io5";
import { parseAttemptsError } from "./pinUtils";

interface Props {
  message: string;
}

const PinErrorAlert = ({ message }: Props) => {
  if (!message) {
    return null;
  }

  const { text, attemptsLeft } = parseAttemptsError(message);

  return (
    <div
      role="alert"
      className="bg-[#FEF2F2] border border-[#FECACA] rounded-xl px-4 py-3 flex items-start gap-2.5 shrink-0"
    >
      <IoAlertCircleOutline
        size={20}
        className="text-[#DC2626] mt-0.5 shrink-0"
      />
      <div className="flex flex-col gap-1">
        <p className="text-[#991B1B] text-[13px] font-semibold">{text}</p>
        {attemptsLeft !== null && (
          <p className="text-[#B91C1C] text-xs">
            You have{" "}
            <span className="font-semibold">
              {attemptsLeft} {attemptsLeft === 1 ? "attempt" : "attempts"}
            </span>{" "}
            left.
          </p>
        )}
      </div>
    </div>
  );
};

export default PinErrorAlert;