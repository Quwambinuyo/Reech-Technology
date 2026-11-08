import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { DataTable, type DataTableColumn } from "../../components/DataTable";
import { Pagination } from "../../components/Pagination";
import { ProgressBar } from "../../components/ProgressBar";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchOfflineBatches,
  getOfflineScope,
} from "../../redux/offline/action";
import type { OfflineBatch } from "../../redux/offline/reducer";
import { formatDateTime } from "../../utils";
import {
  BatchStatusBadge,
  MerchantSelect,
  NOT_SET,
  outlineButton,
  primaryButton,
  useMerchantName,
} from "../manage-merchant/OfflineHelpers";

const PAGE_SIZE = 20;

const dateOrDash = (value: string | null) =>
  value ? formatDateTime(value) : NOT_SET;

const OfflinePoints = () => {
  const dispatch = useAppDispatch();
  const [params, setParams] = useSearchParams();
  const merchantName = useMerchantName();
  const isMerchant = getOfflineScope() === "merchant";

  const businessId = isMerchant ? "" : (params.get("businessId") ?? "");
  const page = Number(params.get("page") ?? 1);

  const { allBatches, fetchBatchesLoading, fetchBatchesError } = useAppSelector(
    (state) => state.offlinePoints,
  );

  useEffect(() => {
    dispatch(fetchOfflineBatches({ businessId, page, pageSize: PAGE_SIZE }));
  }, [dispatch, businessId, page]);

  const updateParams = (next: { businessId?: string; page?: number }) => {
    const merged = { businessId, page, ...next };
    const search = new URLSearchParams();

    if (merged.businessId) search.set("businessId", merged.businessId);
    if (merged.page > 1) search.set("page", String(merged.page));

    setParams(search);
  };

  const refetch = () => {
    dispatch(fetchOfflineBatches({ businessId, page, pageSize: PAGE_SIZE }));
  };

  const columns: DataTableColumn<OfflineBatch>[] = [
    {
      key: "reference",
      header: "Reference",
      maxWidth: 220,
      skeletonWidth: "w-32",
      tooltip: (batch) => batch.reference,
      render: (batch) => (
        <span className="font-medium text-[#1E293B]">{batch.reference}</span>
      ),
    },
    {
      key: "merchant",
      header: "Merchant",
      hidden: isMerchant,
      maxWidth: 220,
      skeletonWidth: "w-28",
      tooltip: (batch) => merchantName(batch.businessId),
      render: (batch) => merchantName(batch.businessId),
    },
    {
      key: "redeemed",
      header: "Redeemed",
      skeletonWidth: "w-24",
      render: (batch) => (
        <div>
          <p className="font-medium text-[#1E293B]">
            {batch.redeemedCount.toLocaleString()} /{" "}
            {batch.codeCount.toLocaleString()}
          </p>
          <ProgressBar
            value={batch.redeemedCount}
            max={batch.codeCount}
            label="Codes redeemed"
            className="mt-1.5 w-28"
          />
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      skeletonWidth: "w-28",
      render: (batch) => <BatchStatusBadge batch={batch} />,
    },
    {
      key: "givenTo",
      header: "Given to",
      maxWidth: 200,
      skeletonWidth: "w-28",
      tooltip: (batch) => batch.distributedTo ?? undefined,
      render: (batch) => batch.distributedTo?.trim() || NOT_SET,
    },
    {
      key: "handedOver",
      header: "Handed over",
      skeletonWidth: "w-36",
      render: (batch) => dateOrDash(batch.distributedAt),
    },
    {
      key: "created",
      header: "Created",
      skeletonWidth: "w-36",
      render: (batch) => dateOrDash(batch.createdAt),
    },
    {
      key: "expires",
      header: "Expires",
      skeletonWidth: "w-36",
      render: (batch) => dateOrDash(batch.expiresAt),
    },
    {
      key: "action",
      header: "Action",
      align: "right",
      pinRight: true,
      skeleton: <div className="ml-auto h-8 w-14 rounded bg-[#E2E8F0]" />,
      render: (batch) => (
        <Link
          to={`/offline-points/${batch.id}`}
          className="inline-block px-4 py-1.5 rounded text-xs font-semibold border border-[#4A148C] text-[#4A148C] hover:bg-[#4A148C] hover:text-white transition-colors"
        >
          View
        </Link>
      ),
    },
  ];

  const totalPages = Math.max(1, Math.ceil(allBatches.totalCount / PAGE_SIZE));
  const showSkeleton = fetchBatchesLoading && allBatches.items.length === 0;
  const generateLink = businessId
    ? `/offline-points/new?businessId=${businessId}`
    : "/offline-points/new";

  return (
    <section className="rounded-xl bg-white p-4 lg:p-5 mt-2 flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h4 className="font-semibold text-[#1E293B]">Offline points</h4>
          <p className="text-sm text-[#64748B]">
            Printable one-time codes handed out through shops.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {isMerchant ? (
            <Link to="/offline-points/activities" className={outlineButton}>
              Activities
            </Link>
          ) : (
            <MerchantSelect
              value={businessId}
              allLabel="All merchants"
              onChange={(value) => updateParams({ businessId: value, page: 1 })}
              className="w-[220px]"
            />
          )}

          <Link to={generateLink} className={primaryButton}>
            Generate codes
          </Link>
        </div>
      </div>

      <DataTable
        className="mt-3"
        minWidth={1280}
        columns={columns}
        rows={allBatches.items}
        getRowKey={(batch) => batch.id}
        isLoading={showSkeleton}
        error={fetchBatchesError}
        onRetry={refetch}
        emptyMessage="No batches yet"
      />

      {!fetchBatchesError && allBatches.totalCount > 0 && (
        <Pagination
          className="mt-2"
          currentPage={page}
          totalPages={totalPages}
          totalCount={allBatches.totalCount}
          pageSize={PAGE_SIZE}
          onPageChange={(nextPage) => updateParams({ page: nextPage })}
        />
      )}
    </section>
  );
};

export default OfflinePoints;