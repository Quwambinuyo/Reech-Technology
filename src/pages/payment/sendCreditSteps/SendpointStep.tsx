import { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { TbSend } from "react-icons/tb";
import Logo from "../../../assets/logo-s.png";
import { CustomTextInput } from "../../../components/CustomInput";
import type { Recipient } from "../types";
import { TRANSFER_FEE, CURRENT_BALANCE } from "../types";
import { MdPersonSearch } from "react-icons/md";
import { FaCoins } from "react-icons/fa6";
import { formatInputNumber, formatNumber } from "../../../utils";

interface Props {
  onClose: () => void;
  onNext: (recipient: Recipient, points: number, note: string) => void;
}

const SendPointStep = ({ onClose, onNext }: Props) => {
  const [recipientInput, setRecipientInput] = useState("");
  const [points, setPoints] = useState("");
  const [note, setNote] = useState("");

  const pointsNum = points ? parseFloat(points.replace(/,/g, "")) : 0;
  const totalDeduction = pointsNum > 0 ? pointsNum + TRANSFER_FEE : 0;
  const remaining = CURRENT_BALANCE - totalDeduction;
  const isValid =
    recipientInput.trim() !== "" &&
    pointsNum > 0 &&
    pointsNum + TRANSFER_FEE <= CURRENT_BALANCE;

  const handleNext = () => {
    if (!isValid) return;
    onNext({ id: recipientInput, username: recipientInput }, pointsNum, note);
  };

  return (
    <div className="bg-white rounded-2xl w-full max-w-[370px] sm:max-w-[500px] md:max-w-[606px] mx-auto shadow-xl overflow-hidden border border-dashed border-[#D0D0F0]">
      <div className="px-5 pt-5 pb-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-montserrat font-bold text-[#0D0D0D] text-lg">
              Send Credits
            </h3>
            <p className="text-gray-400 text-[12px] font-ibmplex mt-0.5 max-w-[260px]">
              Transfer loyalty points to another Reech user instantly.
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
            value={recipientInput}
            handleChange={(e) => setRecipientInput(e.target.value)}
            bg="#F7F6FF"
            focusBorderColor="#CCC4D166"
            rounded="full"
            icon={<MdPersonSearch size={20} />}
          />

          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3">
            <CustomTextInput
              id="points"
              label="Amount in Points"
              placeholder="0.00"
              numeric
              value={points}
              handleChange={(e) => setPoints(formatInputNumber(e.target.value))}
              bg="#F7F6FF"
              borderColor="#E8E0FF"
              focusBorderColor="#CCC4D166"
              icon={<FaCoins />}
            />
            <CustomTextInput
              id="note"
              label="Note (Optional)"
              placeholder="Lunch payout..."
              value={note}
              handleChange={(e) => setNote(e.target.value)}
              bg="#F7F6FF"
              borderColor="#E8E0FF"
              focusBorderColor="#CCC4D166"
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <div className="border-t border-gray-100 pt-3">
              <div className="flex justify-between items-start">
                <p className="text-sm font-montserrat font-bold text-[#0D0D0D]">
                  Total Deduction
                </p>
                <div className="text-right">
                  <p className="text-base font-montserrat font-bold text-[#4A148C]">
                    {formatNumber(totalDeduction)} Credits
                  </p>
                  <p className="text-[10px] font-ibmplex text-[#1A932E] font-semibold tracking-wide uppercase">
                    Estimated Instant
                  </p>
                </div>
              </div>
            </div>
          </div>

          {pointsNum > 0 && (
            <p className="text-[12px] font-ibmplex text-[#3D3D6B]">
              Remaining after transfer:{" "}
              <span
                className={
                  remaining < 0 ? "text-red-500 font-bold" : "font-bold"
                }
              >
                {formatNumber(remaining)} Credits
              </span>
            </p>
          )}

          {totalDeduction > CURRENT_BALANCE && (
            <p className="text-xs text-red-500 font-ibmplex">
              Insufficient balance.
            </p>
          )}
        </div>

        <button
          onClick={handleNext}
          disabled={!isValid}
          className="mt-5 w-full bg-[#5617A2] disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-white font-montserrat font-semibold rounded-4xl py-4 flex items-center justify-center gap-2"
        >
          <TbSend size={18} />
          Send Credits
        </button>
      </div>

      <div className="flex justify-center items-center py-3 border-t border-gray-100">
        <div className="flex items-center">
          <img src={Logo} alt="logo" className="w-[40px]" />
          <span className="font-poppins font-medium text-[#000000] -ml-1 text-sm">
            Reech
          </span>
        </div>
      </div>
    </div>
  );
};

export default SendPointStep;
