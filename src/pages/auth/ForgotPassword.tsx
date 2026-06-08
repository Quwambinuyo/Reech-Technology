import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/reech.png";
import LandingMobileNavbar from "../../layout/LandingMobileNavbar";
import { CustomTextInput } from "../../components/CustomInput";
import Button from "../../components/Button";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { userAccountForgotPassword } from "../../redux/auth/authActions";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useAppDispatch();
  const { forgotPasswordLoading } = useAppSelector((state) => state.auth);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) return;

    dispatch(userAccountForgotPassword(email));
  };

  return (
    <main className="md:flex h-screen mt-[60px] sm:mt-[63px] md:mt-0">
      <LandingMobileNavbar />

      <section className="auth-bg hidden md:block md:w-1/2 lg:w-[52%] relative">
        <Link to="/" className="absolute z-2 top-7 left-7 xl:top-8 xl:left-8">
          <img src={logo} alt="logo" className="w-[120px] lg:w-[130px]" />
        </Link>

        <div className="absolute inset-0 bg-[#320D5EB2]" />
      </section>

      <section className="max-w-[500px] mx-auto md:max-w-none md:w-1/2 lg:w-[48%] overflow-y-auto">
        <div className="px-5 sm:px-8 md:px-10 lg:px-12 xl:px-20 mt-5 sm:my-8 md:my-14 lg:my-16 xl:my-24">
          <h3 className="text-[32px] font-semibold">Forgot Password</h3>

          <p className="mt-2">Enter your email and we'll send a reset link.</p>

          <form className="mt-8" onSubmit={handleSubmit}>
            <CustomTextInput
              label="Email address"
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              handleChange={(e) => setEmail(e.target.value)}
            />

            <div className="mt-6">
              <Button
                text={forgotPasswordLoading ? "Sending..." : "Send Reset Link"}
                type="submit"
                isDisabled={email.trim() === "" || forgotPasswordLoading}
              />
            </div>
          </form>

          <Link to="/sign-in" className="block mt-4 text-[#4A148C]">
            Back to Login
          </Link>
        </div>
      </section>
    </main>
  );
};

export default ForgotPassword;
