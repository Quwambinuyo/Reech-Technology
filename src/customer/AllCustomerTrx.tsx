import { useEffect, useState } from "react";
import { FaQuestion } from "react-icons/fa6";
import { FiSearch, FiX } from "react-icons/fi";
import { useLocation } from "react-router-dom";

import { tabs } from "./partials";
import TabSelector from "../components/TabSelector";
import TransactionCard from "./partials/TransactionCard";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchCustomerRecentTransactions } from "../redux/dashboard/action";
import Skeleton from "../merchant/skeleton/transactionSkeleton/Skeleton";
import Empty from "../components/Empty";
import { Pagination } from "../components/Pagination";

const SEARCH_DELAY = 400;

const AllCustomerTrx = () => {
  const { state } = useLocation();
  const dispatch = useAppDispatch();

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [activeTab, setActiveTab] = useState(state?.filter || "All");

  const { customerRecentTransactions, loading } = useAppSelector(
    (state) => state.dashboard,
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPageNumber(1);
    }, SEARCH_DELAY);

    return () => window.clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    dispatch(
      fetchCustomerRecentTransactions({
        pageNumber,
        pageSize,
        search: debouncedSearch,
      }),
    );
  }, [dispatch, pageNumber, pageSize, debouncedSearch]);

  const handleClear = () => {
    setSearch("");
    setDebouncedSearch("");
    setPageNumber(1);
  };

  const selectedTransactions = () => {
    const transactions = customerRecentTransactions?.result ?? [];

    return transactions.filter((a) => {
      if (activeTab === "All") {
        return true;
      }

      return activeTab.toLowerCase().includes(a.isDebit ? "debit" : "credit");
    });
  };

  if (loading.customerRecentTransactions && !customerRecentTransactions) {
    return <Skeleton />;
  }

  return (
    <section className="rounded-xl bg-white p-3 lg:p-4 flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h4 className="text-light-black text-lg flex items-center gap-1">
          All Transactions <FaQuestion color="#4A148C" size={15} />
        </h4>

        <div className="relative w-full sm:w-56">
          <FiSearch
            size={14}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            aria-label="Search transactions"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="h-9 w-full rounded-full bg-primary-purple/5 pl-9 pr-8 text-sm outline-none ring-1 ring-transparent transition focus:bg-white focus:ring-primary-purple/40"
          />
          {search && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <FiX size={14} />
            </button>
          )}
        </div>
      </div>

      <TabSelector
        options={tabs}
        activeTab={activeTab}
        onSelect={(tab) => {
          setActiveTab(tab);
          setPageNumber(1);
        }}
      />

      <div
        className={`transition-opacity ${
          loading.customerRecentTransactions ? "opacity-60" : ""
        }`}
      >
        <div className="overflow-x-auto hide-scroll">
          <div className="min-w-[1000px]">
            <div
              className="font-montserrat grid gap-3 font-semibold text-sm whitespace-nowrap px-5 pb-3"
              style={{ gridTemplateColumns: "repeat(15, 1fr)" }}
            >
              <p className="col-span-4">Product</p>
              <p className="col-span-3">Point Earned</p>
              <p className="col-span-3">Status</p>
              <p className="col-span-3">Date/Time</p>
              <p className="col-span-2">Action</p>
            </div>

            <div className="rounded-xl bg-[#F5F6FF] overflow-hidden divide-y divide-primary-purple/10 min-h-[250px]">
              {selectedTransactions().length === 0 ? (
                <div className="h-[300px]">
                  <Empty
                    text={
                      debouncedSearch
                        ? `No transactions match "${debouncedSearch}"`
                        : "No Transaction has been made yet"
                    }
                  />
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