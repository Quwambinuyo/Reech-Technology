import { MdKeyboardArrowDown } from "react-icons/md";

type SelectProps = {
	context: string;
	value: string;
	placeholder: string;
};

export const CustomSelectNoDropDown = ({
	context,
	value,
	placeholder,
}: SelectProps) => {
	return (
		<div className="flex flex-col gap-1">
			<p className="text-sm md:text-[14.5px]">{context}</p>
			<div className="border border-[#D9D9D9] px-3 py-2.5 rounded-xl w-full flex-between">
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
