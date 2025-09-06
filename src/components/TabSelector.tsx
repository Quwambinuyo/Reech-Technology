type SelectorProps = {
	options: { text: string; id: number }[];
	activeTab: string;
	onSelect: (id: string) => void;
};
const TabSelector = ({ options, activeTab, onSelect }: SelectorProps) => {
	return (
		<div className="bg-[#F0F1FE] px-3 py-2 rounded-[30px] flex gap-4 self-start">
			{options.map((opt) => (
				<button
					className={`rounded-[30px] px-6 xl:px-7 py-2.5 text-sm transition-all ${
						opt.text === activeTab
							? "bg-primary-purple text-white"
							: "bg-white text-light-black"
					}`}
					key={opt.id}
					onClick={() => onSelect(opt.text)}
				>
					{opt.text}
				</button>
			))}
		</div>
	);
};

export default TabSelector;
