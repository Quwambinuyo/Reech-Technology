import { useState } from "react";
import { MiniInfoCard } from "../pages/profile/partial";
import ImageCard from "../pages/profile/partial/ImageCard";
import ProfileInput, {
	AvatarDisplay,
	PlainInput,
	ProfileButton,
} from "../pages/profile/partial/ProfileInputs";
import type { CountryProps } from "../types";

const CustomerProfile = () => {
	const [toggleEdit, setToggleEdit] = useState(false);
	const [togglePhone, setTogglePhone] = useState(false);
	const [country, setCountry] = useState<CountryProps | null>(null);

	const onCountrySelect = (opt: any) => {
		setCountry(opt);
		setTogglePhone(false);
	};

	return (
		<div className="xl:mt-2">
			<ImageCard />
			<div className="flex flex-col lg:flex-row gap-6 xl:gap-8 mt-6 border-b border-[#CBD5E1] pb-6 lg:pb-7 border-b border-[#CBD5E1]">
				<MiniInfoCard />

				<div className="w-full lg:w-[70%] xl:w-3/4 border border-[#E2E8F0] bg-white rounded-2xl xl:rounded-3xl p-5 xl:p-6 flex flex-col gap-5 xl:gap-6">
					<div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5 xl:gap-6">
						<ProfileInput
							type="text"
							placeholder="Enter full name"
							label="full name"
							id="fullName"
						/>
						<ProfileInput
							type="email"
							placeholder="Enter email address"
							label="email address"
							id="email"
						/>
						<ProfileInput
							type="tel"
							placeholder="Enter phone number"
							label="phone number"
							id="phoneNumber"
							togglePhoneInput={togglePhone}
							onTogglePhone={() => setTogglePhone(!togglePhone)}
							onCountrySelect={onCountrySelect}
							selectedCountry={country}
						/>
						<PlainInput label="account type" id="accountType" value="Member" />
					</div>
					<AvatarDisplay label="change avatar" />
				</div>
			</div>
			<div className="border-b border-[#CBD5E1] mt-6"></div>
			<div className="flex justify-end gap-3 mt-6 lg:mt-7">
				{toggleEdit ? (
					<>
						<ProfileButton type="cancel" onClick={() => setToggleEdit(false)} />
						<ProfileButton type="save" />
					</>
				) : (
					<button
						onClick={() => setToggleEdit(true)}
						className="font-bold text-sm lg:text-[15px] text-primary-purple"
					>
						Edit
					</button>
				)}
			</div>
		</div>
	);
};

export default CustomerProfile;
