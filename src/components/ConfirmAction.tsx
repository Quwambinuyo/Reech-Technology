import { BsInfoCircleFill } from "react-icons/bs";
import { IoCloseCircleOutline } from "react-icons/io5";
import Button from "./Button";

interface ConfirmActionProps {
	onClose: () => void;
	action: "delete" | "deactivate" | "approve";
	loading: boolean;
	onConfirmAction: () => void;
}

const ConfirmAction = ({
	onClose,
	action,
	loading,
	onConfirmAction,
}: ConfirmActionProps) => {
	return (
		<div className="bg-white w-11/12 max-w-[370px] rounded-2xl p-6 lg:p-7 xl:p-8 relative">
			<button
				className="absolute text-2xl lg:text-3xl top-4 lg:top-5 right-5"
				onClick={onClose}
			>
				<IoCloseCircleOutline />
			</button>

			<div className="flex-center flex-col gap-4 pt-8 text-center">
				<p className="text-gray-400">
					<BsInfoCircleFill size={80} />
				</p>
				<p className="text-primary-purple">
					Confirm you want to perform this{" "}
					<span className="font-medium italic">"{action}"</span> action.
				</p>
			</div>

			<div className="mt-4">
				<Button
					text={
						loading
							? `${action
									.slice(0, action.length - 1)
									.padEnd(action.length + 5, "ing...")}`
							: `yes ${action}`
					}
					isLoading={loading}
					onClick={onConfirmAction}
				/>
			</div>
		</div>
	);
};

export default ConfirmAction;
