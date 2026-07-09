import { useEffect, useState } from "react";
import { FaQuestion } from "react-icons/fa6";
import { useLocation } from "react-router-dom";

import { merchantTrxTabs } from "../customer/partials";
import TabSelector from "../components/TabSelector";
import TransactionCard from "../merchant/partial/TransactionCard";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchRecentTransactions } from "../redux/dashboard/action";
import Skeleton from "../merchant/skeleton/transactionSkeleton/Skeleton";
import Empty from "../components/Empty";
import { Pagination } from "../components/Pagination";

const AllMerchantTrx = () => {
  const { state } = useLocation();
  const dispatch = useAppDispatch();

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(20);
  const [search] = useState("");
  const [activeTab, setActiveTab] = useState(state?.filter || "All");

  const { recentTransactions, loading } = useAppSelector(
    (state) => state.dashboard,
  );

  useEffect(() => {
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

  if (loading.recentTransactions) {
    return <Skeleton />;
  }

  return (
    <section className="rounded-xl bg-white p-3 lg:p-4 flex flex-col gap-4">
      <h4 className="text-light-black text-lg flex items-center gap-1">
        Recent Transactions <FaQuestion color="#4A148C" size={15} />
      </h4>

      <TabSelector
        options={merchantTrxTabs}
        activeTab={activeTab}
        onSelect={(tab) => {
          setActiveTab(tab);
          setPageNumber(1);
        }}
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
          <p className={`col-span-3 ${activeTab === "All" ? "" : "pl-5"}`}>
            {activeTab === "Points"
              ? "Status"
              : activeTab === "Rewards"
                ? "Redeemed"
                : "Status | Redeemed"}
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

      {recentTransactions && (
        <Pagination
          currentPage={recentTransactions.pageNumber}
          totalPages={recentTransactions.totalPages}
          totalCount={recentTransactions.totalCount}
          pageSize={pageSize}
          onPageChange={setPageNumber}
        />
      )}
    </section>
  );
};

export default AllMerchantTrx;
