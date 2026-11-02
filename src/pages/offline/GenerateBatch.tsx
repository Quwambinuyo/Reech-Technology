import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FaArrowLeft, FaPlus, FaSpinner, FaXmark } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchOfflineActivities,
  generateOfflineBatch,
} from "../../redux/offline/action";
import {
  MerchantSelect,
  inputClass,
  outlineButton,
  primaryButton,
} from "../manage-merchant/OfflineHelpers";

const MAX_CODES = 1000;

type Row = { key: number; activityId: string; quantity: string };

const toInputValue = (date: Date) =>
  new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);

const GenerateBatch = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const nextKey = useRef(1);

  const { allActivities, fetchActivitiesLoading, generateBatchLoading } =
    useAppSelector((state) => state.offlinePoints);

  const [businessId, setBusinessId] = useState(params.get("businessId") ?? "");
  const [reference, setReference] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [rows, setRows] = useState<Row[]>([
    { key: 0, activityId: "", quantity: "" },
  ]);

  useEffect(() => {
    if (businessId) {
      dispatch(
        fetchOfflineActivities({ businessId, page: 1, pageSize: 100 }),
      );
    }
  }, [dispatch, businessId]);

  const activities = allActivities.items;

  const total = rows.reduce((sum, row) => sum + (Number(row.quantity) || 0), 0);
  const rowsValid = rows.every(
    (row) =>
      row.activityId !== "" &&
      Number.isInteger(Number(row.quantity)) &&
      Number(row.quantity) >= 1,
  );
  const expiryValid =
    expiresAt !== "" && new Date(expiresAt).getTime() > Date.now();
  const canSubmit =
    businessId !== "" &&
    reference.trim() !== "" &&
    expiryValid &&
    rowsValid &&
    total >= 1 &&
    total <= MAX_CODES &&
    !generateBatchLoading;

  const handleMerchantChange = (value: string) => {
    setBusinessId(value);
    setRows([{ key: nextKey.current++, activityId: "", quantity: "" }]);
  };

  const updateRow = (key: number, patch: Partial<Row>) => {
    setRows((prev) =>
      prev.map((row) => (row.key === key ? { ...row, ...patch } : row)),
    );
  };

  const addRow = () => {
    setRows((prev) => [
      ...prev,
      { key: nextKey.current++, activityId: "", quantity: "" },
    ]);
  };

  const removeRow = (key: number) => {
    setRows((prev) => prev.filter((row) => row.key !== key));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!canSubmit) return;

    const result = await dispatch(
      generateOfflineBatch({
        businessId,
        reference: reference.trim(),
        expiresAt: new Date(expiresAt).toISOString(),
        activities: rows.map((row) => ({
          activityId: row.activityId,
          quantity: Number(row.quantity),
        })),
      }),
    );

    if (generateOfflineBatch.fulfilled.match(result)) {
      navigate(`/offline-points/${result.payload.id}`, { replace: true });
    }
  };

  const hasNoActivities =
    businessId !== "" && !fetchActivitiesLoading && activities.length === 0;
  const canAddRow = rows.length < activities.length;

  return (
    <div className="flex flex-col gap-5 mt-2">
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Go back"
          onClick={() => navigate(-1)}
          className="bg-white text-primary-purple text-lg p-1.5 rounded"
        >
          <FaArrowLeft />
        </button>
        <h4 className="font-semibold text-[#1E293B]">Generate codes</h4>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl p-5 md:p-6 lg:p-7 flex flex-col gap-6 max-w-3xl"
      >
        <div className="grid md:grid-cols-2 gap-5">
          <label className="flex flex-col gap-2 text-sm font-medium text-[#1E293B]">
            Merchant
            <MerchantSelect
              value={businessId}
              onChange={handleMerchantChange}
              disabled={generateBatchLoading}
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-[#1E293B]">
            Batch reference
            <input
              type="text"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="LAGOS-NOV-01"
              disabled={generateBatchLoading}
              className={inputClass}
            />
            <span className="text-xs font-normal text-[#64748B]">
              Your label, unique per merchant
            </span>
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-[#1E293B]">
            Codes expire on
            <input
              type="datetime-local"
              value={expiresAt}
              min={toInputValue(new Date())}
              onChange={(e) => setExpiresAt(e.target.value)}
              disabled={generateBatchLoading}
              className={inputClass}
            />
          </label>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium text-[#1E293B]">
            Activities and quantities
          </p>

          {businessId === "" && (
            <p className="text-sm text-[#64748B]">
              Select a merchant to load its activities.
            </p>
          )}

          {hasNoActivities && (
            <p className="text-sm text-[#475569]">
              This merchant has no offline activities yet. Add some from the
              merchant page first.{" "}
              <Link
                to={`/merchants/${businessId}`}
                className="text-[#4A148C] font-semibold"
              >
                Open merchant
              </Link>
            </p>
          )}

          {businessId !== "" && activities.length > 0 && (
            <>
              {rows.map((row) => (
                <div key={row.key} className="flex items-center gap-3">
                  <select
                    value={row.activityId}
                    onChange={(e) =>
                      updateRow(row.key, { activityId: e.target.value })
                    }
                    disabled={generateBatchLoading}
                    className={`${inputClass} flex-1 min-w-0`}
                  >
                    <option value="" disabled>
                      Select activity
                    </option>
                    {activities
                      .filter(
                        (activity) =>
                          activity.id === row.activityId ||
                          !rows.some((r) => r.activityId === activity.id),
                      )
                      .map((activity) => (
                        <option key={activity.id} value={activity.id}>
                          {activity.name} · {activity.points.toLocaleString()}{" "}
                          pts
                        </option>
                      ))}
                  </select>

                  <input
                    type="number"
                    min={1}
                    max={MAX_CODES}
                    step={1}
                    value={row.quantity}
                    onChange={(e) =>
                      updateRow(row.key, { quantity: e.target.value })
                    }
                    placeholder="Qty"
                    disabled={generateBatchLoading}
                    className={`${inputClass} w-24`}
                  />

                  <button
                    type="button"
                    aria-label="Remove activity"
                    disabled={rows.length === 1 || generateBatchLoading}
                    onClick={() => removeRow(row.key)}
                    className="text-[#64748B] hover:text-[#B91C1C] disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <FaXmark />
                  </button>
                </div>
              ))}

              <button
                type="button"
                disabled={!canAddRow || generateBatchLoading}
                onClick={addRow}
                className="w-fit flex items-center gap-2 text-sm font-semibold text-[#4A148C] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <FaPlus size={12} />
                Add activity
              </button>
            </>
          )}
        </div>

        <div className="flex items-center justify-between gap-4 flex-wrap border-t border-[#E2E8F0] pt-5">
          <p
            className={`text-sm ${
              total > MAX_CODES ? "text-[#B91C1C]" : "text-[#475569]"
            }`}
          >
            Total:{" "}
            <span className="font-semibold">{total.toLocaleString()}</span> of{" "}
            {MAX_CODES.toLocaleString()} max
          </p>

          <div className="flex gap-3">
            <button
              type="button"
              disabled={generateBatchLoading}
              onClick={() => navigate(-1)}
              className={outlineButton}
            >
              Cancel
            </button>
            <button type="submit" disabled={!canSubmit} className={primaryButton}>
              {generateBatchLoading && <FaSpinner className="animate-spin" />}
              Generate
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default GenerateBatch;