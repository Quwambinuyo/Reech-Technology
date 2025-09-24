import { MiniDropDown } from "../../components/CustomSelect";
import CustomerDashboard from "../../customer/Dashboard";
import MerchantDashboard from "../../merchant/Dashboard";
import type { UserRole } from "../../types";
import { userRole } from "../../utils";

const Dashboard = () => {
	const currentUserRole = userRole as UserRole;

	return (
		<div>
			<section className="flex-between">
				<h4 className="text-xl text-[#060606] font-medium">Overview</h4>
				<MiniDropDown />
			</section>

			{currentUserRole === "customer" ? (
				<CustomerDashboard />
			) : (
				<MerchantDashboard />
			)}
		</div>
	);
};

export default Dashboard;
