import { Navigate, Outlet } from "react-router-dom";
import Modal from "../../../layout/Modal";
import { useAuthStatus } from "../../../hooks/useAuthStatus";

export default function PrivateRoute() {
	const { loggedIn, checkingStatus } = useAuthStatus();

	if (checkingStatus) {
		return (
			<Modal modal={checkingStatus}>
				<p>Loading..</p>
				{/* <MiniLoader size="40px" /> */}
			</Modal>
		);
	}
	return loggedIn ? <Outlet /> : <Navigate to="/sign-in" replace={true} />;
}
