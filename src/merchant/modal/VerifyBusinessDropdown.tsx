import { useRef, useState, useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";
import VerifyBusinessModal from "./VerifyBusinessModal";

interface Props {
  isMobile?: boolean;
  isOpen: boolean;
  onClose: () => void;
  firstName: string;
}

const VerifyBusinessDropdown = ({ isMobile = false }: Props) => {
  const [verifyOpen, setVerifyOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const verifyRef = useRef<HTMLDivElement>(null);
  const { currentUser } = useAppSelector((state) => state.auth);
  const firstName = currentUser?.firstName || "";

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (verifyRef.current && !verifyRef.current.contains(e.target as Node)) {
        setVerifyOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="relative" ref={verifyRef}>
        <button
          onClick={() => setVerifyOpen((prev) => !prev)}
          className={`${isMobile ? "text-[12px]" : "text-[13px]"} font-medium text-[#320D5E] hover:text-[#362e78] transition-colors whitespace-nowrap`}
        >
          Complete Verification
        </button>

        {verifyOpen && (
          <div
            className={`absolute ${isMobile ? "right-0" : "left-1/2 -translate-x-1/2"} top-[calc(100%+6px)] z-50 flex flex-col ${isMobile ? "items-end" : "items-center"}`}
          >
            <div
              className={`${isMobile ? "mr-4" : ""} w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-b-[7px] border-b-[#320D5E]`}
            />
            <div
              className={`bg-white rounded-xl shadow-xl border border-[#00000010] px-5 py-4 ${isMobile ? "min-w-[270px]" : "min-w-[300px]"}`}
            >
              <button
                onClick={() => {
                  setVerifyOpen(false);
                  setModalOpen(true);
                }}
                className="text-[13px] text-[#060606] text-nowrap font-semibold hover:text-[#320D5E] transition-colors w-full text-left"
              >
                Click here to submit your outstanding documentation
              </button>
            </div>
          </div>
        )}
      </div>

      <VerifyBusinessModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        firstName={firstName}
      />
    </>
  );
};

export default VerifyBusinessDropdown;
