import { useNavigate, useParams } from "react-router-dom";
import { mockMerchantLists } from "../../mock";
import { FaArrowLeft } from "react-icons/fa6";
import { PlainInput, ProfileButton } from "../profile/partial/ProfileInputs";
import { MerchantDocumentWrapper } from "../../admin/partial";

const SingleMerchant = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const selectedMerchant = mockMerchantLists.find((m) => String(m.id) === id);

	return (
		<div>
			<section className="merchant-bg -mx-5 xl:-mx-6 -mt-5 p-3 h-[175px] relative">
				<button
					className="bg-white text-primary-purple text-lg p-1.5 rounded"
					onClick={() => navigate(-1)}
				>
					<FaArrowLeft />
				</button>

				<div className="absolute bg-white w-[120px] h-[120px] rounded-full flex-center -bottom-[32%] left-10">
					<img
						src={selectedMerchant?.company.image}
						alt={selectedMerchant?.company.name}
						className="w-[80px] h-auto"
					/>
				</div>
			</section>

			<section className="flex justify-end gap-4 mt-4">
				<ProfileButton type="decline" />
				<ProfileButton type="approve" />
			</section>

			<section className="bg-white p-5 md:p-6 lg:p-7 xl:p-8 rounded-xl mt-5 flex flex-col gap-7 xl:gap-8">
				<h4 className="text-center font-semibold text-[#1E293B]">
					Company's Info
				</h4>

				<div className="grid md:grid-cols-2 gap-6 xl:gap-y-6 xl:gap-x-8">
					<PlainInput
						label="Company Name"
						value={selectedMerchant?.company.name as string}
						id="company-name"
					/>
					<PlainInput
						label="Company Category"
						value={selectedMerchant?.company.category as string}
						id="company-category"
					/>
					<PlainInput
						label="Business Address"
						value={selectedMerchant?.company.address as string}
						id="business-address"
					/>
					<PlainInput
						label="Business Address (Landmark)"
						value={selectedMerchant?.company.landMark as string}
						id="business-add-landmark"
					/>
					<MerchantDocumentWrapper
						label="CAC Documents"
						imgUrl={selectedMerchant?.company.documents.cac as string}
					/>
					<MerchantDocumentWrapper
						label="Utility Bill"
						imgUrl={selectedMerchant?.company.documents.utilityBill as string}
					/>
				</div>

				<h4 className="text-center font-semibold text-[#1E293B]">
					Director's Info
				</h4>

				<div className="grid md:grid-cols-2 gap-6 xl:gap-y-6 xl:gap-x-8">
					<PlainInput
						label="Full Name"
						value={selectedMerchant?.director.name as string}
						id="full-name"
					/>
					<PlainInput
						label="Email Address"
						value={selectedMerchant?.director.email as string}
						id="email"
					/>
					<PlainInput
						label="ID Type"
						value={selectedMerchant?.director.idType as string}
						id="id-type"
					/>
					<PlainInput
						label="Phone"
						value={selectedMerchant?.director.phone as string}
						id="phone"
					/>
					<MerchantDocumentWrapper
						label="ID Card"
						imgUrl={selectedMerchant?.director.idUrl as string}
					/>
				</div>
			</section>
		</div>
	);
};

export default SingleMerchant;
