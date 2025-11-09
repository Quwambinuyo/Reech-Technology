import { IoIosArrowDown } from "react-icons/io";
import { mailIcon, personIcon, profileImg, uploadIcon } from "../../../assets";
import { RiCloseLargeFill } from "react-icons/ri";
import { PiCheckBold } from "react-icons/pi";
import CountryDropdown from "../../../components/CountryDropdown";
import type { CountryProps } from "../../../types";
import CountryFlagSvg from "country-list-with-dial-code-and-flag/dist/flag-svg";

type ProfileInputProps = {
	id: string;
	label: string;
	type?: string;
	placeholder?: string;
	togglePhoneInput?: boolean;
	onTogglePhone?: () => void;
	onCountrySelect?: (opt: any) => void;
	selectedCountry?: CountryProps | null;
	value: string;
};

const ProfileInput = ({
	id,
	label,
	type,
	placeholder,
	togglePhoneInput,
	onTogglePhone,
	onCountrySelect,
	selectedCountry,
	value,
}: ProfileInputProps) => {
	// console.log(selectedCountry, type);

	return (
		<div className="flex flex-col gap-2 lg:gap-2.5 relative">
			<label
				htmlFor={id}
				className="text-[#1E293B] font-bold text-sm capitalize lg:text-[15px]"
			>
				{label}
			</label>
			<div className="relative overflow-hidden">
				{type === "tel" ? (
					<div
						className="absolute inline-flex items-center justify-center bottom-0.5 top-0.5 left-0.5 w-[65px] bg-[#F8FAFC] rounded-l-[30px] border-r-2 border-[#CBD5E1] cursor-pointer gap-1.5"
						onClick={onTogglePhone}
					>
						<div className="rounded-full overflow-hidden h-6 w-6 flex-center">
							<div
								dangerouslySetInnerHTML={{
									__html: CountryFlagSvg[selectedCountry?.code || "NG"],
								}}
								className="flag w-full h-full"
							></div>
						</div>

						<span>
							<IoIosArrowDown color="#94A3B8" size={20} />
						</span>
					</div>
				) : (
					<span className="absolute inline-flex items-center justify-center h-full top-0 w-[45px]">
						<img src={type === "email" ? mailIcon : personIcon} alt="icon" />
					</span>
				)}
				{type === "tel" && (
					<div className="absolute left-[75px] top-0 text-[#475569] font-bold flex-center h-full">
						<p>{selectedCountry?.dial_code || "+234"}</p>
					</div>
				)}
				<input
					type={type || "text"}
					className={`border border-[#CBD5E1] outline-none w-full py-3 pr-4 rounded-[30px] placeholder:text-[#D9D9D9] placeholder:text-[15px] outline-none focus:border-2 focus:border-[#1E293B] text-[#475569] ${
						type === "tel" ? "pl-[120px]" : "pl-10"
					}`}
					placeholder={placeholder}
					id={id}
					value={value}
				/>
			</div>
			<div className="absolute top-[85px] w-full">
				{togglePhoneInput && <CountryDropdown onSelect={onCountrySelect} />}
			</div>
		</div>
	);
};

export default ProfileInput;

type PlainInputProps = {
	id: string;
	label: string;
	value: string;
};

export const PlainInput = ({ label, id, value }: PlainInputProps) => {
	return (
		<div className="flex flex-col gap-2 lg:gap-2.5">
			<label
				htmlFor={id}
				className="text-[#1E293B] font-bold text-sm capitalize lg:text-[15px]"
			>
				{label}
			</label>
			<div className="border border-[#CBD5E1] w-full py-3 px-4 rounded-[30px] text-[#475569]">
				{value}
			</div>
		</div>
	);
};

type AvatarDisplayProps = {
	label: string;
};

export const AvatarDisplay = ({ label }: AvatarDisplayProps) => {
	return (
		<div className="flex flex-col gap-2 lg:gap-2.5">
			<p className="text-[#475569] font-bold text-sm capitalize lg:text-[15px]">
				{label}
			</p>
			<div className="flex flex-col sm:flex-row items-start gap-x-6 xl:gap-x-8">
				<img
					src={profileImg}
					alt="person"
					className="rounded-full max-w-[85px] xl:max-w-[100px]"
				/>
				<div className="font-jakarta border border-dashed border-[#CBD5E1] rounded-2xl p-4 lg:p-5 xl:p-6 text-[15px] flex-center flex-col gap-4 w-full xl:max-w-[70%]">
					<img src={uploadIcon} alt="upload" />
					<div className="flex flex-col gap-2 text-center">
						<p className="text-[#475569] font-medium">
							<button className="text-[#4F46E5] font-bold">Click here</button>{" "}
							to upload your file or drag.
						</p>
						<p className="text-[#94A3B8] text-sm xl:text-[15px]">
							Supported Format: SVG, JPG, PNG (10mb each)
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

type ProfileButtonProps = {
	type: "cancel" | "save";
	onClick?: () => void;
};

export const ProfileButton = ({ type, onClick }: ProfileButtonProps) => {
	return (
		<button
			className={`capitalize font-semibold font-jarkata px-5 py-3 rounded-[30px] flex items-center gap-2 ${
				type === "cancel"
					? "border border-[#CBD5E1] text-[#475569]"
					: "bg-primary-purple text-white"
			}`}
			onClick={onClick}
		>
			<span className="text-[15px]">{type}</span>

			{type === "cancel" ? (
				<RiCloseLargeFill size={18} />
			) : (
				<PiCheckBold size={22} />
			)}
		</button>
	);
};
