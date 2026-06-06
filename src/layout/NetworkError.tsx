import { useEffect } from "react";
import { MdOutlineCloudOff } from "react-icons/md";
import Button from "../components/Button";

const NetworkError = () => {
	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "auto";
		};
	}, []);

	const onRetryBtnClick = () => {
		window.location.reload();
	};

	return (
		<div className="fixed grid place-items-center bg-white z-[10000] inset-0">
			<div className="flex flex-col justify-center items-center gap-4 text-center max-w-[350px]">
				<div className="flex flex-col justify-center items-center gap-3">
					<MdOutlineCloudOff size={60} color="#543776" />
					<h5>OOPS. No Internet.</h5>
				</div>
				<div className="flex flex-col justify-center items-center gap-5">
					<p>
						Poor network connection detected. Please check your connectivity and
						try again.
					</p>
				</div>
				<div className="w-[120px]">
					<Button text="Retry" onClick={onRetryBtnClick} />
				</div>
			</div>
		</div>
	);
};

export default NetworkError;
