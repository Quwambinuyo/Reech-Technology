import { useEffect } from "react";
import { FaQuestion } from "react-icons/fa6";
import { pointBalance, pointSpent, rank, redeemedPoint } from "../assets";
import UserRankCard from "../merchant/partial/UserRankCard";
import { DashboardCard } from "../pages/dashboard/partials";
import DashboardCharts from "../components/DashboardCharts";
import Skeleton from "../merchant/skeleton/dashboardSkeleton/Skeleton";
import { usersRank } from "../mock";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  fetchAdminDashboardOverview,
  fetchAdminRewardPerformance,
} from "../redux/dashboard/action";

type AdminDashboardProps = {
  startDate: Date | null;
  endDate: Date;
};

const AdminDashboard = ({ startDate, endDate }: AdminDashboardProps) => {
  const completed = 26;
  const delayed = 35;
  const ongoing = 35;

  const dispatch = useAppDispatch();
  const rewardPeriod: 0 | 1 = 1;

  const { adminOverview, adminRewardPerformance, loading } = useAppSelector(
    (state) => state.dashboard,
  );

  useEffect(() => {
    dispatch(
      fetchAdminDashboardOverview({
        startDate: startDate ? startDate.toISOString() : null,
        endDate: endDate.toISOString(),
      }),
    );
    dispatch(fetchAdminRewardPerformance(rewardPeriod));
  }, [dispatch, rewardPeriod, startDate, endDate]);

  const doughnutValues = { completed, delayed, ongoing };

  if (loading.adminOverview) {
    return <Skeleton />;
  }

  return (
    <div className="mt-7">
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
        <h4 className="text-light-black sm:text-lg flex items-center gap-1">
          User Ranks <FaQuestion color="#4A148C" size={15} />
        </h4>

        <div className="mt-5 lg:mt-6 overflow-x-auto">
          <div className="px-4 sm:px-5 md:px-6 lg:px-8 gap-5 font-montserrat font-semibold text-sm min-w-[800px] grid grid-cols-8">
            <p className="col-span-3">Name</p>
            <p className="col-span-2">Rank</p>
            <p className="col-span-2">Total Points</p>
            <p className="col-span-1">Action</p>
          </div>
          <div className="mt-4">
            {usersRank.slice(0, 5).map((user) => (
              <UserRankCard user={user} key={user.id} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
