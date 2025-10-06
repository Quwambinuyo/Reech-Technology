type ButtonProps = {
	text: string;
	onClick?: () => void;
	type?: "button" | "submit" | "reset";
};

const Button = ({ text, onClick, type }: ButtonProps) => {
	return (
		<button
			className={`w-full font-poppins font-semibold capitalize bg-[#4A148C] text-white rounded-xl h-[45px] lg:h-[46px] px-4 tracking-wide border border-primary-purple`}
			onClick={onClick}
			type={type || "button"}
		>
			{text}
		</button>
	);
};

export default Button;
