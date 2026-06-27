import type { ReactElement } from "react";

type ButtonProps = {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  width?: "auto";
  isDisabled?: boolean;
  isLoading?: boolean;
  colorBg?: "white" | "red";
  icon?: ReactElement;
  iconPosition?: "left" | "right";
  fontSize?: string;
  height?: string;
};

const Button = ({
  text,
  onClick,
  type,
  width,
  isDisabled,
  isLoading,
  colorBg,
  icon,
  iconPosition = "left",
  fontSize,
  height,
}: ButtonProps) => {
  const isBtnDisabled = isDisabled || isLoading;

  const colorStyles = () => {
    if (colorBg === "white")
      return "bg-white text-[#4A148C] border border-[#4A148C]";
    if (colorBg === "red") return "bg-red-500 text-white border-none";
    return "bg-[#4A148C] text-white border border-[#4A148C]";
  };

  return (
    <button
      className={`font-poppins font-semibold capitalize rounded-xl px-4 tracking-wide disabled:opacity-50 flex items-center justify-center gap-2 ${
        fontSize ?? "text-sm"
      } ${height ?? "h-[45px] lg:h-[46px]"} ${
        width === "auto" ? "w-auto" : "w-full"
      } ${isDisabled ? "!cursor-auto" : "!cursor-pointer"} ${colorStyles()}`}
      onClick={onClick}
      type={type || "button"}
      disabled={isBtnDisabled}
    >
      {icon && iconPosition === "left" && icon}
      {text}
      {icon && iconPosition === "right" && icon}
    </button>
  );
};

export default Button;
