import AllCustomerTrx from "../../customer/AllCustomerTrx";
import AllMerchantTrx from "../../merchant/AllMerchantTrx";
import { useRole } from "../../hooks/useRole";

const AllTransactions = () => {
	const currentUserRole = useRole();

	return (
		<>{currentUserRole === "User" ? <AllCustomerTrx /> : <AllMerchantTrx />}</>
	);
};

export default AllTransactions;
