import { FiCheckCircle, FiPlus, FiPrinter } from "react-icons/fi";

type ReceiptStepProps = {
  onNewTransaction: () => void;
};

const ReceiptStep = ({ onNewTransaction }: ReceiptStepProps) => (
  <div>
    <div className="flex items-center justify-center mb-5">
      <div className="w-[64px] h-[64px] rounded-full bg-green-100 border-4 border-green-200 flex items-center justify-center">
        <FiCheckCircle size={30} className="text-green-600" />
      </div>
    </div>

    <h2 className="text-[18px] font-semibold text-gray-900 text-center mb-1.5">
      Transaction complete
    </h2>
    <p className="text-[13px] text-gray-500 text-center mb-6">
      You can now hand over the product to the customer.
    </p>

    <div className="border-2 border-dashed border-gray-200 rounded-xl p-5 mb-5">
      {[
        {
          label: "Customer",
          value: "Alex Olutunde",
          className: "font-semibold text-gray-900",
        },
        {
          label: "Points received",
          value: "500 pts",
          className: "font-semibold text-violet-600",
        },
        {
          label: "Value",
          value: "₦500.00",
          className: "font-semibold text-gray-900",
        },
        {
          label: "Reference",
          value: "RCH-2025-0047821",
          className: "text-gray-700 text-[12.5px]",
        },
      ].map(({ label, value, className }) => (
        <div
          key={label}
          className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-none"
        >
          <span className="text-[13px] text-gray-500">{label}</span>
          <span className={`text-[13px] ${className}`}>{value}</span>
        </div>
      ))}
    </div>

    <button
      onClick={onNewTransaction}
      className="w-full flex items-center justify-center gap-2 border border-primary-purple text-primary-purple py-3.5 rounded-full text-[14px] font-medium hover:bg-violet-50 transition-colors mb-3"
    >
      <FiPlus size={16} />
      New Transaction
    </button>

    <button
      onClick={() => window.print()}
      className="w-full flex items-center justify-center gap-2 text-[13px] text-gray-500 underline underline-offset-2 hover:text-gray-700 transition-colors"
    >
      <FiPrinter size={14} />
      Print Receipt
    </button>
  </div>
);

export default ReceiptStep;
