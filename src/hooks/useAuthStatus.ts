import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../redux/hooks";

export const useAuthStatus = () => {
	const isMounted = useRef(true);
	const [loggedIn, setLoggedIn] = useState(false);
	const [checkingStatus, setCheckingStatus] = useState(true);
	const { currentUser } = useAppSelector((state) => state.auth);
	console.log(currentUser);

	useEffect(() => {
		if (isMounted.current) {
			setLoggedIn(!!currentUser);
			setCheckingStatus(false);
		}
		return () => {
			isMounted.current = false;
		};
	}, [currentUser]);

	return { loggedIn, checkingStatus };
};
