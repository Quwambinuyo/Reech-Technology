import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  FaCircleCheck,
  FaCircleXmark,
  FaSpinner,
  FaTriangleExclamation,
} from "react-icons/fa6";
import { baseURL } from "../../components/api";

type VerifyResult = {
  status: number;
  productName: string | null;
  productDescription: string | null;
  merchantName: string | null;
  merchantLogo: string | null;
  points: number;
  issuedAt: string | null;
  expiresAt: string | null;
  claimedAt: string | null;
  checkCount: number;
  firstCheckedAt: string | null;
  warning: string | null;
};

type Tone = "green" | "amber" | "red";

const toneStyles: Record<Tone, { text: string; box: string }> = {
  green: { text: "text-[#15803D]", box: "bg-[#E6F6EC] border-[#86EFAC]" },
  amber: { text: "text-[#B45309]", box: "bg-[#FEF3C7] border-[#FCD34D]" },
  red: { text: "text-[#B91C1C]", box: "bg-[#FEE2E2] border-[#FCA5A5]" },
};

const statusConfig: Record<number, { tone: Tone; title: string }> = {
  0: { tone: "green", title: "Genuine product" },
  1: { tone: "amber", title: "Points already claimed" },
  2: { tone: "green", title: "Genuine product" },
  3: { tone: "red", title: "Code withdrawn" },
  4: { tone: "red", title: "Code not released" },
};

const fallbackConfig = { tone: "red" as Tone, title: "Unable to verify" };

const formatDate = (value: string | null) =>
  value
    ? new Date(value).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

const getBody = (result: VerifyResult) => {
  switch (result.status) {
    case 0:
      return `Earn ${result.points.toLocaleString()} points: scratch the panel after you buy.`;
    case 1:
      return result.claimedAt
        ? `The points for this code were claimed on ${formatDate(result.claimedAt)}. If you've just bought this product, it may be a copy.`
        : "The points for this code have already been claimed. If you've just bought this product, it may be a copy.";
    case 2:
      return result.expiresAt
        ? `The points offer ended on ${formatDate(result.expiresAt)}.`
        : "The points offer has ended.";
    case 3:
      return "The merchant withdrew this code.";
    case 4:
      return "This code hasn't been released yet.";
    default:
      return "";
  }
};

const Shell = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-[#F5F6FF] flex items-start justify-center p-4 sm:p-6">
    <div className="w-full max-w-md mt-6 sm:mt-12">{children}</div>
  </div>
);

const VerifyProduct = () => {
  const { serial = "" } = useParams();
  const requestedSerial = useRef("");

  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState<VerifyResult | null>(null);
  const [headline, setHeadline] = useState("");
  const [error, setError] = useState("");

  const verify = async () => {
    setIsLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await axios.get(
        `${baseURL}/offline-points/verify/${encodeURIComponent(serial.trim())}`,
      );

      if (response.data?.data) {
        setResult(response.data.data);
        setHeadline(response.data?.message || "");
      } else {
        setError(response.data?.message || "Unable to verify this product.");
      }
    } catch (err: any) {
      const status = err?.response?.status;

      if (status === 404) {
        setError("We couldn't find this code. The product may not be genuine");
      } else if (status === 429) {
        setError("Too many checks. Please wait a minute and try again.");
      } else if (err?.message === "Network Error") {
        setError("You are not connected to the internet.");
      } else {
        setError(
          err?.response?.data?.message ||
            "Unable to verify this product. Please try again.",
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (requestedSerial.current === serial) return;

    requestedSerial.current = serial;
    verify();
  }, [serial]);

  if (isLoading) {
    return (
      <Shell>
        <div className="bg-white rounded-xl p-10 flex flex-col items-center gap-3">
          <FaSpinner className="animate-spin text-[#4A148C] text-2xl" />
          <p className="text-sm text-[#475569]">Checking this product...</p>
        </div>
      </Shell>
    );
  }

  if (error || !result) {
    return (
      <Shell>
        <div className="bg-white rounded-xl p-8 flex flex-col items-center gap-4 text-center">
          <FaCircleXmark className="text-[#B91C1C] text-4xl" />
          <h4 className="font-semibold text-[#B91C1C]">Not verified</h4>
          <p className="text-sm text-[#475569] leading-relaxed">{error}</p>
          <button
            type="button"
            onClick={verify}
            className="text-sm text-[#4A148C] font-semibold"
          >
            Try again
          </button>
        </div>
      </Shell>
    );
  }

  const config = statusConfig[result.status] ?? fallbackConfig;
  const styles = toneStyles[config.tone];
  const Icon =
    config.tone === "green"
      ? FaCircleCheck
      : config.tone === "amber"
        ? FaTriangleExclamation
        : FaCircleXmark;
  const body = getBody(result);

  return (
    <Shell>
      <div className="bg-white rounded-xl p-6 sm:p-8 flex flex-col gap-6">
        <div className="flex flex-col items-center text-center gap-3">
          <Icon className={`text-5xl ${styles.text}`} />
          <h4 className={`text-lg font-semibold ${styles.text}`}>
            {headline || config.title}
          </h4>
        </div>

        <div className="flex items-center gap-3 border-t border-[#E2E8F0] pt-5">
          {result.merchantLogo ? (
            <img
              src={result.merchantLogo}
              alt={result.merchantName ?? "Merchant"}
              className="w-12 h-12 rounded-full object-cover shrink-0"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-[#EDE7F6] text-[#4A148C] font-semibold flex items-center justify-center uppercase shrink-0">
              {result.merchantName?.charAt(0)}
            </div>
          )}
          <div className="min-w-0">
            <p className="font-semibold text-[#1E293B] truncate">
              {result.productName}
            </p>
            <p className="text-sm text-[#475569] truncate">
              {result.merchantName}
            </p>
          </div>
        </div>

        {result.productDescription && (
          <p className="text-sm text-[#475569] leading-relaxed">
            {result.productDescription}
          </p>
        )}

        {body && (
          <div className={`rounded-lg border p-4 text-sm ${styles.box}`}>
            <p className="text-[#1E293B] leading-relaxed">{body}</p>
          </div>
        )}

        {result.warning && (
          <div className="rounded-lg border border-[#FCD34D] bg-[#FEF3C7] p-4 flex gap-3">
            <FaTriangleExclamation className="text-[#B45309] mt-0.5 shrink-0" />
            <p className="text-sm text-[#1E293B] leading-relaxed">
              {result.warning}
            </p>
          </div>
        )}

        <p className="text-xs text-[#64748B] text-center">
          Checked {result.checkCount.toLocaleString()}{" "}
          {result.checkCount === 1 ? "time" : "times"}
          {result.firstCheckedAt
            ? ` · first on ${formatDate(result.firstCheckedAt)}`
            : ""}
        </p>
      </div>
    </Shell>
  );
};

export default VerifyProduct;