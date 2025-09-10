import CustomerProfile from "../../customer/Profile";
import { userRole } from "../../utils";

const Profile = () => {
	if (userRole === "customer") {
		return <CustomerProfile />;
	}
	return <p>Merchant Profile</p>;
};

export default Profile;
