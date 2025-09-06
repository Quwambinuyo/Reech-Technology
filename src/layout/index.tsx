import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const LayoutWrapper = () => {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [pathname]);

	return (
		<div className="px-4 sm:px-0 md:ml-[220px] lg:ml-[235px] xl:ml-[256px] px-5 sm:px-8 md:px-5 xl:px-6 pb-14 sm:pb-16 max-w-[1400px] mx-auto bg-[#F0F1FE]">
			<Navbar />
			<aside
				className="fixed bg-primary-color md:w-[220px] lg:w-[230px] xl:w-[256px] h-screen left-0 top-0 hidden md:block"
				style={{ zIndex: 1001 }}
			>
				<Sidebar />
			</aside>

			<main className="mt-[60px] sm:mt-[65px] lg:mt-[75px] xl:mt-[80px] relative py-5">
				<Outlet />
			</main>
		</div>
	);
};

export default LayoutWrapper;
