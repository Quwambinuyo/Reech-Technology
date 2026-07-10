import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import logo from "../assets/reech-single.png";
import { useRole } from "../hooks/useRole";
import { FiLogOut } from "react-icons/fi";
import { onLogout, onToggleMobileSidebar } from "../redux/auth/authReducer";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { toast } from "react-toastify";
import { clearUserSession, getOrCreateTabId } from "../utils";
import {
  customerLinks,
  merchantLinks,
  adminLinks,
  type SidebarLinkProps,
} from "./Sidebar";

const MobileSidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUserRole = useRole();
  const { toggleMobileSidebar } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const closeSidebar = () => dispatch(onToggleMobileSidebar());

  const handleLogout = () => {
    const tabId = getOrCreateTabId();
    clearUserSession(tabId);
    dispatch(onLogout());
    toast.success("Logged out successfully");
    closeSidebar();
    navigate("/sign-in", { replace: true });
  };

  const getActivePath = (path: string) => {
    const updPath = `/${path.replace(" ", "-")}`;
    return pathname.includes(updPath);
  };

  const links =
    currentUserRole === "User"
      ? customerLinks
      : currentUserRole === "BusinessAdmin"
        ? merchantLinks
        : adminLinks;

  return (
    <>
      <div
        onClick={closeSidebar}
        className="fixed inset-0 z-40 bg-black/40 md:hidden"
      />

      <div className="fixed  bg-white   top-2 rounded-full right-2 z-[70] w-[40px] h-[40px] sm:h-[63px] px-4 sm:px-8 flex items-center justify-center md:hidden pointer-events-none">
        <button
          className="relative w-5 z-[3009] h-5 flex flex-col justify-center items-center gap-[6px] text-primary-purple"
          onClick={() => dispatch(onToggleMobileSidebar())}
        >
          <span
            className={`block h-[2px] w-7 bg-primary-purple rounded-full transition-transform duration-300 ${
              toggleMobileSidebar ? "translate-y-[8.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-7 bg-primary-purple rounded-full transition-opacity duration-300 ${
              toggleMobileSidebar ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block h-[2px] w-7 bg-primary-purple rounded-full transition-transform duration-300 ${
              toggleMobileSidebar ? "-translate-y-[8.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <aside className="fixed z-50 top-0 left-0 bottom-0 w-[260px] bg-primary-purple flex flex-col md:hidden">
        <div className="flex items-center justify-between px-5 py-5">
          <div className="flex items-center gap-1 bg-white rounded-[20px] h-[46px] w-[120px] justify-center">
            <img src={logo} alt="logo" className="w-[36px]" />
            <span className="font-poppins text-base font-medium text-black">
              reech
            </span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-2 flex flex-col gap-5 hide-scroll">
          {links.map((link) => (
            <MobileSidebarLink
              link={link}
              key={link.text}
              isActive={getActivePath(link.text)}
              onNavigate={closeSidebar}
            />
          ))}
        </nav>

        <div className="px-4 pb-6">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 capitalize px-4 py-5 text-sm bg-white text-red-600 rounded-[20px] font-medium w-full"
          >
            <FiLogOut size={18} />
            <span>logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default MobileSidebar;

const MobileSidebarLink = ({
  link,
  isActive,
  onNavigate,
}: {
  link: SidebarLinkProps;
  isActive: boolean;
  onNavigate: () => void;
}) => {
  const path = link.text.replace(" ", "-");

  return (
    <Link
      to={`/${path}`}
      onClick={onNavigate}
      className={`flex items-center gap-2.5 capitalize px-3  h-[60px] text-sm w-full ${
        isActive
          ? "bg-white text-primary-purple justify-center rounded-[20px] font-medium"
          : "text-white"
      }`}
    >
      <img
        src={isActive ? link.icon.active : link.icon.inactive}
        alt=""
        className="w-4 h-4"
      />
      <span>{link.text}</span>
    </Link>
  );
};
