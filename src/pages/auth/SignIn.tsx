import { useState } from "react";
import { CustomCheckbox, CustomTextInput } from "../../components/CustomInput";
import Button from "../../components/Button";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa6";
import { Link } from "react-router-dom";
import logo from "../../assets/reech.png";
import LandingMobileNavbar from "../../layout/LandingMobileNavbar";

const SignIn = () => {
	const [togglePassword, setTogglePassword] = useState(false);

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
				<div className="px-5 sm:px-8 md:px-10 lg:px-12 xl:px-20 mt-5 sm:my-8 md:my-14 lg:my-16 xl:my-24">
					<div className="mb-8 xl:mb-10">
						<h3 className="text-[25px] sm:text-[27px] md:text-[30px] lg:text-[32px] xl:text-[36px] font-semibold">
							Welcome back!
						</h3>
						<p className="font-light text-[13.8px] sm:text-[15px] lg:text-base xl:text-lg">
							Enter your Credentials to access your account
						</p>
					</div>

					<form className="flex flex-col gap-6 md:gap-7 xl:gap-8">
						<CustomTextInput
							label="Email address"
							type="email"
							id="email"
							placeholder="Enter your email"
						/>
						<div>
							<CustomTextInput
								label="Password"
								type="password"
								id="password"
								placeholder="Enter your password"
								togglePassword={togglePassword}
								handleTogglePassword={() => setTogglePassword((prev) => !prev)}
							/>
							<div className="font-poppins flex flex-col gap-2 mt-2">
								<button className=" font-light text-[15px] md:text-base text-[#4A148C] self-end">
									forgot password
								</button>
								<div className="flex items-center gap-2">
									<CustomCheckbox id="remember-me" />
									<label
										htmlFor="remember-me"
										className="font-medium text-sm md:text-[14.5px]"
									>
										Remember me for 30 days
									</label>
								</div>
							</div>
						</div>
						<Button text="Login" />
					</form>

					<div className="flex flex-col gap-4 xl:gap-5 mt-6 md:mt-7 xl:mt-8">
						<div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 xl:gap-6 font-poppins font-medium text-[15px]">
							<button className="border border-[#D9D9D9] rounded-xl py-2.5 flex-center gap-2">
								<span className="text-[24px] xl:text-[26px]">
									<FcGoogle />
								</span>
								<span>Sign in with Google</span>
							</button>
							<button className="border border-[#D9D9D9] rounded-xl py-2.5 flex-center gap-2">
								<span className="text-[24px] xl:text-[26px]">
									<FaApple />
								</span>
								<span>Sign in with Apple</span>
							</button>
						</div>
						<p className="self-center">
							Don't have an account?{" "}
							<Link
								to="/sign-up"
								className="text-[#4A148C] text-[17px] sm:text-lg"
							>
								Sign Up
							</Link>
						</p>
					</div>
				</div>
			</section>
		</main>
	);
};

export default SignIn;
