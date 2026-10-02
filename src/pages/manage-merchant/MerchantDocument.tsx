import { useState } from "react";
import {
	FaArrowUpRightFromSquare,
	FaEye,
	FaEyeSlash,
	FaFile,
	FaFileImage,
	FaFilePdf,
} from "react-icons/fa6";

const IMAGE_PATTERN = /\.(png|jpe?g|gif|webp|svg)(\?.*)?$/i;
const PDF_PATTERN = /\.pdf(\?.*)?$/i;

const getFileName = (url: string) => {
	const last = url.split("?")[0].split("/").pop() ?? "";
	try {
		return decodeURIComponent(last) || "Document";
	} catch {
		return last || "Document";
	}
};

type MerchantDocumentProps = {
	label: string;
	url: string;
};

const MerchantDocument = ({ label, url }: MerchantDocumentProps) => {
	const [showPreview, setShowPreview] = useState(false);

	const isImage = IMAGE_PATTERN.test(url);
	const isPdf = PDF_PATTERN.test(url);
	const canPreview = isImage || isPdf;
	const Icon = isPdf ? FaFilePdf : isImage ? FaFileImage : FaFile;

	return (
		<div className="flex flex-col gap-2">
			<p className="font-semibold text-sm text-[#1E293B]">{label}</p>

			<div className="border border-[#CBD5E1] rounded-xl p-3 flex flex-col gap-3">
				<div className="flex items-center justify-between gap-3">
					<div className="flex items-center gap-3 min-w-0">
						<Icon className="text-[#4A148C] text-xl shrink-0" />
						<p className="text-sm text-[#475569] truncate">{getFileName(url)}</p>
					</div>

					<div className="flex items-center gap-2 shrink-0">
						{canPreview && (
							<button
								type="button"
								onClick={() => setShowPreview((prev) => !prev)}
								className="px-3 py-1.5 rounded border border-[#4A148C] text-[#4A148C] text-xs font-semibold flex items-center gap-2"
							>
								{showPreview ? <FaEyeSlash /> : <FaEye />}
								{showPreview ? "Hide" : "Preview"}
							</button>
						)}
						<a
							href={url}
							target="_blank"
							rel="noopener noreferrer"
							className="px-3 py-1.5 rounded bg-[#4A148C] text-white text-xs font-semibold flex items-center gap-2"
						>
							<FaArrowUpRightFromSquare />
							View
						</a>
					</div>
				</div>

				{showPreview && isImage && (
					<img
						src={url}
						alt={label}
						className="w-full max-h-[420px] object-contain rounded bg-[#F5F6FF]"
					/>
				)}

				{showPreview && isPdf && (
					<iframe
						src={url}
						title={label}
						className="w-full h-[420px] rounded bg-[#F5F6FF]"
					/>
				)}
			</div>
		</div>
	);
};

export default MerchantDocument;