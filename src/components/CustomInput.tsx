import type React from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import "./input.css";
import type { InputEvent } from "../types";

type TextInputProps = {
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
};

type OtherInputProps = {
	id: string;
	handleChange?: (e: InputEvent) => void;
	disabled?: boolean;
	isChecked?: boolean;
	readOnly?: boolean;
	value?: any;
	name?: string;
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
}: TextInputProps) => {
	return (
		<div className="flex flex-col gap-1">
			<label htmlFor={id} className="text-sm md:text-[14.5px]">
				{label}
			</label>
			<div className="relative">
				<input
					id={id}
					type={togglePassword ? "text" : type || "text"}
					placeholder={placeholder}
					className="border border-[#D9D9D9] px-3 py-2.5 rounded-xl placeholder:text-[#D9D9D9] placeholder:text-[15px] outline-none focus:border-2 focus:border-primary-purple w-full"
					value={value}
					onChange={handleChange}
					onBlur={onBlur}
					onFocus={onFocus}
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
		<div
			className={`custom-radio ${disabled && "!border-[#B8B8B8]"}
			}`}
		>
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
