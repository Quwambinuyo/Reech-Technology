import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaSpinner } from "react-icons/fa6";
import { PlainInput } from "../profile/partial/ProfileInputs";
import DeclineMerchantModal from "./DeclineMerchantModal";
import MerchantDocument from "./MerchantDocument";
import {
	MerchantStatusBadge,
	formatMerchantDate,
	getIdTypeLabel,
	getMerchantStatusMeta,
	NOT_RECORDED,
} from "./MerchantHelpers";
import {
	approveMerchant,
	declineMerchant,
	fetchAdminMerchantDetail,
} from "../../redux/merchant/action";
import { clearMerchantDetail } from "../../redux/merchant/reducer";
import type { AppDispatch, RootState } from "../../redux/store";

const DetailSkeleton = () => (
	<div className="bg-white p-5 md:p-6 lg:p-7 xl:p-8 rounded-xl mt-5 flex flex-col gap-6 animate-pulse">
		<div className="h-5 w-40 bg-[#E2E8F0] rounded mx-auto" />
		<div className="grid md:grid-cols-2 gap-6">
			{Array.from({ length: 6 }).map((_, i) => (
				<div key={i} className="h-12 bg-[#E2E8F0] rounded" />
			))}
		</div>
	</div>
);

const SingleMerchant = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const [isDeclineOpen, setIsDeclineOpen] = useState(false);

	const {
		merchantDetail,
		isFetchingMerchantDetail,
		fetchMerchantDetailError,
		isApproving,
		isDeclining,
	} = useSelector((state: RootState) => state.merchant);

	useEffect(() => {
		if (!id) return;
		dispatch(fetchAdminMerchantDetail(id));

		return () => {
			dispatch(clearMerchantDetail());
		};
	}, [dispatch, id]);

	const merchant =
		merchantDetail && String(merchantDetail.id) === id ? merchantDetail : null;
	const canReview = merchant?.status === 0;
	const isReviewing = isApproving || isDeclining;
	const displayName = merchant?.name?.trim() ?? "";
	const history = merchant?.verificationHistory ?? [];
	const directors = merchant?.directors ?? [];
	const cacDocuments = merchant?.cacDocumentUrls ?? [];

	const handleApprove = () => {
		if (!id) return;
		dispatch(approveMerchant(id));
	};

	const handleDecline = async (reason: string) => {
		if (!id) return;
		const result = await dispatch(declineMerchant({ id, reason }));
		if (declineMerchant.fulfilled.match(result)) setIsDeclineOpen(false);
	};

	const retry = () => {
		if (id) dispatch(fetchAdminMerchantDetail(id));
	};

	return (
		<div>
			<section className="merchant-bg -mx-5 xl:-mx-6 -mt-5 p-3 h-[175px] relative">
				<button
					className="bg-white text-primary-purple text-lg p-1.5 rounded"
					onClick={() => navigate(-1)}
				>
					<FaArrowLeft />
				</button>

				<div className="absolute bg-white w-[120px] h-[120px] rounded-full flex-center -bottom-[32%] left-10 text-4xl font-semibold text-primary-purple uppercase overflow-hidden">
					{merchant?.logo ? (
						<img
							src={merchant.logo}
							alt={displayName}
							className="w-[80px] h-auto"
						/>
					) : (
						displayName.charAt(0)
					)}
				</div>
			</section>

			{isFetchingMerchantDetail && !merchant && <DetailSkeleton />}

			{!isFetchingMerchantDetail && !merchant && fetchMerchantDetailError && (
				<div className="bg-white rounded-xl mt-14 p-8 text-center flex flex-col items-center gap-4">
					<p className="text-sm text-[#475569]">{fetchMerchantDetailError}</p>
					<button
						type="button"
						onClick={retry}
						className="text-sm text-[#4A148C] font-semibold"
					>
						Try again
					</button>
				</div>
			)}

			{merchant && (
				<>
					<section className="flex justify-between items-center gap-4 flex-wrap mt-4 pl-[160px]">
						<MerchantStatusBadge status={merchant.status} />

						{canReview && (
							<div className="flex gap-4">
								<button
									type="button"
									disabled={isReviewing}
									onClick={() => setIsDeclineOpen(true)}
									className="px-5 py-2 rounded text-sm font-semibold border border-[#4A148C] text-[#4A148C] disabled:opacity-60"
								>
									Decline
								</button>
								<button
									type="button"
									disabled={isReviewing}
									onClick={handleApprove}
									className="px-5 py-2 rounded text-sm font-semibold bg-[#4A148C] text-white flex items-center gap-2 disabled:opacity-60"
								>
									{isApproving && <FaSpinner className="animate-spin" />}
									Approve
								</button>
							</div>
						)}
					</section>

					<section className="bg-white p-5 md:p-6 lg:p-7 xl:p-8 rounded-xl mt-5 flex flex-col gap-7 xl:gap-8">
						<h4 className="text-center font-semibold text-[#1E293B]">
							Company's Info
						</h4>

						<div className="grid md:grid-cols-2 gap-6 xl:gap-y-6 xl:gap-x-8">
							<PlainInput
								label="Company Name"
								value={merchant.name?.trim() ?? ""}
								id="company-name"
							/>
							<PlainInput
								label="Company Category"
								value={merchant.categoryName?.trim() ?? ""}
								id="company-category"
							/>
							<PlainInput
								label="Business Address"
								value={merchant.address ?? ""}
								id="business-address"
							/>
							<PlainInput
								label="Business Address (Landmark)"
								value={merchant.landmark ?? ""}
								id="business-add-landmark"
							/>
							<PlainInput
								label="Country"
								value={merchant.countryName ?? ""}
								id="country"
							/>
							<PlainInput
								label="Submitted On"
								value={formatMerchantDate(merchant.submittedAt)}
								id="submitted-on"
							/>
							{cacDocuments.map((url, index) => (
								<MerchantDocument
									key={url}
									label={
										cacDocuments.length > 1
											? `CAC Document ${index + 1}`
											: "CAC Documents"
									}
									url={url}
								/>
							))}
						</div>

						{directors.map((director, index) => (
							<div key={director.id} className="flex flex-col gap-7 xl:gap-8">
								<h4 className="text-center font-semibold text-[#1E293B]">
									{directors.length > 1
										? `Director ${index + 1}`
										: "Director's Info"}
								</h4>

								<div className="grid md:grid-cols-2 gap-6 xl:gap-y-6 xl:gap-x-8">
									<PlainInput
										label="Full Name"
										value={director.fullName ?? ""}
										id={`full-name-${index}`}
									/>
									<PlainInput
										label="Email Address"
										value={director.emailAddress ?? ""}
										id={`email-${index}`}
									/>
									<PlainInput
										label="ID Type"
										value={getIdTypeLabel(director.idType)}
										id={`id-type-${index}`}
									/>
									<PlainInput
										label="Phone"
										value={director.phoneNumber ?? ""}
										id={`phone-${index}`}
									/>
									{director.idCardUrl && (
										<MerchantDocument label="ID Card" url={director.idCardUrl} />
									)}
								</div>
							</div>
						))}

						<h4 className="text-center font-semibold text-[#1E293B]">
							Verification History
						</h4>

						{history.length === 0 ? (
							<p className="text-center text-sm text-[#475569]">
								{NOT_RECORDED}
							</p>
						) : (
							<div className="flex flex-col gap-4">
								{history.map((item, index) => (
									<div
										key={index}
										className="border border-[#E2E8F0] rounded p-4 flex flex-col gap-2"
									>
										<div className="flex items-center justify-between gap-3 flex-wrap">
											<MerchantStatusBadge status={item.status} />
											<p className="text-xs text-[#64748B]">
												{formatMerchantDate(item.createdAt)}
											</p>
										</div>
										<p className="text-sm text-[#1E293B]">
											{getMerchantStatusMeta(item.status).label} by{" "}
											{item.handledByName || NOT_RECORDED}
										</p>
										{item.reason && (
											<p className="text-sm text-[#475569]">{item.reason}</p>
										)}
									</div>
								))}
							</div>
						)}
					</section>
				</>
			)}

			{isDeclineOpen && canReview && (
				<DeclineMerchantModal
					isSubmitting={isDeclining}
					onClose={() => setIsDeclineOpen(false)}
					onConfirm={handleDecline}
				/>
			)}
		</div>
	);
};

export default SingleMerchant;