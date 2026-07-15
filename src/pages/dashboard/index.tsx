import { useMemo, useState } from "react";
import AdminDashboard from "../../admin/Dashboard";
import { MiniDropDown } from "../../components/CustomSelect";
import CustomerDashboard from "../../customer/Dashboard";
import { useRole } from "../../hooks/useRole";
import MerchantDashboard from "../../merchant/Dashboard";
import { timeRangeOptions, getDateRangeFromOption } from "../../utils";

const Dashboard = () => {
  const currentUserRole = useRole();
  const [selectedRange, setSelectedRange] = useState(timeRangeOptions[0]);

  const { startDate, endDate } = useMemo(() => {
    const range = getDateRangeFromOption(selectedRange);
    return {
      startDate: range?.startDate ?? null,
      endDate: range?.endDate ?? new Date(),
    };
  }, [selectedRange]);

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
        <AdminDashboard />
      ) : currentUserRole === "BusinessAdmin" ? (
        <MerchantDashboard startDate={startDate} endDate={endDate} />
      ) : (
        <CustomerDashboard startDate={startDate} endDate={endDate} />
      )}
    </div>
  );
};

export default Dashboard;
