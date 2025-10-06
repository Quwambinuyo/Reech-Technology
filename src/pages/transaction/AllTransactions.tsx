import { userRole } from "../../utils";
import type { UserRole } from "../../types";
import AllCustomerTrx from "../../customer/AllCustomerTrx";
import AllMerchantTrx from "../../merchant/AllMerchantTrx";

const AllTransactions = () => {
	const currentUserRole = userRole as UserRole;

	return (
		<>
			{currentUserRole === "customer" ? <AllCustomerTrx /> : <AllMerchantTrx />}
		</>
	);
};

export default AllTransactions;
