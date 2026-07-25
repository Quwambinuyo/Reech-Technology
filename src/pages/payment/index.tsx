import { useEffect, useMemo, useState } from "react";
import CountUp from "react-countup";
import { TbSend } from "react-icons/tb";
import { MdOutlineGeneratingTokens } from "react-icons/md";
import { RiShieldKeyholeLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { HiArrowDownLeft, HiArrowUpRight } from "react-icons/hi2";

import TransactionCard from "../../customer/partials/TransactionCard";
import TabSelector from "../../components/TabSelector";
import { billLine, wallet, reechCurrency } from "../../assets";
import { tabs } from "../../customer/partials";
import PayBillCard from "../../customer/partials/PaybillCard";
import SendPointFlow from "./sendCreditSteps/SendpointFlow";
import TokenGenerationFlow from "./tokenGenerationStep/TokenGenerationFlow";
import CreatePinFlow from "../../pages/payment/createPinStep/CreatePinFlow";
import Modal from "../../layout/Modal";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchCustomerDashboardOverview,
  fetchCustomerRecentTransactions,
} from "../../redux/dashboard/action";
import Spinner from "../../components/Spinner";
import Empty from "../../components/Empty";
import { timeRangeOptions, getDateRangeFromOption } from "../../utils";

type ActiveModal = "send" | "bill" | "token" | "pin" | null;

const MakePayment = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [activeTab, setActiveTab] = useState("All");
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [pageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [selectedRange] = useState(timeRangeOptions[0]);

  const { startDate, endDate } = useMemo(() => {
    const range = getDateRangeFromOption(selectedRange);
    return {
      startDate: range?.startDate ?? null,
      endDate: range?.endDate ?? new Date(),
    };
  }, [selectedRange]);

  const { customerOverview, customerRecentTransactions, loading } =
    useAppSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(
      fetchCustomerDashboardOverview({
        startDate: startDate ? startDate.toISOString() : null,
        endDate: endDate.toISOString(),
      }),
    );
  }, [dispatch, startDate, endDate]);

  useEffect(() => {
    dispatch(
      fetchCustomerRecentTransactions({
        pageNumber,
        pageSize,
        search: "",
        startDate: startDate ? startDate.toISOString() : null,
        endDate: endDate.toISOString(),
      }),
    );
  }, [dispatch, pageNumber, pageSize, startDate, endDate]);

  const transactions = customerRecentTransactions?.result ?? [];

  const selectedTransactions = transactions.filter((a) => {
    if (activeTab === "All") {
      return true;
    }
    return activeTab.toLowerCase().includes(a.isDebit ? "debit" : "credit");
  });

  const closeModal = () => setActiveModal(null);

  const percentage = customerOverview?.pointBalance.percentageChange ?? 0;

  return (
    <>
      <section className="flex flex-col md:flex-row gap-5">
        <div className="bg-[#FFFFFFCC] flex items-center gap-4 rounded-xl px-4 lg:px-5 py-10 md:py-12 w-full md:w-[38%]">
          <div className="rounded-full bg-[#F0F1FE] flex-center h-[50px] w-[50px]">
            <img src={wallet} alt="wallet" />
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-[#797979] capitalize text-[15px]">
              Reech Credit Balance
            </p>

            <div className="flex gap-1.5">
              <h4 className="text-[#030649] gap-2 flex font-semibold uppercase text-xl lg:text-2xl xl:text-3xl">
                <img src={reechCurrency} alt="Currency" className="w-6 h-6" />
                <CountUp
                  end={customerOverview?.pointBalance.value ?? 0}
                  duration={2}
                  separator=","
                  preserveValue
                />
              </h4>
            </div>

            <div className="flex items-center gap-1">
              {percentage >= 0 ? (
                <HiArrowUpRight color="#1A932E" />
              ) : (
                <HiArrowDownLeft color="red" />
              )}

              <p className="text-[#060606] text-xs">
                {Math.abs(percentage).toFixed(1)}%{" "}
                {percentage >= 0 ? "increase" : "decrease"} from last month
              </p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-[62%] bg-[#FCFCFF] rounded-xl grid grid-cols-2 sm:flex sm:items-center gap-3 md:gap-4 px-4 py-6 text-[#4A148C]">
          <button
            onClick={() => setActiveModal("send")}
            className="flex-1 flex flex-col items-center gap-2.5 py-4 lg:py-5 rounded-xl bg-white border border-[#F0F1FE] hover:bg-[#F5F3FF] hover:border-[#E8E3FF] active:scale-[0.97] transition-all duration-150"
          >
            <span className="flex-center h-11 w-11 rounded-full bg-[#F0F1FE]">
              <TbSend size={20} />
            </span>
            <p className="text-[13px] lg:text-[10px] font-medium">
              Send Credit
            </p>
          </button>

          <button
            onClick={() => setActiveModal("bill")}
            className="flex-1 flex flex-col items-center gap-2.5 py-4 lg:py-5 rounded-xl bg-white border border-[#F0F1FE] hover:bg-[#F5F3FF] hover:border-[#E8E3FF] active:scale-[0.97] transition-all duration-150"
          >
            <span className="flex-center h-11 w-11 rounded-full bg-[#F0F1FE]">
              <img src={billLine} alt="bill" className="w-5 h-5" />
            </span>
            <p className="text-[13px] lg:text-[10px] font-medium">Pay Bill</p>
          </button>

          <button
            onClick={() => setActiveModal("token")}
            className="flex-1 flex flex-col items-center gap-2.5 py-4 lg:py-5 rounded-xl bg-white border border-[#F0F1FE] hover:bg-[#F5F3FF] hover:border-[#E8E3FF] active:scale-[0.97] transition-all duration-150"
          >
            <span className="flex-center h-11 w-11 rounded-full bg-[#F0F1FE]">
              <MdOutlineGeneratingTokens size={20} />
            </span>
            <p className="text-[13px] lg:text-[10px] font-medium">
              Token Generation
            </p>
          </button>

          <button
            onClick={() => setActiveModal("pin")}
            className="flex-1 flex flex-col items-center gap-2.5 py-4 lg:py-5 rounded-xl bg-white border border-[#F0F1FE] hover:bg-[#F5F3FF] hover:border-[#E8E3FF] active:scale-[0.97] transition-all duration-150"
          >
            <span className="flex-center h-11 w-11 rounded-full bg-[#F0F1FE]">
              <RiShieldKeyholeLine size={20} />
            </span>
            <p className="text-[13px] lg:text-[10px] font-medium">Set PIN</p>
          </button>
        </div>
      </section>

      <section className="rounded-xl bg-white p-3 lg:p-4 mt-7 flex flex-col gap-4">
        <div className="flex-between">
          <h5 className="text-light-black font-medium lg:text-lg">
            Recent Transactions
          </h5>

          <button
            className="text-sm text-[#4A148C]"
            onClick={() => navigate("/transactions/all")}
          >
            See All
          </button>
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
              <div className="flex items-center justify-center h-[200px]">
                <Spinner size="32px" borderWidth="4px" />
              </div>
            ) : selectedTransactions.length === 0 ? (
              <div className="h-[200px]">
                <Empty text="No Transaction has been made yet" />
              </div>
            ) : (
              <div className="grid gap-8">
                {selectedTransactions.map((transaction) => (
                  <TransactionCard
                    key={transaction.id}
                    transaction={transaction}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {activeModal === "send" && (
        <Modal modal={activeModal === "send"} onClose={closeModal}>
          <SendPointFlow onClose={closeModal} />
        </Modal>
      )}

      {activeModal === "bill" && (
        <Modal modal={activeModal === "bill"} onClose={closeModal}>
          <PayBillCard onClose={closeModal} />
        </Modal>
      )}

      {activeModal === "token" && (
        <Modal modal={activeModal === "token"} onClose={closeModal}>
          <TokenGenerationFlow onClose={closeModal} />
        </Modal>
      )}

      {activeModal === "pin" && (
        <Modal modal={activeModal === "pin"} onClose={closeModal}>
          <CreatePinFlow
            onClose={closeModal}
            onComplete={(pin) => {
              console.log("PIN created:", pin);
            }}
          />
        </Modal>
      )}
    </>
  );
};

export default MakePayment;
