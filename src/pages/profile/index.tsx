import CustomerProfile from "../../customer/Profile";
import MerchantProfile from "../../merchant/Profile";
import type { UserRole } from "../../types";
import { userRole } from "../../utils";

const Profile = () => {
	const currentUserRole = userRole as UserRole;

	if (currentUserRole === "customer") {
		return <CustomerProfile />;
	}
	return <MerchantProfile />;
};

export default Profile;
