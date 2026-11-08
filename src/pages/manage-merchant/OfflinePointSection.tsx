import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa6";
import { Pagination } from "../../components/Pagination";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  deleteOfflineActivity,
  fetchOfflineActivities,
} from "../../redux/offline/action";
import type { OfflineActivity } from "../../redux/offline/reducer";
import ActivityFormModal from "./ActivityFormModal";
import {
  ConfirmDialog,
  NOT_SET,
  outlineButton,
  primaryButton,
} from "./OfflineHelpers";

const PAGE_SIZE = 25;
const SKELETON_ROWS = 3;
const gridStyle = { gridTemplateColumns: "repeat(12,1fr)" };

type OfflinePointsSectionProps = {
  businessId: string;
  canGenerate: boolean;
};

const ActivityRowSkeleton = () => (
  <div
    className="py-5 odd:bg-[#F5F6FF] min-w-[640px] px-4 sm:px-5 md:px-6 grid gap-6 items-center animate-pulse"
    style={gridStyle}
  >
    <div className="col-span-4 h-4 w-32 bg-[#E2E8F0] rounded" />
    <div className="col-span-2 h-4 w-12 bg-[#E2E8F0] rounded" />
    <div className="col-span-4 h-4 w-40 bg-[#E2E8F0] rounded" />
    <div className="col-span-2 h-8 w-20 bg-[#E2E8F0] rounded justify-self-end" />
  </div>
);

const OfflinePointsSection = ({
  businessId,
  canGenerate,
}: OfflinePointsSectionProps) => {
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editing, setEditing] = useState<OfflineActivity | null>(null);
  const [toDelete, setToDelete] = useState<OfflineActivity | null>(null);

  const {
    allActivities,
    fetchActivitiesLoading,
    fetchActivitiesError,
    deleteActivityLoading,
  } = useAppSelector((state) => state.offlinePoints);

  const query = businessId ? `?businessId=${businessId}` : "";

  const load = useCallback(() => {
    dispatch(fetchOfflineActivities({ businessId, page, pageSize: PAGE_SIZE }));
  }, [dispatch, businessId, page]);

  useEffect(() => {
    load();
  }, [load]);

  const items = allActivities.items.filter(
    (activity) => !businessId || activity.businessId === businessId,
  );
  const totalPages = Math.max(1, Math.ceil(allActivities.totalCount / PAGE_SIZE));
  const showSkeleton = fetchActivitiesLoading && items.length === 0;

  const openCreate = () => {
    setEditing(null);
    setIsFormOpen(true);
  };

  const openEdit = (activity: OfflineActivity) => {
    setEditing(activity);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditing(null);
  };

  const handleSaved = () => {
    closeForm();
    load();
  };

  const handleDelete = async () => {
    if (!toDelete) return;

    const result = await dispatch(deleteOfflineActivity(toDelete.id));

    if (deleteOfflineActivity.fulfilled.match(result)) {
      setToDelete(null);

      if (items.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        load();
      }
    }
  };

  return (
    <section className="bg-white p-5 md:p-6 lg:p-7 xl:p-8 rounded-xl mt-5 flex flex-col gap-5">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h4 className="font-semibold text-[#1E293B]">Offline points</h4>
          <p className="text-sm text-[#64748B]">
            What a customer can earn points for in a shop, and the codes made
            from it.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button type="button" onClick={openCreate} className={outlineButton}>
            <FaPlus size={12} />
            New activity
          </button>

          <Link to={`/offline-points${query}`} className={outlineButton}>
            View batches
          </Link>

          {canGenerate ? (
            <Link to={`/offline-points/new${query}`} className={primaryButton}>
              Generate codes
            </Link>
          ) : (
            <button type="button" disabled className={primaryButton}>
              Generate codes
            </button>
          )}
        </div>
      </div>

      {!canGenerate && (
        <p className="text-sm text-[#B45309]">
          Codes can only be generated once this merchant is approved.
        </p>
      )}

      <div className="overflow-x-auto">
        <div
          className="gap-6 font-montserrat font-semibold text-sm grid px-1 min-w-[640px]"
          style={gridStyle}
        >
          <p className="col-span-4">Activity</p>
          <p className="col-span-2">Points</p>
          <p className="col-span-4">Description</p>
          <p className="col-span-2 text-right">Action</p>
        </div>

        <div className="mt-4">
          {showSkeleton &&
            Array.from({ length: SKELETON_ROWS }).map((_, index) => (
              <ActivityRowSkeleton key={index} />
            ))}

          {!showSkeleton && fetchActivitiesError && (
            <div className="py-10 text-center flex flex-col items-center gap-3 min-w-[640px]">
              <p className="text-sm text-[#475569]">{fetchActivitiesError}</p>
              <button
                type="button"
                onClick={load}
                className="text-sm text-[#4A148C] font-semibold"
              >
                Try again
              </button>
            </div>
          )}

          {!showSkeleton && !fetchActivitiesError && items.length === 0 && (
            <p className="py-10 text-center text-sm text-[#475569] min-w-[640px]">
              No activities yet. Add one to start generating codes.
            </p>
          )}

          {!showSkeleton &&
            !fetchActivitiesError &&
            items.map((activity) => (
              <div
                key={activity.id}
                className="py-4 odd:bg-[#F5F6FF] min-w-[640px] px-4 sm:px-5 md:px-6 grid gap-6 items-center text-sm text-[#1E293B]"
                style={gridStyle}
              >
                <p className="col-span-4 font-medium truncate">
                  {activity.name}
                </p>
                <p className="col-span-2">
                  {activity.points.toLocaleString()}
                </p>
                <p className="col-span-4 truncate text-[#475569]">
                  {activity.description?.trim() || NOT_SET}
                </p>
                <div className="col-span-2 flex justify-end gap-2">
                  <button
                    type="button"
                    aria-label={`Edit ${activity.name}`}
                    onClick={() => openEdit(activity)}
                    className="p-2 rounded border border-[#4A148C] text-[#4A148C] text-xs hover:bg-[#4A148C] hover:text-white transition-colors"
                  >
                    <FaPen />
                  </button>
                  <button
                    type="button"
                    aria-label={`Delete ${activity.name}`}
                    onClick={() => setToDelete(activity)}
                    className="p-2 rounded border border-[#B91C1C] text-[#B91C1C] text-xs hover:bg-[#B91C1C] hover:text-white transition-colors"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      {!fetchActivitiesError && allActivities.totalCount > PAGE_SIZE && (
        <Pagination
          className="mt-2"
          currentPage={page}
          totalPages={totalPages}
          totalCount={allActivities.totalCount}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
        />
      )}

      {isFormOpen && (
        <ActivityFormModal
          businessId={businessId}
          activity={editing}
          onClose={closeForm}
          onSaved={handleSaved}
        />
      )}

      {toDelete && (
        <ConfirmDialog
          title="Delete activity?"
          message={`"${toDelete.name}" will be removed. Codes already printed for it stay valid and can still be redeemed.`}
          confirmText="Delete activity"
          isLoading={deleteActivityLoading}
          onConfirm={handleDelete}
          onClose={() => setToDelete(null)}
        />
      )}
    </section>
  );
};

export default OfflinePointsSection;