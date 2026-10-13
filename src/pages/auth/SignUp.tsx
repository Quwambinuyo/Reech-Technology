import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa6";

import { CustomSelectNoDropDown } from "../../components/CustomSelect";
import LandingMobileNavbar from "../../layout/LandingMobileNavbar";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { CustomTextInput } from "../../components/CustomInput";
import type { CountryProps, FormEvent, InputEvent } from "../../types";
import Button from "../../components/Button";
import { validateEmail } from "../../utils";
import logo from "../../assets/reech.png";
import { createHolderAccount } from "../../redux/auth/authActions";
import PasswordCriteria from "./partial/PasswordCriteria";
import CountryDropdown from "../../components/CountryDropdown";
import { onClearAccountCreationSuccess } from "../../redux/auth/authReducer";

const PHONE_LENGTH = 11;

const SignUp = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { allCountries, createAccountLoading, createAccountSuccess } =
		useAppSelector((state) => state.auth);

	const [togglePasswordHint, setTogglePasswordHint] = useState(false);
	const [toggleCountry, setToggleCountry] = useState(false);
	const [activeTab, setActiveTab] = useState("user");
	const [togglePassword, setTogglePassword] = useState({
		normal: false,
		confirm: false,
	});
	const [form, setForm] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
		phone: "",
		businessName: "",
	});

	const [country, setCountry] = useState<CountryProps | null>(null);
	const {
		firstName,
		lastName,
		email,
		password,
		confirmPassword,
		phone,
		businessName,
	} = form;

	const handleChange = (e: InputEvent) => {
		setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
	};

	const handlePhoneChange = (e: InputEvent) => {
		const digits = e.target.value.replace(/\D/g, "").slice(0, PHONE_LENGTH);
		setForm((prev) => ({ ...prev, phone: digits }));
	};

	const isEmailValid = validateEmail(email);

	const hasNumber = /\d/.test(password);
	const hasSpecialCharacter = /[!@#=$%^&*()_+{}\\[\]:;<>,.?~\\/-]/.test(
		password
	);
	const hasLowerCase = /[a-z]/.test(password);
	const hasUpperCase = /[A-Z]/.test(password);
	const moreThan7 = password.length > 7;

	const isPasswordValid = {
		number: hasNumber,
		specialCha: hasSpecialCharacter,
		lCase: hasLowerCase,
		uCase: hasUpperCase,
		moreThan7,
	};

	const onCountrySelect = (opt: any) => {
		const findCountry = allCountries.find((c) => c?.code === opt?.dial_code);

		if (findCountry) {
			setCountry(findCountry);
		}
		setToggleCountry(false);
	};

	const handleAccountCreation = (e: FormEvent) => {
		e.preventDefault();

		if (activeTab === "merchant" && !businessName) {
			toast.error("Please provide your business name.");
			document
				.getElementById("sign-up")
				?.scrollIntoView({ behavior: "smooth" });
		} else if (!firstName || !lastName || !email || !password) {
			toast.error("Please fill all fields");
			document
				.getElementById("sign-up")
				?.scrollIntoView({ behavior: "smooth" });
		} else if (!isEmailValid) {
			toast.error("Please enter a valid email");
		} else if (phone && phone.length !== PHONE_LENGTH) {
			toast.error(`Phone number must be ${PHONE_LENGTH} digits`);
		} else if (Object.values(isPasswordValid).includes(false)) {
			toast.error("Password does not match the criteria provided.");
		} else if (password !== confirmPassword) {
			toast.error("Passwords does not match. Please check!");
		} else {
			const userData = {
				firstName,
				lastName,
				phoneNumber: phone,
				email,
				password,
			};

			const merchantData = {
				firstName,
				lastName,
				email,
				phoneNumber: phone,
				password,
				businessName,
				countryId: country?.id,
			};

			const dataToSend = {
				data: activeTab === "merchant" ? merchantData : userData,
				url: activeTab === "merchant" ? "businesses" : "users/signup",
			};
			dispatch(createHolderAccount(dataToSend));
		}
	};

	useEffect(() => {
		if (createAccountSuccess) {
			dispatch(onClearAccountCreationSuccess());

			navigate("/sign-in");
		}
	}, [createAccountSuccess]);

	return (
		<main className="md:flex h-screen mt-[60px] sm:mt-[63px] md:mt-0">
			<LandingMobileNavbar />
			<section className="auth-bg hidden md:block md:w-1/2 lg:w-[52%] relative">
				<Link to="/" className=" absolute z-2 top-7 left-7 xl:top-8 xl:left-8">
					<img
						src={logo}
						alt="logo"
						className="w-[120px] lg:w-[130px] xl:w-auto"
					/>
				</Link>
				<div className="absolute inset-0 bg-[#320D5EB2]"></div>
			</section>
			<section className="max-w-[500px] mx-auto md:max-w-none md:w-1/2 lg:w-[48%] overflow-y-auto">
				<div className="px-5 sm:px-8 md:px-10 lg:px-12 xl:px-24 mt-8 sm:mt-10 mb-16 md:my-14 lg:my-16 xl:my-24">
					<div className="border-b border-[#D7D7D7] inline-flex gap-5 sm:gap-6 xl:gap-8 text-[19px] sm:text-[24px] md:text-[20px] lg:text-[22px] xl:text-[25px] ">
						<button
							className={`transition-all pb-0.5 font-semibold capitalize ${
								activeTab === "user"
									? "text-black border-b-2 border-[#777DF9]"
									: "text-[#D7D7D7]"
							}`}
							onClick={() => setActiveTab("user")}
						>
							user sign up
						</button>
						<button
							className={`transition-all pb-0.5 font-semibold capitalize ${
								activeTab === "merchant"
									? "text-black border-b-2 border-[#777DF9]"
									: "text-[#D7D7D7]"
							}`}
							onClick={() => setActiveTab("merchant")}
						>
							merchant sign up
						</button>
					</div>
					<p className="mt-3 text-[15px] md:text-base xl:text-[17px] font-light">
						Enter your Credentials to get started
					</p>

					<form
						className="mt-8 md:mt-10 grid gap-4 sm:gap-5 md:gap-6 xl:gap-7"
						onSubmit={handleAccountCreation}
						id="sign-up"
					>
						{activeTab === "merchant" && (
							<>
								<div className="relative">
									<CustomSelectNoDropDown
										context="Country"
										value={country?.name as never as string}
										placeholder="Select your country"
										handleToggle={() => setToggleCountry(!toggleCountry)}
									/>
									{toggleCountry && (
										<div className="absolute z-5 top-[75px] w-full">
											<CountryDropdown onSelect={onCountrySelect} />
										</div>
									)}
								</div>
								<CustomTextInput
									label="Business Name"
									id="businessName"
									placeholder="Enter your business name"
									value={businessName}
									handleChange={handleChange}
								/>
							</>
						)}
						<CustomTextInput
							label="First Name"
							id="firstName"
							placeholder="Enter your first name"
							value={firstName}
							handleChange={handleChange}
						/>
						<CustomTextInput
							label="Last Name"
							id="lastName"
							placeholder="Enter your last name"
							value={lastName}
							handleChange={handleChange}
						/>
						<CustomTextInput
							label="Email Address"
							id="email"
							placeholder="Enter your email"
							value={email}
							handleChange={handleChange}
						/>
						<CustomTextInput
							label="Phone Number"
							id="phone"
							type="tel"
							value={phone}
							handleChange={handlePhoneChange}
							placeholder="Enter your phone number"
							otherInputProps={{ maxLength: PHONE_LENGTH, inputMode: "numeric" }}
						/>
						<div className="relative">
							{togglePasswordHint && (
								<PasswordCriteria isPasswordValid={isPasswordValid} />
							)}
							<CustomTextInput
								label="Password"
								id="password"
								placeholder="Enter your password"
								type="password"
								value={password}
								handleChange={handleChange}
								togglePassword={togglePassword.normal}
								handleTogglePassword={() =>
									setTogglePassword((prev) => ({
										...prev,
										normal: !togglePassword.normal,
									}))
								}
								onBlur={() => setTogglePasswordHint(false)}
								onFocus={() => setTogglePasswordHint(true)}
							/>
						</div>
						<CustomTextInput
							label="Confirm Password"
							id="confirmPassword"
							placeholder="Re-enter your password"
							type="password"
							value={confirmPassword}
							handleChange={handleChange}
							togglePassword={togglePassword.confirm}
							handleTogglePassword={() =>
								setTogglePassword((prev) => ({
									...prev,
									confirm: !togglePassword.confirm,
								}))
							}
						/>
						<div className="mt-6">
							<Button
								text={createAccountLoading ? "Registering..." : "Register"}
								type="submit"
								isDisabled={createAccountLoading}
								isLoading={createAccountLoading}
							/>
						</div>
					</form>

					<div className="flex flex-col gap-5 xl:gap-6 mt-8 xl:mt-10">
						<div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-5 md:gap-4 xl:gap-6 font-poppins font-medium text-[15px]">
							<button className="border border-[#D9D9D9] rounded-xl py-2.5 flex-center gap-2">
								<span className="text-[24px] xl:text-[26px]">
									<FcGoogle />
								</span>
								<span>Sign up with Google</span>
							</button>
							<button className="border border-[#D9D9D9] rounded-xl py-2.5 flex-center gap-2">
								<span className="text-[24px] xl:text-[26px]">
									<FaApple />
								</span>
								<span>Sign up with Apple</span>
							</button>
						</div>
						<p className="self-center">
							Already a user?{" "}
							<Link
								to="/sign-in"
								className="text-[#4A148C] text-[17px] sm:text-lg"
							>
								Sign In
							</Link>
						</p>
					</div>
				</div>
			</section>
		</main>
	);
};

export default SignUp;