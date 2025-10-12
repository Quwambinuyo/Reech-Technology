type ButtonProps = {
	text: string;
	onClick?: () => void;
	type?: "button" | "submit" | "reset";
	width?: "auto";
};

const Button = ({ text, onClick, type, width }: ButtonProps) => {
	return (
		<button
			className={`font-poppins font-semibold capitalize bg-[#4A148C] text-white rounded-xl h-[45px] lg:h-[46px] px-4 tracking-wide border border-primary-purple ${
				width === "auto" ? "w-auto" : "w-full"
			}`}
			onClick={onClick}
			type={type || "button"}
		>
			{text}
		</button>
	);
};

export default Button;
