type ButtonProps = {
	text: string;
	onClick?: () => void;
	type?: "button" | "submit" | "reset";
	width?: "auto";
	isDisabled?: boolean;
	isLoading?: boolean;
};

const Button = ({
	text,
	onClick,
	type,
	width,
	isDisabled,
	isLoading,
}: ButtonProps) => {
	const isBtnDisabled = isDisabled || isLoading;

	return (
		<button
			className={`font-poppins font-semibold capitalize bg-[#4A148C] text-white rounded-xl h-[45px] lg:h-[46px] px-4 tracking-wide border border-primary-purple disabled:opacity-50 ${
				width === "auto" ? "w-auto" : "w-full"
			} ${isDisabled ? "!cursor-auto" : "!cursor-pointer"}`}
			onClick={onClick}
			type={type || "button"}
			disabled={isBtnDisabled}
		>
			{text}
		</button>
	);
};

export default Button;
