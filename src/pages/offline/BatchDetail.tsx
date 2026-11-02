import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaSpinner } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  cancelOfflineBatch,
  distributeOfflineBatch,
  fetchOfflineBatchDetail,
  printOfflineBatch,
} from "../../redux/offline/action";
import { clearBatchDetail } from "../../redux/offline/reducer";
import {
  BatchStatusBadge,
  ConfirmDialog,
  ModalShell,
  NOT_SET,
  formatDate,
  formatDateTime,
  getBatchStatus,
  inputClass,
  outlineButton,
  primaryButton,
  useMerchantName,
} from "../manage-merchant/OfflineHelpers";

const RECIPIENT_MAX = 200;

const DetailSkeleton = () => (
  <div className="bg-white p-5 md:p-6 rounded-xl mt-5 flex flex-col gap-6 animate-pulse">
    <div className="h-5 w-48 bg-[#E2E8F0] rounded" />
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-16 bg-[#E2E8F0] rounded" />
      ))}
    </div>
    <div className="h-40 bg-[#E2E8F0] rounded" />
  </div>
);

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-lg bg-[#F5F6FF] p-4 flex flex-col gap-1 min-w-0">
    <p className="text-xs text-[#64748B]">{label}</p>
    <p className="text-sm font-semibold text-[#1E293B] truncate">{value}</p>
  </div>
);

