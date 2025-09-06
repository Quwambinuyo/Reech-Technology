import { MiniDropDown } from "../../components/CustomSelect";
import CustomerTransactions from "../../customer/Transactions";
import { userRole } from "../../utils";

const Transaction = () => {
	return (
		<div>
			<section className="flex-between">
				<h4 className="text-xl text-[#060606] font-medium">Overview</h4>
				<MiniDropDown />
			</section>

			{userRole === "customer" ? (
				<CustomerTransactions />
			) : (
				<p>Merchant Transaction</p>
			)}
		</div>
	);
};

export default Transaction;
