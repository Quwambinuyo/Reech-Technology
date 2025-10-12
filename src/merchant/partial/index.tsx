type ActionButtonProps = { type: "edit" | "delete" | "details" };

export const ActionButton = ({ type }: ActionButtonProps) => (
	<button
		className={`font-inter text-sm w-[100px] py-1.5 capitalize rounded-[10px] border font-normal ${
			type === "delete"
				? "text-default-red border-default-red"
				: "text-[#4A148C] border-[#4A148C]"
		}`}
	>
		{type}
	</button>
);

type CustomerInfoProps = { imgUrl: string; name: string; email: string };

export const CustomerInfo = ({ imgUrl, name, email }: CustomerInfoProps) => {
	return (
		<div className="w-full flex items-center gap-2">
			<img
				src={imgUrl}
				alt="person"
				className="rounded-full w-[28px] h-[28px]"
			/>
			<div className="flex flex-col gap-0.5">
				<p className="font-semibold">{name}</p>
				<p className="text-[#A3A3A3] text-xs">{email}</p>
			</div>
		</div>
	);
};
