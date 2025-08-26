import { Link } from "react-router-dom";
import logo from "../assets/reech.png";
import { MdMenu } from "react-icons/md";

const LandingMobileNavbar = () => {
	return (
		<nav className="bg-white shadow-md fixed h-[60px] sm:h-[63px] flex items-center top-0 w-full max-w-[1440px] mx-auto z-[20] md:hidden">
			<div className="flex-between pr-5 w-full sm:pl-2 sm:pr-8">
				<div className="">
					{/* <Link to="" className="rounded-xl">
						<img src={logo} alt="logo" className="w-[90px]" />
					</Link> */}
					<Link to="/" className="">
						<img src={logo} alt="logo" className="w-[125px]" />
					</Link>
				</div>
				<button className="text-primary-purple">
					<MdMenu size={30} />
				</button>
			</div>
		</nav>
	);
};

export default LandingMobileNavbar;
