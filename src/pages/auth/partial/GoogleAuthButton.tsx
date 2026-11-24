import { FcGoogle } from "react-icons/fc";
import { baseURL } from "../../../components/api";

interface GoogleAuthButtonProps {
	label: string;
	text: "signin_with" | "signup_with";
	rememberMe?: boolean;
}

const base64url = (bytes: Uint8Array) =>
	btoa(String.fromCharCode(...bytes))
		.replace(/\+/g, "-")
		.replace(/\//g, "_")
		.replace(/=+$/, "");

const GoogleAuthButton = ({
	label,
	rememberMe = false,
}: GoogleAuthButtonProps) => {
	const handleClick = async () => {
		const verifier = base64url(crypto.getRandomValues(new Uint8Array(32)));
		sessionStorage.setItem("reech.google.verifier", verifier);
		sessionStorage.setItem("reech.google.rememberMe", String(rememberMe));
		const digest = await crypto.subtle.digest(
			"SHA-256",
			new TextEncoder().encode(verifier),
		);
		const challenge = base64url(new Uint8Array(digest));
		window.location.assign(
			`${baseURL}/auth/google/start?codeChallenge=${encodeURIComponent(challenge)}`,
		);
	};

	return (
		<button type="button" className="w-full" onClick={handleClick}>
			<span className="border border-[#D9D9D9] rounded-xl py-2.5 flex-center gap-2 w-full">
				<span className="text-[24px] xl:text-[26px]">
					<FcGoogle />
				</span>
				<span>{label}</span>
			</span>
		</button>
	);
};

export default GoogleAuthButton;