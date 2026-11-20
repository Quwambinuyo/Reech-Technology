import { FaSpinner } from "react-icons/fa6";
import { ProgressBar } from "../../components/ProgressBar";
import {
  NOT_SET,
  outlineButton,
  primaryButton,
} from "../manage-merchant/OfflineHelpers";

export type BatchSummaryLine = {
  key: number;
  name: string;
  quantity: number;
};

type BatchSummaryProps = {
  merchant: string | null;
  reference: string;
  expiryDate: Date | null;
  lines: BatchSummaryLine[];
  total: number;
  totalPoints: number;
  maxCodes: number;
  isLoading: boolean;
  canSubmit: boolean;
  onCancel: () => void;
};

const SummaryLine = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-start justify-between gap-4 text-sm">
    <span className="text-[#64748B]">{label}</span>
    <span className="min-w-0 break-words text-right font-medium text-[#1E293B]">
      {value}
    </span>
  </div>
);

const formatExpiry = (date: Date) =>
  date.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const BatchSummary = ({
  merchant,
  reference,
  expiryDate,
  lines,
  total,
  totalPoints,
  maxCodes,
  isLoading,
  canSubmit,
  onCancel,
}: BatchSummaryProps) => {
  const isOverLimit = total > maxCodes;

  return (
    <aside className="flex flex-col gap-5 rounded-xl bg-white p-5 md:p-6 lg:sticky lg:top-4">
      <div>
        <h5 className="font-semibold text-[#1E293B]">Batch summary</h5>
        <p className="text-sm text-[#64748B]">Check this before you generate.</p>
      </div>

      <div className="flex flex-col gap-3">
        <SummaryLine label="Merchant" value={merchant ?? NOT_SET} />
        <SummaryLine label="Reference" value={reference || NOT_SET} />
        <SummaryLine
          label="Expires"
          value={expiryDate ? formatExpiry(expiryDate) : NOT_SET}
        />
      </div>

      <div className="flex flex-col gap-2 border-t border-[#E2E8F0] pt-4">
        {lines.length === 0 ? (
          <p className="text-sm text-[#64748B]">No activities added yet.</p>
        ) : (
          lines.map((line) => (
            <div
              key={line.key}
              className="flex items-start justify-between gap-4 text-sm"
            >
              <span className="min-w-0 truncate text-[#475569]">
                {line.name}
              </span>
              <span className="shrink-0 font-medium tabular-nums text-[#1E293B]">
                {line.quantity.toLocaleString()} codes
              </span>
            </div>
          ))
        )}
      </div>

      <div className="flex flex-col gap-3 border-t border-[#E2E8F0] pt-4">
        <div className="flex items-end justify-between gap-4">
          <span className="text-sm text-[#64748B]">Total codes</span>
          <span
            className={`text-xl font-semibold tabular-nums ${
              isOverLimit ? "text-[#B91C1C]" : "text-[#1E293B]"
            }`}
          >
            {total.toLocaleString()}
            <span className="text-sm font-normal text-[#64748B]">
              {" "}
              of {maxCodes.toLocaleString()}
            </span>
          </span>
        </div>

        <ProgressBar
          value={Math.min(total, maxCodes)}
          max={maxCodes}
          label="Codes in this batch"
          className="w-full"
        />

        {isOverLimit && (
          <p role="alert" className="text-xs text-[#B91C1C]">
            A batch can hold at most {maxCodes.toLocaleString()} codes. Remove{" "}
            {(total - maxCodes).toLocaleString()} to continue.
          </p>
        )}

        <SummaryLine
          label="Points if all claimed"
          value={totalPoints.toLocaleString()}
        />
      </div>

      <div className="flex flex-col gap-3">
        <button
          type="submit"
          disabled={!canSubmit}
          className={`${primaryButton} w-full`}
        >
          {isLoading && <FaSpinner className="animate-spin" />}
          {isLoading ? "Generating..." : "Generate codes"}
        </button>
        <button
          type="button"
          disabled={isLoading}
          onClick={onCancel}
          className={`${outlineButton} w-full`}
        >
          Cancel
        </button>
      </div>
    </aside>
  );
};

export default BatchSummary;