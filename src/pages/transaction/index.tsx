import { MiniDropDown } from "../../components/CustomSelect";
import CustomerTransactions from "../../customer/Transactions";
import { useRole } from "../../hooks/useRole";
import MerchantTransactions from "../../merchant/Transactions";

const Transaction = () => {
	const currentUserRole = useRole();
	return (
		<div>
			<section className="flex-between">
				<h4 className="text-xl text-[#060606] font-medium">Overview</h4>
				<MiniDropDown />
			</section>

			{currentUserRole === "SuperAdmin" ? (
				<div>SuperAdmin Transaction</div>
			) : currentUserRole === "BusinessAdmin" ? (
				<MerchantTransactions />
			) : (
				<CustomerTransactions />
			)}
		</div>
	);
};

export default Transaction;
