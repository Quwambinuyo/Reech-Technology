import type { MerchantStatus } from "../../redux/merchant/action";

export const NOT_RECORDED = "Not recorded";

const ID_TYPE_LABELS: Record<number, string> = {};

export const getIdTypeLabel = (idType?: number | null) => {
	if (idType === null || idType === undefined) return NOT_RECORDED;
	return ID_TYPE_LABELS[idType] ?? String(idType);
};

export const getMerchantStatusMeta = (status?: MerchantStatus) => {
	switch (status) {
		case 0:
			return { label: "Pending", className: "bg-[#FFE8CC] text-[#FFA94D]" };
		case 1:
			return { label: "Approved", className: "bg-[#E1F1E1] text-[#43A047]" };
		case 2:
			return { label: "Declined", className: "bg-[#FDE3E3] text-[#E53935]" };
		default:
			return {
				label: "Not submitted",
				className: "bg-[#EEF0F4] text-[#64748B]",
			};
	}
};

export const formatMerchantDate = (value?: string | null) => {
	if (!value) return NOT_RECORDED;
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return NOT_RECORDED;
	return date.toLocaleString("en-NG", {
		day: "numeric",
		month: "short",
		year: "numeric",
		hour: "numeric",
		minute: "2-digit",
	});
};

export const MerchantStatusBadge = ({ status }: { status?: MerchantStatus }) => {
	const { label, className } = getMerchantStatusMeta(status);

	return (
		<span
			className={`inline-flex items-center justify-center gap-2 w-[140px] py-2.5 rounded text-sm font-normal ${className}`}
		>
			<span className="w-1.5 h-1.5 rounded-full bg-current" />
			{label}
		</span>
	);
};