import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/landing";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";

export default function BaseRoutes() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/sign-in" element={<SignIn />} />
				<Route path="/sign-up" element={<SignUp />} />
			</Routes>
		</Router>
	);
}
