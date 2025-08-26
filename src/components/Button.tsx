type ButtonProps = {
	text: string;
};

const Button = ({ text }: ButtonProps) => {
	return (
		<button
			className={`w-full font-poppins font-bold capitalize bg-[#4A148C] text-white rounded-xl py-3 px-4 tracking-wide border border-primary-purple`}
		>
			{text}
		</button>
	);
};

export default Button;
