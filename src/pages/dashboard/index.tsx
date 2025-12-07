import AdminDashboard from "../../admin/Dashboard";
import { MiniDropDown } from "../../components/CustomSelect";
import CustomerDashboard from "../../customer/Dashboard";
import { useRole } from "../../hooks/useRole";
import MerchantDashboard from "../../merchant/Dashboard";

const Dashboard = () => {
	const currentUserRole = useRole();

	return (
		<div>
			<section className="flex-between">
				<h4 className="text-xl text-[#060606] font-medium">Overview</h4>
				<MiniDropDown />
			</section>

			{currentUserRole === "Admin" ? (
				<AdminDashboard />
			) : currentUserRole === "BusinessAdmin" ? (
				<MerchantDashboard />
			) : (
				<CustomerDashboard />
			)}
		</div>
	);
};

export default Dashboard;
