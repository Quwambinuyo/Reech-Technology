import { useState } from "react";
import type { Recipient } from "./types";
import SendPointStep from "./SendpointStep";
import ConfirmPinStep from "./ConfirmPinStep";

interface Props {
  onClose: () => void;
}

type FlowStep = 0 | 1;

const SendPointFlow = ({ onClose }: Props) => {
  const [step, setStep] = useState<FlowStep>(0);
  const [recipient, setRecipient] = useState<Recipient | null>(null);
  const [points, setPoints] = useState(0);
  const [note, setNote] = useState("");

  if (step === 0) {
    return (
      <SendPointStep
        onClose={onClose}
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
        onConfirm={(pin) => {
          console.log("Send point confirmed:", {
            recipient,
            points,
            note,
            pin,
          });
          onClose();
        }}
      />
    );
  }

  return null;
};

export default SendPointFlow;
