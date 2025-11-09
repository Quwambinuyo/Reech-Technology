import { IoIosArrowDown } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";

type SelectProps = {
	context: string;
	value: string;
	placeholder: string;
	handleToggle?: () => void;
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

export const MiniDropDown = () => {
	return (
		<div className="text-[#060606]">
			<button className="bg-white flex items-center gap-3 px-4 py-3 rounded-[25px] text-sm xl:text-[14.5px]">
				<span>Last 30 Days</span>
				<span>
					<IoIosArrowDown size={18} />
				</span>
			</button>
		</div>
	);
};
