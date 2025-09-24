import { MiniDropDown } from "../../components/CustomSelect";
import CustomerTransactions from "../../customer/Transactions";
import MerchantTransactions from "../../merchant/Transactions";
import type { UserRole } from "../../types";
import { userRole } from "../../utils";

const Transaction = () => {
	const currentUserRole = userRole as UserRole;
	return (
		<div>
			<section className="flex-between">
				<h4 className="text-xl text-[#060606] font-medium">Overview</h4>
				<MiniDropDown />
			</section>

			{currentUserRole === "customer" ? (
				<CustomerTransactions />
			) : (
				<MerchantTransactions />
			)}
		</div>
	);
};

export default Transaction;
