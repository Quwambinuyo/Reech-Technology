import { Navigate, Outlet } from "react-router-dom";
import { useRole } from "../../../hooks/useRole";

const RoleProtectedRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
	const role = useRole();

	if (!role) return <Navigate to="/login" replace />;

	return allowedRoles.includes(role) ? (
		<Outlet />
	) : (
		<Navigate to="/unauthorized" replace />
	);
};

export default RoleProtectedRoute;
