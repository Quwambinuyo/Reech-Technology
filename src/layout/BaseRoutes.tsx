import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/landing";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import LayoutWrapper from ".";
import Dashboard from "../pages/dashboard";
import MakePayment from "../pages/payment";
import Transaction from "../pages/transaction";
import Profile from "../pages/profile";
import PointUpload from "../merchant/PointUpload";
import RewardsSetting from "../merchant/Rewards";
import AllActivityPoints from "../merchant/AllActivityPoints";
import AllConversionPoints from "../merchant/AllConversionPoints";
import AllTransactions from "../pages/transaction/AllTransactions";

export default function BaseRoutes() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/sign-in" element={<SignIn />} />
				<Route path="/sign-up" element={<SignUp />} />

				<Route element={<LayoutWrapper />}>
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/make-payments" element={<MakePayment />} />
					<Route path="/upload-points" element={<PointUpload />} />
					<Route
						path="/upload-points/activity-based"
						element={<AllActivityPoints />}
					/>
					<Route
						path="/upload-points/point-conversion"
						element={<AllConversionPoints />}
					/>
					<Route path="/rewards-settings" element={<RewardsSetting />} />
					<Route path="/transactions" element={<Transaction />} />
					<Route path="/transactions/all" element={<AllTransactions />} />
					<Route path="/profile" element={<Profile />} />
				</Route>
			</Routes>
		</Router>
	);
}
