import { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdReceipt } from "react-icons/md";
import Logo from "../../assets/logo-s.png";
import { CustomSelect } from "../../components/CustomSelect";
import { CustomTextInput } from "../../components/CustomInput";

interface Props {
  onClose: () => void;
}

const PayBillCard = ({ onClose }: Props) => {
  const [category] = useState("");
  const [biller] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");

  const transactionFee = 0.5;
  const total = amount
    ? (parseFloat(amount) + transactionFee).toFixed(2)
    : "0.00";

  return (
    <div className="bg-white rounded-2xl w-full max-w-[370px] sm:max-w-[500px] md:max-w-[576px] mx-auto shadow-xl overflow-hidden max-h-[90vh] flex flex-col border border-dashed border-[#D0D0F0]">
      <div className="px-5 pt-5 pb-2 flex justify-between items-start flex-shrink-0">
        <div>
          <h3 className="font-montserrat font-bold text-[#0D0D0D] text-lg">
            Pay Bill
          </h3>
          <p className="text-black text-[12px] font-ibmplex mt-0.5">
            Pay your utility bills and services instantly.
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-2xl text-gray-400 hover:text-gray-600 transition-colors"
        >
          <IoCloseCircleOutline />
        </button>
      </div>

      <div className="overflow-y-auto flex-1 px-5 pb-4">
        <div className="mt-5 flex flex-col gap-4">
          <CustomSelect
            context="Biller Category"
            value={category}
            placeholder="Select Category"
          />

          <CustomSelect
            context="Biller Name"
            value={biller}
            placeholder="Select Biller"
          />

          <CustomTextInput
            id="accountNumber"
            label="Customer ID / Account Number"
            placeholder="e.g 123456789"
            value={accountNumber}
            handleChange={(e) => setAccountNumber(e.target.value)}
          />

          <CustomTextInput
            id="amount"
            label="Amount"
            type="number"
            placeholder="0.00"
            value={amount}
            handleChange={(e) => setAmount(e.target.value)}
          />

          <div className="bg-[#F5F6FF] rounded-xl px-4 py-4 mt-1">
            <p className="font-ibmplex font-bold text-[12px] text-[#0D0D0D] uppercase tracking-wide mb-3">
              Transaction Details
            </p>
            <div className="flex justify-between items-center mb-2">
              <p className="text-[12px] font-ibmplex text-gray-400">
                Transaction Fee
              </p>
              <p className="text-[12px] font-ibmplex font-semibold text-[#0D0D0D]">
                ${transactionFee.toFixed(2)}
              </p>
            </div>
            <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
              <p className="text-sm font-montserrat font-bold text-[#0D0D0D]">
                Total Deduction
              </p>
              <p className="text-sm font-montserrat font-bold text-[#4A148C]">
                ${total}
              </p>
            </div>
          </div>
        </div>

        <button className="mt-5 w-full bg-[#4A148C] hover:bg-[#6A1B9A] transition-colors text-white font-montserrat font-semibold rounded-4xl py-4 flex items-center justify-center gap-2">
          <MdReceipt size={18} />
          Pay Bill
        </button>
      </div>

      <div className="flex justify-center items-center py-3 flex-shrink-0 border-t border-gray-100">
        <div className="flex items-center">
          <img src={Logo} alt="logo" className="w-[40px]" />
          <span className="font-poppins font-medium text-[#000000] -ml-1 text-sm">
            reech
          </span>
        </div>
      </div>
    </div>
  );
};

export default PayBillCard;
