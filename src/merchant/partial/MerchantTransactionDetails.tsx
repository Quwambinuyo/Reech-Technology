import moment from "moment";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { onToggleMerchantTransactionDetails } from "../../redux/transaction/reducer";
import { StatusDisplay } from "../../components/small";
import { customerImg } from "../../assets";

const MerchantTransactionDetails = () => {
  const dispatch = useAppDispatch();

  const { toggleMerchantTransactionDetails } = useAppSelector(
    (state) => state.transaction,
  );

  return (
    <div className="bg-white w-11/12 max-w-[550px] md:max-w-[600px] lg:max-w-[650px] py-4 sm:py-5 lg:py-6 xl:py-7 rounded-xl">
      <section className="flex-between text-lg lg:text-xl px-4 sm:px-5 lg:px-6 xl:px-7 mb-6 lg:mb-7 xl:mb-8">
        <h4 className="text-light-black font-medium">Transaction Details</h4>
        <button
          className="text-2xl lg:text-3xl"
          onClick={() => dispatch(onToggleMerchantTransactionDetails(null))}
        >
          <IoCloseCircleOutline />
        </button>
      </section>

      <section className="text-ibmplex px-4 sm:px-5 lg:px-6 xl:px-7">
        <div className="flex items-center gap-3 pb-4 border-b-2 border-b-[#D7D7D7]">
          <img
            src={toggleMerchantTransactionDetails?.profilePicture || customerImg}
            alt={toggleMerchantTransactionDetails?.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-sm">
              {toggleMerchantTransactionDetails?.name}
            </p>
            <p className="text-xs text-neutral-500">
              {toggleMerchantTransactionDetails?.email}
            </p>
          </div>
        </div>

        <div className="py-4 flex flex-col gap-4">
          <div className="flex-between">
            <h3 className="text-neutral-900 text-2xl font-bold">
              {toggleMerchantTransactionDetails?.isDebit ? "-" : "+"}{" "}
              {(toggleMerchantTransactionDetails?.points ?? 0).toLocaleString()}{" "}
              Points
            </h3>
            <StatusDisplay
              status={
                toggleMerchantTransactionDetails?.isDebit ? "Debit" : "Credit"
              }
            />
          </div>

          <div className="flex-between border-b border-b-[#D7D7D7] pb-3">
            <p className="text-sm">Amount</p>
            <h5 className="font-medium">
              ₦{(toggleMerchantTransactionDetails?.amount ?? 0).toLocaleString()}
            </h5>
          </div>

          <div className="flex-between border-b border-b-[#D7D7D7] pb-3">
            <p className="text-sm">Date/Time</p>
            <h5 className="font-medium">
              {toggleMerchantTransactionDetails?.time
                ? moment(toggleMerchantTransactionDetails.time).format(
                    "DD/MM/YYYY h:mm A",
                  )
                : "--"}
            </h5>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MerchantTransactionDetails;