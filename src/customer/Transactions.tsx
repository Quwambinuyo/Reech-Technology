import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { pointBalance, pointSpent, redeemedPoint, rank } from "../assets";
import { DashboardCard } from "../pages/dashboard/partials";
import TransactionCard from "./partials/TransactionCard";
import TabSelector from "../components/TabSelector";
import { tabs } from "./partials";
import { SeeAllBtn } from "../components/small";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  fetchCustomerDashboardOverview,
  fetchCustomerRecentTransactions,
} from "../redux/dashboard/action";
import Skeleton from "../merchant/skeleton/transactionSkeleton/Skeleton";
import Empty from "../components/Empty";
import { Pagination } from "../components/Pagination";

const CustomerTransactions = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [activeTab, setActiveTab] = useState("All");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(8);

  const { customerOverview, customerRecentTransactions, loading } =
    useAppSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(
      fetchCustomerDashboardOverview({
        startDate: null,
        endDate: new Date().toISOString(),
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchCustomerRecentTransactions({
        pageNumber,
        pageSize,
        search: "",
      }),
    );
  }, [dispatch, pageNumber, pageSize]);

  const transactions = customerRecentTransactions?.result ?? [];

  const selectedTransactions = transactions.filter((a) => {
    if (activeTab === "All") {
      return true;
    }
    return activeTab.toLowerCase().includes(a.isDebit ? "debit" : "credit");
  });

  if (loading.customerOverview) {
    return <Skeleton />;
  }

  return (
    <div className="mt-7">
      <section className="overflow-x-auto hide-scroll">
        <div className="grid grid-cols-4 gap-4 min-w-[1000px]">
          <DashboardCard
            icon={pointBalance}
            title="point balance"
            value={customerOverview?.pointBalance.value.toLocaleString() ?? "0"}
            context="point"
            info={{
              percentage: customerOverview?.pointBalance.percentageChange ?? 0,
            }}
          />
          <DashboardCard
            icon={pointSpent}
            title="total points spent"
            value={
              customerOverview?.totalPointsSpent.value.toLocaleString() ?? "0"
            }
            context="point"
            info={{
              percentage:
                customerOverview?.totalPointsSpent.percentageChange ?? 0,
            }}
          />
          <DashboardCard
            icon={redeemedPoint}
            title="total transactions"
            value={
              customerOverview?.totalTransactions.value.toLocaleString() ?? "0"
            }
            info={{
              percentage:
                customerOverview?.totalTransactions.percentageChange ?? 0,
            }}
          />
          <DashboardCard
            icon={rank}
            title="redeemed points"
            value={
              customerOverview?.redeemedPoints.value.toLocaleString() ?? "0"
            }
            context="point"
            info={{
              percentage:
                customerOverview?.redeemedPoints.percentageChange ?? 0,
            }}
          />
        </div>
      </section>

      <section className="rounded-xl bg-white p-3 lg:p-4 mt-7 flex flex-col gap-4">
        <div className="flex-between">
          <h5 className="text-light-black font-medium lg:text-lg">
            Recent Transactions
          </h5>
          <SeeAllBtn onClick={() => navigate("/transactions/all")} />
        </div>
        <TabSelector
          options={tabs}
          activeTab={activeTab}
          onSelect={setActiveTab}
        />
        <div className="overflow-x-auto">
          <div
            className="font-montserrat grid gap-3 font-semibold text-sm px-2 min-w-[1000px]"
            style={{ gridTemplateColumns: "repeat(15, 1fr)" }}
          >
            <p className="col-span-4 ml-5">Product</p>
            <p className="col-span-3">Point Earned</p>
            <p className="col-span-3">Status</p>
            <p className="col-span-3">Date/Time</p>
            <p className="col-span-2">Action</p>
          </div>
          <div className="bg-[#F5F6FF] mt-3 px-2 py-4 lg:py-5 lg:px-3 min-h-[250px] min-w-[1000px]">
            {loading.customerRecentTransactions ? (
              <Skeleton />
            ) : selectedTransactions.length === 0 ? (
              <div className="h-[200px]">
                <Empty text="No Transaction has been made yet" />
              </div>
            ) : (
              <div className="grid gap-8">
                {selectedTransactions.map((transaction) => (
                  <TransactionCard
                    transaction={transaction}
                    key={transaction.id}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {customerRecentTransactions && (
          <Pagination
            currentPage={customerRecentTransactions.pageNumber}
            totalPages={customerRecentTransactions.totalPages}
            totalCount={customerRecentTransactions.totalCount}
            pageSize={pageSize}
            onPageChange={setPageNumber}
          />
        )}
      </section>
    </div>
  );
};

export default CustomerTransactions;
