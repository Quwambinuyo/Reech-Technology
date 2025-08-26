import { Link } from "react-router-dom";
import { PageWrapper } from ".";
import logo from "../../assets/reech.png";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io";
import { BsFacebook, BsInstagram } from "react-icons/bs";

const Footer = () => {
	return (
		<footer className="py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20 bg-primary-purple text-white">
			<PageWrapper>
				<div className="sm:mx-10 md:mx-0 grid grid-cols-2 sm:grid-cols-3 gap-10 lg:grid-cols-6 lg:gap-8 xl:gap-10">
					<div className="col-span-2">
						<img
							src={logo}
							alt="logo"
							className="w-[110px] sm:w-[115px] md:w-[120px] lg:w-[125px] xl:w-auto"
						/>
						<p className="text-[15px] xl:text-base mt-4 sm:max-w-[430px] md:max-w-[500px]">
							Empower your customers with cashback, loyalty points, and
							exclusive discounts while boosting retention. Seamlessly integrate
							Reech into your business and watch customer engagement soar!
						</p>
					</div>
					<div className="flex flex-col gap-3 md:gap-4">
						<h3 className="font-semibold md:text-[17px] xl:text-lg">About</h3>
						<div className="flex flex-col gap-2 md:gap-3 text-sm xl:text-[15px]">
							<Link to="">About Us</Link>
							<Link to="">Contact Us</Link>
						</div>
					</div>

					<div className="flex flex-col gap-3 md:gap-4">
						<h3 className="font-semibold md:text-[17px] xl:text-lg">
							Resources
						</h3>
						<div className="text-sm xl:text-[15px]">
							<Link to="">Help Center</Link>
						</div>
					</div>

					<div className="flex flex-col gap-3 md:gap-4">
						<h3 className="font-semibold md:text-[17px] xl:text-lg">
							Products
						</h3>
						<div className="flex flex-col gap-2 md:gap-3 text-sm xl:text-[15px]">
							<Link to="">For Personal</Link>
							<Link to="">For Business</Link>
							<Link to="">Payment Solutions</Link>
						</div>
					</div>

					<div className="flex flex-col gap-3 md:gap-4">
						<h3 className="font-semibold md:text-[17px] xl:text-lg">Support</h3>
						<div className="flex flex-col gap-2 md:gap-3 text-sm xl:text-[15px]">
							<Link to="">Customer Support</Link>
							<Link to="">FAQ</Link>
						</div>
					</div>
				</div>

				<div className="mt-20 border-t border-[#EBF1FF] flex-between flex-wrap gap-5 pt-8 text-sm sm:text-[15px] lg:text-base">
					<div className="flex gap-3">
						<Link to="">Privacy Policy</Link>
						<Link to="">Cookie Policy</Link>
						<Link to="">Legal</Link>
					</div>
					<p>2025 Reech Services</p>
					<div className="flex gap-5 xl:gap-6 text-[22px] lg:text-[24px]">
						<a href="">
							<FaXTwitter />
						</a>
						<a href="">
							<IoLogoLinkedin />
						</a>
						<a href="">
							<BsFacebook />
						</a>
						<a href="">
							<BsInstagram />
						</a>
					</div>
				</div>
			</PageWrapper>
		</footer>
	);
};

export default Footer;
