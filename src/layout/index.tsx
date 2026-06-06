import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import TransactionDetails from "../customer/partials/TransactionDetails";
import { useAppSelector } from "../redux/hooks";
import Sidebar, { MobileSidebarWrapper } from "./Sidebar";
import Navbar, { MobileNavbar } from "./Navbar";
import Modal from "./Modal";

const LayoutWrapper = () => {
	const { pathname } = useLocation();

	const { toggleMobileSidebar } = useAppSelector((state) => state.auth);
	const { toggleTransactionDetails } = useAppSelector(
		(state) => state.transaction
	);

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [pathname]);

	return (
		<>
			{toggleMobileSidebar && <MobileSidebarWrapper />}
			<Modal modal={!!toggleTransactionDetails}>
				<TransactionDetails />
			</Modal>

			<div className="px-4 sm:px-0 md:ml-[220px] lg:ml-[235px] xl:ml-[256px] px-5 sm:px-8 md:px-5 xl:px-6 pb-14 sm:pb-16 max-w-[1400px] mx-auto bg-[#F0F1FE]">
				<MobileNavbar />
				<Navbar />
				<aside
					className="fixed bg-primary-color md:w-[220px] lg:w-[233px] xl:w-[256px] h-screen left-0 top-0 hidden md:block"
					style={{ zIndex: 1001 }}
				>
					<Sidebar />
				</aside>

				<main className="mt-[60px] sm:mt-[65px] lg:mt-[75px] xl:mt-[80px] relative py-5">
					<Outlet />
				</main>
			</div>
		</>
	);
};

export default LayoutWrapper;
