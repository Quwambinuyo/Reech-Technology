import { useEffect, useRef, useState } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { googleLogin } from "../../../redux/auth/authActions";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;

interface GoogleAuthButtonProps {
	label: string;
	text: "signin_with" | "signup_with";
	rememberMe?: boolean;
}

const GoogleAuthButton = ({
	label,
	text,
	rememberMe = false,
}: GoogleAuthButtonProps) => {
	const dispatch = useAppDispatch();
	const { googleLoginLoading } = useAppSelector((state) => state.auth);

	const containerRef = useRef<HTMLDivElement>(null);
	const [width, setWidth] = useState(300);

	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;

		const update = () => {
			const next = Math.round(el.getBoundingClientRect().width);
			setWidth(Math.min(400, Math.max(200, next)));
		};

		update();
		const observer = new ResizeObserver(update);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	const visibleButton = (
		<span className="border border-[#D9D9D9] rounded-xl py-2.5 flex-center gap-2 w-full">
			<span className="text-[24px] xl:text-[26px]">
				<FcGoogle />
			</span>
			<span>{googleLoginLoading ? "Please wait..." : label}</span>
		</span>
	);

	if (!clientId) {
		return (
			<button
				type="button"
				className="w-full"
				onClick={() => toast.error("Google sign-in is not available yet.")}
			>
				{visibleButton}
			</button>
		);
	}

	return (
		<GoogleOAuthProvider clientId={clientId}>
			<div ref={containerRef} className="relative w-full">
				{visibleButton}
				<div
					className={`absolute inset-0 flex items-center justify-center overflow-hidden opacity-[0.01] scale-y-[1.2] ${
						googleLoginLoading ? "pointer-events-none" : ""
					}`}
				>
					<GoogleLogin
						text={text}
						width={width}
						onSuccess={(credentialResponse) => {
							if (!credentialResponse.credential) {
								toast.error("Google did not return a sign-in token.");
								return;
							}
							dispatch(
								googleLogin({
									token: credentialResponse.credential,
									rememberMe,
								}),
							);
						}}
						onError={() => toast.error("Google sign-in failed. Try again.")}
					/>
				</div>
			</div>
		</GoogleOAuthProvider>
	);
};

export default GoogleAuthButton;