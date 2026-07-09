import { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";

type SelectProps = {
  context: string;
  value: string;
  placeholder: string;
  handleToggle?: () => void;
};

type MiniDropDownProps = {
  options?: string[];
  selectedOption?: string;
  onSelect?: (option: string) => void;
};

export const CustomSelect = ({ context, value, placeholder }: SelectProps) => {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm md:text-[14.5px]">{context}</p>
      <div className="border border-[#D9D9D9] px-3 py-2.5 rounded-xl w-full flex-between cursor-pointer">
        <p className={`${value ? "text-black" : "text-[#D9D9D9] text-[15px]"}`}>
          {value ? value : placeholder}
        </p>
        <span>
          <MdKeyboardArrowDown size={22} />
        </span>
      </div>
    </div>
  );
};

export const CustomSelectNoDropDown = ({
  context,
  value,
  placeholder,
  handleToggle,
}: SelectProps) => {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm md:text-[14.5px]">{context}</p>
      <div
        className="border border-[#D9D9D9] px-3 py-2.5 rounded-xl w-full flex-between cursor-pointer"
        onClick={handleToggle}
      >
        <p className={`${value ? "text-black" : "text-[#D9D9D9] text-[15px]"}`}>
          {value ? value : placeholder}
        </p>
        <span>
          <MdKeyboardArrowDown size={22} />
        </span>
      </div>
    </div>
  );
};

export const MiniDropDown = ({
  options = [],
  selectedOption,
  onSelect,
}: MiniDropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalSelected, setInternalSelected] = useState(
    selectedOption || options[0] || "",
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!options.length) return null;

  const displayValue = selectedOption || internalSelected;

  return (
    <div className="text-[#060606] relative " ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white flex items-center min-w-[150px] justify-center  gap-3 px-4 py-3 rounded-[25px] text-sm xl:text-[14.5px]"
      >
        <span>{displayValue}</span>
        <IoIosArrowDown
          size={18}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg border border-[#00000014] py-2 min-w-[160px] z-50">
          {options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInternalSelected(option);
                onSelect?.(option);
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-[#F5F6FF] transition-colors text-sm xl:text-[14.5px]"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
