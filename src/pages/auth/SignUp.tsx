import { useState } from "react";
import { CustomTextInput } from "../../components/CustomInput";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { FaApple } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { CustomSelectNoDropDown } from "../../components/CustomSelect";
import logo from "../../assets/reech.png";
import LandingMobileNavbar from "../../layout/LandingMobileNavbar";

const SignUp = () => {
	const [activeTab, setActiveTab] = useState("user");

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

					<form className="mt-8 md:mt-10 grid gap-4 sm:gap-5 md:gap-6 xl:gap-7">
						{activeTab === "merchant" && (
							<>
								<CustomSelectNoDropDown
									context="Country"
									value=""
									placeholder="Select your country"
								/>
								<CustomTextInput
									label="Business Name"
									id="businessName"
									placeholder="Enter your business name"
								/>
							</>
						)}
						<CustomTextInput
							label="First Name"
							id="firstName"
							placeholder="Enter your first name"
						/>
						<CustomTextInput
							label="Last Name"
							id="lastName"
							placeholder="Enter your last name"
						/>
						<CustomTextInput
							label="Email Address"
							id="email"
							placeholder="Enter your email"
						/>
						<CustomTextInput
							label="Phone Number"
							id="phone"
							placeholder="Enter your phone number"
						/>
						<CustomTextInput
							label="Password"
							id="password"
							placeholder="Enter your password"
						/>
						<CustomTextInput
							label="Confirm Password"
							id="confirmPassword"
							placeholder="Re-enter your password"
						/>
						<div className="mt-6">
							<Button text="Register" />
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
