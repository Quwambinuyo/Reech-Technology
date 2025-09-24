type ActionButtonProps = { type: "edit" | "delete" };

export const ActionButton = ({ type }: ActionButtonProps) => (
	<button
		className={`font-inter text-sm w-[100px] py-1.5 capitalize rounded-[10px] border font-normal ${
			type === "edit"
				? "text-[#4A148C] border-[#4A148C]"
				: "text-[#C81119] border-[#C81119]"
		}`}
	>
		{type}
	</button>
);
