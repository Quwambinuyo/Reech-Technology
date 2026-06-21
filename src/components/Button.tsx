type ButtonProps = {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  width?: "auto";
  isDisabled?: boolean;
  isLoading?: boolean;
  colorBg?: "white" | "red";
};

const Button = ({
  text,
  onClick,
  type,
  width,
  isDisabled,
  isLoading,
  colorBg,
}: ButtonProps) => {
  const isBtnDisabled = isDisabled || isLoading;

  const colorStyles = () => {
    if (colorBg === "white")
      return "bg-white text-[#4A148C] border border-[#4A148C]";
    if (colorBg === "red") return "bg-red-500 text-white border-none";
    return "bg-[#4A148C] text-white border border-primary-purple";
  };

  return (
    <button
      className={`font-poppins font-semibold capitalize rounded-xl h-[45px] lg:h-[46px] px-4 tracking-wide disabled:opacity-50 ${
        width === "auto" ? "w-auto" : "w-full"
      } ${isDisabled ? "!cursor-auto" : "!cursor-pointer"} ${colorStyles()}`}
      onClick={onClick}
      type={type || "button"}
      disabled={isBtnDisabled}
    >
      {text}
    </button>
  );
};

export default Button;
