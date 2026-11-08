import { useEffect, type ReactNode } from "react";
import { FaSpinner, FaXmark } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchAdminMerchants } from "../../redux/merchant/action";
import { getOfflineScope } from "../../redux/offline/action";
import type { OfflineBatch } from "../../redux/offline/reducer";

export const NOT_SET = "—";

export const inputClass =
  "w-full border border-[#CBD5E1] rounded px-3 py-2 text-sm text-[#1E293B] outline-none focus:border-[#4A148C] disabled:bg-[#F1F5F9] disabled:cursor-not-allowed";

export const primaryButton =
  "px-5 py-2 rounded text-sm font-semibold bg-[#4A148C] text-white flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed";

export const outlineButton =
  "px-5 py-2 rounded text-sm font-semibold border border-[#4A148C] text-[#4A148C] flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed";

export const formatDate = (value: string | null) =>
  value
    ? new Date(value).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : NOT_SET;

export const formatDateTime = (value: string | null) =>
  value
    ? new Date(value).toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : NOT_SET;

export type BatchStatus =
  | "Cancelled"
  | "Expired"
  | "Fully redeemed"
  | "Distributed"
  | "Awaiting hand-over";

export const getBatchStatus = (batch: OfflineBatch): BatchStatus => {
  if (batch.cancelledAt) return "Cancelled";
  if (new Date(batch.expiresAt).getTime() < Date.now()) return "Expired";
  if (batch.codeCount > 0 && batch.redeemedCount === batch.codeCount) {
    return "Fully redeemed";
  }
  if (batch.distributedAt) return "Distributed";
  return "Awaiting hand-over";
};

const badgeStyles: Record<BatchStatus, string> = {
  Cancelled: "bg-[#FEE2E2] text-[#B91C1C]",
  Expired: "bg-[#F1F5F9] text-[#475569]",
  "Fully redeemed": "bg-[#E6F6EC] text-[#15803D]",
  Distributed: "bg-[#EDE7F6] text-[#4A148C]",
  "Awaiting hand-over": "bg-[#FEF3C7] text-[#B45309]",
};

export const BatchStatusBadge = ({ batch }: { batch: OfflineBatch }) => {
  const status = getBatchStatus(batch);

  return (
    <span
      className={`inline-block rounded px-2.5 py-1 text-xs font-semibold whitespace-nowrap ${badgeStyles[status]}`}
    >
      {status}
    </span>
  );
};

export const useMerchantName = () => {
  const dispatch = useAppDispatch();
  const { adminMerchants } = useAppSelector((s) => s.merchant);
  const isMerchant = getOfflineScope() === "merchant";

  useEffect(() => {
    if (!isMerchant && adminMerchants.length === 0) {
      dispatch(
        fetchAdminMerchants({
          pageNumber: 1,
          pageSize: 100,
          search: "",
          status: 1,
        }),
      );
    }
  }, [dispatch, adminMerchants.length, isMerchant]);

  return (businessId: string) =>
    isMerchant
      ? "Your business"
      : (adminMerchants.find((m) => String(m.id) === businessId)?.name ??
        NOT_SET);
};

type MerchantSelectProps = {
  value: string;
  onChange: (value: string) => void;
  allLabel?: string;
  disabled?: boolean;
  className?: string;
};

export const MerchantSelect = ({
  value,
  onChange,
  allLabel,
  disabled,
  className = "",
}: MerchantSelectProps) => {
  const dispatch = useAppDispatch();
  const { adminMerchants } = useAppSelector((state) => state.merchant);

  useEffect(() => {
    dispatch(
      fetchAdminMerchants({
        pageNumber: 1,
        pageSize: 100,
        search: "",
        status: 1,
      }),
    );
  }, [dispatch]);

  return (
    <select
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      className={`${inputClass} ${className}`}
    >
      {allLabel !== undefined ? (
        <option value="">{allLabel}</option>
      ) : (
        <option value="" disabled>
          Select merchant
        </option>
      )}
      {adminMerchants.map((merchant) => (
        <option key={merchant.id} value={String(merchant.id)}>
          {merchant.name}
        </option>
      ))}
    </select>
  );
};

type ModalShellProps = {
  title: string;
  onClose: () => void;
  children: ReactNode;
};

export const ModalShell = ({ title, onClose, children }: ModalShellProps) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
    onClick={onClose}
  >
    <div
      className="w-full max-w-md rounded-xl bg-white p-6 flex flex-col gap-5"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between gap-4">
        <h4 className="font-semibold text-[#1E293B]">{title}</h4>
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="text-[#64748B] hover:text-[#1E293B]"
        >
          <FaXmark />
        </button>
      </div>
      {children}
    </div>
  </div>
);

type ConfirmDialogProps = {
  title: string;
  message: string;
  confirmText: string;
  isLoading: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

export const ConfirmDialog = ({
  title,
  message,
  confirmText,
  isLoading,
  onConfirm,
  onClose,
}: ConfirmDialogProps) => (
  <ModalShell title={title} onClose={onClose}>
    <p className="text-sm text-[#475569] leading-relaxed">{message}</p>

    <div className="flex justify-end gap-3">
      <button
        type="button"
        disabled={isLoading}
        onClick={onClose}
        className={outlineButton}
      >
        Keep
      </button>
      <button
        type="button"
        disabled={isLoading}
        onClick={onConfirm}
        className={primaryButton}
      >
        {isLoading && <FaSpinner className="animate-spin" />}
        {confirmText}
      </button>
    </div>
  </ModalShell>
);