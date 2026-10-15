import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaQuestion } from "react-icons/fa6";
import { pointBalance, pointSpent, rank, redeemedPoint } from "../assets";
import { DashboardCard } from "../pages/dashboard/partials";
import DashboardCharts from "../components/DashboardCharts";
import Skeleton from "../merchant/skeleton/dashboardSkeleton/Skeleton";
import Modal from "../layout/Modal";
import UserRow, { UserRowSkeleton, type AdminUser } from "../pages/manage-users/UserRow";
import UserDetailCard from "../pages/manage-users/UserDetailCard";
import DeleteUserCard from "../pages/manage-users/DeleteUserCard";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  fetchAdminDashboardOverview,
  fetchAdminRewardPerformance,
} from "../redux/dashboard/action";
import { fetchUsers, fetchUserById, deleteUser } from "../redux/users/action";
import { clearSelectedUser } from "../redux/users/reducer";

type AdminDashboardProps = {
  startDate: Date | null;
  endDate: Date;
};

const USERS_LIMIT = 5;

const AdminDashboard = ({ startDate, endDate }: AdminDashboardProps) => {
  const completed = 26;
  const delayed = 35;
  const ongoing = 35;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const rewardPeriod: 0 | 1 = 1;

  const { adminOverview, adminRewardPerformance, loading } = useAppSelector(
    (state) => state.dashboard,
  );
  const {
    allUsers,
    fetchUsersLoading,
    fetchUsersError,
    usersNetworkError,
    deleteUserLoading,
  } = useAppSelector((state) => state.user);

  const [viewingId, setViewingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminUser | null>(null);

  const loadUsers = () => {
    dispatch(
      fetchUsers({
        PageNumber: 1,
        PageSize: USERS_LIMIT,
        Search: "",
        Status: "active",
      }),
    );
  };

  useEffect(() => {
    dispatch(
      fetchAdminDashboardOverview({
        startDate: startDate ? startDate.toISOString() : null,
        endDate: endDate.toISOString(),
      }),
    );
    dispatch(fetchAdminRewardPerformance(rewardPeriod));
  }, [dispatch, rewardPeriod, startDate, endDate]);

  useEffect(() => {
    dispatch(
      fetchUsers({
        PageNumber: 1,
        PageSize: USERS_LIMIT,
        Search: "",
        Status: "active",
      }),
    );
  }, [dispatch]);

  const viewingUser =
    allUsers.result.find((user: AdminUser) => user.id === viewingId) ?? null;

  const handleView = (user: AdminUser) => {
    setViewingId(user.id);
    dispatch(fetchUserById(user.id));
  };

  const closeDetail = () => {
    setViewingId(null);
    dispatch(clearSelectedUser());
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await dispatch(deleteUser(deleteTarget.id)).unwrap();
      if (viewingId === deleteTarget.id) closeDetail();
      setDeleteTarget(null);
      loadUsers();
    } catch {
      return;
    }
  };

  const hasError = Boolean(fetchUsersError || usersNetworkError);

  const doughnutValues = { completed, delayed, ongoing };

  if (loading.adminOverview) {
    return <Skeleton />;
  }

  return (
    <div className="mt-7">
      <Modal modal={Boolean(viewingUser)}>
        <>
          {viewingUser && (
            <UserDetailCard
              user={viewingUser}
              onClose={closeDetail}
              onDelete={() => setDeleteTarget(viewingUser)}
            />
          )}
        </>
      </Modal>

      <Modal modal={Boolean(deleteTarget)}>
        <>
          {deleteTarget && (
            <DeleteUserCard
              user={deleteTarget}
              loading={deleteUserLoading}
              onConfirm={handleConfirmDelete}
              onCancel={() => setDeleteTarget(null)}
            />
          )}
        </>
      </Modal>

      <section className="overflow-x-auto hide-scroll">
        <div className="grid grid-cols-4 gap-4 min-w-[1000px]">
          <DashboardCard
            icon={pointBalance}
            title="total customers"
            value={adminOverview?.totalCustomers?.value ?? 0}
            context="user"
            info={{
              percentage: adminOverview?.totalCustomers?.percentageChange ?? 0,
            }}
          />
          <DashboardCard
            icon={redeemedPoint}
            title="total points"
            value={adminOverview?.totalPoints?.value ?? 0}
            context="point"
            info={{
              percentage: adminOverview?.totalPoints?.percentageChange ?? 0,
            }}
          />
          <DashboardCard
            icon={rank}
            title="total merchants"
            value={adminOverview?.totalMerchants?.value ?? 0}
            context="merchant"
            info={{
              percentage: adminOverview?.totalMerchants?.percentageChange ?? 0,
            }}
          />
          <DashboardCard
            icon={pointSpent}
            title="total spent"
            value={adminOverview?.totalSpent?.value ?? 0}
            info={{
              percentage: adminOverview?.totalSpent?.percentageChange ?? 0,
            }}
          />
        </div>
      </section>

      <DashboardCharts
        doughnutValues={doughnutValues}
        rewardPerformance={adminRewardPerformance}
      />

      <section className="rounded-xl bg-white p-3 lg:p-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h4 className="text-light-black sm:text-lg flex items-center gap-1">
            Users <FaQuestion color="#4A148C" size={15} />
          </h4>
          <button
            onClick={() => navigate("/manage-users")}
            className="text-sm font-semibold text-[#4A148C] hover:underline"
          >
            View all
          </button>
        </div>

        <div className="mt-5 lg:mt-6 overflow-x-auto">
          <div className="px-4 sm:px-5 md:px-6 lg:px-8 gap-5 font-montserrat font-semibold text-sm min-w-[900px] grid grid-cols-10">
            <p className="col-span-3">Name</p>
            <p className="col-span-2">Status</p>
            <p className="col-span-2">Joined</p>
            <p className="col-span-3 text-right">Action</p>
          </div>

          <div className="mt-4">
            {fetchUsersLoading &&
              Array.from({ length: USERS_LIMIT }).map((_, index) => (
                <UserRowSkeleton key={index} />
              ))}

            {!fetchUsersLoading && hasError && (
              <div className="py-10 text-center text-sm font-ibmplex text-gray-500">
                <p>{usersNetworkError || fetchUsersError}</p>
                <button
                  onClick={loadUsers}
                  className="mt-3 text-[#4A148C] font-semibold underline"
                >
                  Try again
                </button>
              </div>
            )}

            {!fetchUsersLoading &&
              !hasError &&
              allUsers.result.length === 0 && (
                <p className="py-10 text-center text-sm font-ibmplex text-gray-400">
                  No users found.
                </p>
              )}

            {!fetchUsersLoading &&
              !hasError &&
              allUsers.result.map((user: AdminUser) => (
                <UserRow
                  key={user.id}
                  user={user}
                  onView={() => handleView(user)}
                  onDelete={() => setDeleteTarget(user)}
                />
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;