import { useEffect, useState } from "react";
import { FaQuestion } from "react-icons/fa6";
import { useLocation } from "react-router-dom";

import { tabs } from "./partials";
import TabSelector from "../components/TabSelector";
import TransactionCard from "./partials/TransactionCard";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchCustomerRecentTransactions } from "../redux/dashboard/action";
import Skeleton from "../merchant/skeleton/transactionSkeleton/Skeleton";
import Empty from "../components/Empty";
import { Pagination } from "../components/Pagination";

const AllCustomerTrx = () => {
  const { state } = useLocation();
  const dispatch = useAppDispatch();

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [search] = useState("");
  const [activeTab, setActiveTab] = useState(state?.filter || "All");

  const { customerRecentTransactions, loading } = useAppSelector(
    (state) => state.dashboard,
  );

  useEffect(() => {
    dispatch(
      fetchCustomerRecentTransactions({
        pageNumber,
        pageSize,
        search,
      }),
    );
  }, [dispatch, pageNumber, pageSize, search]);

  const selectedTransactions = () => {
    if (!customerRecentTransactions?.result) return [];

    if (activeTab === "Points") {
      return customerRecentTransactions.result.filter(
        (transaction) => !transaction.isDebit,
      );
    }

    if (activeTab === "Rewards") {
      return customerRecentTransactions.result.filter(
        (transaction) => transaction.isDebit,
      );
    }

    return customerRecentTransactions.result;
  };

  if (loading.customerRecentTransactions) {
    return <Skeleton />;
  }

  return (
    <section className="rounded-xl bg-white p-3 lg:p-4 flex flex-col gap-4">
      <h4 className="text-light-black text-lg flex items-center gap-1">
        All Transactions <FaQuestion color="#4A148C" size={15} />
      </h4>

      <TabSelector
        options={tabs}
        activeTab={activeTab}
        onSelect={(tab) => {
          setActiveTab(tab);
          setPageNumber(1);
        }}
      />
      <div className="overflow-x-auto">
        <div
          className="font-montserrat grid gap-3 font-semibold text-sm px-7 min-w-[1000px]"
          style={{ gridTemplateColumns: "repeat(15, 1fr)" }}
        >
          <p className="col-span-4 xl:pl-5">Product</p>
          <p className="col-span-3">Point Earned</p>
          <p className="col-span-3">Status</p>
          <p className="col-span-3">Date/Time</p>
          <p className="col-span-2">Action</p>
        </div>
        <div className="bg-[#F5F6FF] mt-3 p-4 lg:p-5 xl:px-7 min-h-[250px] min-w-[1000px]">
          <div className="grid gap-8">
            {selectedTransactions().length === 0 ? (
              <div className="h-[300px] xl:h-[300px]">
                <Empty text="No Transaction has been made yet" />
              </div>
            ) : (
              selectedTransactions().map((transaction) => (
                <TransactionCard
                  key={transaction.id}
                  transaction={transaction}
                  page="all"
                />
              ))
            )}
          </div>
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
  );
};

export default AllCustomerTrx;
