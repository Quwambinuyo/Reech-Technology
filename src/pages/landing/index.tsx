import { Link, useNavigate } from "react-router-dom";
import LandingMobileNavbar from "../../layout/LandingMobileNavbar";
import logo from "../../assets/reech-n.png";
import { MdKeyboardArrowRight } from "react-icons/md";
import PartOne from "./PartOne";
import PartTwo from "./PartTwo";
import PartThree from "./PartThree";
import PartFour from "./PartFour";
import PartFive from "./PartFive";
import PartSix from "./PartSix";
import Footer from "./Footer";

const LandingPage = () => {
	const navigate = useNavigate();

	return (
		<>
			<LandingMobileNavbar />
			<nav className="fixed md:h-[73px] lg:h-[76px] xl:h-[80px] top-0 w-full items-center bg-[#EBECFE] px-12 lg:px-16 xl:px-20 hidden md:flex z-[10]">
				<div className="w-full max-w-[1400px] mx-auto flex-between">
					<Link to="" className="-ml-2">
						<img src={logo} alt="logo" className="w-[110px]" />
					</Link>
					<div className="w-[72%] lg:w-[68%] xl:w-[60%] flex-between">
						<div className="flex gap-7 lg:gap-8 xl:gap-10 text-[15px] xl:text-base">
							<Link
								className="hover:text-primary-purple hover:font-medium transition-all"
								to=""
							>
								Home
							</Link>
							<Link
								className="hover:text-primary-purple hover:font-medium transition-all"
								to=""
							>
								About
							</Link>
							<Link
								className="hover:text-primary-purple hover:font-medium transition-all"
								to=""
							>
								Contact Us
							</Link>
						</div>

						<div className="flex gap-4 xl:gap-5">
							<LandingPageButton
								btnColor="white"
								btnText="Login"
								onClick={() => navigate("/sign-in")}
							/>
							<LandingPageButton
								btnColor="purple"
								btnText="Sign up"
								onClick={() => navigate("/sign-up")}
							/>
						</div>
					</div>
				</div>
			</nav>

			<PartOne />
			<PartTwo />
			<PartThree />
			<PartFour />
			<PartFive />
			<PartSix />
			<Footer />
		</>
	);
};

export default LandingPage;

type PageButtonProps = {
	btnColor: "white" | "purple";
	btnText: string;
	onClick?: () => void;
};
export const LandingPageButton = ({
	btnColor,
	btnText,
	onClick,
}: PageButtonProps) => (
	<button
		className={`font-inter font-medium flex items-center gap-1 rounded-[8px] px-4 md:px-5 py-3 lg:py-3.5 ${
			btnColor === "white"
				? "bg-white text-[#4A148C]"
				: "bg-primary-purple text-white"
		}`}
		onClick={onClick}
	>
		<span>{btnText}</span> <MdKeyboardArrowRight size={24} />
	</button>
);

export const PageWrapper = ({ children }: { children: React.ReactNode }) => (
	<div className="px-5 sm:px-8 md:px-12 lg:px-16 xl:px-24 max-w-[1400px] mx-auto">
		{children}
	</div>
);
