import { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { HiArrowRight } from "react-icons/hi";
import { MdAccountBalanceWallet } from "react-icons/md";
import { BsLightningChargeFill } from "react-icons/bs";
import Logo from "../../assets/logo-s.png";
import { CustomSelect } from "../../components/CustomSelect";
import { CustomTextInput } from "../../components/CustomInput";

interface Props {
  onClose: () => void;
}

const PTS_TO_USD = 100;

const WithdrawCard = ({ onClose }: Props) => {
  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [points, setPoints] = useState("");

  const cashEquivalent = points
    ? (parseFloat(points) / PTS_TO_USD).toFixed(2)
    : "0.00";
  const withdrawalFee = 0.0;
  const totalPointsDeducted = points ? parseFloat(points) : 0;

  return (
    <div className="bg-white rounded-2xl w-full max-w-[460px] md:max-w-[576px] mx-auto shadow-xl overflow-hidden max-h-[90vh] flex flex-col border border-dashed border-[#D0D0F0]">
      <div className="px-5 pt-5 pb-2 flex justify-between items-start flex-shrink-0">
        <div>
          <h3 className="font-montserrat font-bold text-[#0D0D0D] text-lg">
            Withdraw Funds
          </h3>
          <p className="text-gray-400 text-[12px] font-ibmplex mt-0.5">
            Convert your points and withdraw to your bank account.
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-2xl text-black hover:text-gray-600 transition-colors"
        >
          <IoCloseCircleOutline />
        </button>
      </div>

      <div className="overflow-y-auto flex-1 px-5 pb-4">
        <div className="mt-5 flex flex-col gap-4">
          <CustomSelect
            context="Select Bank"
            value={bank}
            placeholder="Choose your bank"
          />

          <CustomTextInput
            id="accountNumber"
            label="Account Number"
            placeholder="Enter bank account number"
            value={accountNumber}
            handleChange={(e) => setAccountNumber(e.target.value)}
          />

          <div className="flex flex-col gap-1">
            <label className="text-sm md:text-[14.5px]">Amount in Points</label>
            <div className="border border-[#D9D9D9] px-3 py-2.5 rounded-xl w-full flex items-center justify-between gap-2">
              <input
                type="number"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                placeholder="0.00"
                className="flex-1 outline-none border-none bg-transparent text-[15px] placeholder:text-[#D9D9D9] text-[#0D0D0D]"
              />
              <span className="text-xs font-ibmplex font-bold bg-[#EDDCFF] p-1 text-[#B582FE] flex-shrink-0">
                PTS
              </span>
            </div>
          </div>

          <div className="bg-[#F5F6FF] rounded-xl px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#4A148C] flex items-center justify-center flex-shrink-0">
              <MdAccountBalanceWallet size={18} color="white" />
            </div>
            <div className="flex-1">
              <p className="text-[12px] font-ibmplex text-gray-400">
                Cash Equivalent
              </p>
              <p className="text-base font-montserrat font-bold text-[#0D0D0D]">
                ${cashEquivalent}
              </p>
            </div>
            <p className="text-[12px] font-ibmplex font-semibold text-[#4A148C]">
              {PTS_TO_USD} PTS = $1.00
            </p>
          </div>

          <div className="flex flex-col gap-2.5 mt-1">
            <div className="flex justify-between items-center">
              <p className="text-[12px] font-ibmplex text-gray-400">
                Withdrawal Fee
              </p>
              <p className="text-[12px] font-ibmplex font-semibold text-[#0D0D0D]">
                ${withdrawalFee.toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-[12px] font-ibmplex text-gray-400">
                Processing Time
              </p>
              <div className="flex items-center gap-1">
                <BsLightningChargeFill size={11} color="#1A932E" />
                <p className="text-[12px] font-ibmplex font-semibold text-[#1A932E]">
                  Instant
                </p>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
              <p className="text-sm font-montserrat font-bold text-[#0D0D0D]">
                Total Points Deducted
              </p>
              <p className="text-sm font-montserrat font-bold text-[#4A148C]">
                {totalPointsDeducted > 0
                  ? totalPointsDeducted.toLocaleString()
                  : "0"}
                PTS
              </p>
            </div>
          </div>
        </div>

        <button className="mt-5 w-full bg-[#4A148C] hover:bg-[#6A1B9A] transition-colors text-white font-montserrat font-semibold rounded-4xl py-4 flex items-center justify-center gap-2">
          Withdraw Funds
          <HiArrowRight size={18} />
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

export default WithdrawCard;
