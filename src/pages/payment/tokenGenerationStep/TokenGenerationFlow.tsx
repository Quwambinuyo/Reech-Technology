import { useEffect, useState } from "react";
import type { Step } from "../types";
import AmountStep from "./AmountStep";
import ReviewStep from "./ReviewStep";
import PinStep from "../sendCreditSteps/ConfirmPinStep";
import TokenRevealStep from "./TokenRevealStep";
import ActiveTokenStep from "./ActiveTokenStep";
import Spinner from "../../../components/Spinner";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  cancelActiveToken,
  generateToken,
  getActiveToken,
  revealActiveToken,
} from "../../../redux/wallet/action";

interface Props {
  onClose: () => void;
}

type View = Step | "checking" | "active" | "revealPin";

const TokenGenerationFlow = ({ onClose }: Props) => {
  const dispatch = useAppDispatch();
  const { customerOverview } = useAppSelector((state) => state.dashboard);
  const balance = customerOverview?.pointBalance.value ?? 0;

  const [view, setView] = useState<View>("checking");
  const [points, setPoints] = useState(0);
  const [token, setToken] = useState<{ code: string; expiresAt: string } | null>(
    null,
  );
  const [active, setActive] = useState<{
    points: number;
    expiresAt: string;
  } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;

    dispatch(getActiveToken())
      .unwrap()
      .then((result) => {
        if (cancelled) return;
        if (result) {
          setActive({ points: result.points, expiresAt: result.expiresAt });
          setView("active");
        } else {
          setView(0);
        }
      })
      .catch(() => {
        if (!cancelled) setView(0);
      });

    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  const handleConfirmPin = async (pin: string) => {
    if (submitting) return;

    setSubmitting(true);

    try {
      const result = await dispatch(generateToken({ points, pin })).unwrap();
      setToken({ code: result.code, expiresAt: result.expiresAt });
      setView(3);
    } catch {
      return;
    } finally {
      setSubmitting(false);
    }
  };

  const handleRevealPin = async (pin: string) => {
    if (submitting) return;

    setSubmitting(true);

    try {
      const result = await dispatch(revealActiveToken({ pin })).unwrap();
      setToken({ code: result.code, expiresAt: result.expiresAt });
      setView(3);
    } catch {
      return;
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelToken = async () => {
    if (submitting) return;

    setSubmitting(true);

    try {
      await dispatch(cancelActiveToken()).unwrap();
      setActive(null);
      setToken(null);
      setView(0);
    } catch {
      return;
    } finally {
      setSubmitting(false);
    }
  };

  if (view === "checking") {
    return (
      <div className="bg-white rounded-2xl w-11/12 max-w-[500px] md:max-w-[560px] mx-auto shadow-xl py-14 flex flex-col items-center gap-4">
        <Spinner size="28px" borderWidth="3px" />
        <p className="text-sm font-ibmplex text-gray-500">
          Checking for an active token...
        </p>
      </div>
    );
  }

  if (view === "active" && active) {
    return (
      <ActiveTokenStep
        onClose={onClose}
        points={active.points}
        expiresAt={active.expiresAt}
        busy={submitting}
        onShow={() => setView("revealPin")}
        onCancelToken={handleCancelToken}
      />
    );
  }

  if (view === "revealPin") {
    return (
      <PinStep
        onClose={onClose}
        onBack={() => setView("active")}
        onConfirm={handleRevealPin}
      />
    );
  }

  if (view === 0) {
    return (
      <AmountStep
        onClose={onClose}
        points={points}
        balance={balance}
        onChange={setPoints}
        onNext={() => setView(1)}
      />
    );
  }

  if (view === 1) {
    return (
      <ReviewStep
        onClose={onClose}
        points={points}
        onBack={() => setView(0)}
        onConfirm={() => setView(2)}
      />
    );
  }

  if (view === 2) {
    return (
      <PinStep
        onClose={onClose}
        onBack={() => setView(1)}
        onConfirm={handleConfirmPin}
      />
    );
  }

  if (view === 3 && token) {
    return (
      <TokenRevealStep
        onClose={onClose}
        token={token.code}
        expiresAt={token.expiresAt}
      />
    );
  }

  return null;
};

export default TokenGenerationFlow;