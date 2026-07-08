import { useNavigate } from "react-router-dom";
import { pointBalance, pointSpent, rank, redeemedPoint } from "../assets";
import TabSelector from "../components/TabSelector";
import { DashboardCard } from "../pages/dashboard/partials";
import { useEffect, useState } from "react";
import { merchantTrxTabs } from "../customer/partials";
import { SeeAllBtn } from "../components/small";
import { FaQuestion } from "react-icons/fa6";
import TransactionCard from "./partial/TransactionCard";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  fetchRecentTransactions,
  fetchDashboardOverview,
} from "../redux/dashboard/action";
import Skeleton from "../merchant/skeleton/transactionSkeleton/Skeleton";
import Empty from "../components/Empty";

const MerchantTransactions = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [pageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [search] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const { recentTransactions, loading, overview } = useAppSelector(
    (state) => state.dashboard,
  );

  useEffect(() => {
    dispatch(fetchDashboardOverview());
    dispatch(
      fetchRecentTransactions({
        pageNumber,
        pageSize,
        search,
      }),
    );
  }, [dispatch, pageNumber, pageSize, search]);

  const selectedTransactions = () => {
    if (!recentTransactions?.result) return [];

    if (activeTab === "Points") {
      return recentTransactions.result.filter(
        (transaction) => !transaction.isDebit,
      );
    }

    if (activeTab === "Rewards") {
      return recentTransactions.result.filter(
        (transaction) => transaction.isDebit,
      );
    }

    return recentTransactions.result;
  };

  if (loading.overview || loading.recentTransactions) {
    return <Skeleton />;
  }

  return (
    <div className="mt-7">
      <section className="overflow-x-auto hide-scroll">
        <div className="grid grid-cols-4 gap-4 min-w-[1000px]">
          <DashboardCard
            icon={pointBalance}
            title="total customers"
            value={overview?.totalCustomers.value.toLocaleString() ?? "0"}
            context="user"
            info={{
              percentage: overview?.totalCustomers.percentageChange ?? 0,
            }}
          />

          <DashboardCard
            icon={redeemedPoint}
            title="total points issued"
            value={overview?.totalPointsIssued.value.toLocaleString() ?? "0"}
            context="point"
            info={{
              percentage: overview?.totalPointsIssued.percentageChange ?? 0,
            }}
          />

          <DashboardCard
            icon={rank}
            title="total redemptions"
            value={overview?.totalRedemptions.value.toLocaleString() ?? "0"}
            context="point"
            info={{
              percentage: overview?.totalRedemptions.percentageChange ?? 0,
            }}
          />

          <DashboardCard
            icon={pointSpent}
            title="total spent"
            value={overview?.totalSpent.value.toLocaleString() ?? "0"}
            info={{
              percentage: overview?.totalSpent.percentageChange ?? 0,
            }}
          />
        </div>
      </section>

      <section className="rounded-xl bg-white p-3 lg:p-4 mt-7 flex flex-col gap-4">
        <div className="flex-between">
          <h4 className="text-light-black text-lg flex items-center gap-1">
            Recent Transactions <FaQuestion color="#4A148C" size={15} />
          </h4>

          <SeeAllBtn
            onClick={() =>
              navigate("/transactions/all", {
                state: { filter: activeTab },
              })
            }
          />
        </div>

        <TabSelector
          options={merchantTrxTabs}
          activeTab={activeTab}
          onSelect={setActiveTab}
        />

        <div className="overflow-x-auto mt-4">
          <div
            className="font-montserrat grid gap-3 font-semibold text-sm px-2 min-w-[1000px]"
            style={{ gridTemplateColumns: "repeat(19, 1fr)" }}
          >
            <p className="col-span-4 ml-5">Name</p>
            <p className="col-span-3">Amount</p>
            <p className="col-span-4 text-center">Date/Time</p>
            <p className="col-span-3 text-center">Point Earned</p>
            <p className="col-span-3">
              {activeTab === "Points"
                ? "Status"
                : activeTab === "Rewards"
                  ? "Redeemed"
                  : "Status"}
            </p>
            <p className="col-span-2">Action</p>
          </div>

          <div className="px-2 py-4 lg:py-5 lg:px-3 min-h-[250px] min-w-[1000px]">
            <div className="grid gap-2">
              {selectedTransactions().length === 0 ? (
                <div className="h-[300px] xl:h-[300px]">
                  <Empty text="No Transaction has been made yet" />
                </div>
              ) : (
                selectedTransactions().map((transaction) => (
                  <TransactionCard
                    key={transaction.id}
                    transaction={transaction}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MerchantTransactions;
