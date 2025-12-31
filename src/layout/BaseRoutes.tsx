import { Routes, Route } from "react-router-dom";
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
import AllUserRanks from "../merchant/AllUserRanks";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import NetworkError from "./NetworkError";
import { useEffect } from "react";
import { fetchCountries } from "../redux/auth/authActions";
import PrivateRoute from "../pages/auth/partial/PrivateRoute";
import Unauthorized from "../pages/auth/Unathorized";
import RoleProtectedRoute from "../pages/auth/partial/RoleProtectedRoute";
import { LandingPageHamburgerOverlay } from "./LandingMobileNavbar";
import ManageUsers from "../pages/manage-users";
import ManageMerchants from "../pages/manage-merchant";
import ManageCategories from "../pages/categories";
import AllCategories from "../pages/categories/AllCategories";
import SingleMerchant from "../pages/manage-merchant/SingleMerchant";

export default function BaseRoutes() {
	const dispatch = useAppDispatch();

	const {
		authNetworkError,
		allCountries,
		// currentUser,
		landingPageHamburgerToggle,
	} = useAppSelector((state) => state.auth);

	const { categoryNetworkError } = useAppSelector((state) => state.category);

	// const currentUserRole = currentUser?.roles[0];
	// console.log(currentUserRole);
	const showNetworkError = () => {
		if (authNetworkError || categoryNetworkError) {
			return true;
		}
		return false;
	};

	useEffect(() => {
		if (allCountries.length > 0) return;

		dispatch(fetchCountries());
	}, []);

	return (
		<>
			{showNetworkError() && <NetworkError />}
			{landingPageHamburgerToggle && <LandingPageHamburgerOverlay />}

			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/sign-in" element={<SignIn />} />
				<Route path="/sign-up" element={<SignUp />} />
				<Route path="/unauthorized" element={<Unauthorized />} />

				<Route element={<PrivateRoute />}>
					<Route element={<LayoutWrapper />}>
						<Route path="/dashboard" element={<Dashboard />} />
						<Route element={<RoleProtectedRoute allowedRoles={["User"]} />}>
							<Route path="/make-payments" element={<MakePayment />} />
						</Route>
						<Route
							element={<RoleProtectedRoute allowedRoles={["BusinessAdmin"]} />}
						>
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
							<Route
								path="/rewards-settings/user-ranks"
								element={<AllUserRanks />}
							/>
						</Route>

						<Route
							element={<RoleProtectedRoute allowedRoles={["SuperAdmin"]} />}
						>
							<Route path="/manage-categories" element={<ManageCategories />} />
							<Route
								path="/manage-categories/all"
								element={<AllCategories />}
							/>
						</Route>
						<Route
							element={<RoleProtectedRoute allowedRoles={["SuperAdmin"]} />}
						>
							<Route path="/manage-users" element={<ManageUsers />} />
						</Route>
						<Route
							element={<RoleProtectedRoute allowedRoles={["SuperAdmin"]} />}
						>
							<Route path="/merchants" element={<ManageMerchants />} />
							<Route path="/merchants/:id" element={<SingleMerchant />} />
						</Route>

						<Route path="/transactions" element={<Transaction />} />
						<Route path="/transactions/all" element={<AllTransactions />} />
						<Route path="/profile" element={<Profile />} />
					</Route>
				</Route>
			</Routes>
			{/* </Router> */}
		</>
	);
}
