import { useState } from "react";
import { FaSpinner } from "react-icons/fa6";

const MAX_REASON_LENGTH = 2000;

type DeclineMerchantModalProps = {
	isSubmitting: boolean;
	onClose: () => void;
	onConfirm: (reason: string) => void;
};

const DeclineMerchantModal = ({
	isSubmitting,
	onClose,
	onConfirm,
}: DeclineMerchantModalProps) => {
	const [reason, setReason] = useState("");

	return (
		<div
			className="fixed inset-0 z-50 bg-black/40 flex-center p-4"
			onClick={() => {
				if (!isSubmitting) onClose();
			}}
		>
			<div
				className="bg-white rounded-xl w-full max-w-[480px] p-5 md:p-6 flex flex-col gap-4"
				onClick={(e) => e.stopPropagation()}
			>
				<h4 className="font-semibold text-[#1E293B]">Decline Merchant</h4>

				<label htmlFor="decline-reason" className="text-sm text-[#475569]">
					Reason (optional)
				</label>
				<textarea
					id="decline-reason"
					rows={5}
					value={reason}
					maxLength={MAX_REASON_LENGTH}
					disabled={isSubmitting}
					placeholder="Please upload a clearer document"
					onChange={(e) => setReason(e.target.value)}
					className="border border-[#CBD5E1] rounded p-3 text-sm resize-none outline-none focus:border-[#4A148C]"
				/>
				<p className="text-xs text-right text-[#64748B]">
					{reason.length}/{MAX_REASON_LENGTH}
				</p>

				<div className="flex justify-end gap-3">
					<button
						type="button"
						disabled={isSubmitting}
						onClick={onClose}
						className="px-5 py-2 rounded text-sm font-semibold border border-[#CBD5E1] text-[#475569] disabled:opacity-60"
					>
						Cancel
					</button>
					<button
						type="button"
						disabled={isSubmitting}
						onClick={() => onConfirm(reason)}
						className="px-5 py-2 rounded text-sm font-semibold bg-[#4A148C] text-white flex items-center gap-2 disabled:opacity-60"
					>
						{isSubmitting && <FaSpinner className="animate-spin" />}
						Decline
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeclineMerchantModal;