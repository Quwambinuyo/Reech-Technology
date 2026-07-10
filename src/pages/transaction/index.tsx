import { useState } from "react";
import { MiniDropDown } from "../../components/CustomSelect";
import CustomerTransactions from "../../customer/Transactions";
import { useRole } from "../../hooks/useRole";
import MerchantTransactions from "../../merchant/Transactions";
import { getDateRangeFromOption, timeRangeOptions } from "../../utils";

const Transaction = () => {
  const currentUserRole = useRole();
  const [selectedRange, setSelectedRange] = useState(timeRangeOptions[0]);
  const { startDate, endDate } = getDateRangeFromOption(selectedRange);

  return (
    <div>
      <section className="flex-between">
        <h4 className="text-xl text-[#060606] font-medium">Overview</h4>
        <MiniDropDown
          options={timeRangeOptions}
          selectedOption={selectedRange}
          onSelect={setSelectedRange}
        />
      </section>

      {currentUserRole === "SuperAdmin" ? (
        <div>SuperAdmin Transaction</div>
      ) : currentUserRole === "BusinessAdmin" ? (
        <MerchantTransactions startDate={startDate} endDate={endDate} />
      ) : (
        <CustomerTransactions />
      )}
    </div>
  );
};

export default Transaction;
