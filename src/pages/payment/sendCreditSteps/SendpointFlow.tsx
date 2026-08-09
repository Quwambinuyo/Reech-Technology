import { useState } from "react";
import type { Recipient } from "../types";
import SendPointStep from "./SendpointStep";
import ConfirmPinStep from "./ConfirmPinStep";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { transferFunds } from "../../../redux/wallet/action";

interface Props {
  onClose: () => void;
}

type FlowStep = 0 | 1;

const SendPointFlow = ({ onClose }: Props) => {
  const dispatch = useAppDispatch();

  const [step, setStep] = useState<FlowStep>(0);
  const [recipient, setRecipient] = useState<Recipient | null>(null);
  const [points, setPoints] = useState(0);
  const [note, setNote] = useState("");

  const { transferFundsLoading } = useAppSelector((state) => state.wallet);
  const { customerOverview } = useAppSelector((state) => state.dashboard);

  const balance = customerOverview?.pointBalance.value ?? 0;

  const handleConfirm = async (pin: string) => {
    if (!recipient) {
      return;
    }

    const response = await dispatch(
      transferFunds({
        recipientEmail: recipient.username,
        points,
        note,
        pin,
      }),
    );

    if (transferFunds.fulfilled.match(response)) {
      onClose();
    }
  };

  if (step === 0) {
    return (
      <SendPointStep
        onClose={onClose}
        balance={balance}
        onNext={(rec: Recipient, pts: number, noteValue: string) => {
          setRecipient(rec);
          setPoints(pts);
          setNote(noteValue);
          setStep(1);
        }}
      />
    );
  }

  if (step === 1 && recipient) {
    return (
      <ConfirmPinStep
        onClose={onClose}
        onBack={() => setStep(0)}
        loading={transferFundsLoading}
        onConfirm={handleConfirm}
      />
    );
  }

  return null;
};

export default SendPointFlow;
