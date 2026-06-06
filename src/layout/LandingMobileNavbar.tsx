import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/reech.png";
import { MdKeyboardArrowRight, MdMenu } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { onToggleLandingHamburger } from "../redux/auth/authReducer";
import { LandingPageButton } from "../pages/landing";

const LandingMobileNavbar = () => {
	const dispatch = useAppDispatch();

	const { landingPageHamburgerToggle } = useAppSelector((state) => state.auth);

	return (
		<nav className="bg-white shadow-md fixed h-[60px] sm:h-[63px] flex items-center top-0 w-full max-w-[1440px] mx-auto z-[20] md:hidden">
			<div className="flex-between pr-5 w-full sm:pl-2 sm:pr-8">
				<div className="">
					<Link to="/" className="">
						<img src={logo} alt="logo" className="w-[125px]" />
					</Link>
				</div>
				<button
					className="text-primary-purple"
					onClick={() => dispatch(onToggleLandingHamburger())}
				>
					{landingPageHamburgerToggle ? (
						<AiOutlineClose size={26} />
					) : (
						<MdMenu size={30} />
					)}
				</button>
			</div>
		</nav>
	);
};

export default LandingMobileNavbar;

export const LandingPageHamburgerOverlay = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const onavigate = (path: string) => {
		navigate(path);
		dispatch(onToggleLandingHamburger());
	};
	return (
		<div className="px-5 sm:px-9 md:px-12 lg:px-16 xl:px-24 bg-white fixed z-[11] md:hidden h-[200px] top-[60px] sm:top-[65px] w-full pt-5 sm:pt-7 border-t space-y-5 sm:space-y-6">
			<div className="h-full flex-center gap-8 flex-col">
				<button
					className={`font-inter font-medium flex items-center gap-1 rounded-[8px] px-4 md:px-5 py-2.5 bg-white text-[#4A148C] border-2 border-primary-purple hover:opacity-90 transition-all`}
					onClick={() => onavigate("/sign-in")}
				>
					<span>Login</span> <MdKeyboardArrowRight size={24} />
				</button>
				<LandingPageButton
					btnColor="purple"
					btnText="Sign up"
					onClick={() => onavigate("/sign-up")}
				/>
			</div>
		</div>
	);
};
