import { useState } from "react";
import type { CountryProps } from "../types";
import ImageCard from "../pages/profile/partial/ImageCard";
import { MiniInfoCard } from "../pages/profile/partial";
import ProfileInput, {
	AvatarDisplay,
	PlainInput,
	ProfileButton,
} from "../pages/profile/partial/ProfileInputs";
import { copyIcon } from "../assets";
import { PiQuestionBold } from "react-icons/pi";

const MerchantProfile = () => {
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
			<div className="flex flex-col lg:flex-row gap-6 xl:gap-8 mt-6 border-b border-[#CBD5E1] pb-6 lg:pb-7">
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
						<PlainInput
							label="account type"
							id="accountType"
							value="Merchant"
						/>
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

			<div className="mt-6 flex flex-col lg:flex-row gap-6 xl:gap-8 mt-6 pb-6 lg:pb-7">
				<div className="w-full lg:w-[30%] xl:w-1/4">
					<h6 className="text-[#1E293B font-semibold flex items-center gap-1">
						Account API{" "}
						<span>
							<PiQuestionBold color="#94A3B8" size={22} />
						</span>
					</h6>
					<p className="text-[#475569] text-sm mt-1 md:mt-2">
						You can change your payment credentials here.
					</p>
				</div>
				<div className="w-full lg:w-[70%] xl:w-3/4 border border-[#E2E8F0] bg-white rounded-2xl xl:rounded-3xl p-5 xl:p-6 flex flex-col gap-5 xl:gap-6 font-jakarta">
					<div className="flex flex-col gap-2 xl:max-w-[80%]">
						<h4 className="text-[#1E293B] font-bold">API</h4>
						<div className="font-medium border border-[#CBD5E1] text-[#475569] flex-between rounded-[30px] px-4 py-3">
							<p>9978 1128 1558 1978</p>
							<button>
								<img src={copyIcon} alt="copy" />
							</button>
						</div>
					</div>
					<div className="flex flex-col gap-2 xl:max-w-[80%]">
						<h4 className="text-[#1E293B] font-bold">URL</h4>
						<div className="font-medium border border-[#CBD5E1] text-[#475569] flex-between rounded-[30px] px-4 py-3">
							<p>9978 1128 1558 1978</p>
							<button>
								<img src={copyIcon} alt="copy" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MerchantProfile;
