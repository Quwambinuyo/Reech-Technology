import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FaArrowLeft, FaPlus, FaXmark } from "react-icons/fa6";
import DateTimePicker from "../../components/Datetimepicker";
import { CustomTextInput } from "../../components/CustomInput";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchOfflineActivities,
  generateOfflineBatch,
  getOfflineScope,
} from "../../redux/offline/action";
import {
  MerchantSelect,
  inputClass,
  useMerchantName,
} from "../manage-merchant/OfflineHelpers";
import BatchSummary from "./BatchSummary";

const MAX_CODES = 10000;
const FOCUS_COLOR = "#4A148C";

type Row = { key: number; activityId: string; quantity: string };

const atEndOfDay = (date: Date) => {
  date.setHours(23, 59, 0, 0);
  return date;
};

const inDays = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return atEndOfDay(date);
};

const endOfYear = () => {
  const year = new Date().getFullYear();
  const date = atEndOfDay(new Date(year, 11, 31));

  return date.getTime() > Date.now()
    ? date
    : atEndOfDay(new Date(year + 1, 11, 31));
};

const EXPIRY_PRESETS = [
  { label: "In 30 days", getDate: () => inDays(30) },
  { label: "In 90 days", getDate: () => inDays(90) },
  { label: "End of year", getDate: endOfYear },
];

const cardClass = "bg-white rounded-xl p-5 md:p-6 flex flex-col gap-5";
const labelClass = "text-sm md:text-[14.5px]";

const SectionHeader = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div>
    <h5 className="font-semibold text-[#1E293B]">{title}</h5>
    <p className="text-sm text-[#64748B]">{description}</p>
  </div>
);

