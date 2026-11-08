import { Outlet } from "react-router-dom";
import { useRole } from "../hooks/useRole";
import { setOfflineScope } from "../redux/offline/action";

const OfflineScopeRoute = () => {
  const role = useRole();

  setOfflineScope(role === "BusinessAdmin" ? "merchant" : "admin");

  return <Outlet />;
};

export default OfflineScopeRoute;