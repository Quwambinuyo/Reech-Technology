import { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FiUser, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { onLogout } from "../redux/auth/authReducer";
import { clearUserSession, getOrCreateTabId } from "../utils";
import { toast } from "react-toastify";
import person from "../assets/empty-p.png";

interface ProfileDropdownProps {
  userName: string;
  userAvatar?: string;
}

const ProfileDropdown = ({ userName, userAvatar }: ProfileDropdownProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    const tabId = getOrCreateTabId();
    clearUserSession(tabId);
    dispatch(onLogout());
    toast.success("Logged out successfully");
    navigate("/sign-in", { replace: true });
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setDropdownOpen((prev) => !prev)}
        className="bg-white rounded-[30px] flex-between gap-2 py-1 lg:py-1.5 xl:min-w-[210px] px-2"
      >
        <div className="flex items-center gap-3">
          <img
            src={userAvatar || person}
            alt="person"
            className="w-[37px] xl:w-[38px] h-[37px] xl:h-[38px] object-fit rounded-full"
          />
          <p className="text-nowrap text-[#292D32] text-[15px] hidden sm:block md:hidden lg:block truncate">
            {userName}
          </p>
        </div>
        <span className="mr-1">
          <IoIosArrowDown
            size={20}
            className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
          />
        </span>
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 top-[calc(100%+8px)] bg-white rounded-2xl shadow-lg border border-[#00000014] py-2 min-w-[210px] z-50">
          <button
            onClick={() => {
              setDropdownOpen(false);
              navigate("/profile");
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#F5F6FF] transition-colors text-[#292D32] text-[14px]"
          >
            <FiUser size={17} />
            View Profile
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#FFF0F0] transition-colors text-red-500 text-[14px]"
          >
            <FiLogOut size={17} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
