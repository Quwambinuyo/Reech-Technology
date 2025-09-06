type ButtonProps = {
	text: string;
	onClick?: () => void;
	type?: "button" | "submit" | "reset";
};

const Button = ({ text, onClick, type }: ButtonProps) => {
	return (
		<button
			className={`w-full font-poppins font-bold capitalize bg-[#4A148C] text-white rounded-xl py-3 px-4 tracking-wide border border-primary-purple`}
			onClick={onClick}
			type={type || "button"}
		>
			{text}
		</button>
	);
};

export default Button;
