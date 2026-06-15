import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/reech-single.png";
import ac_dashboard from "../assets/ac-dashboard.png";
import in_dashboard from "../assets/in-dashboard.png";
import ac_payment from "../assets/ac-payment.png";
import in_payment from "../assets/in-payment.png";
import ac_transaction from "../assets/ac-transaction.png";
import in_transaction from "../assets/in-transaction.png";
import ac_profile from "../assets/ac-profile.png";
import in_profile from "../assets/in-profile.png";
import ac_task from "../assets/ac-task.png";
import in_task from "../assets/in-task.png";
import ac_user from "../assets/ac-user.png";
import ac_merchant from "../assets/ac-merchant.png";
import in_merchant from "../assets/inac-merchant.png";
import in_user from "../assets/inac-user.png";
import { useRole } from "../hooks/useRole";
import { FiLogOut } from "react-icons/fi";
import { onLogout } from "../redux/auth/authReducer";
import { useAppDispatch } from "../redux/hooks";
import { toast } from "react-toastify";
import { clearUserSession, getOrCreateTabId } from "../utils";

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    const tabId = getOrCreateTabId();
    clearUserSession(tabId);
    dispatch(onLogout());
    toast.success("Logged out successfully");
    navigate("/sign-in", { replace: true });
  };

  const getActivePath = (path: string) => {
    const updPath = `/${path.replace(" ", "-")}`;
    return pathname.includes(updPath);
  };

  const currentUserRole = useRole();

  const links =
    currentUserRole === "User"
      ? customerLinks
      : currentUserRole === "BusinessAdmin"
        ? merchantLinks
        : adminLinks;

  return (
    <aside className="w-full bg-primary-purple h-full py-6 xl:py-7 md:px-4 lg:px-5 xl:px-6">
      <Link
        to="/dashboard"
        className="hidden bg-white md:inline-flex items-center justify-center gap-1 rounded-[20px] h-[50px] w-[130px]"
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

      <button
        onClick={handleLogout}
        className="md:hidden flex mt-18 items-center gap-2 capitalize px-4 py-3.5 text-sm text-nowrap bg-white text-red-600 rounded-[30px] font-medium w-full"
      >
        <FiLogOut size={18} />
        <span>logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;

const customerLinks = [
  { text: "dashboard", icon: { active: ac_dashboard, inactive: in_dashboard } },
  { text: "make payments", icon: { active: ac_payment, inactive: in_payment } },
  {
    text: "transactions",
    icon: { active: ac_transaction, inactive: in_transaction },
  },
  { text: "profile", icon: { active: ac_profile, inactive: in_profile } },
];

const merchantLinks = [
  { text: "dashboard", icon: { active: ac_dashboard, inactive: in_dashboard } },
  { text: "upload points", icon: { active: ac_payment, inactive: in_payment } },
  {
    text: "rewards settings",
    icon: { active: ac_task, inactive: in_task },
  },
  {
    text: "transactions",
    icon: { active: ac_transaction, inactive: in_transaction },
  },
  { text: "profile", icon: { active: ac_profile, inactive: in_profile } },
];

const adminLinks = [
  { text: "dashboard", icon: { active: ac_dashboard, inactive: in_dashboard } },
  {
    text: "manage categories",
    icon: { active: ac_payment, inactive: in_payment },
  },
  {
    text: "manage users",
    icon: { active: ac_user, inactive: in_user },
  },
  {
    text: "merchants",
    icon: { active: ac_merchant, inactive: in_merchant },
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
      className={`flex items-center gap-2 xl:gap-3 capitalize px-4 xl:px-5 py-3.5 xl:py-4 text-sm xl:text-[14.5px] text-nowrap ${
        isActive
          ? "bg-white text-primary-purple rounded-[30px] font-medium"
          : "text-white"
      } ${
        link.text.includes("categories")
          ? "lg:w-[187px] xl:w-[205px]"
          : "lg:w-[180px] xl:w-[195px]"
      }`}
    >
      <img src={isActive ? link.icon.active : link.icon.inactive} alt="" />
      <span>{link.text}</span>
    </Link>
  );
};
export const MobileSidebarWrapper = () => {
  return (
    <div className="fixed bg-primary-purple z-50  top-[60px] left-0 w-[230px] bottom-0 md:hidden flex flex-col">
      <div className="overflow-y-auto flex-1 p-6 hide-scroll">
        <p className="text-white">Text side bar... will change soon</p>
        <Sidebar />
      </div>
    </div>
  );
};
