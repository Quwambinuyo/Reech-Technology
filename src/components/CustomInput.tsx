import type React from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import "./input.css";
import type { InputEvent } from "../types";
import type { ClipboardEvent, KeyboardEvent, MutableRefObject } from "react";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  togglePassword?: boolean;
  handleTogglePassword?: () => void;
  otherInfo?: string | React.ReactElement;
  value?: string;
  handleChange?: (e: InputEvent) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  otherInputProps?: any;
  bg?: string;
  icon?: React.ReactElement;
  borderColor?: string;
  focusBorderColor?: string;
  rounded?: "sm" | "md" | "lg" | "full";
}

type OtherInputProps = {
  id: string;
  handleChange?: (e: InputEvent) => void;
  disabled?: boolean;
  isChecked?: boolean;
  readOnly?: boolean;
  value?: any;
  name?: string;
};

type OtpInputProps = {
  index: number;
  digit: string;
  hasError: boolean;
  inputRefs: MutableRefObject<(HTMLInputElement | null)[]>;
  onChange: (index: number, value: string) => void;
  onKeyDown: (index: number, e: KeyboardEvent<HTMLInputElement>) => void;
  onPaste: (e: ClipboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

const roundedMap = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

export const CustomTextInput = ({
  id,
  label,
  type,
  placeholder,
  togglePassword,
  value,
  handleTogglePassword,
  otherInfo,
  handleChange,
  onBlur,
  onFocus,
  otherInputProps,
  bg,
  icon,
  borderColor,
  focusBorderColor,
  rounded,
}: TextInputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm md:text-[14.5px]">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A8ADBD] flex items-center">
            {icon}
          </div>
        )}
        <input
          id={id}
          type={togglePassword ? "text" : type || "text"}
          placeholder={placeholder}
          className={`border px-3 py-2.5 placeholder:text-[#D9D9D9] placeholder:text-[15px] outline-none focus:border-2 w-full ${
            roundedMap[rounded ?? "md"]
          } ${icon ? "pl-9" : ""}`}
          style={{
            backgroundColor: bg ?? "#ffffff",
            borderColor: borderColor ?? "#D9D9D9",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = focusBorderColor ?? "#7C3AED";
            onFocus?.();
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = borderColor ?? "#D9D9D9";
            onBlur?.();
          }}
          value={value}
          onChange={handleChange}
          {...otherInputProps}
        />
        {type === "password" && (
          <button
            onClick={handleTogglePassword}
            className="absolute text-[#A8ADBD] text-xl bottom-3 right-3"
            type="button"
          >
            {togglePassword ? <IoMdEyeOff /> : <IoMdEye />}
          </button>
        )}
      </div>
      {otherInfo}
    </div>
  );
};

export const CustomRadioInput = ({
  value,
  isChecked,
  handleChange,
  disabled,
  id,
  name,
}: OtherInputProps) => (
  <div className="custom-radio-div">
    <input
      type="radio"
      value={value}
      checked={isChecked}
      onChange={handleChange}
      disabled={disabled}
      id={id}
      name={name}
    />
    <div className={`custom-radio ${disabled && "!border-[#B8B8B8]"}`}>
      <div className={`${disabled && "!bg-[#B8B8B8]"}`}></div>
    </div>
  </div>
);

export const CustomCheckbox = ({
  handleChange,
  isChecked,
  value,
  id,
  disabled,
}: OtherInputProps) => (
  <div className="custom-checkbox-div">
    <input
      type="checkbox"
      id={id}
      onChange={handleChange}
      checked={isChecked}
      value={value}
      disabled={disabled}
    />
    <div className="custom-checkbox">
      <div></div>
    </div>
  </div>
);

export const OtpInput = ({
  index,
  digit,
  hasError,
  inputRefs,
  onChange,
  onKeyDown,
  onPaste,
  disabled,
}: OtpInputProps) => (
  <input
    ref={(el) => {
      inputRefs.current[index] = el;
    }}
    type="text"
    inputMode="numeric"
    maxLength={1}
    value={digit}
    disabled={disabled}
    onChange={(e) => onChange(index, e.target.value)}
    onKeyDown={(e) => onKeyDown(index, e)}
    onPaste={onPaste}
    className={`w-[50px] h-[56px] text-center text-[20px] font-medium rounded-lg outline-none transition-all border ${
      digit
        ? "border-violet-500 bg-white text-gray-900"
        : hasError
          ? "border-red-400 bg-red-50"
          : "border-gray-200 bg-gray-50 text-gray-900"
    } focus:border-violet-500 focus:ring-2 focus:ring-violet-100`}
  />
);
