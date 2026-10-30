import { FiCheckCircle, FiInfo } from "react-icons/fi";
import Button from "../../components/Button";
import { formatAmount, formatExpiry, getInitials } from "../../utils";

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
        <FiCheckCircle size={18} className="text-[#1A932E]" />
        <span className="font-montserrat text-[15px] font-bold text-light-black">
          Code validated
        </span>
      </div>
      <span className="text-[11px] font-ibmplex font-semibold text-[#1A932E] bg-[#1A932E]/10 px-2.5 py-1 rounded-full tracking-wide">
        VALID
      </span>
    </div>

    <div className="bg-primary-purple/5 border border-primary-purple/15 rounded-xl p-4 flex items-center gap-3 mb-5">
      <div className="w-[44px] h-[44px] rounded-full bg-primary-purple text-white flex items-center justify-center text-[13px] font-montserrat font-semibold shrink-0">
        {getInitials(data.customerName)}
      </div>
      <div className="min-w-0">
        <p className="font-ibmplex text-[14px] font-semibold text-light-black truncate">
          {data.customerName}
        </p>
        <p className="font-ibmplex text-[12px] text-gray-500 mt-0.5">
          {data.phoneNumber}
        </p>
      </div>
    </div>

    <div className="divide-y divide-gray-100 mb-5">
      {[
        {
          label: "Code used",
          value: formattedCode,
          className: "font-semibold text-light-black",
        },
        {
          label: "Points",
          value: `${data.points.toLocaleString()} pts`,
          className: "font-semibold text-primary-purple",
        },
        {
          label: "Equivalent value",
          value: formatAmount(data.currencySymbol, data.amount),
          className: "font-semibold text-light-black",
        },
        {
          label: "Code expires",
          value: formatExpiry(data.expiresAt),
          className: "text-gray-700",
        },
      ].map(({ label, value, className }) => (
        <div
          key={label}
          className="flex items-center justify-between gap-3 py-3"
        >
          <span className="font-ibmplex text-[13.5px] text-gray-500">
            {label}
          </span>
          <span className={`font-ibmplex text-[13.5px] ${className}`}>
            {value}
          </span>
        </div>
      ))}
    </div>

    <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-200 rounded-xl px-3.5 py-3 mb-5">
      <FiInfo size={15} className="text-amber-600 shrink-0 mt-0.5" />
      <p className="font-ibmplex text-[12px] text-gray-700 leading-[1.55]">
        Confirm the details above, then click Submit to complete the transaction
        and release the product to the customer.
      </p>
    </div>

    <div className="flex flex-col-reverse sm:flex-row gap-3">
      <div className="sm:flex-1">
        <Button
          text="Cancel"
          onClick={onCancel}
          isDisabled={loading}
          colorBg="white"
        />
      </div>
      <div className="sm:flex-[2]">
        <Button
          text={loading ? "Submitting..." : "Confirm & Submit"}
          onClick={onConfirm}
          isDisabled={loading}
          isLoading={loading}
          icon={<FiCheckCircle size={15} />}
        />
      </div>
    </div>
  </div>
);

export default ValidateStep;