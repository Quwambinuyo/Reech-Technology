import { IoCloseCircleOutline } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import moment from "moment";
import { onToggleTransactionDetails } from "../../redux/transaction/reducer";
import { StatusDisplay } from "../../components/small";
import logo from "../../assets/reech-single.png";

const TransactionDetails = () => {
	const dispatch = useAppDispatch();

	const { toggleTransactionDetails } = useAppSelector(
		(state) => state.transaction
	);

	return (
		<div className="bg-white w-11/12 max-w-[550px] md:max-w-[600px] lg:max-w-[650px] py-4 sm:py-5 lg:py-6 xl:py-7 rounded-xl">
			<section className="flex-between text-lg lg:text-xl px-4 sm:px-5 lg:px-6 xl:px-7 mb-6 lg:mb-7 xl:mb-8">
				<h4 className="text-light-black font-medium">#12345678</h4>
				<button
					className="text-2xl lg:text-3xl"
					onClick={() => dispatch(onToggleTransactionDetails(null))}
				>
					<IoCloseCircleOutline />
				</button>
			</section>

			<section className="text-ibmplex h-[70vh] overflow-y-auto max-h-[450px] px-4 sm:px-5 lg:px-6 xl:px-7">
				<div className="font-semibold flex-between text-sm pb-3 md:pb-4 border-b-2 border-b-[#D7D7D7]">
					<div className="flex items-center gap-2">
						<img
							src={toggleTransactionDetails?.company}
							alt={toggleTransactionDetails?.productType}
							className="`w-[29px] xl:w-[30px]"
						/>
						<p className="text-xs md:text-[13px]">
							{toggleTransactionDetails?.productType}
						</p>
					</div>
					<p>
						{moment(toggleTransactionDetails?.date).format("DD/MM/YYYY h:mm A")}
					</p>
				</div>

				<div className="py-2 lg:py-3">
					<div className="flex-between">
						<div className="flex flex-col gap-2">
							<h3 className="text-neutral-900 text-2xl font-bold">
								{toggleTransactionDetails?.type === "credit" ? "+" : "-"}{" "}
								{toggleTransactionDetails?.pointsEarned} Points
							</h3>
							<p className="text-sm text-neutral-900">
								For a {toggleTransactionDetails?.status} transaction{" "}
							</p>
						</div>
						<StatusDisplay
							status={toggleTransactionDetails?.status as string}
						/>
					</div>

					<div className="px-2 flex flex-col gap-4 lg:gap-5 mt-6">
						<div className="flex-between border-b border-b-[#D7D7D7] pb-3 md:pb-4 lg:pb-5">
							<p className="text-sm">Fee</p>
							<h5 className="font-medium">-2 Points</h5>
						</div>

						<div className="flex-between border-b border-b-[#D7D7D7] pb-3 md:pb-4 lg:pb-5">
							<p className="text-sm">Payment Type</p>
							<h5 className="font-medium">Electronic Scan Transfer</h5>
						</div>

						<div className="flex-between border-b border-b-[#D7D7D7] pb-3 md:pb-4 lg:pb-5">
							<p className="text-sm">Debit From</p>
							<h5 className="font-medium">Alex Meian</h5>
						</div>

						<div className="flex-between border-b border-b-[#D7D7D7] pb-3 md:pb-4 lg:pb-5">
							<p className="text-sm">Fee</p>
							<div className="flex flex-col items-end gap-1">
								<h5 className="font-medium">Shoprite Allen Avenue</h5>
								<p className="text-sm">019289378</p>
							</div>
						</div>

						<div className="flex-center">
							<p className="flex items-center gap-0.5">
								<img src={logo} alt="logo" className="w-[40px]" />
								<span className="font-poppins font-medium text-[#000000]">
									reech
								</span>
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default TransactionDetails;