const GenerateBatch = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const nextKey = useRef(1);
  const isMerchant = getOfflineScope() === "merchant";
  const merchantName = useMerchantName();

  const { allActivities, fetchActivitiesLoading, generateBatchLoading } =
    useAppSelector((state) => state.offlinePoints);

  const [businessId, setBusinessId] = useState(
    isMerchant ? "" : (params.get("businessId") ?? ""),
  );
  const [reference, setReference] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [rows, setRows] = useState<Row[]>([
    { key: 0, activityId: "", quantity: "" },
  ]);

  const hasTarget = isMerchant || businessId !== "";

  useEffect(() => {
    if (hasTarget) {
      dispatch(
        fetchOfflineActivities({ businessId, page: 1, pageSize: 100 }),
      );
    }
  }, [dispatch, businessId, hasTarget]);

  const activities = allActivities.items.filter(
    (activity) => isMerchant || activity.businessId === businessId,
  );

  const getActivity = (id: string) =>
    activities.find((activity) => activity.id === id);

  const total = rows.reduce((sum, row) => sum + (Number(row.quantity) || 0), 0);
  const totalPoints = rows.reduce(
    (sum, row) =>
      sum +
      (Number(row.quantity) || 0) * (getActivity(row.activityId)?.points ?? 0),
    0,
  );
  const rowsValid = rows.every(
    (row) =>
      row.activityId !== "" &&
      Number.isInteger(Number(row.quantity)) &&
      Number(row.quantity) >= 1,
  );
  const expiryDate = expiresAt ? new Date(expiresAt) : null;
  const expiryValid = expiryDate !== null && expiryDate.getTime() > Date.now();
  const canSubmit =
    hasTarget &&
    reference.trim() !== "" &&
    expiryValid &&
    rowsValid &&
    total >= 1 &&
    total <= MAX_CODES &&
    !generateBatchLoading;

  const summaryLines = rows
    .filter((row) => row.activityId !== "" && Number(row.quantity) >= 1)
    .map((row) => ({
      key: row.key,
      name: getActivity(row.activityId)?.name ?? "",
      quantity: Number(row.quantity),
    }));

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

  const showActivitySkeleton =
    hasTarget && fetchActivitiesLoading && activities.length === 0;
  const hasNoActivities =
    hasTarget && !fetchActivitiesLoading && activities.length === 0;
  const canAddRow = rows.length < activities.length;

  const expiryHint =
    expiryDate && expiryValid
      ? `Codes stop working at ${expiryDate.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZoneName: "short",
        })} (${expiryDate.toISOString().slice(0, 16).replace("T", " ")} UTC).`
      : "Customers can't claim a code after this time.";

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
        <div>
          <h4 className="font-semibold text-[#1E293B]">Generate codes</h4>
          <p className="text-sm text-[#64748B]">
            Create a batch of one-time codes to print and hand out.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_340px]"
      >
        <div className="flex flex-col gap-5">
          <section className={cardClass}>
            <SectionHeader
              title="Batch details"
              description="Who the codes are for, how you will recognise the batch, and when it ends."
            />

            <div className="grid gap-5 md:grid-cols-2">
              {!isMerchant && (
                <div className="flex flex-col gap-1 md:col-span-2">
                  <label className={labelClass}>Merchant</label>
                  <MerchantSelect
                    value={businessId}
                    onChange={handleMerchantChange}
                    disabled={generateBatchLoading}
                  />
                </div>
              )}

              <CustomTextInput
                id="reference"
                label="Batch reference"
                placeholder="LAGOS-NOV-01"
                value={reference}
                handleChange={(e) => setReference(e.target.value)}
                focusBorderColor={FOCUS_COLOR}
                otherInputProps={{ disabled: generateBatchLoading }}
                otherInfo={
                  <span className="text-xs text-[#64748B]">
                    Your own label. It must be unique for this merchant.
                  </span>
                }
              />

              <div className="flex flex-col gap-1">
                <label htmlFor="expiresAt" className={labelClass}>
                  Codes expire on
                </label>
                <DateTimePicker
                  id="expiresAt"
                  value={expiresAt}
                  onChange={setExpiresAt}
                  min={new Date()}
                  disabled={generateBatchLoading}
                  presets={EXPIRY_PRESETS}
                />
                <span className="text-xs text-[#64748B]">{expiryHint}</span>
              </div>
            </div>
          </section>

          <section className={cardClass}>
            <SectionHeader
              title="Activities and quantities"
              description="Choose what each code is worth and how many of each to make."
            />

            {!hasTarget && (
              <p className="rounded-lg bg-[#F5F6FF] px-4 py-3 text-sm text-[#475569]">
                Select a merchant to load its activities.
              </p>
            )}

            {showActivitySkeleton && (
              <div className="flex flex-col gap-3 animate-pulse">
                <div className="h-16 rounded-lg bg-[#E2E8F0]" />
                <div className="h-16 rounded-lg bg-[#E2E8F0]" />
              </div>
            )}

            {hasNoActivities && (
              <p className="rounded-lg bg-[#FEF3C7] px-4 py-3 text-sm text-[#92400E]">
                {isMerchant
                  ? "You have no offline activities yet. Add some on the activities page first."
                  : "This merchant has no offline activities yet. Add some from the merchant page first."}{" "}
                <Link
                  to={
                    isMerchant
                      ? "/offline-points/activities"
                      : `/merchants/${businessId}`
                  }
                  className="font-semibold text-[#4A148C]"
                >
                  {isMerchant ? "Open activities" : "Open merchant"}
                </Link>
              </p>
            )}

            {hasTarget && activities.length > 0 && (
              <div className="flex flex-col gap-3">
                {rows.map((row) => {
                  const activity = getActivity(row.activityId);
                  const quantity = Number(row.quantity) || 0;

                  return (
                    <div
                      key={row.key}
                      className="flex flex-col gap-3 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-3 md:p-4"
                    >
                      <div className="grid items-end gap-3 md:grid-cols-[minmax(0,1fr)_150px_auto]">
                        <div className="flex flex-col gap-1">
                          <label
                            htmlFor={`activity-${row.key}`}
                            className={labelClass}
                          >
                            Activity
                          </label>
                          <select
                            id={`activity-${row.key}`}
                            value={row.activityId}
                            onChange={(e) =>
                              updateRow(row.key, { activityId: e.target.value })
                            }
                            disabled={generateBatchLoading}
                            className={`${inputClass} py-2.5`}
                          >
                            <option value="" disabled>
                              Select activity
                            </option>
                            {activities
                              .filter(
                                (item) =>
                                  item.id === row.activityId ||
                                  !rows.some((r) => r.activityId === item.id),
                              )
                              .map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.name} · {item.points.toLocaleString()}{" "}
                                  pts
                                </option>
                              ))}
                          </select>
                        </div>

                        <CustomTextInput
                          id={`quantity-${row.key}`}
                          label="Number of codes"
                          type="number"
                          placeholder="e.g. 200"
                          value={row.quantity}
                          handleChange={(e) =>
                            updateRow(row.key, { quantity: e.target.value })
                          }
                          focusBorderColor={FOCUS_COLOR}
                          otherInputProps={{
                            min: 1,
                            max: MAX_CODES,
                            step: 1,
                            inputMode: "numeric",
                            disabled: generateBatchLoading,
                          }}
                        />

                        <button
                          type="button"
                          aria-label="Remove activity"
                          disabled={rows.length === 1 || generateBatchLoading}
                          onClick={() => removeRow(row.key)}
                          className="flex size-11 shrink-0 items-center justify-center self-end rounded-md text-[#64748B] transition-colors hover:bg-[#FEE2E2] hover:text-[#B91C1C] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-[#64748B]"
                        >
                          <FaXmark />
                        </button>
                      </div>

                      {activity && quantity > 0 && (
                        <p className="text-xs text-[#64748B]">
                          {quantity.toLocaleString()} codes ×{" "}
                          {activity.points.toLocaleString()} pts ={" "}
                          <span className="font-semibold text-[#1E293B]">
                            {(quantity * activity.points).toLocaleString()} pts
                          </span>{" "}
                          if all are claimed
                        </p>
                      )}
                    </div>
                  );
                })}

                <button
                  type="button"
                  disabled={!canAddRow || generateBatchLoading}
                  onClick={addRow}
                  className="flex w-fit items-center gap-2 rounded border border-dashed border-[#4A148C]/50 px-4 py-2 text-sm font-semibold text-[#4A148C] transition-colors hover:bg-[#EDE7F6] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
                >
                  <FaPlus size={12} />
                  Add another activity
                </button>
              </div>
            )}
          </section>
        </div>

        <BatchSummary
          merchant={hasTarget ? merchantName(businessId) : null}
          reference={reference.trim()}
          expiryDate={expiryDate}
          lines={summaryLines}
          total={total}
          totalPoints={totalPoints}
          maxCodes={MAX_CODES}
          isLoading={generateBatchLoading}
          canSubmit={canSubmit}
          onCancel={() => navigate(-1)}
        />
      </form>
    </div>
  );
};

export default GenerateBatch;