const BatchDetail = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const merchantName = useMerchantName();

  const {
    batchDetail,
    fetchBatchDetailLoading,
    fetchBatchDetailError,
    printBatchLoading,
    distributeBatchLoading,
    cancelBatchLoading,
  } = useAppSelector((state) => state.offlinePoints);

  const [isHandOverOpen, setIsHandOverOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [recipient, setRecipient] = useState("");

  useEffect(() => {
    dispatch(fetchOfflineBatchDetail(id));

    return () => {
      dispatch(clearBatchDetail());
    };
  }, [dispatch, id]);

  const detail = batchDetail && batchDetail.batch.id === id ? batchDetail : null;

  const reload = () => {
    dispatch(fetchOfflineBatchDetail(id));
  };

  const handlePrint = async () => {
    const tab = window.open("", "_blank");
    const result = await dispatch(printOfflineBatch(id));

    if (!printOfflineBatch.fulfilled.match(result)) {
      tab?.close();
      return;
    }

    if (tab) {
      tab.location.href = result.payload;
    } else {
      window.open(result.payload, "_blank");
    }

    reload();
  };

  const handleHandOver = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await dispatch(
      distributeOfflineBatch({ id, recipient: recipient.trim() }),
    );

    if (distributeOfflineBatch.fulfilled.match(result)) {
      setIsHandOverOpen(false);
      setRecipient("");
      reload();
    }
  };

  const handleCancel = async () => {
    const result = await dispatch(cancelOfflineBatch(id));

    if (cancelOfflineBatch.fulfilled.match(result)) {
      setIsCancelOpen(false);
      reload();
    }
  };

  const status = detail ? getBatchStatus(detail.batch) : null;
  const isCancelled = status === "Cancelled";
  const isExpired = status === "Expired";
  const canPrint = !isCancelled && !isExpired;
  const canHandOver = !isCancelled && detail !== null && !detail.batch.distributedAt;
  const isRecipientValid =
    recipient.trim() !== "" && recipient.trim().length <= RECIPIENT_MAX;

  return (
    <div className="mt-2 flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Go back"
          onClick={() => navigate("/offline-points")}
          className="bg-white text-primary-purple text-lg p-1.5 rounded"
        >
          <FaArrowLeft />
        </button>
        <h4 className="font-semibold text-[#1E293B]">Batch details</h4>
      </div>

      {fetchBatchDetailLoading && !detail && <DetailSkeleton />}

      {!fetchBatchDetailLoading && !detail && fetchBatchDetailError && (
        <div className="bg-white rounded-xl p-8 text-center flex flex-col items-center gap-4">
          <p className="text-sm text-[#475569]">{fetchBatchDetailError}</p>
          <button
            type="button"
            onClick={reload}
            className="text-sm text-[#4A148C] font-semibold"
          >
            Try again
          </button>
        </div>
      )}

      {detail && (
        <>
          <section className="bg-white rounded-xl p-5 md:p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3 flex-wrap">
                <h4 className="text-lg font-semibold text-[#1E293B]">
                  {detail.batch.reference}
                </h4>
                <BatchStatusBadge batch={detail.batch} />
              </div>

              <div className="flex gap-3 flex-wrap">
                <button
                  type="button"
                  disabled={!canPrint || printBatchLoading}
                  onClick={handlePrint}
                  className={primaryButton}
                >
                  {printBatchLoading && <FaSpinner className="animate-spin" />}
                  Print codes
                </button>
                <button
                  type="button"
                  disabled={!canHandOver}
                  onClick={() => setIsHandOverOpen(true)}
                  className={outlineButton}
                >
                  Record hand-over
                </button>
                <button
                  type="button"
                  disabled={isCancelled}
                  onClick={() => setIsCancelOpen(true)}
                  className={outlineButton}
                >
                  Cancel unused
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              <Stat label="Merchant" value={merchantName(detail.batch.businessId)} />
              <Stat
                label="Codes"
                value={detail.batch.codeCount.toLocaleString()}
              />
              <Stat
                label="Redeemed"
                value={detail.batch.redeemedCount.toLocaleString()}
              />
              <Stat
                label="Given to"
                value={detail.batch.distributedTo ?? NOT_SET}
              />
              <Stat label="Expires" value={formatDate(detail.batch.expiresAt)} />
            </div>
          </section>

          <section className="bg-white rounded-xl p-5 md:p-6 flex flex-col gap-4">
            <h4 className="font-semibold text-[#1E293B]">Codes</h4>

            <div className="overflow-x-auto max-h-[480px] overflow-y-auto">
              <table className="w-full min-w-[560px] text-sm">
                <thead className="sticky top-0 bg-white">
                  <tr className="text-left font-montserrat font-semibold text-[#1E293B]">
                    <th className="py-2 pr-4">Activity</th>
                    <th className="py-2 pr-4">Points</th>
                    <th className="py-2 pr-4">Status</th>
                    <th className="py-2">Redeemed at</th>
                  </tr>
                </thead>
                <tbody>
                  {detail.codes.map((code) => (
                    <tr key={code.id} className="odd:bg-[#F5F6FF] text-[#475569]">
                      <td className="py-3 pl-2 pr-4 text-[#1E293B]">
                        {code.activityName}
                      </td>
                      <td className="py-3 pr-4">
                        {code.points.toLocaleString()}
                      </td>
                      <td className="py-3 pr-4">
                        <span
                          className={`text-xs font-semibold ${
                            code.redeemedAt ? "text-[#15803D]" : "text-[#64748B]"
                          }`}
                        >
                          {code.redeemedAt ? "Redeemed" : "Unused"}
                        </span>
                      </td>
                      <td className="py-3">{formatDateTime(code.redeemedAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="bg-white rounded-xl p-5 md:p-6 flex flex-col gap-4">
            <h4 className="font-semibold text-[#1E293B]">History</h4>

            {detail.events.length === 0 ? (
              <p className="text-sm text-[#475569]">{NOT_SET}</p>
            ) : (
              <ol className="flex flex-col gap-3">
                {detail.events.map((event, index) => (
                  <li
                    key={`${event.createdAt}-${index}`}
                    className="border border-[#E2E8F0] rounded p-4 flex flex-col gap-1"
                  >
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <p className="text-sm font-semibold text-[#1E293B]">
                        {event.action}
                      </p>
                      <p className="text-xs text-[#64748B]">
                        {formatDateTime(event.createdAt)}
                      </p>
                    </div>
                    {event.note && (
                      <p className="text-sm text-[#475569]">{event.note}</p>
                    )}
                  </li>
                ))}
              </ol>
            )}
          </section>
        </>
      )}

      {isHandOverOpen && (
        <ModalShell
          title="Record hand-over"
          onClose={() => setIsHandOverOpen(false)}
        >
          <form onSubmit={handleHandOver} className="flex flex-col gap-5">
            <label className="flex flex-col gap-2 text-sm font-medium text-[#1E293B]">
              Who received the sheet?
              <input
                type="text"
                value={recipient}
                maxLength={RECIPIENT_MAX}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Ade Wholesale, Mushin"
                disabled={distributeBatchLoading}
                className={inputClass}
              />
              <span className="text-xs font-normal text-[#64748B]">
                Can only be recorded once.
              </span>
            </label>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                disabled={distributeBatchLoading}
                onClick={() => setIsHandOverOpen(false)}
                className={outlineButton}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isRecipientValid || distributeBatchLoading}
                className={primaryButton}
              >
                {distributeBatchLoading && <FaSpinner className="animate-spin" />}
                Save
              </button>
            </div>
          </form>
        </ModalShell>
      )}

      {isCancelOpen && (
        <ConfirmDialog
          title="Cancel unused codes?"
          message="Every code that hasn't been redeemed will stop working. Points already credited to customers stay as they are. This can't be undone."
          confirmText="Cancel unused codes"
          isLoading={cancelBatchLoading}
          onConfirm={handleCancel}
          onClose={() => setIsCancelOpen(false)}
        />
      )}
    </div>
  );
};

export default BatchDetail;