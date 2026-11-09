import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
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
  toPath,
  type SidebarLinkProps,
} from "./Sidebar";

const SWIPE_CLOSE_DISTANCE = 60;
const ENTRANCE_DURATION = 700;

const MobileSidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUserRole = useRole();
  const { toggleMobileSidebar } = useAppSelector((state) => state.auth);
  const [visible, setVisible] = useState(false);
  const [entered, setEntered] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const closeSidebar = () => dispatch(onToggleMobileSidebar());

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    const timer = window.setTimeout(() => setEntered(true), ENTRANCE_DURATION);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dispatch(onToggleMobileSidebar());
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [dispatch]);

  const handleLogout = () => {
    const tabId = getOrCreateTabId();
    clearUserSession(tabId);
    dispatch(onLogout());
    toast.success("Logged out successfully");
    closeSidebar();
    navigate("/sign-in", { replace: true });
  };

  const getActivePath = (path: string) => {
    const updPath = `/${toPath(path)}`;
    return pathname.includes(updPath);
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (delta < -SWIPE_CLOSE_DISTANCE) closeSidebar();
  };

  const links =
    currentUserRole === "User"
      ? customerLinks
      : currentUserRole === "BusinessAdmin"
        ? merchantLinks
        : adminLinks;

  const roleLabel =
    currentUserRole === "User"
      ? "Customer"
      : currentUserRole === "BusinessAdmin"
        ? "Merchant"
        : "Admin";

  return (
    <>
      <div
        onClick={closeSidebar}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="fixed  bg-white   top-2 rounded-full right-2 z-[70] w-[40px] h-[40px] sm:h-[63px] px-4 sm:px-8 flex items-center justify-center md:hidden pointer-events-none shadow-lg">
        <button
          aria-label="Close menu"
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

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          paddingTop: "env(safe-area-inset-top)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
        className={`fixed z-50 top-0 left-0 bottom-0 w-[280px] max-w-[85vw] flex flex-col overflow-hidden rounded-r-[32px] bg-gradient-to-b from-primary-purple via-primary-purple to-[#1c0838] shadow-xl will-change-transform transition-transform duration-300 ease-out md:hidden ${
          visible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 100% 0%, rgba(255,255,255,0.1), transparent 45%), radial-gradient(circle at 0% 100%, rgba(255,255,255,0.05), transparent 45%)",
          }}
        />

        <div className="relative flex flex-col gap-3 px-5 pt-6 pb-4">
          <div className="flex items-center gap-1 bg-white rounded-[20px] h-[46px] w-[120px] justify-center shadow-md">
            <img src={logo} alt="logo" className="w-[36px]" />
            <span className="font-poppins text-base font-medium text-black">
              reech
            </span>
          </div>
          <span className="w-fit rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white/80">
            {roleLabel}
          </span>
        </div>

        <div className="relative mx-5 h-px bg-gradient-to-r from-white/30 to-transparent" />

        <nav className="relative flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-1.5 hide-scroll">
          {links.map((link, index) => (
            <MobileSidebarLink
              link={link}
              key={link.text}
              index={index}
              visible={visible}
              entered={entered}
              isActive={getActivePath(link.text)}
              onNavigate={closeSidebar}
            />
          ))}
        </nav>

        <div className="relative px-4 pb-6 pt-2">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 capitalize px-4 py-4 text-sm bg-white/10 text-white border border-white/15 rounded-[20px] font-medium w-full transition-[transform,background-color] active:scale-[0.98] active:bg-white/20"
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
  index,
  visible,
  entered,
}: {
  link: SidebarLinkProps;
  isActive: boolean;
  onNavigate: () => void;
  index: number;
  visible: boolean;
  entered: boolean;
}) => {
  const path = toPath(link.text);

  return (
    <Link
      to={`/${path}`}
      onClick={onNavigate}
      style={{
        transitionDelay: visible && !entered ? `${index * 45 + 120}ms` : "0ms",
      }}
      className={`flex items-center gap-3 capitalize px-4 h-[54px] text-sm w-full rounded-[18px] transition-[opacity,transform,background-color] duration-300 active:scale-[0.98] ${
        visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
      } ${
        isActive
          ? "bg-white text-primary-purple font-semibold shadow-lg shadow-black/20"
          : "text-white/85 active:bg-white/10"
      }`}
    >
      <img
        src={isActive ? link.icon.active : link.icon.inactive}
        alt=""
        className="w-[18px] h-[18px] shrink-0"
      />
      <span className="flex-1">{link.text}</span>
      {isActive && (
        <span className="size-1.5 rounded-full bg-primary-purple" />
      )}
    </Link>
  );
};