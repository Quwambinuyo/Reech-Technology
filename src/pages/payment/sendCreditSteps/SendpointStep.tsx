import { useEffect, useState } from "react";
import { IoCheckmarkCircle, IoCloseCircleOutline } from "react-icons/io5";
import { TbSend } from "react-icons/tb";
import { MdPersonSearch } from "react-icons/md";
import { FaCoins } from "react-icons/fa6";

import Logo from "../../../assets/logo-s.png";
import { CustomTextInput } from "../../../components/CustomInput";
import Spinner from "../../../components/Spinner";
import Button from "../../../components/Button";
import type { Recipient } from "../types";
import { TRANSFER_FEE } from "../types";
import { formatInputNumber, formatNumber } from "../../../utils";
import { useAppDispatch } from "../../../redux/hooks";
import { lookupRecipient } from "../../../redux/wallet/action";

interface Props {
  onClose: () => void;
  onNext: (recipient: Recipient, points: number, note: string) => void;
  balance: number;
}

type LookupStatus = "idle" | "checking" | "found" | "error";

const SendPointStep = ({ onClose, onNext, balance }: Props) => {
  const dispatch = useAppDispatch();

  const [recipientInput, setRecipientInput] = useState("");
  const [points, setPoints] = useState("");
  const [note, setNote] = useState("");
  const [lookupStatus, setLookupStatus] = useState<LookupStatus>("idle");
  const [recipientName, setRecipientName] = useState("");
  const [lookupError, setLookupError] = useState("");

  const normalized = recipientInput.trim().replace(/^@/, "").toLowerCase();

  const pointsNum = points ? parseFloat(points.replace(/,/g, "")) : 0;
  const totalDeduction = pointsNum > 0 ? pointsNum + TRANSFER_FEE : 0;
  const remaining = balance - totalDeduction;
  const isValid =
    lookupStatus === "found" &&
    pointsNum > 0 &&
    pointsNum + TRANSFER_FEE <= balance;

  useEffect(() => {
    setRecipientName("");
    setLookupError("");

    if (normalized.length < 3) {
      setLookupStatus("idle");
      return;
    }

    setLookupStatus("checking");

    let cancelled = false;

    const id = setTimeout(() => {
      dispatch(lookupRecipient(normalized))
        .unwrap()
        .then((result) => {
          if (cancelled) return;
          setRecipientName(result.name);
          setLookupStatus("found");
        })
        .catch((error) => {
          if (cancelled) return;
          setLookupError(
            typeof error === "string" ? error : "Recipient not found",
          );
          setLookupStatus("error");
        });
    }, 400);

    return () => {
      cancelled = true;
      clearTimeout(id);
    };
  }, [normalized, dispatch]);

  const handleNext = () => {
    if (!isValid) return;
    onNext({ id: normalized, username: normalized }, pointsNum, note);
  };

  return (
    <div className="bg-white rounded-2xl w-11/12 max-w-[370px] sm:max-w-[500px] md:max-w-[560px] mx-auto shadow-xl overflow-hidden relative">
      <div className="px-5 lg:px-6 pt-5 lg:pt-6 pb-5">
        <div className="flex items-start gap-3 pr-8">
          <div className="shrink-0 w-11 h-11 rounded-full bg-primary-purple/10 text-primary-purple flex-center">
            <TbSend size={22} />
          </div>
          <div>
            <h3 className="font-montserrat font-bold text-light-black text-lg">
              Send Credits
            </h3>
            <p className="text-gray-500 text-[13px] font-ibmplex mt-0.5">
              Transfer loyalty points to another Reech user by their username.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="absolute text-2xl lg:text-3xl top-4 lg:top-5 right-5 text-black hover:opacity-70 transition-opacity"
        >
          <IoCloseCircleOutline />
        </button>

        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <CustomTextInput
              id="recipient"
              label="Recipient Username"
              placeholder="e.g. @ada_o"
              value={recipientInput}
              handleChange={(e) => setRecipientInput(e.target.value)}
              bg="#F7F6FF"
              focusBorderColor="#CCC4D166"
              rounded="full"
              icon={<MdPersonSearch size={20} />}
              borderColor={lookupStatus === "error" ? "#F87171" : undefined}
              otherInputProps={{ autoComplete: "off" }}
            />

            {lookupStatus === "checking" && (
              <div className="flex items-center gap-2 px-1">
                <Spinner size="10px" borderWidth="2px" />
                <span className="text-xs text-gray-500 font-ibmplex">
                  Checking username...
                </span>
              </div>
            )}
            {lookupStatus === "found" && (
              <div className="flex items-center gap-3 rounded-xl border border-primary-purple/20 bg-primary-purple/5 px-4 py-3">
                <div className="shrink-0 w-9 h-9 rounded-full bg-primary-purple text-white flex-center font-montserrat font-semibold text-sm uppercase">
                  {recipientName.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-ibmplex font-semibold text-light-black truncate">
                    {recipientName}
                  </p>
                  <p className="text-xs font-ibmplex text-gray-500 truncate">
                    @{normalized}
                  </p>
                </div>
                <IoCheckmarkCircle className="shrink-0 text-2xl text-[#1A932E]" />
              </div>
            )}
            {lookupStatus === "error" && (
              <p className="text-xs text-default-red font-ibmplex px-1">
                {lookupError}
              </p>
            )}
          </div>

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

          <div className="rounded-xl bg-[#F7F6FF] border border-[#E8E0FF] px-4 py-3 flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <p className="text-sm font-montserrat font-bold text-light-black">
                Total Deduction
              </p>
              <div className="text-right">
                <p className="text-base font-montserrat font-bold text-primary-purple">
                  {formatNumber(totalDeduction)} Credits
                </p>
                <p className="text-[10px] font-ibmplex text-[#1A932E] font-semibold tracking-wide uppercase">
                  Estimated Instant
                </p>
              </div>
            </div>

            {pointsNum > 0 && (
              <div className="flex justify-between items-center border-t border-[#E8E0FF] pt-2">
                <p className="text-[12px] font-ibmplex text-gray-600">
                  Remaining after transfer
                </p>
                <p
                  className={`text-[12px] font-ibmplex font-bold ${
                    remaining < 0 ? "text-default-red" : "text-light-black"
                  }`}
                >
                  {formatNumber(remaining)} Credits
                </p>
              </div>
            )}
          </div>

          {totalDeduction > balance && (
            <p className="text-xs text-default-red font-ibmplex px-1">
              Insufficient balance.
            </p>
          )}
        </div>

        <div className="mt-5">
          <Button
            text="Send Credits"
            onClick={handleNext}
            isDisabled={!isValid}
            icon={<TbSend size={18} />}
          />
        </div>
      </div>

      <div className="flex justify-center items-center py-3 border-t border-gray-100">
        <div className="flex items-center">
          <img src={Logo} alt="logo" className="w-[40px]" />
          <span className="font-poppins font-medium text-light-black -ml-1 text-sm">
            Reech
          </span>
        </div>
      </div>
    </div>
  );
};

export default SendPointStep;