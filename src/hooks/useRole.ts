import { useAppSelector } from "../redux/hooks";

type Role = "Admin" | "BusinessAdmin" | "User";

export const useRole = () => {
	const { currentUser } = useAppSelector((state) => state.auth);
	return (currentUser?.roles[0] as Role) || "";
};
