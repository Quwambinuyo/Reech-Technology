import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Pagination } from "../../components/Pagination";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchOfflineBatches } from "../../redux/offline/action";
import {
  BatchStatusBadge,
  MerchantSelect,
  formatDate,
  primaryButton,
  useMerchantName,
} from "../manage-merchant/OfflineHelpers";

const PAGE_SIZE = 20;
const SKELETON_ROWS = 6;

const gridStyle = { gridTemplateColumns: "repeat(12,1fr)" };

const BatchRowSkeleton = () => (
  <div
    className="py-5 odd:bg-[#F5F6FF] min-w-[900px] px-4 sm:px-5 md:px-6 grid gap-6 items-center animate-pulse"
    style={gridStyle}
  >
    <div className="col-span-3 h-4 w-32 bg-[#E2E8F0] rounded" />
    <div className="col-span-3 h-4 w-28 bg-[#E2E8F0] rounded" />
    <div className="col-span-1 h-4 w-12 bg-[#E2E8F0] rounded" />
    <div className="col-span-2 h-6 w-24 bg-[#E2E8F0] rounded" />
    <div className="col-span-2 h-4 w-20 bg-[#E2E8F0] rounded" />
    <div className="col-span-1 h-8 w-14 bg-[#E2E8F0] rounded justify-self-end" />
  </div>
);

const OfflinePoints = () => {
  const dispatch = useAppDispatch();
  const [params, setParams] = useSearchParams();
  const merchantName = useMerchantName();

  const businessId = params.get("businessId") ?? "";
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
          <MerchantSelect
            value={businessId}
            allLabel="All merchants"
            onChange={(value) => updateParams({ businessId: value, page: 1 })}
            className="w-[220px]"
          />

          <Link to={generateLink} className={primaryButton}>
            Generate codes
          </Link>
        </div>
      </div>

      <div className="mt-3 overflow-x-auto">
        <div
          className="gap-6 font-montserrat font-semibold text-sm grid px-1 min-w-[900px]"
          style={gridStyle}
        >
          <p className="col-span-3">Reference</p>
          <p className="col-span-3">Merchant</p>
          <p className="col-span-1">Codes</p>
          <p className="col-span-2">Status</p>
          <p className="col-span-2">Expires</p>
          <p className="col-span-1 text-right">Action</p>
        </div>

        <div className="mt-4">
          {showSkeleton &&
            Array.from({ length: SKELETON_ROWS }).map((_, index) => (
              <BatchRowSkeleton key={index} />
            ))}

          {!showSkeleton && fetchBatchesError && (
            <div className="py-10 text-center flex flex-col items-center gap-3 min-w-[900px]">
              <p className="text-sm text-[#475569]">{fetchBatchesError}</p>
              <button
                type="button"
                onClick={refetch}
                className="text-sm text-[#4A148C] font-semibold"
              >
                Try again
              </button>
            </div>
          )}

          {!showSkeleton &&
            !fetchBatchesError &&
            allBatches.items.length === 0 && (
              <p className="py-10 text-center text-sm text-[#475569] min-w-[900px]">
                No batches yet
              </p>
            )}

          {!showSkeleton &&
            !fetchBatchesError &&
            allBatches.items.map((batch) => (
              <div
                key={batch.id}
                className="py-4 odd:bg-[#F5F6FF] min-w-[900px] px-4 sm:px-5 md:px-6 grid gap-6 items-center text-sm text-[#1E293B]"
                style={gridStyle}
              >
                <p className="col-span-3 font-medium truncate">
                  {batch.reference}
                </p>
                <p className="col-span-3 truncate text-[#475569]">
                  {merchantName(batch.businessId)}
                </p>
                <p className="col-span-1">
                  {batch.redeemedCount}/{batch.codeCount}
                </p>
                <div className="col-span-2">
                  <BatchStatusBadge batch={batch} />
                </div>
                <p className="col-span-2 text-[#475569]">
                  {formatDate(batch.expiresAt)}
                </p>
                <div className="col-span-1 flex justify-end">
                  <Link
                    to={`/offline-points/${batch.id}`}
                    className="px-3 py-1.5 rounded text-xs font-semibold border border-[#4A148C] text-[#4A148C]"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>

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