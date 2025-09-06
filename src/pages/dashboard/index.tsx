import { MiniDropDown } from "../../components/CustomSelect";
import CustomerDashboard from "../../customer/Dashboard";
import { userRole } from "../../utils";

const Dashboard = () => {
	return (
		<div>
			<section className="flex-between">
				<h4 className="text-xl text-[#060606] font-medium">Overview</h4>
				<MiniDropDown />
			</section>

			{userRole === "customer" ? (
				<CustomerDashboard />
			) : (
				<p>Merchant Dashboard</p>
			)}
		</div>
	);
};

export default Dashboard;
