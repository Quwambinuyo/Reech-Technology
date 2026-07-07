import { useEffect } from "react";
import { DashboardCard } from "../pages/dashboard/partials";
import { pointBalance, pointSpent, rank, redeemedPoint } from "../assets";
import DashboardCharts from "../components/DashboardCharts";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  fetchDashboardOverview,
  fetchRewardPerformance,
} from "../redux/dashboard/action";

const MerchantDashboard = () => {
  const completed = 26;
  const delayed = 35;
  const ongoing = 35;
  const dispatch = useAppDispatch();
  const rewardPeriod: 0 | 1 = 1;

  const { overview, rewardPerformance, loading } = useAppSelector(
    (state) => state.dashboard,
  );

  useEffect(() => {
    dispatch(fetchDashboardOverview());
    dispatch(fetchRewardPerformance(rewardPeriod));
  }, [dispatch, rewardPeriod]);

  const doughnutValues = { completed, delayed, ongoing };

  return (
    <div className="mt-7">
      <section className="overflow-x-auto hide-scroll">
        <div className="grid grid-cols-4 gap-4 min-w-[1000px]">
          <DashboardCard
            icon={pointBalance}
            title="total customers"
            value={
              loading.overview
                ? "..."
                : (overview?.totalCustomers.value.toLocaleString() ?? "0")
            }
            context="user"
            info={{
              percentage: overview?.totalCustomers.percentageChange ?? 0,
            }}
          />
          <DashboardCard
            icon={redeemedPoint}
            title="total points issued"
            value={
              loading.overview
                ? "..."
                : (overview?.totalPointsIssued.value.toLocaleString() ?? "0")
            }
            context="point"
            info={{
              percentage: overview?.totalPointsIssued.percentageChange ?? 0,
            }}
          />
          <DashboardCard
            icon={rank}
            title="total redemptions"
            value={
              loading.overview
                ? "..."
                : (overview?.totalRedemptions.value.toLocaleString() ?? "0")
            }
            context="point"
            info={{
              percentage: overview?.totalRedemptions.percentageChange ?? 0,
            }}
          />
          <DashboardCard
            icon={pointSpent}
            title="total spent"
            value={
              loading.overview
                ? "..."
                : (overview?.totalSpent.value.toLocaleString() ?? "0")
            }
            info={{
              percentage: overview?.totalSpent.percentageChange ?? 0,
            }}
          />
        </div>
      </section>

      <DashboardCharts
        doughnutValues={doughnutValues}
        rewardPerformance={rewardPerformance}
      />
    </div>
  );
};

export default MerchantDashboard;
