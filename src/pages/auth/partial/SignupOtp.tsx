import { useEffect, useRef, useState } from "react";
import type {
	ChangeEvent,
	ClipboardEvent,
	FormEvent,
	KeyboardEvent,
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Button from "../../../components/Button";
import {
	verifySignupOtp,
	resendSignupOtp,
} from "../../../redux/auth/authActions";
import {
	onClearSignupChallenge,
	onClearVerifySignupSuccess,
} from "../../../redux/auth/authReducer";

const CODE_LENGTH = 6;
const RESEND_SECONDS = 60;

const emptyDigits = () => Array(CODE_LENGTH).fill("") as string[];

const formatTime = (totalSeconds: number) => {
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;
	return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

interface SignupOtpProps {
	email?: string;
	initialCooldown?: number;
}

const SignupOtp = ({
	email,
	initialCooldown = RESEND_SECONDS,
}: SignupOtpProps) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { signupChallenge, verifySignupLoading, resendSignupLoading } =
		useAppSelector((state) => state.auth);

	const [digits, setDigits] = useState<string[]>(emptyDigits());
	const [cooldown, setCooldown] = useState(initialCooldown);
	const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
	const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

	const code = digits.join("");
	const expiresAt = signupChallenge?.expiresAt;

	const focusAt = (index: number) => {
		inputsRef.current[index]?.focus();
	};

	useEffect(() => {
		focusAt(0);
	}, []);

	useEffect(() => {
		if (!expiresAt) {
			setSecondsLeft(null);
			return;
		}

		const tick = () => {
			const diff = Math.floor(
				(new Date(expiresAt).getTime() - Date.now()) / 1000,
			);
			setSecondsLeft(Math.max(0, diff));
		};

		tick();
		const id = setInterval(tick, 1000);
		return () => clearInterval(id);
	}, [expiresAt]);

	useEffect(() => {
		if (cooldown <= 0) return;
		const id = setTimeout(() => setCooldown((prev) => prev - 1), 1000);
		return () => clearTimeout(id);
	}, [cooldown]);

	const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/\D/g, "").slice(-1);

		setDigits((prev) => {
			const next = [...prev];
			next[index] = value;
			return next;
		});

		if (value && index < CODE_LENGTH - 1) {
			focusAt(index + 1);
		}
	};

	const handleKeyDown = (
		index: number,
		e: KeyboardEvent<HTMLInputElement>,
	) => {
		if (e.key === "Backspace" && !digits[index] && index > 0) {
			focusAt(index - 1);
		}
		if (e.key === "ArrowLeft" && index > 0) {
			focusAt(index - 1);
		}
		if (e.key === "ArrowRight" && index < CODE_LENGTH - 1) {
			focusAt(index + 1);
		}
	};

	const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
		e.preventDefault();
		const pasted = e.clipboardData
			.getData("text")
			.replace(/\D/g, "")
			.slice(0, CODE_LENGTH);

		if (!pasted) return;

		setDigits(Array.from({ length: CODE_LENGTH }, (_, i) => pasted[i] ?? ""));
		focusAt(Math.min(pasted.length, CODE_LENGTH - 1));
	};

	const handleVerify = (e: FormEvent) => {
		e.preventDefault();

		if (!signupChallenge) return;

		if (code.length !== CODE_LENGTH) {
			toast.error(`Enter the ${CODE_LENGTH}-digit code.`);
			return;
		}

		dispatch(
			verifySignupOtp({ challengeId: signupChallenge.challengeId, code }),
		)
			.unwrap()
			.then(() => {
				dispatch(onClearVerifySignupSuccess());
				navigate("/sign-in");
			})
			.catch(() => {
				setDigits(emptyDigits());
				focusAt(0);
			});
	};

	const handleResend = () => {
		if (!signupChallenge || cooldown > 0 || resendSignupLoading) return;

		dispatch(resendSignupOtp(signupChallenge.challengeId))
			.unwrap()
			.then(() => {
				setCooldown(RESEND_SECONDS);
				setDigits(emptyDigits());
				focusAt(0);
			})
			.catch(() => {});
	};

	const handleBack = () => {
		dispatch(onClearSignupChallenge());
	};

	if (!signupChallenge) return null;

	const isExpired = secondsLeft === 0;

	return (
		<div>
			<h1 className="text-[22px] sm:text-[26px] xl:text-[28px] font-semibold">
				Verify your email
			</h1>
			<p className="mt-3 text-[15px] md:text-base xl:text-[17px] font-light">
				Enter the {CODE_LENGTH}-digit code we sent to{" "}
				<span className="font-medium break-all">
					{email || "your email address"}
				</span>
				.
			</p>

			<form className="mt-8 md:mt-10" onSubmit={handleVerify}>
				<div className="flex justify-between gap-2 sm:gap-3">
					{digits.map((digit, index) => (
						<input
							key={index}
							ref={(el) => {
								inputsRef.current[index] = el;
							}}
							type="text"
							inputMode="numeric"
							autoComplete={index === 0 ? "one-time-code" : "off"}
							maxLength={1}
							value={digit}
							onChange={(e) => handleChange(index, e)}
							onKeyDown={(e) => handleKeyDown(index, e)}
							onPaste={handlePaste}
							onFocus={(e) => e.target.select()}
							aria-label={`Digit ${index + 1}`}
							className="w-full max-w-[56px] aspect-square text-center text-[20px] sm:text-[24px] font-semibold border border-[#D9D9D9] rounded-xl outline-none transition-all focus:border-[#777DF9] focus:ring-2 focus:ring-[#777DF9]/20"
						/>
					))}
				</div>

				<p
					className={`mt-4 text-sm ${
						isExpired ? "text-red-600" : "text-[#6B6B6B]"
					}`}
				>
					{secondsLeft === null
						? ""
						: isExpired
							? "This code has expired. Request a new one."
							: `Code expires in ${formatTime(secondsLeft)}`}
				</p>

				<div className="mt-6">
					<Button
						text={verifySignupLoading ? "Verifying..." : "Verify"}
						type="submit"
						isDisabled={
							verifySignupLoading || code.length !== CODE_LENGTH || isExpired
						}
						isLoading={verifySignupLoading}
					/>
				</div>
			</form>

			<div className="mt-6 flex flex-col items-center gap-3 text-[15px]">
				<p>
					Didn't get the code?{" "}
					<button
						type="button"
						onClick={handleResend}
						disabled={cooldown > 0 || resendSignupLoading}
						className="text-[#4A148C] font-medium disabled:text-[#A8A8A8] disabled:cursor-not-allowed"
					>
						{resendSignupLoading
							? "Sending..."
							: cooldown > 0
								? `Resend in ${cooldown}s`
								: "Resend code"}
					</button>
				</p>
				<button
					type="button"
					onClick={handleBack}
					className="text-[#6B6B6B] underline"
				>
					Back to sign up
				</button>
			</div>
		</div>
	);
};

export default SignupOtp;