import { Link, useLocation } from "react-router-dom";
import logo from "../assets/reech-single.png";
import ac_dashboard from "../assets/ac-dashboard.png";
import in_dashboard from "../assets/in-dashboard.png";
import ac_payment from "../assets/ac-payment.png";
import in_payment from "../assets/in-payment.png";
import ac_transaction from "../assets/ac-transaction.png";
import in_transaction from "../assets/in-transaction.png";
import ac_profile from "../assets/ac-profile.png";
import in_profile from "../assets/in-profile.png";

const Sidebar = () => {
	const { pathname } = useLocation();

	const getActivePath = (path: string) => {
		const updPath = `/${path.replace(" ", "-")}`;

		return pathname.includes(updPath);
	};

	return (
		<aside className="w-full bg-primary-purple h-full py-6 xl:py-7 md:px-4 lg:px-5 xl:px-6">
			<Link
				to="/dashboard"
				className="bg-white inline-flex items-center justify-center gap-1 rounded-[20px] h-[50px] w-[130px]"
			>
				<img src={logo} alt="logo" className="w-[40px]" />
				<span className="font-poppins text-lg font-medium text-[#000000]">
					reech
				</span>
			</Link>

			<div className="grid gap-4 mt-20 xl:mt-24">
				{links.map((link) => (
					<SidebarLink
						link={link}
						key={link.text}
						isActive={getActivePath(link.text)}
					/>
				))}
			</div>
		</aside>
	);
};

export default Sidebar;

const links = [
	{ text: "dashboard", icon: { active: ac_dashboard, inactive: in_dashboard } },
	{ text: "make payments", icon: { active: ac_payment, inactive: in_payment } },
	{
		text: "transactions",
		icon: { active: ac_transaction, inactive: in_transaction },
	},
	{ text: "profile", icon: { active: ac_profile, inactive: in_profile } },
];

type SidebarLinkProps = {
	text: string;
	icon: { active: string; inactive: string };
};

const SidebarLink = ({
	link,
	isActive,
}: {
	link: SidebarLinkProps;
	isActive: boolean;
}) => {
	const path = link.text.replace(" ", "-");

	return (
		<Link
			to={`/${path}`}
			className={`flex items-center gap-2 xl:gap-3 capitalize lg:w-[180px] xl:w-[195px] px-4 xl:px-5 py-3.5 xl:py-4 text-sm xl:text-[14.5px] ${
				isActive
					? "bg-white text-primary-purple rounded-[30px] font-medium"
					: "text-white"
			}`}
		>
			<img src={isActive ? link.icon.active : link.icon.inactive} />
			<span>{link.text}</span>
		</Link>
	);
};
