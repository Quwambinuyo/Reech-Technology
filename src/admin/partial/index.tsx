import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import type { SelectProps } from "../../types";
import { filterMerchants } from "../../common";
import { docImage } from "../../assets";

export const MerchantStatusSelect = ({
	selectedText,
	isOpen,
	onToggle,
	handleSelect,
}: SelectProps) => {
	return (
		<div className="relative">
			<button
				className="flex items-center gap-3 bg-white px-2 py-1"
				onClick={onToggle}
			>
				<span className="text-[#060606]">{selectedText}</span>
				<span className="text-[#320D5E] text-lg">
					{isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
				</span>
			</button>
			{isOpen && (
				<div className="absolute bg-white rounded-xl py-2 w-[210px] shadow-lg top-8">
					{filterMerchants
						.filter((a) => a.text !== selectedText.split(" ")[0])
						.map((m) => (
							<button
								className="px-5 py-3 hover:bg-gray-200 text-[13px] w-full text-start"
								key={m.id}
								onClick={() => handleSelect(m.text)}
							>
								{m.text} Merchants
							</button>
						))}
				</div>
			)}
		</div>
	);
};

export const MerchantDocumentWrapper = ({
	label,
	imgUrl,
}: {
	label: string;
	imgUrl: string;
}) => {
	return (
		<div className="flex flex-col gap-2 lg:gap-2.5">
			<p className="text-[#1E293B] font-bold text-sm capitalize lg:text-[15px]">
				{label}
			</p>
			<div className="bg-[#F6F9FF] rounded-xl px-3 h-[120px] flex-center flex-col gap-3.5">
				<img src={docImage} alt={imgUrl} className="w-[30px]" />
				<p className="font-inter font-medium text-sm text-#1A1A1A]">{imgUrl}</p>
			</div>
		</div>
	);
};
