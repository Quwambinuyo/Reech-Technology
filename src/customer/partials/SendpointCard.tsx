import { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { TbSend } from "react-icons/tb";
import Logo from "../../assets/logo-s.png";
import { CustomTextInput } from "../../components/CustomInput";

interface Props {
  onClose: () => void;
}

const TRANSFER_FEE = 2;

const SendPointCard = ({ onClose }: Props) => {
  const [recipient, setRecipient] = useState("");
  const [points, setPoints] = useState("");
  const [note, setNote] = useState("");

  const pointsNum = points ? parseFloat(points) : 0;
  const totalDeduction = pointsNum > 0 ? pointsNum + TRANSFER_FEE : 0;

  return (
    <div className="bg-white rounded-2xl w-full max-w-[406px] md:max-w-[576px] mx-auto shadow-xl overflow-hidden border border-dashed border-[#D0D0F0]">
      <div className="px-5 pt-5 pb-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-montserrat font-bold text-[#0D0D0D] text-lg">
              Send Points
            </h3>
            <p className="text-gray-400 text-[12px] font-ibmplex mt-0.5 max-w-[260px]">
              Transfer loyalty points to another Reech user Instantly.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-2xl text-black hover:text-gray-600 transition-colors"
          >
            <IoCloseCircleOutline />
          </button>
        </div>

        <div className="mt-5 flex flex-col gap-4">
          <CustomTextInput
            id="recipient"
            label="Recipient Identifier (ID or Username)"
            placeholder="e.g. @alexmain or 15265378"
            value={recipient}
            handleChange={(e) => setRecipient(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-3">
            <CustomTextInput
              id="points"
              label="Amount in Points"
              type="number"
              placeholder="0.00"
              value={points}
              handleChange={(e) => setPoints(e.target.value)}
            />
            <CustomTextInput
              id="note"
              label="Note (Optional)"
              placeholder="Lunch payout..."
              value={note}
              handleChange={(e) => setNote(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2.5 mt-1">
            <div className="flex justify-between items-center">
              <p className="text-[12px] font-ibmplex text-gray-400">
                Transfer Fee
              </p>
              <p className="text-[12px] font-ibmplex font-semibold text-[#0D0D0D]">
                -{TRANSFER_FEE} Points
              </p>
            </div>

            <div className="border-t border-gray-100 pt-3">
              <div className="flex justify-between items-start">
                <p className="text-sm font-montserrat font-bold text-[#0D0D0D]">
                  Total Deduction
                </p>
                <div className="text-right">
                  <p className="text-base font-montserrat font-bold text-[#4A148C]">
                    {totalDeduction > 0 ? totalDeduction.toFixed(2) : "0.00"}{" "}
                    Points
                  </p>
                  <p className="text-[10px] font-ibmplex text-[#1A932E] font-semibold tracking-wide uppercase">
                    Estimated Instant
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button className="mt-5 w-full bg-[#4A148C] hover:bg-[#6A1B9A] transition-colors text-white font-montserrat font-semibold rounded-2xl py-4 flex items-center justify-center gap-2">
          <TbSend size={18} />
          Send Points
        </button>
      </div>

      <div className="flex justify-center items-center py-3 border-t border-gray-100">
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

export default SendPointCard;
