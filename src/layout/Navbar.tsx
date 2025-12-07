import { IoIosArrowDown } from "react-icons/io";
import person from "../assets/empty-p.png";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import logo from "../assets/reech-single.png";
import { IoMenuOutline } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import { onToggleMobileSidebar } from "../redux/auth/authReducer";

const Navbar = () => {
	const { pathname } = useLocation();

	const { currentUser } = useAppSelector((state) => state.auth);

	const displayPath = pathname.split("/")[1].replace("-", " ");

	const userName = `${currentUser?.firstName || ""} ${
		currentUser?.lastName || ""
	}`;

	return (
		<nav className="fixed sm:h-[65px] md:h-[70px] lg:h-[75px] xl:h-[80px] w-full left-0 top-0 z-[1000] hidden md:flex max-w-[1655px] mx-auto bg-[#F0F1FE]">
			<div className="flex w-full items-center border-b border-[#00000014]">
				<div className="md:ml-[220px] lg:ml-[230px] xl:ml-[256px] flex gap-3 items-center justify-between w-full px-6">
					<h4 className="text-xl lg:text-[22px] xl:text-2xl text-[#060606] sm:w-2/5 capitalize font-medium">
						{displayPath === "merchants" ? "manage merchants" : displayPath}
					</h4>

					<div className="flex items-center gap-3 xl:gap-4 sm:w-3/5">
						<input
							type="text"
							placeholder="Search for anything..."
							className="placeholder:text-[#06060666] bg-white pl-8 pr-3 lg:pr-4 py-2.5 rounded-[30px] text-[15px] outline-0 focus:border focus:border-[#00000014] w-3/4 xl:w-full h-[46px] lg:h-[47px] xl:h-[48px]"
						/>
						<div className="bg-white rounded-[30px] flex-between gap-2 lg:gap-3 py-1 lg:py-1.5 xl:min-w-[200px] px-2">
							<div className="flex items-center gap-3">
								<img
									src={currentUser?.avatar ? currentUser?.avatar : person}
									alt="person"
									className="w-[37px] xl:w-[38px] h-[37px] xl:h-[38px] object-fit rounded-full"
								/>

								<p className="text-nowrap text-[#292D32] text-[15px] hidden sm:block md:hidden lg:block truncate">
									{userName}
								</p>
							</div>
							<button>
								<IoIosArrowDown size={20} />
							</button>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;

export const MobileNavbar = () => {
	const dispatch = useAppDispatch();

	const { toggleMobileSidebar } = useAppSelector((state) => state.auth);

	return (
		<nav className="fixed bg-white px-4 sm:px-8 md:hidden top-0 left-0 z-10 w-full h-[60px] sm:h-[63px] flex items-center">
			<div className="flex-between w-full">
				<Link
					to=""
					className="inline-flex items-center justify-center gap-1 rounded-[20px] h-[50px] w-[100px]"
				>
					<img src={logo} alt="logo" className="w-[32px]" />
					<span className="font-poppins text-lg font-medium text-[#000000]">
						reech
					</span>
				</Link>
				<button
					className="text-primary-purple"
					onClick={() => dispatch(onToggleMobileSidebar())}
				>
					{toggleMobileSidebar ? (
						<AiOutlineClose size={24} />
					) : (
						<IoMenuOutline size={32} />
					)}
				</button>
			</div>
		</nav>
	);
};
