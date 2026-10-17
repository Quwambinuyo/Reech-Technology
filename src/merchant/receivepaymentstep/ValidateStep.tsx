import { FiCheckCircle, FiInfo } from "react-icons/fi";

export type ValidatedPayment = {
  customerName: string;
  phoneNumber: string;
  points: number;
  amount: number;
  currencySymbol: string;
  expiresAt: string;
};

type ValidateStepProps = {
  formattedCode: string;
  data: ValidatedPayment;
  loading: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

const formatAmount = (symbol: string, amount: number) =>
  `${symbol}${amount.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;

const formatExpiry = (iso: string) =>
  new Date(iso).toLocaleString("en-NG", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

const ValidateStep = ({
  formattedCode,
  data,
  loading,
  onCancel,
  onConfirm,
}: ValidateStepProps) => (
  <div>
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-2">
        <FiCheckCircle size={18} className="text-green-600" />
        <span className="text-[15px] font-semibold text-gray-900">
          Code validated
        </span>
      </div>
      <span className="text-[11px] font-semibold text-green-700 bg-green-100 px-2.5 py-1 rounded-full tracking-wide">
        VALID
      </span>
    </div>

    <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3 mb-5">
      <div className="w-[44px] h-[44px] rounded-full bg-emerald-100 flex items-center justify-center text-[13px] font-semibold text-emerald-700 flex-shrink-0">
        {getInitials(data.customerName)}
      </div>
      <div>
        <p className="text-[14px] font-semibold text-gray-900">
          {data.customerName}
        </p>
        <p className="text-[12px] text-gray-500 mt-0.5">{data.phoneNumber}</p>
      </div>
    </div>

    <div className="divide-y divide-gray-100 mb-5">
      {[
        {
          label: "Code used",
          value: formattedCode,
          className: "font-semibold text-gray-900",
        },
        {
          label: "Points",
          value: `${data.points.toLocaleString()} pts`,
          className: "font-semibold text-violet-600",
        },
        {
          label: "Equivalent value",
          value: formatAmount(data.currencySymbol, data.amount),
          className: "font-semibold text-gray-900",
        },
        {
          label: "Code expires",
          value: formatExpiry(data.expiresAt),
          className: "text-gray-700",
        },
      ].map(({ label, value, className }) => (
        <div key={label} className="flex items-center justify-between py-3">
          <span className="text-[13.5px] text-gray-500">{label}</span>
          <span className={`text-[13.5px] ${className}`}>{value}</span>
        </div>
      ))}
    </div>

    <div className="flex items-start gap-2.5 bg-amber-50 rounded-lg px-3.5 py-3 mb-5">
      <FiInfo size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
      <p className="text-[12px] text-gray-600 leading-[1.55]">
        Confirm the details above, then click Submit to complete the transaction
        and release the product to the customer.
      </p>
    </div>

    <div className="flex gap-3">
      <button
        onClick={onCancel}
        disabled={loading}
        className="flex-1 py-3 rounded-full border border-gray-200 text-[13.5px] font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        Cancel
      </button>
      <button
        onClick={onConfirm}
        disabled={loading}
        className="flex-[2] py-3 rounded-full bg-green-800 text-white text-[13.5px] font-medium flex items-center justify-center gap-2 hover:bg-green-900 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <FiCheckCircle size={15} />
        {loading ? "Submitting..." : "Confirm & Submit"}
      </button>
    </div>
  </div>
);

export default ValidateStep;